import {https, logger} from 'firebase-functions/v1';
import {CallableRequest, onCall} from 'firebase-functions/v2/https';
import {setGlobalOptions} from 'firebase-functions/v2/options';
import OpenAI from 'openai';
import {fetchBookDetails} from '../utils/fetchBookDetails';
import {fetchBookPrices} from '../utils/fetchBookPrices';
import {sendMessageToGPT} from '../utils/sendMessageToGPT';

setGlobalOptions({maxInstances: 10});

interface ISBN {
  isbn: string;
}

const openai = new OpenAI({
  apiKey: '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',
});

export const onCallGPT = onCall(async (request: CallableRequest<ISBN>) => {
  logger.debug(request.data.isbn);
  const bookInfo = await fetchBookDetails(request.data.isbn);
  logger.info(bookInfo.book.title);
  const bookPrices = await fetchBookPrices(bookInfo.book.title);
  logger.debug(bookInfo);
  logger.debug(bookPrices.shoppingscraper.results.slice(0, 10));
  try {
    const message = `
    Wczuj się w asystenta księgarni używanych książek.

    Otrzymujesz pewne informacje o książce np. zdjęcie lub kod isbn i/lub 
    opis w jakim stanie jest książka lub zgadujesz na podstawie zdjęcia w 
    jakiejś kondycji jest książka i generujesz odpowiedz która zawiera:
    1. tytuł i autora
    2. opis książki
    3. cenę rynkową po której ktoś inny kupi tę książkę (musisz przeszukać 
      internet żeby zobaczyć inne oferty tej książki oraz uwzględnić stanowczo 
      jej stan do ceny)
    4. podaj konkretną cenę do wystawienia.

    odpowiadaj po polsku używając złotówek jako walutę

    więc zaczynajmy:
    isbn: ${request.data.isbn} stan bardzo dobry
    dodatkowe dane o ksiące: ${JSON.stringify(bookInfo)}
    ${JSON.stringify(bookPrices.shoppingscraper.results.slice(0, 10))}  
`;
    const response = await sendMessageToGPT(openai, message);

    const gptResponse = response.choices[0].message.content;

    if (!gptResponse) {
      return {response: 'No response from chat GPT API'};
    }

    logger.info(gptResponse);
    return {
      response: gptResponse,
      data: {bookInfo: bookInfo, prices: bookPrices},
    };
  } catch (error) {
    logger.error('Błąd w trakcie połączenia z ChatGPT API', error);
    throw new https.HttpsError(
      'internal',
      'Błąd w trakcie połączenia z ChatGPT API',
    );
  }
});
