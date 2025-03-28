import React from 'react';
// import { useFilters } from '../../hooks/useFilters';

export const PlatformFilter = () => {
  // const { filters, updateFilter, platforms } = useFilters();

  const handleChange = (e) => {
    // const selelectedOption = e.target.selectedOptions[0];
    // const value = selelectedOption.value;
    // const name = selelectedOption.textContent;
    // updateFilter('platformId', value);
    // updateFilter('platformName', name);
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <select value={filters.platformId} onChange={handleChange}>
        <option value="">All platforms</option>
        {platforms.map((group) => (
          <optgroup key={group.id} label={group.name}>
            {/* Опция Select all для всей группы */}
            {group.platforms.length > 1 && (
              <option value={group.platforms.map((p) => p.id).join(',')}>
                All {group.name}
              </option>
            )}

            {/* Субплатформы */}
            {group.platforms.map((sub) => (
              <option key={sub.id} value={sub.id}>
                {sub.name}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    </div>
  );
};
