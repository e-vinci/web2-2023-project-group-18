import GamePage from '../Pages/GamePage';
import HomePage from '../Pages/HomePage';
import ShopPage from '../Pages/ShopPage';

import Leaderboard from '../Pages/LeaderboardPage';
import LoginPage from '../Pages/LoginPage';
import RegisterPage from '../Pages/RegisterPage';
import CreditsPage from '../Pages/CreditsPage'
import PrivatePolicyPage from '../Pages/PrivatePolicyPage';
import CookiesPolicyPage from '../Pages/CookiesPolicyPage';


const routes = {
  '/': HomePage,
  '/credits' : CreditsPage,
  '/register': RegisterPage,
  '/login':LoginPage,
  '/game': GamePage,
  '/shop' : ShopPage,
  '/leaderboard': Leaderboard,
  '/private-policy': PrivatePolicyPage,
  '/cookies-policy': CookiesPolicyPage,
};

export default routes;
