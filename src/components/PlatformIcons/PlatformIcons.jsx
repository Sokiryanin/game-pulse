import React from 'react';
import { platformIcons } from '../../utils/platformIcons';

export const PlatformIcons = ({ platforms }) => {
  if (!Array.isArray(platforms)) return null; // 👈 Защита от null/undefined

  const shownIcons = new Set();

  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      {platformIcons.map(({ keyword, icon: Icon }) => {
        const match = platforms.some(({ platform }) =>
          platform.slug.includes(keyword)
        );

        if (match && !shownIcons.has(keyword)) {
          shownIcons.add(keyword);
          const IconComponent = Icon; // теперь VSCode видит, что Icon используется
          return <IconComponent key={keyword} size={20} title={keyword} />;
        }

        return null;
      })}
    </div>
  );
};
