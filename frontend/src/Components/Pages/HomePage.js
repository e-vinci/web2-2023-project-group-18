
// import anime from 'animejs/lib/anime.es';

import Navigate from '../Router/Navigate';

const HomePage = () => {
  const main = document.querySelector('main');

  const mainHTML = `
  <div class="screen">
      <i class=" afs fa-volume-mute fa-2x" id="sound"></i>

      <img class="imgSki"></img>
    
    <div class= "menu">
        <h1>SantaFall</h1>
        <h2>Let us slide</h2>
        <ul>
      <li><a class="nav-link" href="#" data-uri="/game">Play</a></li>
      <li><a class="nav-link" href="#" data-uri="/leaderboard">LeaderBoard</a></li>
      
      <li id="linkConnect1"></li>
      <li id="linkConnect2"></li>

      <li  id="linkNotConnect1"></li>
      <li  id="linkNotConnect2"></li>

      
      <li><a class="nav-link" href="#" data-uri="/credits">Credits</a></li>
        </ul>
    </div>
  </div>

   <div id="cookies">
      <div class= "container">
        <div class="subcontainer">
          <div class="cookies">
            <p>
              This app uses cookies to ensure you get the best experience on your website. 
              <a class="nav-link" href="#" data-uri = "/cookies-policy" >More info.</a>
              <button id="cookies-btn">That's fine !</button>
            </p>
          </div>
        </div>
      </div>
     </div>
`;

  main.innerHTML = mainHTML;
  isConnected(false);
  linkClick();
  // animeLinks();
   cookie();
};

function isConnected(params) {
  if (params === false) {
    document.querySelector(
      '#linkNotConnect1',
    ).innerHTML = `<a class="nav-link" href="#" data-uri="/login">Login</a>`;

    document.querySelector(
      '#linkNotConnect2',
    ).innerHTML = `<a class="nav-link" href="#" data-uri="/register">Sign-In</a>`;
  } else {
    document.querySelector(
      '#linkConnect1',
    ).innerHTML = `<a class="nav-link" href="#" data-uri="/store">Store</a>`;

    document.querySelector(
      '#linkConnect2',
    ).innerHTML = `<a class="nav-link" href="#" data-uri="/">Log-out</a>`;
  }
}

function linkClick() {
  const links = document.querySelectorAll('.nav-link');
  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      Navigate(e.target.dataset.uri);
      // ou Navigate(link.dataset.uri);
    });
  });
}

//   function animeLinks() {
//     const links = document.querySelectorAll('li');

//      const num = 500;
//      let cpt = 1;
//      links.forEach((link) => {
//      window.addEventListener(
//         'mouseover',
//        anime({
//          targets: link,
//          translateX: 50,
//          translateY: 50,
//          duration: num * cpt,
//        }),
//      );
//     cpt += 1;
//    });
//  }



const setCookie = (cName, cValue, expdays) => {
  const date = new Date();
  date.setTime(date.getTime() + expdays * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${cName} = ${cValue}; ${expires}; path=/`;
};


const getCookie = (cName) => {
  
  const name = `${cName}=`;
  const cDecoded = decodeURIComponent(document.cookie)
  const cArr = cDecoded.split(";");
  let value;

  cArr.forEach(val => {
    if (val.indexOf(name) === 0)
      value = val.substring(name.length);
  })
  return value
};

function cookie() {

  const divCookie = document.querySelector('#cookies');
  const cookieRGPD = document.querySelector('#cookies-btn');

  cookieRGPD.addEventListener('click', () => {
    divCookie.style.display = 'none';
    setCookie('cookie', true, 30);
  });
}

const cookieMessage = () => { 
  if (!getCookie("cookie"))
    document.querySelector("#cookies").style.display = "block";

};

window.addEventListener("load", cookieMessage);
export default HomePage;
