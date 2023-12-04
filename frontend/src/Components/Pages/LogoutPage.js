import Navigate from "../Router/Navigate";

const LogoutPage = () => { 
   localStorage.removeItem('username')
   localStorage.removeItem('token')
   Navigate('/')
};

export default LogoutPage;