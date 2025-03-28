import { PacmanLoader } from 'react-spinners';
import { GameList } from '../../components/GameList/GameList';
// import { PlatformFilter } from '../../components/PlatformFilter/PlatformFilter';
import { useState, useRef, useCallback, useEffect } from 'react';
import { fetchGames } from '../../api';

const AllGamePage = () => {
  const [games, setGames] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const observer = useRef();

  useEffect(() => {
    async function loadInitial() {
      try {
        setLoading(true);
        setError(false);
        const { results, next } = await fetchGames();
        setGames(results);
        setNextPage(next);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    loadInitial();
  }, []);

  // Загружаем следующую страницу
  const loadMore = useCallback(async () => {
    if (!nextPage || loading) return;

    try {
      setLoading(true);
      const relativeUrl = nextPage.startsWith('http')
        ? nextPage.replace('https://api.rawg.io/api/games?', '')
        : nextPage;

      const { results, next } = await fetchGames(relativeUrl);

      setGames((prev) => [
        ...prev,
        ...results.filter(
          (item) => !prev.some((existing) => existing.id === item.id)
        )
      ]);

      setNextPage(next);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [nextPage, loading]);

  // Возвращаем реф для последнего элемента
  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && nextPage) {
          loadMore();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, nextPage, loadMore]
  );

  return (
    <>
      <h3>All games</h3>

      {/* <PlatformFilter /> */}

      <GameList items={games} lastElementRef={lastElementRef} />

      {loading && <PacmanLoader color="gray" />}
      {error && !loading && <div>OOPS! THERE WAS AN ERROR!</div>}
    </>
  );
};

export default AllGamePage;
