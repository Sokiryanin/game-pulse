import axios from 'axios';

axios.defaults.baseURL = 'https://api.rawg.io/api';
axios.defaults.params = { key: 'c99e701026e445418cfda9f462c5ce1a' }; // Укажи свой API-ключ

export const fetchGames = async (url = '/games') => {
  try {
    const response = await axios.get(url);
    return {
      results: response.data.results || [],
      next: response.data.next // Ссылка на следующую страницу
    };
  } catch (error) {
    console.error('Ошибка загрузки игр:', error);
    return { results: [], next: null };
  }
};
