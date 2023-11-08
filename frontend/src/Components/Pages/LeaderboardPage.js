
import Navigate from '../Router/Navigate';

const Leaderboard = () => {
  const lignes = ` 
  <tr>
      <td class="text-center">1</td>
      <td class="text-center">GoodHyper</td>
      <td class="text-center">128 m</td>
      <td class="text-center">10/10/1999</td>
  </tr>`;
  renderLeaderboardPage(lignes);
  backListenner();
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
}

function backListenner() {
  const back = document.querySelector('.back');
  back.addEventListener('click', () =>{
    Navigate('/');
  })
}

export default Leaderboard;