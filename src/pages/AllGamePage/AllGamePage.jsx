import React, { useCallback, useEffect, useRef, useState } from 'react';
import { fetchGames, fetchPlatforms } from '../../api';
import { GameList } from '../../components/GameList/GameList';
import { PacmanLoader } from 'react-spinners';
import { PlatformFilter } from '../../components/PlatformFilter/PlatformFilter';

const getInitialFilters = () => {
  const saved = localStorage.getItem('game-filters');
  return saved
    ? JSON.parse(saved)
    : { platformId: '', platformName: 'All Platforms' };
};

const AllGamePage = () => {
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

  useEffect(() => {
    async function loadPlatforms() {
      const data = await fetchPlatforms();
      setPlatforms(data);
    }
    loadPlatforms();
  }, []);

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

  useEffect(() => {
    localStorage.setItem('game-filters', JSON.stringify(filters));
  }, [filters]);

  useEffect(() => {
    document.title =
      filters.platformName === 'All Platforms'
        ? 'All Games'
        : `Games - ${filters.platformName}`;
  }, [filters.platformName]);

  const handlePlatformChange = (platformId, platformName = 'All Platforms') => {
    setFilters({ platformId, platformName });
  };

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
        <h3>
          {filters.platformName === 'All platforms'
            ? 'All Games'
            : `Games for ${filters.platformName}`}
        </h3>
      </div>

      <PlatformFilter
        selected={filters.platformId}
        onChange={handlePlatformChange}
        platforms={platforms}
      />

      <div>
        <GameList items={gameItems} lastElementRef={lastElementRef} />
        {loading && <PacmanLoader color={'gray'} />}
        {error && !loading && <div>OOPS! THERE WAS AN ERROR!</div>}
      </div>
    </>
  );
};

export default AllGamePage;
