import React from 'react';
import { platformIcons } from '../../utils/platformIcons';

export const PlatformIcons = ({ platforms }) => {
  const shownIcons = new Set(); // Храним уже добавленные платформы

  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      {platformIcons.map(({ keyword, icon: Icon }) =>
        platforms.some(({ platform }) => platform.slug.includes(keyword)) &&
        !shownIcons.has(keyword)
          ? (shownIcons.add(keyword),
            (<Icon key={keyword} size={20} title={keyword} />))
          : null
      )}
    </div>
  );
};
