import { PacmanLoader } from 'react-spinners';
import { GameList } from '../../components/GameList/GameList';
import { PlatformFilter } from '../../components/PlatformFilter/PlatformFilter';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { useFilters } from '../../hooks/useFilters';

const AllGamePage = () => {
  const { filters } = useFilters();

  const query = filters.platformId ? `platforms=${filters.platformId}` : '';

  const {
    items: gameItems,
    loading,
    error,
    lastElementRef
  } = useInfiniteScroll(query);

  return (
    <>
      <h3>
        {filters.platformName === 'All Platforms'
          ? 'All Games'
          : `Games for ${filters.platformName}`}
      </h3>

      <PlatformFilter />

      <GameList items={gameItems} lastElementRef={lastElementRef} />

      {loading && <PacmanLoader color="gray" />}
      {error && !loading && <div>OOPS! THERE WAS AN ERROR!</div>}
    </>
  );
};

export default AllGamePage;
