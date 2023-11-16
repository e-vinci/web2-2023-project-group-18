import Navigate from '../Router/Navigate';

const SettingsPage = () => {
    const key = "SPACE";

    renderSettingsPage(key);
    backListenner();
}

function renderSettingsPage(key) {
    const main = document.querySelector('main');

    const mainContent = `
    <div id="settings-page">
        <br>
        <div class="d-flex justify-content-between align-items-center position-relative m-3">
            <h1 class="mx-auto">Settings</h1>
            <button type="button" class="back back-button btn btn-primary btn-lg position-absolute top-0 end-0">Back</button>
        </div>

        <div class="d-flex align-items-center justify-content-center h-75">
            <div class="settings-frame card align-items-center p-3">
                <h3 class="text-center mb-4">Keyboard setting</h3>
                <div class="row w-100">
                    <div class="col-6 align-items-center">
                        <span>Key</span>
                    </div>
                    <div class="col-6 align-items-center">
                        <button class="btn btn-light btn-block">${key}</button>
                    </div>
                </div>
            </div>
        </div>
        <br>
    </div>
    `

    main.innerHTML = mainContent;
}

function backListenner() {
    const backElement = document.querySelector('.back');
    backElement.addEventListener('click', () =>{
        Navigate('/');
    })
}

export default SettingsPage;
