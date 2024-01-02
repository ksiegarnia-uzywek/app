export async function fetchBookPrices(keyword: string) {
  const apiKey = '81fc6a4d62b34049b77dc8e61a4b4724';
  const url = `https://api.shoppingscraper.com/search/googleshopping/pl/?keyword=${encodeURIComponent(
    keyword,
  )}&api_key=${apiKey}&page=1&limit=10`;

  try {
    const response = await fetch(url);
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
