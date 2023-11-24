let keyLabel = "SPACE";
let key = "SPACE";

const phaserKeyMapping = {
    ',': "COMMA",
    '-': "MINUS",
    '+': "PLUS",
    ';': "SEMICOLON",
    ':': "COLON",
    '!': "EXCLAMATION_MARK",
    '@': "AT",
    '#': "HASH",
    '$': "DOLLAR",
    '%': "PERCENT",
    '^': "CARET",
    '&': "AMPERSAND",
    '*': "ASTERISK",
    '(': "OPEN_PAREN",
    ')': "CLOSED_PAREN",
    '_': "UNDERSCORE",
    '=': "EQUALS",
    '[': "OPEN_BRACKET",
    ']': "CLOSED_BRACKET",
    '{': "OPEN_BRACE",
    '}': "CLOSED_BRACE",
    '|': "PIPE",
    '\\': "BACKSLASH",
    '/': "FORWARD_SLASH",
    '.': "PERIOD",
    '<': "LESS_THAN",
    '>': "GREATER_THAN",
    '?': "QUESTION_MARK",
    '`': "BACKTICK",
    '~': "TILDE",
    '"': "DOUBLE_QUOTE",
    "'": "SINGLE_QUOTE",
    " ": "SPACE"
}

const SettingsPage = () => {
    renderSettingsPage();
}

function renderSettingsPage() {
    const main = document.querySelector('main');

    const overlay = document.createElement('div');
    overlay.className = 'overlay';

    overlay.innerHTML = `
    <div class="settings-page">
        <div class="d-flex align-items-center justify-content-center h-75">
            <div class="settings-frame card align-items-center p-3">
                <h3 class="text-center mb-4">Keyboard setting</h3>
                <button type="button" class="close close-settings-button position-absolute top-0 end-0 m-2" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <div class="row w-100">
                    <div class="col-6 d-flex align-items-center justify-content-center">
                        <span>Change Key</span>
                    </div>
                    <div class="col-6 d-flex align-items-center justify-content-center">
                        <button id="settings-key-button" class="btn btn-dark">${keyLabel}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    `
    main.appendChild(overlay);

    const closeButton = overlay.querySelector('.close-settings-button');
    const changeKeyButton = overlay.querySelector('#settings-key-button');

    changeKeyButton.addEventListener('click', () => {
        changeKeyButton.innerText = 'CHOOSE A KEY';
        changeKeyButton.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';


        function handleKeyDown(event) {
            keyLabel = event.key.toUpperCase();
            key = event.key;
            if(phaserKeyMapping[event.key])
                key = phaserKeyMapping[event.key] 
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

export default SettingsPage;

