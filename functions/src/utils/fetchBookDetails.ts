/**
 * Wysyła zapytanie do API ISBNdb i otrzymuje informacje o książce.
 * @param {string} isbn - Numer ISBN książki do wyszukania.
 * @return {Promise<any>} Obiekt zawierający informacje o książce.
 */

export async function fetchBookDetails(isbn: string) {
  const url = `https://api2.isbndb.com/book/${isbn}?with_prices=1`;
  const headers = {
    accept: 'application/json',
    Authorization: '51318_3461609dd6b507113630e549dfc56f8c',
  };

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Wystąpił błąd podczas pobierania danych książki: ', error);
    throw error;
  }
}
