// import {https, logger} from 'firebase-functions/v1';
// import {CallableRequest, onCall} from 'firebase-functions/v2/https';
// import OpenAI from 'openai';
// import {sendMessageToGPTWithImage} from '../utils/sendMessageToGPTWithImage';

// interface ImageData {
//   imageUrl: string;
// }

// const openai = new OpenAI({
//   apiKey: '<klucz api>',
// });

// export const onCallProcessImage = onCall(
//   async (request: CallableRequest<ImageData>) => {
//     logger.debug('Received image URL:', request.data.imageUrl);
//     try {
//       const image = await request.data.imageUrl;
//       logger.info('Extracted image:', image);

//       const message = `
//       "You are gpt-4-vision-preview, the latest OpenAI model that can
//       describe images
//       provided by the user in extreme detail. The user has attached
//       an image to this
//       message for you to analyse, there is MOST DEFINITELY an image
//       attached, you will never reply saying that you cannot see the
//       image because the image is absolutely and always attached to this
//       message."

//       odczytaj numer isbn ze zdjęcia jeśli taki jest.
//     `;

//       const response = await sendMessageToGPTWithImage(openai, message,
// image);
//       const gptResponse = response.choices[0].message.content;

//       if (!gptResponse) {
//         return {response: 'No response from chat GPT API'};
//       }

//       logger.info(gptResponse);
//       return {
//         response: gptResponse,
//       };
//     } catch (error) {
//       logger.error(
//         'Error during processing image or connecting to ChatGPT API',
//         error,
//       );
//       throw new https.HttpsError(
//         'internal',
//         'Error during processing image or connecting to ChatGPT API',
//       );
//     }
//   },
// );
