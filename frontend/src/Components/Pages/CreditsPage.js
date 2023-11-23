import Navigate from '../Router/Navigate';


const NewPage = () => {
  const main = document.querySelector('main')
  main.innerHTML = `<div class="div-back"><button id="link" class="back" type="button" data-uri="/"><i class='bx bx-arrow-back'></i></button></div>
  
  <div class="scrollable-text">
      <div class="superCreditPage">
      <div class="creditPage">
        <h1 class="h1Credit">Game Credits</h1>
        <br>
      <div class="credit">
      
      <ul>
        <h3>Game Design :</h3>
        <li>Cattaruzza Alexis</li>
        <li>Debin Pierre-Alexandre</li>
        <li>Devos Thibaut</li>
        <li>Massart Xavier</li>
        <li>Ubah Chisom</li>
      </ul>

      <ul>
        <h3>Art & Animation :</h3>
        <li>Cattaruzza Alexis</li>
        <li>Debin Pierre-Alexandre</li>
        <li>Devos Thibaut</li>
        <li>Massart Xavier</li>
        <li>Ubah Chisom</li>
      </ul>
      </div>
      <br>
      <div class="credit">
      <ul>
        <h3>Programming :</h3>
        <li>Cattaruzza Alexis</li>
        <li>Debin Pierre-Alexandre</li>
        <li>Devos Thibaut</li>
        <li>Massart Xavier</li>
        <li>Ubah Chisom</li>
      </ul>

      <ul>
        <h3>Sound Design :</h3>
        <li>Cattaruzza Alexis</li>
        <li>Debin Pierre-Alexandre</li>
        <li>Devos Thibaut</li>
        <li>Massart Xavier</li>
        <li>Ubah Chisom</li>
      </ul>
      </div>
      <br>
      <div class="credit">
      <ul>
        <h3>Special thanks :</h3>
        <li>Cattaruzza Alexis</li>
        <li>Debin Pierre-Alexandre</li>
        <li>Devos Thibaut</li>
        <li>Massart Xavier</li>
        <li>Ubah Chisom</li>
      </ul>
      </div>
      </div>
      </div>
      </div>
  `;

  onClick();
}

function onClick() {

  const button = document.querySelector('button');
  button.addEventListener("load", (e) => {
    e.preventDefault();
    Navigate(e.target.dataset.uri)
  });
  Navigate();
}

export default NewPage;
