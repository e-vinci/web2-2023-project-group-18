import Navigate from "../Router/Navigate";

const LogoutPage = () => { 
    if (localStorage.getItem('token') == null) {
      Navigate('/');
      return;
  }
  localStorage.clear();
   Navigate('/')
};

export default LogoutPage;