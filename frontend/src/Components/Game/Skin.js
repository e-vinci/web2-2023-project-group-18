// skins picture import 
import santaAsset from '../../assets/skins/santa.png';
import redhatAsset from '../../assets/skins/redhat.png';
import jackAsset from '../../assets/skins/jack.png';
import catAsset from '../../assets/skins/cat.png';
import dogAsset from '../../assets/skins/dog.png';
import explorerAsset from '../../assets/skins/explorer.png';
import adventurerAsset from '../../assets/skins/adventurer.png';
import ninjaboyAsset from '../../assets/skins/ninjaboy.png';
import ninjagirlAsset from '../../assets/skins/ninjagirl.png';
import robotAsset from '../../assets/skins/robot.png';

// skins JSON import 
import santaAssetJSON from '../../assets/skins/santa.json';
import redhatAssetJSON from '../../assets/skins/redhat.json';
import jackAssetJSON from '../../assets/skins/jack.json';
import catAssetJSON from '../../assets/skins/cat.json';
import dogAssetJSON from '../../assets/skins/dog.json';
import explorerAssetJSON from '../../assets/skins/explorer.json';
import adventurerAssetJSON from '../../assets/skins/adventurer.json';
import ninjaboyAssetJSON from '../../assets/skins/ninjaboy.json';
import ninjagirlAssetJSON from '../../assets/skins/ninjagirl.json';
import robotAssetJSON from '../../assets/skins/robot.json';

const SKINS = {
    redhat: { asset: redhatAsset, assetJSON: redhatAssetJSON },
    jack: { asset: jackAsset, assetJSON: jackAssetJSON },
    cat: { asset: catAsset, assetJSON: catAssetJSON },
    dog: { asset: dogAsset, assetJSON: dogAssetJSON },
    explorer: { asset: explorerAsset, assetJSON: explorerAssetJSON },
    adventurer: { asset: adventurerAsset, assetJSON: adventurerAssetJSON },
    ninjaboy: { asset: ninjaboyAsset, assetJSON: ninjaboyAssetJSON },
    ninjagirl: { asset: ninjagirlAsset, assetJSON: ninjagirlAssetJSON },
    robot: { asset: robotAsset, assetJSON: robotAssetJSON },
    default: { asset: santaAsset, assetJSON: santaAssetJSON }
};

export default class Skin {
    static getSkinPicture() {
        const skinName = localStorage.getItem("skin");
        const selectedSkin = SKINS[skinName] || SKINS.default;
      
        return selectedSkin.asset;
    }

    static getSkinJSON() {
        const skinName = localStorage.getItem("skin");
        const selectedSkin = SKINS[skinName] || SKINS.default;
      
        return selectedSkin.assetJSON;
    }
}