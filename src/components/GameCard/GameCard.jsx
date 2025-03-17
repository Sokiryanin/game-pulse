import React from 'react';
import { CardWrapper, GameTitle, ImgWrap } from './GameCard.styled';
import { PlatformIcons } from '../PlatformIcons/PlatformIcons';

export const GameCard = ({
  game: { name, slug, background_image, platforms }
}) => {
  return (
    <CardWrapper>
      <ImgWrap>
        <img src={background_image} alt={slug} />
      </ImgWrap>
      <PlatformIcons platforms={platforms} />
      <GameTitle>{name}</GameTitle>
    </CardWrapper>
  );
};
