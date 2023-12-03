import anime from 'animejs/lib/anime.es';
import Navigate from '../Router/Navigate';
import templateSkinImage from '../../assets/templateSkinShopPage.png';
import templateMapImage from '../../assets/templateMapShopPage.png';

const skinsList = [
    { name: "Dragon", price: 100 },
    { name: "Phoenix", price: 200 },
    { name: "Spectre", price: 300 },
    { name: "Viper", price: 400 },
    { name: "Raven", price: 500 },
    { name: "Hydra", price: 600 },
    { name: "Banshee", price: 700 },
    { name: "Serpent", price: 800 },
    { name: "Gorgon", price: 900 },
    { name: "Chimera", price: 1000 },
    { name: "Wyvern", price: 1250 },
    { name: "Harpy", price: 1500 }
];

const themesList = [
    { name: "Snow", price: 100 },
    { name: "Meadow", price: 200 },
    { name: "Desert", price: 300 },
    { name: "Taiga", price: 400 },
    { name: "Forest", price: 500 },
    { name: "Tundra", price: 600 },
    { name: "Ocean", price: 700 },
    { name: "Swamp", price: 800 },
    { name: "Mountain", price: 900 },
    { name: "Plain", price: 1000 },
    { name: "Rock", price: 1250 },
    { name: "Jungle", price: 1500 }
];

let skinsPerPage = 6;
let themesPerPage = 6;
let currentSkinPage = 1;
let currentThemePage = 1;

let coins = 0;
let ownedSkins = [];
let ownedThemes = [];

const ShopPage = () => {
    coins = 458;
    ownedSkins = ["dragon", "viper", "hydra", "wyvern"];
    ownedThemes = ["snow", "meadow", "forest", "plain", "rock"];

    renderShopPage();

    displayCurrentSkinPage();
    displayCurrentThemePage();

    changePageListenner();
    backListenner();
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

            let typeButton = `<button type="button" class="btn shop-buy-button">${skin.price} coins</button>`;
            if (ownedSkins.includes(skin.name.toLowerCase()))
                typeButton = `<button type="button" class="btn shop-own-button">Choose</button>`;

            skinHTML += `
                <div class="col-md-4 text-center">
                    <h3>${skin.name}</h3>
                    <img class="w-100 shop-picture" src="${templateSkinImage}" alt="skin picture ${skin.name}" draggable="false">
                    ${typeButton}
                </div>`;
        }

        skinHTML += '</div><br>';
    }

    skinPageNumber.innerHTML = `< ${currentSkinPage} > on < ${Math.ceil(skinsList.length/skinsPerPage)} >`;
    skinListPage.innerHTML = skinHTML;
}

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

            let typeButton = `<button type="button" class="btn shop-buy-button">${theme.price} coins</button>`;
            if (ownedThemes.includes(theme.name.toLowerCase()))
                typeButton = `<button type="button" class="btn shop-own-button">Choose</button>`;

            themeHTML += `
                <div class="col-md-4 text-center">
                    <h3>${theme.name}</h3>
                    <img class="w-100 shop-picture" src="${templateMapImage}" alt="theme picture ${theme.name}">
                    ${typeButton}
                </div>`;
        }

        themeHTML += '</div><br>';
    }

    themePageNumber.innerHTML = `< ${currentThemePage} > on < ${Math.ceil(themesList.length/themesPerPage)} >`;
    themeListPage.innerHTML = themeHTML;
}

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

function backListenner() {
    const backElement = document.querySelector('.back ');
    backElement.addEventListener('click', () =>{
        Navigate('/');
    })
}

// No right click on picture
document.addEventListener('contextmenu', (e) => {
    if (e.target.nodeName === "IMG") {
        e.preventDefault();
    }
});

export default ShopPage;
