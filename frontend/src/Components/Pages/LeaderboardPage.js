
import Navigate from '../Router/Navigate';
import { clearPage } from '../../utils/render';

const main = document.querySelector('main');

const Leaderboard = async () => {
  clearPage();
  await fetchAllScores();
  backListenner();
}


async function fetchScores(){
  try {
    const response = await fetch('api/scores/')
    if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
    const allLignes = await response.json();
    return allLignes;
  } catch (err) {
      document.querySelector('main').innerHTML = `Error: API is not online`;
    return err
  };
  

}


async function fetchAllScores() {
  const allLignes = await fetchScores();

  if(allLignes instanceof Error)
    return;

  let lignes = '';
  let count = 1;
  allLignes.forEach(ligne => {
    const date = new Date(ligne.score_date);
    lignes += ` 
    <tr>
        <td class="text-center">${count}</td>
        <td class="text-center">${ligne.username}</td>
        <td class="text-center">${ligne.score} m</td>
        <td class="text-center">${date.toLocaleDateString("fr-BE")}</td>
    </tr>`;
    count+=1;
  });
  renderLeaderboardPage(lignes);
}


async function renderLeaderboardPage(lignes) {
  main.innerHTML = ` 
  <div class="div-back">
  <button id="back-leaderboard" class="back" type="button" ><i class='bx bx-arrow-back'></i></button>
  </div>
  <div class="d-flex justify-content-center">
    <div class="container p-2 border rounded">
        <h2 class="text-center my-2">LeaderBoard</h2>
        <div class="table-responsive mx-4">
          <table class="table table-striped mx-auto">
          <tr>
            <th class="text-center">n°</th>
            <th class="text-center">username</th>
            <th class="text-center">score</th>
            <th class="text-center">date</th>
          </tr>
           ${lignes}
          </table>
        </div>
    </div>
  </div>
  `;
  
}

function backListenner() {
  const back = document.querySelector('#back-leaderboard');
  console.log(typeof back);
  if(back !== null){
    back.addEventListener('click', () => {
      Navigate('/');
    });
  }

}

export default Leaderboard;