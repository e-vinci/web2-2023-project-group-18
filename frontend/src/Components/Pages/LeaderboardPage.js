
const Leaderboard = () => {
    const main = document.querySelector('main');
    const lignes = ` 
    <tr>
        <td class="text-center">1</td>
        <td class="text-center">GoodHyper</td>
        <td class="text-center">128 m</td>
        <td class="text-center">10/10/1999</td>
    </tr>`;


    main.innerHTML = `
    <div class="d-flex justify-content-end">
      <div class="back mx-5 my-4 p-2 rounded border bg-primary-subtle">back</div>
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

export default Leaderboard;