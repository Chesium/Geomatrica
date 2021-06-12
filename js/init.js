PIXI.settings.SORTABLE_CHILDREN = true;
const mainCanvasApp = new PIXI.Application({
    antialias: true,
    resolution: window.devicePixelRatio || 1,
    autoDensity: true,
    backgroundAlpha: 0,
    resizeTo: document.querySelector('#workarea-container'),
    view: document.querySelector('#workarea'),
    backgroundColor: 0x000000,
    backgroundAlpha: 0
});

const mainCanvas = mainCanvasApp.stage;

//越大越靠前
const zIofT=[10,5,5];
// var stageBound = [[30, 30], [800, 800]];

const _DefaultStyle_ = {
    point: {
        radius: 5,
        color: 0xff0000,
        alpha: 1,
        outline: {
            width: 1,
            color: 0x000000,
            cap: PIXI.LINE_CAP.ROUND,
        }
    },
    line: {
        width: 5,
        color: 0x000000,
        cap: PIXI.LINE_CAP.ROUND,
    },
    pointMargin: {
        radius: 10,
        color: 0xff0000,
        alpha: 0.2
    },
    lineMargin: {
        width: 10,
        color: 0x000000,
        alpha: 0.2,
        cap: PIXI.LINE_CAP.ROUND,
    },
    clickAreaPoint: {
        radius: 15,
        color: 0xffffff,
        alpha: 2e-3
    },
    clickAreaLine: {
        width: 15,
        color: 0xffffff,
        alpha: 2e-3
    },
}