
import anime from 'animejs/lib/anime.es';

import Navigate from '../Router/Navigate';
import settings from '../../utils/settings';
import music from '../../assets/backgroundMusic.mp3'


const audio = new Audio(music);

const HomePage = () => {
  
  const main = document.querySelector('main');

  const mainHTML = `
  <div class="screen">
    <div id = "sound" class = "setting-btn">
    ${!isMobileDevice() ? '<button class = "btn0"><i class="bx bxs-cog"></i></button>' : ''} 

      <button id = "volume" class = "btn2" style = "display : inline"><i class='bx bxs-volume-mute'></i></button>
      <button id = "volume" class = "btn3" style = "display : none"><i class='bx bxs-volume-full'></i></button>
      <button id = "volume" class = "btn4"><i class='bx bxs-volume-mute'></i></button>
    </div>
 
    <div class= "menu">
        <h1 class="title">SantaFall</h1>
        <br>
        <h2 style = "text-decoration: underline" >Let us slide</h2>
        <br>
        <br>
      <ul>
      <li><a id="game-link" class="nav-link" href="#" data-uri="/game">Play</a></li>
      <li><a class="nav-link" href="#" data-uri="/leaderboard">LeaderBoard</a></li>
      
      <li id="linkConnection1"></li>
      <li id="linkConnection2"></li>
      
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
  (localStorage.getItem('token') !== null) ? isConnected(true) : isConnected(false);
  
  linkClick();
  volumeClick();
  firstClickVolume(); 

  if (!isMobileDevice()) settingClick();
  
  animeLinks();
  document.addEventListener('DOMContentLoaded', animeLinks);
};


/** *************************************************************************************
*Title: isMobileDevice
*Author: ChatGPT 3.5
*Date: 16/12/2023
*--Code version: 1.0
*
************************************************************************************** */
function isMobileDevice() {
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
  const isMobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  return isTouchDevice || isMobileUserAgent;
}

function isConnected(token) {
  if (token === false) {
    document.querySelector(
      '#linkConnection1',
    ).innerHTML = `<a class="nav-link" href="#" data-uri="/login">Login</a>`;

    document.querySelector(
      '#linkConnection2',
    ).innerHTML = `<a class="nav-link" href="#" data-uri="/register">Sign-In</a>`;
  } else {
    document.querySelector(
      '#linkConnection1',
    ).innerHTML = `<a class="nav-link" href="#" data-uri="/shop">Shop</a>`;

    document.querySelector(
      '#linkConnection2',
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

function firstClickVolume(){
  document.querySelector('.btn2').addEventListener('click', (e) => {
    e.preventDefault();
    audio.play();
    audio.volume = 0.3;
    audio.loop = true;
    document.querySelector('.btn3').style.display = 'inline';
    document.querySelector('.btn2').style.display = 'none';
})
}

function volumeClick() {

  // volume off
  document.querySelector('.btn4').addEventListener('click', (e) => {
      e.preventDefault();
      audio.muted = false;
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

  function animeLinks() {
    const links = document.querySelectorAll('li');
    if (links.length > 0) {
      anime.set(links, {
        translateX: '100px',
        translateY: '100px',
      });

      anime({
        targets: links,
        translateX: 0,
        translateY: 0,
        delay: anime.stagger(100),
      });
    }
  }

export default HomePage;
