import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage/HomePage';
import AllGamePage from './pages/AllGamePage/AllGamePage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import GamePage from './pages/GamePage/GamePage';
import SearchResultsPage from './pages/SearchResultPage/SearchResultPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />

        {/* Страница всех игр */}
        <Route path="games" element={<AllGamePage />} />

        {/* Страница фильтра по платформам */}
        <Route path="games/platform/:platformSlug" element={<AllGamePage />} />

        {/* Страница одной игры */}
        <Route path="games/:slug" element={<GamePage />} />

        {/* Поиск */}
        <Route path="search" element={<SearchResultsPage />} />

        {/* Фолбэк */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
