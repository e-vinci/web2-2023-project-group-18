import Navigate from "../Router/Navigate";
import { clearPage } from '../../utils/render';

const LogoutPage = () => { 
  clearPage();
  if (localStorage.getItem('token') == null) {
      Navigate('/');
      return;
  }
  localStorage.clear();
   Navigate('/')
};

export default LogoutPage;