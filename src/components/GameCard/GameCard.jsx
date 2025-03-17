import React from 'react';
import { CardWrapper, GameTitle, ImgWrap } from './GameCard.styled';

export const GameCard = ({ game: { name, slug, background_image } }) => {
  return (
    <CardWrapper>
      <ImgWrap>
        <img src={background_image} alt={slug} />
      </ImgWrap>
      <div>платформы</div>
      <GameTitle>{name}</GameTitle>
    </CardWrapper>
  );
};
