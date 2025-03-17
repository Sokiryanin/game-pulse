import styled from 'styled-components';

export const MainContainer = styled.main`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 20px;
`;

export const AsideContainer = styled.div`
  position: sticky;
  top: 0;
`;

export const StyledAside = styled.aside`
  display: block;
  width: 200px;
  padding-top: 40px;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
