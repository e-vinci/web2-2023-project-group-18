import anime from 'animejs/lib/anime.es';
// eslint-disable-next-line import/no-extraneous-dependencies
import bcrypt from 'bcryptjs'
import Navigate from '../Router/Navigate';

const RegisterPage = () => {
  const main = document.querySelector('main');
  main.innerHTML = `
  <div class="div-back">
        <button id="link" class="back" type="button" data-uri="/"><i class='bx bx-arrow-back'></i></button>
      </div>
   <div class="superWrapper">
        <div class="wrapper">
        <div class = "errorMessage"></div>
          <form action="">
            <h1>Register</h1>
            <div class="input-box">
              <input class="username" type="text" placeholder="Username" required>
              <i class='bx bxs-user'></i>
            </div>

            <div class="input-box">
              <input class="email" type="email" placeholder="Email Adresse" required>
              <i class='bx bx-envelope'></i>
            </div>

            <div class="input-box">
              <input class= "password1" type="password" placeholder="Password" required>
              <i class='bx bxs-lock-alt'></i>
            </div>
            <div class="input-box">
              <input class="password2" type="password" placeholder="Password Verify" required>
              <i class='bx bxs-lock-alt'></i>
            </div>

            <div>
                <input type="checkbox" required></input> I have read and I agree to the <a  id="link" href="#" data-uri="/private-policy">Privacy Policy</a>
            </div>

            <br>
            <button type="submit" class="btn">Register</button>

            <div class="register-link">
              <p>Already have an account ?<a id="link" data-uri="/login" href ="#"> Login here </a> </p>
            </div>
            <br>
            <div class="errorMessage">
            </div>
          </form>
        </div>
      </div>`;
  
  linkClick();
  errorMessage()

  document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    tryLogin();
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

async function tryLogin() {
  const password1 = document.querySelector('.password1').value;
  const password2 = document.querySelector('.password2').value;
  const username = document.querySelector('.username').value;
  const email = document.querySelector(".email").value;


  if (password1 === password2) {

    const passwordHash = hashPassword(password1);

    const options = {
      method: 'PUT',
      body: JSON.stringify({
        passwordHash,
        username,
        email,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(`${process.env.API_BASE_URL}/models/users.js`, options);

    if (!response.ok) {
      animeLogin(false);
      const message = 'This account already exist';
      errorMessage(message);
      throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
    }
    else {
      animeLogin(true);
      Navigate('/');
    }
    // const value = await response.json(); // json() returns a promise => we wait for the data
  }
  else {
    animeLogin(false);
    errorMessage('The passwords are not matching ');
  }
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
    errorMessage(localStorage.setItem('errors'));
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

function errorMessage(errors) {
  const errorsVue = document.querySelector('.errorMessage');
  const newP = document.createElement('p');
  newP.textContent = errors;
  const newButton = document.createElement('button');
  newButton.textContent = ` <i class='bx bxs-x-circle'></i>`;

  newButton.addEventListener('click', (e) => {
    e.preventDefault();
    errorsVue.style.display = 'none';
  });

  errorsVue.appendChild(newP);
  errorsVue.appendChild(newButton);
}


function hashPassword(password) {
  const saltRounds = 10;
  const plainTextPassword = password;

  bcrypt.hash(plainTextPassword, saltRounds, (err, hash) => {
    if (err) {
      return;
    }
    // eslint-disable-next-line consistent-return
    return hash;
  });
};

export default RegisterPage;
