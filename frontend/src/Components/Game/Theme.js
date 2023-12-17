// snow theme obstacle
import smallSnow from '../../assets/themes/snow/caneRedSmall.png'; 
import mediumSnow from '../../assets/themes/snow/pineSapling.png'; 
import flatSnow from '../../assets/themes/snow/spikesBottomAlt.png'; 
// meadow theme obstacle
import smallMeadow from '../../assets/themes/meadow/rockMoss.png'; 
import mediumMeadow from '../../assets/themes/meadow/fence.png'; 
import flatMeadow from '../../assets/themes/meadow/signRight.png'; 
// desert theme obstacle
import smallDesert from '../../assets/themes/desert/cactus.png'; 
import mediumDesert from '../../assets/themes/desert/box.png'; 
import flatDesert from '../../assets/themes/desert/fenceBroken.png'; 
// mushroom theme obstacle
import smallMushroom from '../../assets/themes/mushroom/redMushroom.png'; 
import mediumMushroom from '../../assets/themes/mushroom/bigMushroom.png'; 
import flatMushroom from '../../assets/themes/mushroom/brownMushroom.png'; 
// candy theme obstacle
import smallCandy from '../../assets/themes/candy/canePink.png'; 
import mediumCandy from '../../assets/themes/candy/candyTree.png'; 
import flatCandy from '../../assets/themes/candy/candyBlue.png'; 
// alien theme obstacle
import smallAlien from '../../assets/themes/alien/alienGreen.png';
import mediumAlien from '../../assets/themes/alien/alienPink.png'; 
import flatAlien from '../../assets/themes/alien/alienBlue.png'; 

const OBSTACLES = {
    snow:     { small: smallSnow,       medium: mediumSnow,     flat: flatSnow,     heightSmall: -30,   heightMedium: -30,   heightFlat: -30 },
    meadow:   { small: smallMeadow,     medium: mediumMeadow,   flat: flatMeadow,   heightSmall: -10,   heightMedium: -25,   heightFlat: -30  },
    desert:   { small: smallDesert,     medium: mediumDesert,   flat: flatDesert,   heightSmall: -30,   heightMedium: -30,   heightFlat: -25  },
    mushroom: { small: smallMushroom,   medium: mediumMushroom, flat: flatMushroom, heightSmall: -20,   heightMedium: -20,   heightFlat: -15  },
    candy:    { small: smallCandy,      medium: mediumCandy,    flat: flatCandy,    heightSmall: -30,   heightMedium: -60,   heightFlat: -10  },
    alien:    { small: smallAlien,      medium: mediumAlien,    flat: flatAlien,    heightSmall: -40,   heightMedium: -40,   heightFlat: -30  },
    default:  { small: smallSnow,       medium: mediumSnow,     flat: flatSnow,     heightSmall: -30,   heightMedium: -30,   heightFlat: -30  }
};

const THEMES = {
    snow:     { groundColor: "#DEFBFF", groundTopLayerColor: "#C9EDF0", obstacles: OBSTACLES.snow},
    meadow:   { groundColor: "#689F50", groundTopLayerColor: "#4D8032", obstacles: OBSTACLES.meadow },
    desert:   { groundColor: "#E0CFAF", groundTopLayerColor: "#C0B68D", obstacles: OBSTACLES.desert },
    mushroom: { groundColor: "#7C7282", groundTopLayerColor: "#696170", obstacles: OBSTACLES.mushroom },
    candy:    { groundColor: "#FFD1DC", groundTopLayerColor: "#ADD8E6", obstacles: OBSTACLES.candy },
    alien:    { groundColor: "#7FFF7F", groundTopLayerColor: "#A020F0", obstacles: OBSTACLES.alien },
    default:  { groundColor: "#DEFBFF", groundTopLayerColor: "#C9EDF0", obstacles: OBSTACLES.default }
};

let currentTheme;

export default class Theme {
    static setTheme() {
        const themeName = atob(localStorage.getItem("theme"));
        currentTheme = THEMES[themeName] || THEMES.default;
    }

    static getGroundColor() {
        return currentTheme.groundColor.replace("#", "0x");
    }

    static getGroundTopLayerColor() {
        return currentTheme.groundTopLayerColor.replace("#", "0x");
    }

    static getObstacleSmall() {
        return currentTheme.obstacles.small;
    }

    static getObstacleMedium() {
        return currentTheme.obstacles.medium;
    }

    static getObstacleFlat() {
        return currentTheme.obstacles.flat;
    }

    static getHeightObstacleSmall() {
        return currentTheme.obstacles.heightSmall;
    }

    static getHeightObstacleMedium() {
        return currentTheme.obstacles.heightMedium;
    }

    static getHeightObstacleFlat() {
        return currentTheme.obstacles.heightFlat;
    }
    
}