const PIXI = require("pixi.js");
const Dfsty = [
  {
    //[0]Default
    p: {
      radius: 5,
      color: 0x1565c0,
      alpha: 1,
      ol: {
        width: 1,
        color: 0x000000,
        alpha: 1,
        cap: PIXI.LINE_CAP.ROUND,
      },
      margin: {
        radius: 0,
        color: 0xff0000,
        alpha: 0.2,
      },
    },
    l: {
      body: {
        width: 2.5,
        color: 0x7b7b7b,
        alpha: 1,
        cap: PIXI.LINE_CAP.ROUND,
      },
      margin: {
        width: 0,
        color: 0x000000,
        alpha: 0.2,
        cap: PIXI.LINE_CAP.ROUND,
      },
    },
  },
  {
    //[0]choose
    p: {
      radius: 5,
      color: 0x1565c0,
      alpha: 1,
      ol: {
        width: 1,
        color: 0x000000,
        alpha: 1,
        cap: PIXI.LINE_CAP.ROUND,
      },
      margin: {
        radius: 10,
        color: 0xff0000,
        alpha: 0.2,
      },
    },
    l: {
      body: {
        width: 2.5,
        color: 0x7b7b7b,
        alpha: 1,
        cap: PIXI.LINE_CAP.ROUND,
      },
      margin: {
        width: 7,
        color: 0xdfdfdf,
        alpha: 1,
        cap: PIXI.LINE_CAP.ROUND,
      },
    },
  },
];

export {Dfsty};