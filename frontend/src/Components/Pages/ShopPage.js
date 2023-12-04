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
        chooseListenner();
        buyListenner();
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

            let typeButton = `<button type="button" class="btn shop-buy-button shop-buy-skin">${skin.price} coins</button>`;
            
            if (ownedSkins.some(s => s.name_skin === skin.name_skin))
                typeButton = `<button type="button" class="btn shop-own-button shop-own-skin">Choose</button>`;

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

            let typeButton = `<button type="button" class="btn shop-buy-button shop-buy-theme">${theme.price} coins</button>`;
            if (ownedThemes.some(t => t.name_theme === theme.name_theme))
                typeButton = `<button type="button" class="btn shop-own-button shop-own-theme">Choose</button>`;

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

function chooseListenner() {
    const skinButton = document.querySelector('.shop-own-skin');
    const themeButton = document.querySelector('.shop-own-theme');

    if(skinButton) {
        skinButton.addEventListener('click', () =>{
            Navigate('/');
        })
    }

    if(skinButton) {
        themeButton.addEventListener('click', () =>{
            Navigate('/');
        })
    }
}

function buyListenner() {
    const skinButton = document.querySelector('.shop-buy-skin');
    const themeButton = document.querySelector('.shop-buy-theme');

    if(skinButton) {
        skinButton.addEventListener('click', () =>{
            Navigate('/');
        })
    }

    if(skinButton) {
        themeButton.addEventListener('click', () =>{
            Navigate('/');
        })
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

// No right click on picture
document.addEventListener('contextmenu', (e) => {
    if (e.target.nodeName === "IMG") {
        e.preventDefault();
    }
});

export default ShopPage;
