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
        <div class = "errorMessage">
        <p class='errorVue'></p><button class = 'error-btn'><i class='bx bxs-x-circle'></i></button>
        </div>
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
  ErrorClick();

  document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    tryRgister();
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

function ErrorClick() {
  const btn = document.querySelector('.error-btn');
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const errorVue = document.querySelector('.errorMessage');
    errorVue.style.display = 'none';
  })
}

async function tryRgister() {
  const password1 = document.querySelector('.password1').value;
  const password2 = document.querySelector('.password2').value;
  const username = document.querySelector('.username').value;
  // const email = document.querySelector(".email").value;


  if (password1 !== password2) {
    animeLogin(false);
    document.querySelector(".errorVue").innerHTML='The passwords are not matching';
    document.querySelector('.errorMessage').style.display = 'block';
  }
  else {
    const password = password1;
    const options = {
      method: 'POST',
      body: JSON.stringify({
        password,
        username,
        // email
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(`${process.env.API_BASE_URL}/auths/register`, options);


    if (!response.ok) {
      animeLogin(false);
      document.querySelector('.errorVue').innerHTML = 'This account already exist';
      document.querySelector('.errorMessage').style.display = 'block';
      
    }
    else {
      localStorage.setItem('token', response.token);
      localStorage.setItem('user',response.username)
      animeLogin(true);
      setTimeout(()=>Navigate('/'),2000)
    }
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
    // errorMessage(localStorage.setItem('errors'));
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
;

export default RegisterPage;
