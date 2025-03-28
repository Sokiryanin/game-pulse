import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchGames } from '../../api';
import { GameList } from '../../components/GameList/GameList';
import { PacmanLoader } from 'react-spinners';

const SearchResultsPage = () => {
  const [games, setGames] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const observer = useRef();

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') ?? '';

  // 🔁 Первый fetch при монтировании или изменении search
  useEffect(() => {
    async function loadInitial() {
      try {
        setLoading(true);
        setError(false);
        const { results, next } = await fetchGames(`search=${searchQuery}`);
        setGames(results);
        setNextPage(next);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    if (searchQuery) loadInitial();
  }, [searchQuery]);

  // 🔄 Загрузка следующей страницы (в том числе по search)
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
        ...results.filter((item) => !prev.some((g) => g.id === item.id)) // 💥 убираем дубликаты
      ]);
      setNextPage(next);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [nextPage, loading]);

  // 👀 Следим за последним элементом
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
      <h3>Search Results for: "{searchQuery}"</h3>

      <GameList items={games} lastElementRef={lastElementRef} />

      {loading && <PacmanLoader color="gray" />}
      {error && !loading && <div>OOPS! THERE WAS AN ERROR!</div>}
    </>
  );
};

export default SearchResultsPage;
