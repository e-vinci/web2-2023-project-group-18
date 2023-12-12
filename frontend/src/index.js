import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/main.css';



import Router from './Components/Router/Router';


document.addEventListener('DOMContentLoaded', () => {
    const loaderWrapper = document.getElementById('loader-wrapper');
    loaderWrapper.style.display = 'none';
  });
  

Router();

