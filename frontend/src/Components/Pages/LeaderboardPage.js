
import Navigate from '../Router/Navigate';
import { clearPage } from '../../utils/render';

const main = document.querySelector('main');

const Leaderboard = () => {
  clearPage();
  renderBackBtn();
  fetchAllScores();
}


function fetchAllScores() {
  let lignes = '';
  
  fetch('http://localhost:3000/scores/')
  .then((response) => {
    if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
    return response.json();
  })
  .then((allLigne) => {
    if(allLigne.length !== 0){
      let count = 1;
      allLigne.forEach(ligne => {
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
    }else{
      document.querySelector('main').innerHTML = `Error: no data in DB`;
    }
    
  })
  .catch((err) => {
    console.error('Error fetching ', err);
    document.querySelector('main').innerHTML = `Error: API is not online`;
  });

  
}


function renderLeaderboardPage(lignes) {
  main.innerHTML += ` 
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

function renderBackBtn() {
  main.innerHTML += `
  <div class="d-flex justify-content-end">
    <button type="button" class="back btn btn-primary btn-lg mx-5 my-4">Back</button>
  </div>`;
backListenner();
}

function backListenner() {
  const back = document.querySelector('.back');
  back.addEventListener('click', () =>{
    Navigate('/');
  })
}

export default Leaderboard;