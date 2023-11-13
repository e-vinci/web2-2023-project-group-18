import Navigate from "../Router/Navigate";

const HomePage = () => {
  const main = document.querySelector('main');

  const mainHTML = `
  <div class="screen">
      <i class=" afs fa-volume-mute fa-2x" id="sound"></i>

      <img class="imgSki"></img>
    
    <div class= "menu">
        <h1>SantaFall</h1>
        <h3>Let us slide</h3>
        <ul>
      <li><a class="nav-link" href="#" data-uri="/game">Play</a></li>
      <li><a class="nav-link" href="#" data-uri="/leaderboard">LeaderBoard</a></li>
      
      <li id="linkConnect1"></li>
      <li id="linkConnect2"></li>

      <li  id="linkNotConnect1"></li>
      <li  id="linkNotConnect2"></li>

      
      <li><a class="nav-link" href="#" data-uri="/credit">Credits</a></li>
        </ul>
    </div>
    <div>
  </div>;
  </div>
`;

  main.innerHTML = mainHTML;
  isConnected(true);
  linkClick();
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
  const links = document.querySelectorAll(".nav-link");
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      Navigate(e.target.dataset.uri);
    // ou Navigate(link.dataset.uri);
    })
  });
}

export default HomePage;
