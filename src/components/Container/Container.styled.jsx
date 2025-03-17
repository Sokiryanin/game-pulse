import styled from 'styled-components';

export const StyledContainer = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding-left: 15px;
  padding-right: 15px;
  max-width: 1920px;
  margin: 0 auto;

  @supports (overflow: clip) {
    overflow: clip;
  }

  // Притискаємо footer
  > main {
    flex: 1 1 auto;
  }

  // Фікс для слайдерів
  > * {
    min-width: 0;
  }
`;
