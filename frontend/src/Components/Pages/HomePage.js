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
      <li><a class="nav-link" href="/game" data-uri="/game">Play</a></li>
      <li><a class="nav-link" href="/leaderboard" data-uri="/leaderboard">LeaderBoard</a></li>
      
      <!--{{#if session.connected }} -->
      <li id="linkConnect1"></li>
      <li id="linkConnect2"></li>
      <!--{{/if}} -->

     <!-- {{#if !session.connected}} -->
      <li  id="linkNotConnect1"></li>
      <li  id="linkNotConnect2"></li>
     <!-- {{/if}} -->
      
      <li><a class="nav-link" href="#" data-uri="/credit">Credits</a></li>
        </ul>
    </div>
    <div>
  </div>;
  </div>
`;

  main.innerHTML = mainHTML;
  isConnected(false);
};

function isConnected(params) {
  if (params === false) {
    document.querySelector(
      '#linkNotConnect1',
    ).innerHTML = `<a class="nav-link" href="/login" data-uri="/login">Login</a>`;

    document.querySelector(
      '#linkNotConnect2',
    ).innerHTML = `<a class="nav-link" href="/register" data-uri="/register">Sign-In</a>`;
  } else {
    document.querySelector(
      '#linkConnect1',
    ).innerHTML = `<a class="nav-link" href="/store" data-uri="/store">Store</a>`;

    document.querySelector(
      '#linkConnect2',
    ).innerHTML = `<a class="nav-link" href="/" data-uri="/">Log-out</a>`;
  }
}

export default HomePage;
