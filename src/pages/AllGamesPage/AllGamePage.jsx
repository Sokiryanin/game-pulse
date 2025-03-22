import React, { useCallback, useEffect, useRef, useState } from 'react';
import { fetchGames, fetchPlatforms } from '../../api';
import { GameList } from '../../components/GameList/GameList';
import { PacmanLoader } from 'react-spinners';
import { PlatformFilter } from '../../components/PlatformFilter/PlatformFilter';

const getInitialFilters = () => {
  const saved = localStorage.getItem('game-filters');
  return saved ? JSON.parse(saved) : { platformId: '' };
};

export const AllGamePage = () => {
  const [gameItems, setGameItems] = useState([]);
  const [filters, setFilters] = useState(getInitialFilters);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [nextPage, setNextPage] = useState(null);
  const [platforms, setPlatforms] = useState([]);

  const observer = useRef();

  const styles = {
    container: {
      marginBottom: '14px',
      fontSize: '24px'
    }
  };

  // получаем платфомры для фильтрации
  useEffect(() => {
    async function loadPlatforms() {
      const data = await fetchPlatforms();
      setPlatforms(data);
    }
    loadPlatforms();
  }, []);

  // 🔁 Получаем список игр при первом рендере или смене фильтра
  useEffect(() => {
    async function getGames() {
      try {
        setLoading(true);
        setError(false);

        const query = filters.platformId
          ? `platforms=${filters.platformId}`
          : '';
        const { results, next } = await fetchGames(query);

        setGameItems(results);
        setNextPage(next);
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    getGames();
  }, [filters]);

  // 💾 Сохраняем фильтр
  useEffect(() => {
    localStorage.setItem('game-filters', JSON.stringify(filters));
  }, [filters]);

  const handlePlatformChange = (platformId) => {
    setFilters({ platformId });
  };

  // 🔄 Загрузка следующей страницы (для текущей платформы)
  const loadMoreGames = useCallback(async () => {
    if (!nextPage || loading) return;

    try {
      setLoading(true);

      const relativeUrl = nextPage.startsWith('http')
        ? nextPage.replace('https://api.rawg.io/api/games?', '')
        : nextPage;

      const { results, next } = await fetchGames(relativeUrl);

      setGameItems((prev) => [
        ...prev,
        ...results.filter(
          (game) => !prev.some((prevGame) => prevGame.id === game.id)
        )
      ]);

      setNextPage(next);
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [nextPage, loading]);

  // 🔍 Следим за последним элементом
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
      <PlatformFilter
        selected={filters.platformId}
        onChange={handlePlatformChange}
        platforms={platforms}
      />

      {/* <div>
        <select name="" id="">
          <option value="relevance">Relevance</option>
          <option value="date_added">Date added</option>
          <option value="name">Name</option>
          <option value="release_date">Release date</option>
          <option value="popularity">Popularity</option>
          <option value="average_rating">Average rating</option>
        </select>
      </div> */}

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
