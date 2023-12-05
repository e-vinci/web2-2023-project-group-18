import Navigate from "../Router/Navigate";

const LogoutPage = () => { 
   localStorage.removeItem('user')
   localStorage.removeItem('token')
   Navigate('/')
};

export default LogoutPage;