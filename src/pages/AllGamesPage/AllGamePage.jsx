import React, { useCallback, useEffect, useRef, useState } from 'react';
import { fetchGames } from '../../api';
import { GameList } from '../../components/GameList/GameList';
import { PacmanLoader } from 'react-spinners';

export const AllGamePage = () => {
  const [gameItems, setGameItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [nextPage, setNextPage] = useState(null);

  const observer = useRef();

  const styles = {
    container: {
      marginBottom: '14px',
      fontSize: '24px'
    }
  };

  // Запит на всі ігри
  useEffect(() => {
    async function getGames() {
      try {
        setLoading(true);
        setError(false);
        const { results, next } = await fetchGames();
        setGameItems(results);
        setNextPage(next);
      } catch (error) {
        setError(true);
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getGames();
  }, []);

  // Функція загрузки наступної сторінки
  const loadMoreGames = useCallback(async () => {
    if (!nextPage || loading) return;

    try {
      setLoading(true);
      const { results, next } = await fetchGames(nextPage);

      setGameItems((prev) => [
        ...prev,
        ...results.filter(
          (game) => !prev.some((prevGame) => prevGame.id === game.id)
        )
      ]); // Убираем дубликаты

      setNextPage(next); // Обновляем ссылку на след. страницу
    } catch (error) {
      setError(true);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [nextPage, loading]);

  // Слідкуємо за останнім елементом для підгрузки
  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && nextPage) {
          loadMoreGames();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, nextPage, loadMoreGames]
  );

  return (
    <>
      <div style={styles.container}>
        <h3>All games</h3>
      </div>

      <div>
        <select name="" id="">
          <option value="relevance">Relevance</option>
          <option value="date_added">Date added</option>
          <option value="name">Name</option>
          <option value="release_date">Release date</option>
          <option value="popularity">Popularity</option>
          <option value="average_rating">Average rating</option>
        </select>
      </div>

      <div>
        <GameList items={gameItems} lastElementRef={lastElementRef} />

        {loading && (
          <div>
            <PacmanLoader color={'gray'} />
          </div>
        )}
        {error && !loading && <div>OOPS! THERE WAS AN ERROR!</div>}
      </div>
    </>
  );
};
