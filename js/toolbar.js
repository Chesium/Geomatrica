
const toolbarApp = new PIXI.Application({
    antialias: true,
    resolution: window.devicePixelRatio || 1,
    autoDensity: true,
    backgroundAlpha: 0,
    resizeTo: document.querySelector('#toolbar-container'),
    view: document.querySelector('#toolbar'),
    backgroundColor: 0x000000,
    backgroundAlpha: 0.2
});

const toolbar = toolbarApp.stage;

const buttonSideL = 50;

const buttonsInterval = 6;

const buttonN = 7;

const buttonsCmode = [0, 1, 2, 3, 4, 5, 6];

const buttonNames = [
    "moveA",
    "segmentA",
    "pointA",
    "circleA",
    "lineA",
    "halflineA",
    "intersectionA"
];

var textures = Array.from({ length: 3 },
    (_, i) => Array.from({ length: buttonN },
        (__, j) => PIXI.Texture.from("assets/" + buttonNames[j] + i + ".svg")
    ));

var buttons = [];

for (let i = 0; i < buttonN; i++) {
    buttons.push(new PIXI.Sprite(textures[0][i]));
    buttons[i].width = buttonSideL;
    buttons[i].height = buttonSideL;
    buttons[i].x = buttonsInterval;
    buttons[i].y = (buttonSideL + buttonsInterval) * i + buttonsInterval;
    buttons[i].interactive = true;
    buttons[i].buttonMode = true;
    buttons[i].activated = false;
    buttons[i].on("mouseover", (event) => {
        buttons[i].texture = textures[1][i];
    });
    buttons[i].on("mouseout", (event) => {
        buttons[i].texture = textures[buttons[i].activated ? 2 : 0][i];
    });
    buttons[i].on("click", (event) => {
        switchCmode(i);
    });
    toolbar.addChild(buttons[i]);
}

function switchCmode(buttonI) {
    for (let i in buttons) {
        buttons[i].activated = i == buttonI;
        buttons[i].texture = textures[i == buttonI ? 2 : 0][i];
    }
    Cmode = buttonsCmode[buttonI];
}

switchCmode(1);