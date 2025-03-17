import React from 'react';
import { StyledGameList } from './GameList.styled';
import { GameCard } from '../GameCard/GameCard';

export const GameList = ({ items }) => {
  if (!Array.isArray(items)) {
    console.error('GameList: items не массив!', items);
    return null;
  }

  return (
    <StyledGameList>
      {items.map((item) => (
        <li key={item.id}>
          <GameCard game={item} />
        </li>
      ))}
    </StyledGameList>
  );
};
