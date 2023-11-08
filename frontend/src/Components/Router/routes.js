import GamePage from '../Pages/GamePage';
import HomePage from '../Pages/HomePage';
import Leaderboard from '../Pages/LeaderboardPage';
import NewPage from '../Pages/NewPage';

const routes = {
  '/': HomePage,
  '/game': GamePage,
  '/leaderboard': Leaderboard,
  '/new': NewPage,
};

export default routes;
