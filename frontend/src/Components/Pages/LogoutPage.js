import Navigate from "../Router/Navigate";

const LogoutPage = () => { 
    if (localStorage.getItem('token') == null) {
      Navigate('/');
      return;
    }
   localStorage.removeItem('user')
   localStorage.removeItem('token')
   Navigate('/')
};

export default LogoutPage;