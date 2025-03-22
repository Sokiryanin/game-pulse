import axios from 'axios';

axios.defaults.baseURL = 'https://api.rawg.io/api';
axios.defaults.params = { key: 'fe60b95489dc439ea2832b6695de7e88' };

// Получение списка игр с фильтрацией по платформам
export const fetchGames = async (query = '') => {
  const url = query.startsWith('http') ? query : `/games?${query}`;
  const response = await axios.get(url);

  return {
    results: response.data.results || [],
    next: response.data.next,
    count: response.data.count
  };
};

// Поиск игр по названию
export const searchGames = async (query, page = 1) => {
  try {
    const response = await axios.get('/games', {
      params: { search: query, page, page_size: 20 }
    });
    return {
      results: response.data.results || [],
      next: response.data.next,
      count: response.data.count
    };
  } catch (error) {
    console.error('Ошибка при поиске игр:', error);
    return { results: [], next: null, count: 0 };
  }
};

// Получение списка платформ
export const fetchPlatforms = async () => {
  try {
    const response = await axios.get('/platforms/lists/parents');
    return response.data.results || [];
  } catch (error) {
    console.error('Ошибка при получении платформ:', error);
    return [];
  }
};

export const fetchGamesFromUrl = async (url) => {
  const response = await axios.get(url);
  return {
    results: response.data.results || [],
    next: response.data.next
  };
};
