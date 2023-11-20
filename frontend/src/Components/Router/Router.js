import { removePathPrefix, usePathPrefix } from '../../utils/path-prefix';
// eslint-disable-next-line import/no-cycle
import routes from './routes';

const Router = () => {
  onFrontendLoad();
  onNavBarClick();
  onHistoryChange();
};

function onNavBarClick() {
  const navbarWrapper = document.querySelector('#navbarWrapper');

  navbarWrapper.addEventListener('click', (e) => {
    e.preventDefault();
    const navBarItemClicked = e.target;
    const uri = navBarItemClicked?.dataset?.uri;
    if (uri) {
      const componentToRender = routes[uri];
      if (!componentToRender) throw Error(`The ${uri} ressource does not exist.`);

      componentToRender();
      window.history.pushState({}, '', usePathPrefix(uri));
    }
  });
}

function onHistoryChange() {
  window.addEventListener('popstate', () => {
    const uri = removePathPrefix(window.location.pathname);
    const componentToRender = routes[uri];
    componentToRender();
  });
}

function onFrontendLoad() {
  window.addEventListener('load', () => {
    const uri = removePathPrefix(window.location.pathname);
    const componentToRender = routes[uri];
    if (!componentToRender) throw Error(`The ${uri} ressource does not exist.`);

    componentToRender();
  });
}  

export const navigateToHomePage = () => {
  const homeComponent = routes['/'];
  if (!homeComponent) throw Error(`The home ressource does not exist.`);
    homeComponent();
  window.history.pushState({}, '', usePathPrefix('/'));
};

export default Router;
