
// import anime from 'animejs/lib/anime.es';

import Navigate from '../Router/Navigate';
import settings from '../../utils/settings';
import music from '../../assets/backgroundMusic.mp3'


const audio = new Audio(music);

const HomePage = () => {
  
  const main = document.querySelector('main');

  const mainHTML = `
  <div class="screen">
    <div id = "sound" class = "setting-btn">
      <button class = "btn0"><i class='bx bxs-cog'></i></button>
      <button class = "btn1"><i class='bx bx-play'></i></button>
      <button class = "btn2"><i class='bx bx-pause' ></i></button>
      <button id = "volume" class = "btn3"><i class='bx bxs-volume-full'></i></button>
      <button id = "volume" class = "btn4"><i class='bx bxs-volume-mute'></i></button>
    </div>
 
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

  // eslint-disable-next-line no-unused-expressions
  (localStorage.getItem('token') !== null) ? isConnected(true) : isConnected(false) ;
  linkClick();
  startClick();
  pauseClick();
  volumeClick();
  settingClick();


  // animeLinks();
  // cookie();
};

function isConnected(token) {
  if (token === false) {
    document.querySelector(
      '#linkNotConnect1',
    ).innerHTML = `<a class="nav-link" href="#" data-uri="/login">Login</a>`;

    document.querySelector(
      '#linkNotConnect2',
    ).innerHTML = `<a class="nav-link" href="#" data-uri="/register">Sign-In</a>`;
  } else {
    document.querySelector(
      '#linkConnect1',
    ).innerHTML = `<a class="nav-link" href="#" data-uri="/shop">Shop</a>`;

    document.querySelector(
      '#linkConnect2',
    ).innerHTML = `<a class="nav-link" href="#" data-uri="/logout">Log-out</a>`;
  }
}

function linkClick() {
  const links = document.querySelectorAll('.nav-link');
  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      Navigate(e.target.dataset.uri);
      // ou Navigate(link.dataset.uri);
    });
  });
}

function startClick() {

  const btnPause = document.querySelector('.btn2')
  const btnStart = document.querySelector('.btn1');
  btnStart.addEventListener('click', () => {
    audio.loop = true;
    audio.play();
    btnStart.style.display = 'none';
    btnPause.style.display = 'inline';
  })
}

function pauseClick() {

  const btnStart = document.querySelector('.btn1');
  const btnPause = document.querySelector('.btn2');
  btnPause.addEventListener('click', () => {
    audio.pause();
    btnPause.style.display = 'none';
    btnStart.style.display = 'inline';
  });
}

function volumeClick() {

  // volume off
  document.querySelector('.btn4').addEventListener('click', (e) => {

      audio.muted = false;
      e.preventDefault();
      document.querySelector('.btn3').style.display = 'inline';
      document.querySelector('.btn4').style.display = 'none';
    })
  
  // volume on
  document.querySelector('.btn3').addEventListener('click', (e) => {

    audio.muted = true;
    e.preventDefault();
    document.querySelector('.btn4').style.display = 'inline';
    document.querySelector('.btn3').style.display = 'none';
  });
}


function settingClick() {
  const btn = document.querySelector('.btn0');
  btn.addEventListener('click', () => {
    settings.openSettings();
    settings.getKey();
  })

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



// const setCookie = (cName, cValue, expdays) => {
//   const date = new Date();
//   date.setTime(date.getTime() + expdays * 24 * 60 * 60 * 1000);
//   const expires = `expires=${date.toUTCString()}`;
//   document.cookie = `${cName} = ${cValue}; ${expires}; path=/`;
// };


// const getCookie = (cName) => {
  
//   const name = `${cName}=`;
//   const cDecoded = decodeURIComponent(document.cookie)
//   const cArr = cDecoded.split(";");
//   let value;

//   cArr.forEach(val => {
//     if (val.indexOf(name) === 0)
//       value = val.substring(name.length);
//   })
//   return value
// };

// function cookie() {

//   const divCookie = document.querySelector('#cookies');
//   const cookieRGPD = document.querySelector('#cookies-btn');

//   cookieRGPD.addEventListener('click', () => {
//     divCookie.style.display = 'none';
//     setCookie('cookie', true, 30);
//   });
// }

// const cookieMessage = () => { 
//   if (!getCookie("cookie"))
//     document.querySelector("#cookies").style.display = "block";

// };

// window.addEventListener("load", cookieMessage);

export default HomePage;
