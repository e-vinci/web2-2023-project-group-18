const THEMES = {
    snow: { firstGroundColor: "#DEFBFF", secondGroundColor:"#C9EDF0" },
    meadow: { firstGroundColor: "#689F50", secondGroundColor:"#4D8032" },
    desert: { firstGroundColor: "#E0CFAF", secondGroundColor:"#C0B68D" },
    mushroom: { firstGroundColor: "#7C7282", secondGroundColor:"#696170" },
    candy: { firstGroundColor: "#FFD1DC", secondGroundColor:"#ADD8E6" },
    alien: { firstGroundColor: "#7FFF7F", secondGroundColor:"#A020F0" },
    default: { firstGroundColor: "#DEFBFF", secondGroundColor:"#C9EDF0" }
};

export default class Theme {
    static getThemeFirstGroundColor() {
        const themeName = localStorage.getItem("theme");
        const selectedTheme = THEMES[themeName] || THEMES.default;
      
        return selectedTheme.firstGroundColor.replace("#", "0x");
    }

    static getThemeSecondGroundColor() {
        const themeName = localStorage.getItem("theme");
        const selectedTheme = THEMES[themeName] || THEMES.default;

        return selectedTheme.secondGroundColor.replace("#", "0x");
    }

    
}