import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchGames } from '../api';

export const useInfiniteScroll = (filtersQuery) => {
  const [items, setItems] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const observer = useRef();

  // Загружаем первую страницу (или фильтрованные данные)
  useEffect(() => {
    async function loadInitial() {
      try {
        setLoading(true);
        setError(false);
        const { results, next } = await fetchGames(filtersQuery);
        setItems(results);
        setNextPage(next);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadInitial();
  }, [filtersQuery]);

  // Загружаем следующую страницу
  const loadMore = useCallback(async () => {
    if (!nextPage || loading) return;

    try {
      setLoading(true);
      const relativeUrl = nextPage.startsWith('http')
        ? nextPage.replace('https://api.rawg.io/api/games?', '')
        : nextPage;

      const { results, next } = await fetchGames(relativeUrl);

      setItems((prev) => [
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

  return {
    items,
    loading,
    error,
    lastElementRef
  };
};
