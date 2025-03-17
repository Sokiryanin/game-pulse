import axios from 'axios';

axios.defaults.baseURL = 'https://api.rawg.io/api'; // Правильный URL
axios.defaults.params = { key: 'c1797456abc14674b7327835777b1bc8' }; // Подставь свой API-ключ

export const fetchGames = async () => {
  const resp = await axios.get('/games');

  return resp.data.results;
};
