import anime from 'animejs/lib/anime.es';
import Navigate from '../Router/Navigate';
import templateSkinImage from '../../assets/templateSkinShopPage.png';
import templateMapImage from '../../assets/templateMapShopPage.png';

let coins = 0;

let skinsList;
let themesList;
let ownedSkins;
let ownedThemes;

let skinsPerPage = 6;
let themesPerPage = 6;
let currentSkinPage = 1;
let currentThemePage = 1;

const ShopPage = async () => {
    coins = 458;

    try {
        // To avoid redoing queries each time the page loads
        if(!skinsList || !themesPerPage || !currentSkinPage || !currentThemePage) {
            skinsList = await fetchData(`/skins/`);
            themesList = await fetchData(`/themes/`);
            ownedSkins = await fetchData(`/skins/1`);
            ownedThemes = await fetchData(`/themes/1`);
        }

        renderShopPage();

        displayCurrentSkinPage();
        displayCurrentThemePage();

        changePageListenner();
        backListenner();

    } catch {
        document.querySelector('main').innerHTML = `
        <div class="container text-center text-white mt-5">
            <p class="display-5">Error: API is not online</p>
        </div>`;
    }
}

function renderShopPage() {
    const main = document.querySelector('main');

    if (window.innerWidth <= 480) {
        skinsPerPage = 1;
        themesPerPage = 1;
    }

    main.innerHTML = `
    <div id="shop-page">
        <br>
        <div class="d-flex justify-content-between align-items-center position-relative m-3 mt-0 mb-3">
            <button class="back btn-lg position-absolute bx bx-arrow-back" type="button"></button>
            <h1 class="mx-auto">Shop</h1>
        </div>

        <div class="container mb-4">
            <div class="row">
                <h4 class="text-left">Coins: <span id="shop-coins"></span></h4>
                <div class="col-md-6 d-flex justify-content-center">
                    <div class="shop-part p-3">
                    
                        <h2 class="text-center">Characters</h1>

                        <div id="skin-list"></div>

                        <div class="d-flex justify-content-center mt-3">
                            <button type="button" id="previous-change-skin-page" class="shop-change-page-button me-2">PREVIOUS</button>
                            <span id="skin-page-number" class="me-2"></span>
                            <button type="button" id="next-change-skin-page" class="shop-change-page-button">NEXT</button>
                        </div>

                    </div>
                </div>
                <div class="col-md-6 d-flex justify-content-center">
                    <div class="shop-part p-3">
                        <h2 class="text-center">Themes</h1>
                        
                        <div id="theme-list"></div>

                        <div class="d-flex justify-content-center mt-3">
                            <button type="button" id="previous-change-theme-page" class="shop-change-page-button me-2">PREVIOUS</button>
                            <span id="theme-page-number" class="me-2"></span>
                            <button type="button" id="next-change-theme-page" class="shop-change-page-button">NEXT</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
    `

    const coinsDiv = document.querySelector('#shop-coins');
    anime({
        targets: coinsDiv,
        innerHTML: [0, coins],
        easing: 'linear',
        round: 10,
        update(anim) {
            coinsDiv.innerHTML = anim.animations[0].currentValue.toFixed(0); 
        }
    });
}

// Display skins page
function displayCurrentSkinPage() {
    const startIndex = (currentSkinPage - 1) * skinsPerPage;
    const endIndex = startIndex + skinsPerPage;
    const currentSkins = skinsList.slice(startIndex, endIndex);

    const skinListPage = document.getElementById('skin-list');
    const skinPageNumber = document.getElementById('skin-page-number');

    let skinHTML = '';

    for (let i = 0; i < currentSkins.length; i += 3) {
        skinHTML += '<div class="row">';

        for (let j = i; j < i+3 && j < currentSkins.length; j+= 1) {
            const skin = currentSkins[j];

            let typeButton = `<button type="button" class="btn shop-buy-button shop-buy-skin" data-id="${skin.id_skin}">${skin.price} coins</button>`;
            
            if (ownedSkins.some(s => s.name_skin === skin.name_skin))
                typeButton = `<button type="button" class="btn shop-own-button shop-own-skin" data-id="${skin.id_skin}">Choose</button>`;

            skinHTML += `
                <div class="col-md-4 text-center">
                    <h3>${skin.name_skin.charAt(0).toUpperCase() + skin.name_skin.slice(1)}</h3>
                    <img class="w-100 shop-picture" src="${templateSkinImage}" alt="skin picture ${skin.name_skin}" draggable="false">
                    ${typeButton}
                </div>`;
        }

        skinHTML += '</div><br>';
    }

    skinPageNumber.innerHTML = `< ${currentSkinPage} > on < ${Math.ceil(skinsList.length/skinsPerPage)} >`;
    skinListPage.innerHTML = skinHTML;

    skinsListenner();
}

