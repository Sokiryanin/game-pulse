import { useParams } from 'react-router-dom';
import { useState, useEffect, useRef, useCallback } from 'react';
import { fetchGames, fetchPlatforms } from '../../api';
import { GameList } from '../../components/GameList/GameList';
import { PacmanLoader } from 'react-spinners';
import { PlatformFilter } from '../../components/PlatformFilter/PlatformFilter';

const AllGamePage = () => {
  const { platformSlug } = useParams();
  const [games, setGames] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [platforms, setPlatforms] = useState([]);
  const observer = useRef();

  useEffect(() => {
    async function loadPlatforms() {
      const data = await fetchPlatforms();
      setPlatforms(data);
    }
    loadPlatforms();
  }, []);

  // Получаем ID и тип платформы
  const platformData = (() => {
    for (let group of platforms) {
      if (group.slug === platformSlug) {
        return { id: group.id, name: group.name, isParent: true };
      }
      const sub = group.platforms.find((p) => p.slug === platformSlug);
      if (sub) return { id: sub.id, name: sub.name, isParent: false };
    }
    return null;
  })();

  const query = platformData
    ? platformData.isParent
      ? `parent_platforms=${platformData.id}`
      : `platforms=${platformData.id}`
    : '';

  useEffect(() => {
    async function loadInitial() {
      try {
        setLoading(true);
        setError(false);
        const { results, next } = await fetchGames(query);
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
  }, [query]);

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
        ...results.filter((item) => !prev.some((g) => g.id === item.id))
      ]);

      setNextPage(next);
    } catch (err) {
      console.error(err);
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
          loadMore();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, nextPage, loadMore]
  );

  const platformName = platformData?.name || null;

  return (
    <>
      <h3>{platformName ? `Games for ${platformName}` : 'All Games'}</h3>

      <PlatformFilter selectedPlatform={platformSlug} />

      <GameList items={games} lastElementRef={lastElementRef} />

      {loading && <PacmanLoader color="gray" />}
      {error && !loading && <div>OOPS! THERE WAS AN ERROR!</div>}
    </>
  );
};

export default AllGamePage;
