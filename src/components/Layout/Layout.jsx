import { Outlet, NavLink } from 'react-router-dom';
import { Header } from '../Header/Header';
import { StyledContainer } from '../Container/Container.styled';
import {
  AsideContainer,
  ContentWrapper,
  MainContainer,
  StyledAside
} from '../MainContentWrapper/MainContentWrapper.styled';

const Layout = () => {
  const styles = {
    container: {
      marginBottom: '14px',
      fontSize: '24px'
    }
  };

  return (
    <StyledContainer>
      <Header />
      <MainContainer>
        <AsideContainer>
          <StyledAside>
            <nav>
              <div style={styles.container}>
                <NavLink to="/" end>
                  <h3>Home</h3>
                </NavLink>
              </div>

              <div style={styles.container}>
                <h3>New Releases</h3>
                <ul>
                  <li>
                    <NavLink to="/releases/last-30-days">
                      <span>+</span>
                      <span>Last 30 days</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/releases/this-week">
                      <span>+</span>
                      <span>This week</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/releases/next-week">
                      <span>+</span>
                      <span>Next week</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/releases/calendar">
                      <span>31</span>
                      <span>Release calendar</span>
                    </NavLink>
                  </li>
                </ul>
              </div>
              <div style={styles.container}>
                <NavLink to="/games">
                  <h3>All games</h3>
                </NavLink>
              </div>
            </nav>
          </StyledAside>
        </AsideContainer>

        <ContentWrapper>
          <Outlet />
        </ContentWrapper>
      </MainContainer>
    </StyledContainer>
  );
};

export default Layout;
