import GamePage from '../Pages/GamePage';
import HomePage from '../Pages/HomePage';
import Leaderboard from '../Pages/LeaderboardPage';
import LoginPage from '../Pages/LoginPage';
import RegisterPage from '../Pages/RegisterPage';
import CreditsPage from '../Pages/CreditsPage'
import PrivatePolicyPage from '../Pages/PrivatePolicyPage';


const routes = {
  '/': HomePage,
  '/credits' : CreditsPage,
  '/register': RegisterPage,
  '/login':LoginPage,
  '/game': GamePage,
  '/leaderboard': Leaderboard,
  '/private-policy':PrivatePolicyPage,
};

export default routes;
