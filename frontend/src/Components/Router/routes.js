import GamePage from '../Pages/GamePage';
import HomePage from '../Pages/HomePage';
import NewPage from '../Pages/NewPage';
import LoginPage from '../Pages/LoginPage';

const routes = {
  '/': HomePage,
  '/login':LoginPage,
  '/game': GamePage,
  '/new': NewPage,
};

export default routes;
