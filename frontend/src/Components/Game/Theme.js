// snow theme obstacle
import obstacleSmallSnow from '../../assets/themes/snow/caneRedSmall.png'; 
import obstacleMediumSnow from '../../assets/themes/snow/pineSapling.png'; 
import obstacleFlatSnow from '../../assets/themes/snow/spikesBottomAlt.png'; 
// meadow theme obstacle
import obstacleSmallMeadow from '../../assets/themes/meadow/rockMoss.png'; 
import obstacleMediumMeadow from '../../assets/themes/meadow/fence.png'; 
import obstacleFlatMeadow from '../../assets/themes/meadow/signRight.png'; 
// desert theme obstacle
import obstacleSmallDesert from '../../assets/themes/desert/cactus.png'; 
import obstacleMediumDesert from '../../assets/themes/desert/box.png'; 
import obstacleFlatDesert from '../../assets/themes/desert/fenceBroken.png'; 
// mushroom theme obstacle
import obstacleSmallMushroom from '../../assets/themes/mushroom/redMushroom.png'; 
import obstacleMediumMushroom from '../../assets/themes/mushroom/bigMushroom.png'; 
import obstacleFlatMushroom from '../../assets/themes/mushroom/brownMushroom.png'; 


const THEMES = {
    snow:     { groundColor: "#DEFBFF", groundTopLayerColor: "#C9EDF0", obstacleSmall: obstacleSmallSnow, obstacleMedium: obstacleMediumSnow, obstacleFlat: obstacleFlatSnow },
    meadow:   { groundColor: "#689F50", groundTopLayerColor: "#4D8032", obstacleSmall: obstacleSmallMeadow, obstacleMedium: obstacleMediumMeadow, obstacleFlat: obstacleFlatMeadow },
    desert:   { groundColor: "#E0CFAF", groundTopLayerColor: "#C0B68D", obstacleSmall: obstacleSmallDesert, obstacleMedium: obstacleMediumDesert, obstacleFlat: obstacleFlatDesert },
    mushroom: { groundColor: "#7C7282", groundTopLayerColor: "#696170", obstacleSmall: obstacleSmallMushroom, obstacleMedium: obstacleMediumMushroom, obstacleFlat: obstacleFlatMushroom },
    candy:    { groundColor: "#FFD1DC", groundTopLayerColor: "#ADD8E6" },
    alien:    { groundColor: "#7FFF7F", groundTopLayerColor: "#A020F0" },
    default:  { groundColor: "#DEFBFF", groundTopLayerColor: "#C9EDF0", obstacleSmall: obstacleSmallSnow, obstacleMedium: obstacleMediumSnow, obstacleFlat: obstacleFlatSnow }
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
        return Theme.getTheme().obstacleSmall;
    }

    static getObstacleMedium() {
        return Theme.getTheme().obstacleMedium;
    }

    static getObstacleFlat() {
        return Theme.getTheme().obstacleFlat;
    }
    
}