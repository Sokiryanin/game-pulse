import React from 'react';
import { HeaderContainer, StyledHeader } from './Header.styled';
import { SearchBar } from '../SearchBar/SearchBar';

export const Header = () => {
  return (
    <StyledHeader>
      <HeaderContainer>
        <a href="#">Logo</a>
        <SearchBar />
        <div>
          <a href="#">LOG IN</a>
        </div>
        <div>
          <a href="#">SIGN UP</a>
        </div>
        <div>...</div>
      </HeaderContainer>
    </StyledHeader>
  );
};
