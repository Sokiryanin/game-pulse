import { AllGamePage } from '../../pages/AllGamesPage/AllGamePage';
import {
  AsideContainer,
  ContentWrapper,
  MainContainer,
  StyledAside
} from './MainContentWrapper.styled';

export const MainContentWrapper = () => {
  const styles = {
    container: {
      marginBottom: '14px',
      fontSize: '24px'
    }
  };

  return (
    <MainContainer>
      <AsideContainer>
        <StyledAside>
          <nav>
            <div style={styles.container}>
              <a href="#">
                <span>Home</span>
              </a>
            </div>
            <div style={styles.container}>
              <a href="#">
                <span>Reviews</span>
              </a>
            </div>
            <div style={styles.container}>
              <a href="#" style={styles.container}>
                <span>New Releases</span>
              </a>
              <ul>
                <li>
                  <a href="#">
                    <span>+</span>
                    <span>Last 30 days</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span>+</span>
                    <span>This week</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span>+</span>
                    <span>Next week</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span>31</span>
                    <span>Release calendar</span>
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </StyledAside>
      </AsideContainer>

      <ContentWrapper>
        <AllGamePage />
      </ContentWrapper>
    </MainContainer>
  );
};
