import GamePage from '../Pages/GamePage';
import HomePage from '../Pages/HomePage';
import NewPage from '../Pages/NewPage';
import LoginPage from '../Pages/LoginPage';
import RegisterPage from '../Pages/RegisterPage';

const routes = {
  '/': HomePage,
  '/register': RegisterPage,
  '/login':LoginPage,
  '/game': GamePage,
  '/new': NewPage,
};

export default routes;
