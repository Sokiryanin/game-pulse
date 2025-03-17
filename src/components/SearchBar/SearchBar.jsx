import React from 'react';
import { InputWrapper, SearchIcon, StyledSearchBar } from './StyledSearchBar';

export const SearchBar = () => {
  return (
    <InputWrapper>
      <StyledSearchBar type="text" placeholder="Serch games" />
      <SearchIcon />
    </InputWrapper>
  );
};
