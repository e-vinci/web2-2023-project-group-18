import GamePage from '../Pages/GamePage';
import HomePage from '../Pages/HomePage';
import NewPage from '../Pages/NewPage';
import SettingsPage from '../Pages/SettingsPage'

const routes = {
  '/': HomePage,
  '/game': GamePage,
  '/new': NewPage,
  '/settings' : SettingsPage
};

export default routes;
