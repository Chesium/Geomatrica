import { settings } from "pixi.js";
settings.SORTABLE_CHILDREN = true;

import canvas from "./canvas";
import Euclidean2D from "./Mode/Euclidean2D.mode";
import modeSwitch from "./modeSwitch";

import * as dm from "./drawingMode/dm";

var cv = new canvas(
  {
    antialias: true,
    resolution: window.devicePixelRatio || 1,
    autoDensity: true,
    resizeTo: document.getElementById("workarea-container"),
    view: document.querySelector("#workarea"),
    backgroundColor: 0x000000,
    backgroundAlpha: 0,
  },
  Euclidean2D
);

const toolbar = document.getElementById("toolbar");

const adr = (str: string) => "../assets/" + str;

var buttons = [
  new modeSwitch(cv, adr("move.svg"), toolbar, dm.dm_move),
  new modeSwitch(cv, adr("segment.svg"), toolbar, dm.dm_segment),
  new modeSwitch(cv, adr("point.svg"), toolbar, dm.dm_drawPoint),
  new modeSwitch(cv, adr("circle.svg"), toolbar, dm.dm_CP_circle),
  new modeSwitch(cv, adr("line.svg"), toolbar, dm.dm_straightLine),
  new modeSwitch(cv, adr("halfline.svg"), toolbar, dm.dm_halfLine),
  new modeSwitch(cv, adr("intersection.svg"), toolbar, dm.dm_intersection),
  new modeSwitch(cv, adr("perpendicular.svg"), toolbar, dm.dm_perpendicular),
  new modeSwitch(cv, adr("parallel.svg"), toolbar, dm.dm_parallelLine),
  new modeSwitch(cv, adr("extensionLine.svg"), toolbar, dm.dm_extensionLine),
  new modeSwitch(cv, adr("angleBisector.svg"), toolbar),
  new modeSwitch(cv, adr("tangent.svg"), toolbar),
  new modeSwitch(cv, adr("perpendicularBisector.svg"), toolbar),
  new modeSwitch(cv, adr("midPoint.svg"), toolbar, dm.dm_midPoint),
  new modeSwitch(cv, adr("circumcircle.svg"), toolbar),
];

for (let i in buttons) {
  buttons[i].activate();
}

buttons[1].element.setAttribute("checked", "");
