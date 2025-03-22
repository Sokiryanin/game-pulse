import React from 'react';

export const PlatformFilter = ({ selected, onChange, platforms }) => {
  const handleChange = (e) => {
    const value = e.target.value;
    onChange(value); // передаём выбранный ID или '' (All)
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <select value={selected} onChange={handleChange}>
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
