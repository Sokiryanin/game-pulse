import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ClearButton,
  InputWrapper,
  SearchIcon,
  SearchItem,
  SearchResultsWrapper,
  StyledSearchBar,
  LoadMoreButton
} from './StyledSearchBar';
import { fetchGames } from '../../api';
import { useDebounce } from '../../hooks/useDebounce';

export const SearchBar = () => {
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();
  const debouncedSearch = useDebounce(input, 500);

  // 🔍 Поиск по debounce-значению
  useEffect(() => {
    if (debouncedSearch.trim().length < 2) {
      setResults([]);
      return;
    }

    async function fetchSuggestions() {
      try {
        const { results, next } = await fetchGames(`search=${debouncedSearch}`);
        setResults(results);
        setNextPage(next);
      } catch (err) {
        console.error(err);
        setResults([]);
      }
    }

    fetchSuggestions();
  }, [debouncedSearch]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
    setShowDropdown(true);
  };

  const handleSelectGame = (slug) => {
    navigate(`/games/${slug}`);
    setInput('');
    setResults([]);
    setShowDropdown(false);
  };

  const handleLoadMore = async () => {
    if (!nextPage) return;

    const relativeUrl = nextPage.replace('https://api.rawg.io/api/games?', '');
    const { results: moreResults, next } = await fetchGames(relativeUrl);

    setResults((prev) => [
      ...prev,
      ...moreResults.filter((r) => !prev.some((g) => g.id === r.id))
    ]);
    setNextPage(next);
  };

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter') {
      navigate(`/search?search=${input}`);
      setShowDropdown(false);
    }
  };

  return (
    <InputWrapper>
      <StyledSearchBar
        type="text"
        placeholder="Search games..."
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleSearchSubmit}
        onFocus={() => setShowDropdown(true)}
      />
      <SearchIcon />
      {input && <ClearButton onClick={() => setInput('')}>x</ClearButton>}

      {showDropdown && results.length > 0 && (
        <SearchResultsWrapper>
          {results.map((game) => (
            <SearchItem
              key={game.id}
              onClick={() => handleSelectGame(game.slug)}
            >
              {game.name}
            </SearchItem>
          ))}
          {nextPage && (
            <LoadMoreButton onClick={handleLoadMore}>Load more</LoadMoreButton>
          )}
        </SearchResultsWrapper>
      )}
    </InputWrapper>
  );
};
