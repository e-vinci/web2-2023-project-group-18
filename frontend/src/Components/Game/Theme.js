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
    snow:     { small: smallSnow,       medium: mediumSnow,     flat: flatSnow,     heightSmall: 0,   heightMedium: 0,   heightFlat: 0 },
    meadow:   { small: smallMeadow,     medium: mediumMeadow,   flat: flatMeadow,   heightSmall: 0,   heightMedium: 0,   heightFlat: 0  },
    desert:   { small: smallDesert,     medium: mediumDesert,   flat: flatDesert,   heightSmall: 0,   heightMedium: 0,   heightFlat: 0  },
    mushroom: { small: smallMushroom,   medium: mediumMushroom, flat: flatMushroom, heightSmall: 0,   heightMedium: 0,   heightFlat: 0  },
    candy:    { small: smallCandy,      medium: mediumCandy,    flat: flatCandy,    heightSmall: 0,   heightMedium: 0,   heightFlat: 0  },
    alien:    { small: smallAlien,      medium: mediumAlien,    flat: flatAlien,    heightSmall: 0,   heightMedium: 0,   heightFlat: 0  },
    default:  { small: smallSnow,       medium: mediumSnow,     flat: flatSnow,     heightSmall: 0,   heightMedium: 0,   heightFlat: 0  }
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

export default class Theme {
    static getTheme() {
        const themeName = localStorage.getItem("theme");
        return THEMES[themeName] || THEMES.default;
    }

    static getGroundColor() {
        return Theme.getTheme().groundColor.replace("#", "0x");
    }

    static getGroundTopLayerColor() {
        return Theme.getTheme().groundTopLayerColor.replace("#", "0x");
    }

    static getObstacleSmall() {
        return Theme.getTheme().obstacles.small;
    }

    static getObstacleMedium() {
        return Theme.getTheme().obstacles.medium;
    }

    static getObstacleFlat() {
        return Theme.getTheme().obstacles.flat;
    }
    
}