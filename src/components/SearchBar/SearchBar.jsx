import React, { useEffect, useRef, useState } from 'react';
import {
  ClearButton,
  InputWrapper,
  LoadMoreButton,
  SearchIcon,
  SearchItem,
  SearchResultsWrapper,
  StyledSearchBar
} from './StyledSearchBar';
import { fetchGames, searchGames } from '../../api';

export const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [totalGames, setTotalGames] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [searchCount, setSearchCount] = useState(0);
  const searchRef = useRef(null);

  // Отримаємо кількість ігор
  useEffect(() => {
    async function getTotalGames() {
      try {
        const { count } = await fetchGames();
        setTotalGames(count);
      } catch (error) {
        console.error('error:', error);
      }
    }
    getTotalGames();
  }, []);

  // Обработка ввода текста в поле поиска
  const handleChange = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim().length > 1) {
      try {
        const { results, next, count } = await searchGames(value);
        setSearchResults(results);
        setSearchCount(count); // Устанавливаем количество найденных игр
        setNextPage(next); // Сохраняем ссылку на следующую страницу
        setIsOpen(results.length > 0);
      } catch (error) {
        console.error('Ошибка поиска:', error);
        setSearchResults([]);
        setSearchCount(0);
        setNextPage(null);
        setIsOpen(false);
      }
    } else {
      setSearchResults([]);
      setSearchCount(0);
      setNextPage(null);
      setIsOpen(false);
    }
  };

  // Закрытие выпадающего списка при клике вне области поиска
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Загрузка еще 20 игр при нажатии на кнопку "Показать еще"
  const handleLoadMore = async () => {
    if (!nextPage) return;

    try {
      const { results, next } = await searchGames(
        query,
        nextPage.split('page=')[1].split('&')[0]
      );
      setSearchResults((prev) => [...prev, ...results]);
      setNextPage(next);
    } catch (error) {
      console.error('Ошибка загрузки следующих игр:', error);
    }
  };

  // Очистка поля поиска
  const clearSearch = () => {
    setQuery('');
    setSearchResults([]);
    setSearchCount(0);
    setNextPage(null);
    setIsOpen(false);
  };

  return (
    <>
      <InputWrapper ref={searchRef}>
        <StyledSearchBar
          type="text"
          placeholder={
            totalGames ? `Search ${totalGames} games` : 'Search games...'
          }
          value={query}
          onChange={handleChange}
        />
        <SearchIcon />
        {query && <ClearButton onClick={clearSearch}>x</ClearButton>}

        {isOpen && (
          <SearchResultsWrapper>
            <h3>Games: {searchCount}</h3>
            <ul>
              {searchResults.map((game) => (
                <SearchItem key={game.id}>
                  <img src={game.background_image} alt={game.name} />
                  <span>{game.name}</span>
                </SearchItem>
              ))}
            </ul>

            {nextPage && (
              <LoadMoreButton onClick={handleLoadMore}>
                Show more games
              </LoadMoreButton>
            )}
          </SearchResultsWrapper>
        )}
      </InputWrapper>
    </>
  );
};
