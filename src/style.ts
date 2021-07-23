import { LINE_CAP } from "pixi.js";

import { style } from "./misc";

var defaultStyle: style = {
  point: [
    {
      radius: 5,
      color: 0x1565c0,
      alpha: 1,
      outline: {
        width: 1,
        color: 0x000000,
        alpha: 1,
        cap: LINE_CAP.ROUND,
      },
    },
  ],
  line: [
    {
      width: 2.5,
      color: 0x7b7b7b,
      alpha: 1,
      cap: LINE_CAP.ROUND,
    },
  ],
};

var focusStyle: style = {
  point: [
    {
      //margin
      radius: 10,
      color: 0xff0000,
      alpha: 0.2,
      outline: {},
    },
    {
      radius: 5,
      color: 0x1565c0,
      alpha: 1,
      outline: {
        width: 1,
        color: 0x000000,
        alpha: 1,
        cap: LINE_CAP.ROUND,
      },
    },
  ],
  line: [
    {
      //margin
      width: 7,
      color: 0xdfdfdf,
      alpha: 1,
      cap: LINE_CAP.ROUND,
    },
    {
      width: 2.5,
      color: 0x7b7b7b,
      alpha: 1,
      cap: LINE_CAP.ROUND,
    },
  ],
};

export { defaultStyle, focusStyle };
