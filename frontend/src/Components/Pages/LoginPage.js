import Navigate from "../Router/Navigate";

const LoginPage = () => {
  const main = document.querySelector('main');
   main.innerHTML = `
   <div class="div-back">
        <button id="link" class="back" type="button" data-uri="/"><i class='bx bx-arrow-back'></i></button>
      </div>
      <div class="superWrapper">
        <div class="wrapper">
          <form action="">
            <h1>Login</h1>
            <div class="input-box">
              <input type="text" placeholder="Username" required>
              <i class='bx bxs-user'></i>
            </div>
            <div class="input-box">
              <input type="password" placeholder="Password" required>
              <i class='bx bxs-lock-alt'></i>
            </div>

            <button type="submit" class="btn">Login</button>

            <div class="register-link">
              <p>Not register yet ? <a id="link" data-uri="/register" href ="#">Register</a> </p>
            </div>
          </form>
        </div>
      </div>`;
   
   linkClick();
};

function linkClick() {
   const links = document.querySelectorAll('#link');
   links.forEach((link) => {
      link.addEventListener('click',()=>{
         Navigate(link.dataset.uri);
      });
   });
}

export default LoginPage;