// Display themes page
function displayCurrentThemePage() {
    const startIndex = (currentThemePage - 1) * themesPerPage;
    const endIndex = startIndex + themesPerPage;
    const currentThemes = themesList.slice(startIndex, endIndex);

    const themeListPage = document.getElementById('theme-list');
    const themePageNumber = document.getElementById('theme-page-number');

    let themeHTML = '';

    for (let i = 0; i < currentThemes.length; i += 3) {
        themeHTML += '<div class="row">';

        for (let j = i; j < i+3 && j < currentThemes.length; j+= 1) {
            const theme = currentThemes[j];

            let typeButton = `<button type="button" class="btn shop-buy-button shop-buy-theme" data-id="${theme.id_theme}">${theme.price} coins</button>`;
            if (ownedThemes.some(t => t.name_theme === theme.name_theme))
                typeButton = `<button type="button" class="btn shop-own-button shop-own-theme" data-id="${theme.id_theme}">Choose</button>`;

            themeHTML += `
                <div class="col-md-4 text-center">
                    <h3>${theme.name_theme.charAt(0).toUpperCase() + theme.name_theme.slice(1)}</h3>
                    <img class="w-100 shop-picture" src="${templateMapImage}" alt="theme picture ${theme.name_theme}">
                    ${typeButton}
                </div>`;
        }

        themeHTML += '</div><br>';
    }

    themePageNumber.innerHTML = `< ${currentThemePage} > on < ${Math.ceil(themesList.length/themesPerPage)} >`;
    themeListPage.innerHTML = themeHTML;

    themesListenner();
}

// The listenner to change pages (skins or themes)
function changePageListenner() {
    document.querySelector('#next-change-skin-page').addEventListener('click', () => {
        if (currentSkinPage < skinsList.length/skinsPerPage) {
            currentSkinPage += 1;
            displayCurrentSkinPage();
        }
    });
    document.querySelector('#previous-change-skin-page').addEventListener('click', () => {
        if (currentSkinPage > 1) {
            currentSkinPage -= 1;
            displayCurrentSkinPage();
        }
    });

    document.querySelector('#next-change-theme-page').addEventListener('click', () => {
        if (currentThemePage < themesList.length/themesPerPage) {
            currentThemePage += 1;
            displayCurrentThemePage();
        }
    });

    document.querySelector('#previous-change-theme-page').addEventListener('click', () => {
        if (currentThemePage > 1) {
            currentThemePage -= 1;
            displayCurrentThemePage();
        }
    });
}

// The listenner to click on buy and choose skin
async function skinsListenner() {
    const skinsBuyButtons = document.querySelectorAll('.shop-buy-skin');
    const skinsOwnButtons = document.querySelectorAll('.shop-own-skin');

    if(skinsBuyButtons) {
        skinsBuyButtons.forEach((btn) => {
            btn.addEventListener('click', async () =>{
                const idSkin = parseInt(btn.getAttribute('data-id'), 10);
                let ownThisSkin = false;

                // check if html is not modified in devtools (the data-id)
                ownedSkins.forEach((skin) => {
                    if(skin.id_skin === idSkin)
                        ownThisSkin = true;
                });

                if (!ownThisSkin) {
                    fetchBuy(`/skins/${idSkin}`);
                }
            })
        });
    }

    if(skinsOwnButtons) {
        skinsOwnButtons.forEach((btn) => {
            btn.addEventListener('click', () =>{
                // check if html is not modified in devtools (the data-id)
                const idSkin = parseInt(btn.getAttribute('data-id'), 10);
                ownedSkins.forEach((skin) => {
                    if(skin.id_skin === idSkin)
                        console.log(`a le skin ${  skin.name_skin}`)
                });
            })
        });
    }
}

// The listenner to click on buy and choose theme
function themesListenner() {
    const themesBuyButtons = document.querySelectorAll('.shop-buy-theme');
    const themesOwnButtons = document.querySelectorAll('.shop-own-theme');

    if(themesBuyButtons) {
        themesBuyButtons.forEach((btn) => {
            btn.addEventListener('click', async () =>{
                const idTheme = parseInt(btn.getAttribute('data-id'), 10);
                let ownThisTheme = false;

                // check if html is not modified in devtools (the data-id)
                ownedThemes.forEach((theme) => {
                    if(theme.id_theme === idTheme)
                        ownThisTheme = true;
                });

                if (!ownThisTheme) {
                    fetchBuy(`/themes/${idTheme}`);
                }
            })
        });
    }

    if(themesOwnButtons) {
        themesOwnButtons.forEach((btn) => {
            btn.addEventListener('click', () =>{
                // check if html is not modified in devtools (the data-id)
                const idTheme = parseInt(btn.getAttribute('data-id'), 10);
                ownedThemes.forEach((theme) => {
                    if(theme.id_theme === idTheme)
                        console.log(`a le skin ${  theme.name_theme}`)
                });
            })
        });
    }
}

// The listenner to go back
function backListenner() {
    const backElement = document.querySelector('.back ');
    backElement.addEventListener('click', () =>{
        Navigate('/');
    })
}

// Fetch data from API
async function fetchData(url) {
    const response = await fetch(process.env.API_BASE_URL + url)
    if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
    const finalResponse = await response.json();
    return finalResponse;
}

// Fetch data from API
async function fetchBuy(url) {
    // const token = localStorage.getItem('token');

    const options = {
      method: 'PUT',
      body: JSON.stringify({
      }),
      headers: {
        'Content-Type': 'application/json',
        // Authorization: token,
      },
    };
    await fetch(process.env.API_BASE_URL + url, options);
}


// No right click on picture
document.addEventListener('contextmenu', (e) => {
    if (e.target.nodeName === "IMG") {
        e.preventDefault();
    }
});

export default ShopPage;
