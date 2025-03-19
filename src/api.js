import axios from 'axios';

axios.defaults.baseURL = 'https://api.rawg.io/api';
axios.defaults.params = { key: 'c99e701026e445418cfda9f462c5ce1a' }; // Укажи свой API-ключ

export const fetchGames = async (url = '/games') => {
  const response = await axios.get(
    url.startsWith('http') ? url : `/games?${url}`
  );
  return {
    results: response.data.results || [],
    next: response.data.next,
    count: response.data.count
  };
};

// Поиск игр по названию (с учетом всех страниц)
export const searchGames = async (query, page = 1) => {
  const response = await axios.get(
    `/games?search=${query}&page=${page}&page_size=20`
  );
  return {
    results: response.data.results || [],
    next: response.data.next, // ссылка на следующую страницу
    count: response.data.count // общее количество найденных игр
  };
};
