import React from 'react';
import { StyledGameList } from './GameList.styled';
import { GameCard } from '../GameCard/GameCard';
// import { GameCard } from '../GameCard/GameCard';

export const GameList = ({ items }) => {
  console.log(items);
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
