
import Navigate from '../Router/Navigate';
import { clearPage } from '../../utils/render';
import Loading from '../../utils/loading';

const main = document.querySelector('main');

const Leaderboard = async () => {
  clearPage();
  Loading.startLoading();

  await fetchAllScores();
  
  Loading.stopLoading();
  backListenner();
}


async function fetchScores(){
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/scores/`)
    if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
    const allLignes = await response.json();
    return allLignes;
  } catch (err) {
      document.querySelector('main').innerHTML = `<p class="text-white">Error: API is not online</p>`;
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
  <div class="d-flex justify-content-between align-items-center position-relative m-3 mt-3 mb-3">
    <button id="back-leaderboard" class="back btn-lg position-absolute type="button"><i class='bx bx-arrow-back'></i></button>
    <h1 class="mx-auto text-white">LeaderBoard</h1>
  </div>

  <div class="d-flex justify-content-center">
    <div class="container p-2 leaderboard-background">
      <div class="table-responsive mx-4 mt-3 mb-3 rounded">
        <table class="table table-striped mx-auto">
          <tr>
            <th class="text-center">N°</th>
            <th class="text-center">Username</th>
            <th class="text-center">Score</th>
            <th class="text-center">Date</th>
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
  if(back !== null){
    back.addEventListener('click', () => {
      Navigate('/');
    });
  }

}

export default Leaderboard;