import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchGameBySlug } from '../../api';
import { PacmanLoader } from 'react-spinners';
import { BackgroundImageWrapper } from './StyledGamePage.styled';

export default function GamePage() {
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const params = useParams();

  useEffect(() => {
    async function fetchGame() {
      try {
        setLoading(true);
        setError(false);
        const fetchedGame = await fetchGameBySlug(params.slug);
        setGame(fetchedGame);
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchGame();
  }, [params.slug]);

  return (
    <>
      {game?.background_image && (
        <BackgroundImageWrapper image={game.background_image} />
      )}

      <div style={{ position: 'relative', zIndex: 1 }}>
        {game && <h1>{game.name}</h1>}
        {game && <p>{game.description_raw}</p>}

        {loading && <PacmanLoader color="gray" />}
        {error && !loading && <div>OOPS! THERE WAS AN ERROR!</div>}
      </div>
    </>
  );
}
