// ✅ FiltersContext.jsx
import React, { createContext, useEffect, useState } from 'react';
import { fetchPlatforms } from '../api';

export const FiltersContext = createContext(); // 👈 здесь должно быть FiltersContext

const getInitialFilters = () => {
  const saved = localStorage.getItem('game-filters');
  return saved
    ? JSON.parse(saved)
    : {
        platformId: '',
        platformName: 'All Platforms',
        order: '',
        dates: '',
        tags: ''
      };
};

export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState(getInitialFilters);
  const [platforms, setPlatforms] = useState([]);

  useEffect(() => {
    async function loadPlatforms() {
      const data = await fetchPlatforms();
      setPlatforms(data);
    }
    loadPlatforms();
  }, []);

  useEffect(() => {
    localStorage.setItem('game-filters', JSON.stringify(filters));
  }, [filters]);

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters(getInitialFilters());
  };

  return (
    <FiltersContext.Provider
      value={{ filters, platforms, updateFilter, resetFilters }} // ✅ здесь было FilterContext, нужно FiltersContext
    >
      {children}
    </FiltersContext.Provider>
  );
};
