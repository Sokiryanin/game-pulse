import React, { useEffect, useState } from 'react';
import {
  AsideContainer,
  ContentWrapper,
  MainContainer,
  StyledAside
} from './MainContentWrapper.styled';

import { fetchGames } from '../../api.js';

import { GameList } from '../GameList/GameList.jsx';

export const MainContentWrapper = () => {
  const [gameItems, setGameItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  //   const [orderFilter, setOrderFilter] = useState({
  //     orderBy: 'Relevance',
  //     SiPlatform: 'PC'
  //   });

  useEffect(() => {
    async function getGames() {
      try {
        setLoading(true);
        setError(false);
        const games = await fetchGames();
        setGameItems(games);
        console.log(games);
      } catch (error) {
        setError(true);
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getGames();
  }, []);

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
      {/* Page Home */}
      <ContentWrapper>
        <div style={styles.container}>
          <h3>New and trending</h3>
          <p>Based on player counts and release date</p>
        </div>

        <div>
          <select name="" id="">
            <option value="">Relevance</option>
            <option value="">Date added</option>
            <option value="">Name</option>
            <option value="">Release date</option>
            <option value="">Popularity</option>
            <option value="">Average rating</option>
          </select>
        </div>

        <div>
          {loading && <div>LOADING...</div>}
          {error && !loading && <div>OOPS! THERE WAS AN ERROR!</div>}
          <GameList items={gameItems} />
        </div>
      </ContentWrapper>
    </MainContainer>
  );
};
