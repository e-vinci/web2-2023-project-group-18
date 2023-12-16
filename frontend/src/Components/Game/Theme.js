import obstacleSmallSnow from '../../assets/winterTheme/caneRedSmall.png'; // TODO import la classe de biome et extraire les 3 obstacles
import obstacleMediumSnow from '../../assets/winterTheme/pineSapling.png'; // TODO import la classe de biome et extraire les 3 obstacles
import obstacleFlatSnow from '../../assets/winterTheme/spikesBottomAlt.png'; // TODO import la classe de biome et extraire les 3 obstacles

const THEMES = {
    snow: { firstGroundColor: "#DEFBFF", secondGroundColor:"#C9EDF0", obstacleSmall: obstacleSmallSnow, obstacleMedium: obstacleMediumSnow, obstacleFlat: obstacleFlatSnow},
    meadow: { firstGroundColor: "#689F50", secondGroundColor:"#4D8032" },
    desert: { firstGroundColor: "#E0CFAF", secondGroundColor:"#C0B68D" },
    mushroom: { firstGroundColor: "#7C7282", secondGroundColor:"#696170" },
    candy: { firstGroundColor: "#FFD1DC", secondGroundColor:"#ADD8E6" },
    alien: { firstGroundColor: "#7FFF7F", secondGroundColor:"#A020F0" },
    default: { firstGroundColor: "#DEFBFF", secondGroundColor:"#C9EDF0", obstacleSmall: obstacleSmallSnow, obstacleMedium: obstacleMediumSnow, obstacleFlat: obstacleFlatSnow}
};

export default class Theme {
    static getTheme() {
        const themeName = localStorage.getItem("theme");
        return THEMES[themeName] || THEMES.default;
    }

    static getGroundColor() {
        return Theme.getTheme().firstGroundColor.replace("#", "0x");
    }

    static getGroundTopLayerColor() {
        return Theme.getTheme().secondGroundColor.replace("#", "0x");
    }

    static getObstacleSmall() {
        return Theme.getTheme().obstacleSmall;
    }

    static getObstacleMedium() {
        return Theme.getTheme().obstacleMedium;
    }

    static getObstacleFlat() {
        return Theme.getTheme().obstacleFlat;
    }
    
}