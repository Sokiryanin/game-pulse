import { FaSearch } from 'react-icons/fa';
import styled from 'styled-components';

export const SearchIcon = styled(FaSearch)`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 18px;
  color: gray;
  pointer-events: none; /* Иконка не мешает вводу текста */
  transition: color 0.3s ease;
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;

  &:focus-within ${SearchIcon}, &:hover ${SearchIcon} {
    color: black;
  }
`;

export const StyledSearchBar = styled.input`
  width: 100%;
  border-radius: 50px;
  outline: none;
  transition: all 0.3s ease;
  padding: 14px 38px;
  background-color: hsla(0, 0%, 100%, 0.16);
  &::placeholder {
    color: gray;
  }

  &:focus {
    background-color: white;
    color: black;
    &::placeholder {
      color: black;
    }
  }

  &:hover {
    background-color: white;

    &::placeholder {
      color: black;
    }
  }
`;
