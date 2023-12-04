import anime from 'animejs/lib/anime.es';

// Get key saved in browser or space
let key = localStorage.getItem('selectedKey') || "SPACE";

const keyNotSupported = ['!', '"', '#', '$', '%', '&', "'", '(', ')', '*', '+', ',', 
    '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', '\\', ']', '^', '_', '`', '{', 
    '|', '}', '~', 'µ', 'ù', '€', '£', '¤', '§', '°', '¨', '¦', '¨', '²', '³', 'Dead', '^^', 
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'CapsLock'];


const getKey = () => key;

const openSettings = () => {
    const main = document.querySelector('main');

    // create a div that will contain the pop up settings
    const overlay = document.createElement('div');
    overlay.className = 'settings-overlay';

    overlay.innerHTML = `
    <div class="settings-page">
        <div class="d-flex align-items-center justify-content-center h-75">
            <div class="settings-frame card align-items-center p-3">
                <h3 class="text-center mb-4">Keyboard setting</h3>
                <button type="button" class="close settings-close-button position-absolute top-0 end-0 m-2" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <div class="row w-100">
                    <div class="col-6 d-flex align-items-center justify-content-center">
                        <span>Change Key</span>
                    </div>
                    <div class="col-6 d-flex align-items-center justify-content-center">
                        <button id="settings-key-button" class="btn btn-dark">${key}</button>
                    </div>
                    <div class="d-flex justify-content-center text-danger mt-2">
                        <span class="settings-error-key">This key cannot be assigned, choose another key</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
    main.appendChild(overlay);

    const closeButton = overlay.querySelector('.settings-close-button');
    const changeKeyButton = overlay.querySelector('#settings-key-button');

    // listener to change key
    changeKeyButton.addEventListener('click', () => {
        changeKeyButton.innerText = 'CHOOSE A KEY';
        changeKeyButton.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';

        // this is a function to be able to remove the listener once executed
        function handleKeyDown(event) {
            const borderColor = document.querySelector('.settings-frame');
            const errorText = document.querySelector('.settings-error-key');

            if(!keyNotSupported.includes(event.key)) {
                key = event.key.toUpperCase();
                key = key === " " ? "SPACE": key;

                // Save key in browser
                localStorage.setItem('selectedKey', key);

                errorText.style.display = 'none';
                borderColor.style.borderColor = '#FFFFFF';
            } else {
                errorText.style.display = 'block';
                borderColor.style.borderColor = '#FF0000';

                anime({
                  targets: '.settings-frame',
                  easing: 'linear',
                  duration: 150,
                  translateX: [{ value: 50 }, { value: 0 }],
                });
            }
            changeKeyButton.innerText = `${key}`;
            changeKeyButton.style.backgroundColor = '';
            changeKeyButton.removeEventListener("keydown", handleKeyDown, true);
        }

        changeKeyButton.addEventListener("keydown", handleKeyDown, true);
    });

    closeButton.addEventListener('click', () => {
        main.removeChild(overlay);
    });
}

export default {openSettings, getKey};

