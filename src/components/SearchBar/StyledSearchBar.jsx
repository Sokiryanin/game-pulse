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

export const ClearButton = styled.button`
  position: absolute;
  padding: 6px;
  border-radius: 50px;
  right: 18px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 24px;
  color: black;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: gray;
  }
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

export const SearchResultsWrapper = styled.div`
  position: absolute;
  top: 65px;
  left: 0;
  width: 100%;

  background: #111;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  color: white;
  max-height: 700px;
  overflow-y: auto;
  z-index: 1000;

  h3 {
    font-size: 18px;
    margin-bottom: 10px;
  }
`;

export const SearchItem = styled.li`
  display: flex;
  align-items: center;
  padding: 8px;
  cursor: pointer;
  transition: background 0.2s;
  border-radius: 4px;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  img {
    width: 40px;
    height: 40px;
    border-radius: 4px;
    margin-right: 10px;
  }

  span {
    font-size: 16px;
  }
`;

export const LoadMoreButton = styled.button`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  background: #222;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.2s ease-in-out;

  &:hover {
    background: #444;
  }
`;
