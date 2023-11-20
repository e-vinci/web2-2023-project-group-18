
import Navigate from '../Router/Navigate';

const Leaderboard = () => {
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
    let count = 1;
    allLigne.forEach(ligne => {
      lignes = ` 
      <tr>
          <td class="text-center">${count}</td>
          <td class="text-center">${ligne.username}</td>
          <td class="text-center">${ligne.score} m</td>
          <td class="text-center">10/10/1999</td>
      </tr>`;
      count+=1;
    });
    renderLeaderboardPage(lignes);
  })
  .catch((err) => {
    console.error('Error fetching ', err);
    document.querySelector('main').innerHTML = `Error: API is not online`;
  });

  
}


function renderLeaderboardPage(lignes) {
  const main = document.querySelector('main');

  main.innerHTML = `
  <div class="d-flex justify-content-end">
    <button type="button" class="back btn btn-primary btn-lg mx-5 my-4">Back</button>
  </div>
 

  <div class="d-flex justify-content-center">
    <div class="container p-2 border rounded">
        <h2 class="text-center mb-2">LeaderBoard</h2>
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
  backListenner();
}

function backListenner() {
  const back = document.querySelector('.back');
  back.addEventListener('click', () =>{
    Navigate('/');
  })
}

export default Leaderboard;