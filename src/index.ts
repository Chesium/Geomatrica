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
  new modeSwitch(cv, "移动", adr("move.svg"), toolbar, dm.dm_move),
  new modeSwitch(cv, "线段", adr("segment.svg"), toolbar, dm.dm_segment),
  new modeSwitch(cv, "画点", adr("point.svg"), toolbar, dm.dm_drawPoint),
  new modeSwitch(cv, "画圆", adr("circle.svg"), toolbar, dm.dm_CP_circle),
  new modeSwitch(cv, "直线", adr("line.svg"), toolbar, dm.dm_straightLine),
  new modeSwitch(cv, "射线", adr("halfline.svg"), toolbar, dm.dm_halfLine),
  new modeSwitch(cv, "交点", adr("intersection.svg"), toolbar, dm.dm_intersection),
  new modeSwitch(cv, "垂线", adr("perpendicular.svg"), toolbar),
  new modeSwitch(cv, "平行线", adr("parallel.svg"), toolbar),
  new modeSwitch(cv, "延长线", adr("extensionLine.svg"), toolbar, dm.dm_extensionLine),
  new modeSwitch(cv, "角平分线", adr("angleBisector.svg"), toolbar),
  new modeSwitch(cv, "切线", adr("tangent.svg"), toolbar),
  new modeSwitch(cv, "中垂线", adr("perpendicularBisector.svg"), toolbar),
  new modeSwitch(cv, "中点", adr("midPoint.svg"), toolbar),
  new modeSwitch(cv, "外接圆", adr("circumcircle.svg"), toolbar),
];

for (let i in buttons) {
  buttons[i].activate();
}

buttons[1].element.setAttribute("checked", "");
