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

const SKINS_PER_PAGE = 6;
const THEMES_PER_PAGE = 6;
let currentSkinPage = 1;
let currentThemePage = 1;

// for test
const ownedSkins = ["dragon", "viper", "hydra", "wyvern"];
const ownedThemes = ["snow", "meadow", "forest", "plain", "rock"];

const ShopPage = () => {
    const numberCoins = 458; 

    renderShopPage(numberCoins);

    displayCurrentSkinPage(ownedSkins);
    displayCurrentThemePage(ownedThemes);

    changePageListenner();
    backListenner();
}

function renderShopPage(numberCoins) {
    const main = document.querySelector('main');

    const mainContent = `
    <div id="shop-page">
        <br>
        <div class="d-flex justify-content-between align-items-center position-relative m-3 mt-0 mb-0">
            <button class="shop-back-button btn-lg position-absolute bx bx-arrow-back" type="button"></button>
            <h1 class="mx-auto">Shop</h1>
        </div>

        <div class="container mb-4">
            <div class="row">
                <h4 class="text-left">Coins: <span id="shop-coins"></span></h4>
                <div class="col-md-6">
                    <div class="shop-part p-3">
                    
                        <h2 class="text-center">Characters</h1>

                        <div id="skin-list"></div>

                        <div class="d-flex justify-content-center mt-3">
                            <button type="button" id="previous-change-skin-page" class="change-page-button me-2">PREVIOUS</button>
                            <span id="skin-page-number" class="me-2"></span>
                            <button type="button" id="next-change-skin-page" class="change-page-button">NEXT</button>
                        </div>

                    </div>
                </div>
                <div class="col-md-6">
                    <div class="shop-part p-3">
                        <h2 class="text-center">Themes</h1>
                        
                        <div id="theme-list"></div>

                        <div class="d-flex justify-content-center mt-3">
                            <button type="button" id="previous-change-theme-page" class="change-page-button me-2">PREVIOUS</button>
                            <span id="theme-page-number" class="me-2"></span>
                            <button type="button" id="next-change-theme-page" class="change-page-button">NEXT</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
    `

    main.innerHTML = mainContent;

    const coins = document.querySelector('#shop-coins');

    anime({
        targets: coins,
        innerHTML: [0, numberCoins],
        easing: 'linear',
        round: 10,
        update(anim) {
            coins.innerHTML = anim.animations[0].currentValue.toFixed(0); 
        }
    });

}

function displayCurrentSkinPage(ownSkins) {
    const startIndex = (currentSkinPage - 1) * SKINS_PER_PAGE;
    const endIndex = startIndex + SKINS_PER_PAGE;
    const currentSkins = skinsList.slice(startIndex, endIndex);

    const skinListPage = document.getElementById('skin-list');
    const skinPageNumber = document.getElementById('skin-page-number');

    let skinHTML = '';

    for (let i = 0; i < currentSkins.length; i += 3) {
        skinHTML += '<div class="row">';

        for (let j = i; j < i+3 && j < currentSkins.length; j+= 1) {
            const skin = currentSkins[j];

            let typeButton;
            if (ownSkins.includes(skin.name.toLowerCase()))
                typeButton = `<button type="button" class="btn shop-own-button">Choose</button>`;
            else
                typeButton = `<button type="button" class="btn shop-buy-button">${skin.price} coins</button>`;

            skinHTML += `
                <div class="col-md-4 text-center">
                    <h3>${skin.name}</h3>
                    <img class="w-100 shop-picture" src="${templateSkinImage}" alt="skin picture ${skin.name}" draggable="false">
                    ${typeButton}
                </div>`;
        }

        skinHTML += '</div><br>';
    }

    skinPageNumber.innerHTML = `< ${currentSkinPage} > on < ${Math.ceil(skinsList.length/SKINS_PER_PAGE)} >`;
    skinListPage.innerHTML = skinHTML;
}

function displayCurrentThemePage(ownThemes) {
    const startIndex = (currentThemePage - 1) * THEMES_PER_PAGE;
    const endIndex = startIndex + THEMES_PER_PAGE;
    const currentThemes = themesList.slice(startIndex, endIndex);

    const themeListPage = document.getElementById('theme-list');
    const themePageNumber = document.getElementById('theme-page-number');

    let themeHTML = '';

    for (let i = 0; i < currentThemes.length; i += 3) {
        themeHTML += '<div class="row">';

        for (let j = i; j < i+3 && j < currentThemes.length; j+= 1) {
            const theme = currentThemes[j];

            let typeButton;
            if (ownThemes.includes(theme.name.toLowerCase()))
                typeButton = `<button type="button" class="btn shop-own-button">Choose</button>`;
            else
                typeButton = `<button type="button" class="btn shop-buy-button">${theme.price} coins</button>`;

            themeHTML += `
                <div class="col-md-4 text-center">
                    <h3>${theme.name}</h3>
                    <img class="w-100 shop-picture" src="${templateMapImage}" alt="theme picture ${theme.name}">
                    ${typeButton}
                </div>`;
        }

        themeHTML += '</div><br>';
    }

    themePageNumber.innerHTML = `< ${currentThemePage} > on < ${Math.ceil(themesList.length/THEMES_PER_PAGE)} >`;
    themeListPage.innerHTML = themeHTML;
}

function changePageListenner() {
    document.querySelector('#next-change-skin-page').addEventListener('click', () => {
        if (currentSkinPage < skinsList.length/SKINS_PER_PAGE) {
            currentSkinPage += 1;
            displayCurrentSkinPage(ownedSkins);
        }
    });

    document.querySelector('#previous-change-skin-page').addEventListener('click', () => {
        if (currentSkinPage > 1) {
            currentSkinPage -= 1;
            displayCurrentSkinPage(ownedSkins);
        }
    });

    document.querySelector('#next-change-theme-page').addEventListener('click', () => {
        if (currentThemePage < themesList.length/THEMES_PER_PAGE) {
            currentThemePage += 1;
            displayCurrentThemePage(ownedThemes);
        }
    });

    document.querySelector('#previous-change-theme-page').addEventListener('click', () => {
        if (currentThemePage > 1) {
            currentThemePage -= 1;
            displayCurrentThemePage(ownedThemes);
        }
    });
}

function backListenner() {
    const backElement = document.querySelector('.shop-back-button ');
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
