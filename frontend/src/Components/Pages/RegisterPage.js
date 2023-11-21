import anime from 'animejs/lib/anime.es';
import Navigate from '../Router/Navigate';

const RegisterPage = () => {
  const main = document.querySelector('main');
  main.innerHTML = `
   <div class="div-back">
        <button id="link" class="back" type="button" data-uri="/"><i class='bx bx-arrow-back'></i></button>
      </div>
      <div class="superWrapper">
        <div class="wrapper">
          <form action="">
            <h1>Register</h1>
            <div class="input-box">
              <input type="text" placeholder="Username" required>
              <i class='bx bxs-user'></i>
            </div>
            <div class="input-box">
              <input type="password" placeholder="Password" required>
              <i class='bx bxs-lock-alt'></i>
            </div>
            <div class="input-box">
              <input type="password" placeholder="Password Verify" required>
              <i class='bx bxs-lock-alt'></i>
            </div>

            <button type="submit" class="btn">Register</button>

            <div class="register-link">
              <p>Already have an account ?<a id="link" data-uri="/login" href ="#"> Login here </a> </p>
            </div>
          </form>
        </div>
      </div>`;

  linkClick();

  document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    animeLogin(true);
  });
};

function linkClick() {
  const links = document.querySelectorAll('#link');
  links.forEach((link) => {
    link.addEventListener('click', () => {
      Navigate(link.dataset.uri);
    });
  });
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

export default RegisterPage;
