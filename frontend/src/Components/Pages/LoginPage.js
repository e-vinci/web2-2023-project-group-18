
import anime from 'animejs/lib/anime.es';
import Navigate from '../Router/Navigate';

const LoginPage = () => {
  const main = document.querySelector('main');
  main.innerHTML = `
   <div class="div-back">
        <button id="link" class="back" type="button" data-uri="/"><i class='bx bx-arrow-back'></i></button>
      </div>
      <div class="superWrapper">
        <div class="wrapper">
        <div class="errorMessage">
        <p class = "errorVue"></p><button class ="error-btn"></button>
        </div>
          <form action="">
            <h1>Login</h1>
            <div class="input-box">
              <input class="username" type="text" placeholder="Username" required>
              <i class='bx bxs-user'></i>
            </div>

            <div class="input-box">
              <input class="password"  type="password" placeholder="Password" required>
              <i class='bx bxs-lock-alt'></i>
            </div>

            <button type="submit" class="btn">Login</button>

            <div class="register-link">
              <p>Not register yet ? <a id="link" data-uri="/register" href ="#">Register</a> </p>
            </div>
            <br>
            <div class="errorMessage">
            </div>
          </form>
        </div>
      </div>`;
  

  linkClick();
  errorClick();

  document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    tryLogin();
    
  });

  

  async function tryLogin() {

    const password = document.querySelector('.password').value;
    const username = document.querySelector('.username').value;


    const options = {
      method: 'POST',
      body: JSON.stringify({
        password,
        username,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch('/api/auths/login', options); 

    if (!response.ok) {
      animeLogin(false);
      document.querySelector('.errorVue').innerHTML = 'Incorrect username or password';
      document.querySelector('.errorMessage').style.display = 'block';
      throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
    }
    else {
      animeLogin(true);
      Navigate('/');
  }
  }
};

function linkClick() {
  const links = document.querySelectorAll('#link');
  links.forEach((link) => {
    link.addEventListener('click', () => {
      Navigate(link.dataset.uri);
    });
  });
}

function errorClick() {
  const btn = document.querySelector('.error-btn');
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.errorVue').style.display = 'none';
  })
}

function animeLogin(isConnected) {
  const borderColor = document.querySelector('.wrapper');
  const inputsColor = document.querySelectorAll('.input-box input');

  if (isConnected) {
    inputsColor.forEach((input) => {
      // eslint-disable-next-line no-param-reassign
      input.style.borderColor = '#00FF00';
      // eslint-disable-next-line no-param-reassign
      input.style.animationName = 'changeColorGreen';
      // eslint-disable-next-line no-param-reassign
      input.style.animationDuration = '2s';
    });

    borderColor.style.borderColor = '#00FF00';
    borderColor.style.animationName = 'changeColorGreen';
    borderColor.style.animationDuration = '2s';
  } else {
    borderColor.style.borderColor = '#FF0000';
    borderColor.style.animationName = 'changeColorRed';
    borderColor.style.animationDuration = '2s';
    inputsColor.forEach((input) => {
      // eslint-disable-next-line no-param-reassign
      input.style.borderColor = '#FF0000';
      // eslint-disable-next-line no-param-reassign
      input.style.animationName = 'changeColorRed';
      // eslint-disable-next-line no-param-reassign
      input.style.animationDuration = '2s';
    });
    anime({
      targets: '.wrapper',
      easing: 'linear',
      duration: 150,
      translateX: [{ value: 50 }, { value: -50 }],
    });
  }
}

export default LoginPage;
