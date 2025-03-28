import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  display: inline-block;
  margin-bottom: 20px;
`;

export const Button = styled.button`
  width: 180px;
  height: 100%;
  background-color: ${(props) => (props.selected ? '#fff' : '#1f1f1f')};
  color: ${(props) => (props.selected ? '#000' : '#fff')};
  border: none;
  border-radius: 6px;
  padding: 8px 12px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Menu = styled.ul`
  position: absolute;
  top: 110%;
  left: 0;
  background: white;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 200px;
  z-index: 10;
`;

export const MenuItem = styled.li`
  color: black;
  color: black;
  padding: 8px 12px;
  cursor: pointer;
  background: ${(props) => (props.active ? '#f0f0f0' : 'white')};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  &:hover {
    background: #efefef;
  }

  /* Добавим радиус первому и последнему элементу */
  &:first-child {
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
  }

  &:last-child {
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
  }
`;

export const SubMenu = styled.ul`
  position: absolute;
  top: 0;
  left: 100%;
  background: white;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 180px;
  z-index: 11;
`;
