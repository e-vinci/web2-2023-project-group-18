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
    { name: "Neige", price: 100 },
    { name: "Prairie", price: 200 },
    { name: "Désert", price: 300 },
    { name: "Taïga", price: 400 },
    { name: "Forêt", price: 500 },
    { name: "Toundra", price: 600 },
    { name: "Océan", price: 700 },
    { name: "Marais", price: 800 },
    { name: "Montagne", price: 900 },
    { name: "Plaine", price: 1000 },
    { name: "Roche", price: 1250 },
    { name: "Jungle", price: 1500 }
];

const skinsPerPage = 6;
const themesPerPage = 6;
let currentSkinPage = 1;
let currentThemePage = 1;

const ShopPage = () => {
    const numberCoins = 458; 

    renderShopPage(numberCoins);
    
    displayCurrentSkinPage();
    displayCurrentThemePage();

    changePageListenner();
    backListenner();
}

function renderShopPage(numberCoins) {
    const main = document.querySelector('main');

    const mainContent = `
    <div>
        <div class="d-flex justify-content-between align-items-center position-relative m-3">
            <h1 class="mx-auto">Store</h1>
            <button type="button" class="back btn btn-primary btn-lg position-absolute top-0 end-0">Back</button>
        </div>

        <div class="container mt-3 mb-4">
            <div class="row">
                <h4 class="text-left">Coins: ${numberCoins}</h4>
                <div class="col-md-6">
                    <div class="border rounded p-3">
                    
                        <h1 class="text-center">Characters</h1>

                        <div id="skin-list"></div>

                        <div class="d-flex justify-content-center mt-3">
                            <button type="button" id="previous-change-skin-page" class="change-page-button me-2">PREVIOUS</button>
                            <span id="skin-page-number" class="me-2"></span>
                            <button type="button" id="next-change-skin-page" class="change-page-button">NEXT</button>
                        </div>

                    </div>
                </div>
                <div class="col-md-6">
                    <div class="border rounded p-3">
                        <h1 class="text-center">Themes</h1>
                        
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

            skinHTML += `
                <div class="col-md-4 text-center">
                    <h3>${skin.name}</h3>
                    <img class="w-100 rounded" src="${templateSkinImage}" alt="Image du skin ${skin.name}">
                    <button type="button" class="btn btn-primary">${skin.price} coins</button>
                </div>
            `;
        }

        skinHTML += '</div>';
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

            themeHTML += `
                <div class="col-md-4 text-center">
                    <h3>${theme.name}</h3>
                    <img class="w-100 rounded" src="${templateMapImage}" alt="Image du theme ${theme.name}">
                    <button type="button" class="btn btn-primary">${theme.price} coins</button>
                </div>
            `;
        }

        themeHTML += '</div>';
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
    const backElement = document.querySelector('.back');
    backElement.addEventListener('click', () =>{
        Navigate('/');
    })
}

export default ShopPage;
