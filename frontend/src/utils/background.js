const BACKGROUND_CLASS = {
    snow:     { background: "background_snow",      color: "body_color_snow" },
    meadow:   { background: "background_meadow",    color: "body_color_meadow" },
    desert:   { background: "background_desert",    color: "body_color_desert" },
    mushroom: { background: "background_mushroom",  color: "body_color_mushroom" },
    candy:    { background: "background_candy",     color: "body_color_candy" },
    alien:    { background: "background_alien",     color: "body_color_alien" },
    default:  { background: "background_snow",      color: "body_color_snow" }
};

const changeBackground = () => {
    const themeName = atob(localStorage.getItem("theme"));
    const backgroundColor = BACKGROUND_CLASS[themeName] || BACKGROUND_CLASS.default;

    const body = document.querySelector('body');
    const backgroundDiv = document.querySelector('#background');

    body.classList = [];
    backgroundDiv.classList = [];

    body.classList.add(backgroundColor.color);
    backgroundDiv.classList.add(backgroundColor.background);
}

export default changeBackground;