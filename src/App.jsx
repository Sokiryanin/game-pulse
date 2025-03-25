import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage/HomePage';
import AllGamePage from './pages/AllGamePage/AllGamePage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import GamePage from './pages/GamePage/GamePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="games" element={<AllGamePage />} />
        <Route path="games/:slug" element={<GamePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
