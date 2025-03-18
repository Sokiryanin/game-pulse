import React from 'react';
import { StyledGameList } from './GameList.styled';
import { GameCard } from '../GameCard/GameCard';

export const GameList = ({ items, lastElementRef }) => {
  if (!Array.isArray(items)) {
    console.error('GameList: items не массив!', items);
    return null;
  }

  return (
    <StyledGameList>
      {items.map((item, index) => (
        <li
          key={item.id}
          ref={index === items.length - 1 ? lastElementRef : null}
        >
          <GameCard game={item} />
        </li>
      ))}
    </StyledGameList>
  );
};
