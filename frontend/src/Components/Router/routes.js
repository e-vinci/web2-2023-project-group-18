import GamePage from '../Pages/GamePage';
import HomePage from '../Pages/HomePage';
import Leaderboard from '../Pages/LeaderboardPage';
import LoginPage from '../Pages/LoginPage';
import RegisterPage from '../Pages/RegisterPage';


const routes = {
  '/': HomePage,
  '/register': RegisterPage,
  '/login':LoginPage,
  '/game': GamePage,
  '/leaderboard': Leaderboard
};

export default routes;
