import { settings } from "pixi.js";
settings.SORTABLE_CHILDREN = true;

import canvas from "./canvas";
import Euclidean2D from "./Mode/Euclidean2D.mode";
import modeSwitch from "./modeSwitch";

import * as dm from "./drawingMode/dm";
import menu, { navL1, navL2 } from "./menu";

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
  new modeSwitch(cv, adr("angleBisector.svg"), toolbar, dm.dm_angleBisector),
  new modeSwitch(cv, adr("tangent.svg"), toolbar),
  new modeSwitch(cv, adr("perpendicularBisector.svg"), toolbar),
  new modeSwitch(cv, adr("midPoint.svg"), toolbar, dm.dm_midPoint),
  new modeSwitch(cv, adr("circumcircle.svg"), toolbar),
];

for (let i in buttons) {
  buttons[i].activate();
}

// <img class="expand-icon" src="../assets/expand.svg">

buttons[1].element.setAttribute("checked", "");

var mainMenu = new menu(cv, document.getElementById("header"));

var t1 = document.createElement("div");
t1.innerHTML = "<p>文件(F)</p>";
var n1 = new navL1(mainMenu, { name: "file", context: t1 });
/****/
var t11 = document.createElement("div");
t11.innerHTML = '<p class="p-left">新建画板</p>';
var n11 = new navL2(n1, { name: "new", context: t11 }, true);
var t12 = document.createElement("div");
t12.innerHTML = '<p class="p-left">导入画板...</p>';
var n12 = new navL2(n1, { name: "import", context: t12 }, false);
var t13 = document.createElement("div");
t13.innerHTML = '<p class="p-left">导出画板</p><p class="p-right">Ctrl+S</p>';
var n13 = new navL2(n1, { name: "export", context: t13 }, false);

// var t2 = document.createElement("div");
// t2.innerHTML = "<p>编辑(E)</p>";
// var n2 = new navL1(mainMenu, { name: "edit", context: t2 });
// /****/
// var t21 = document.createElement("div");
// t21.innerHTML = '<p class="p-left">撤销</p><p class="p-right">Ctrl+Z</p>';
// var n11 = new navL2(n2, { name: "undo", context: t21 }, false);
// var t22 = document.createElement("div");
// t22.innerHTML = '<p class="p-left">重做</p><p class="p-right">Ctrl+Y</p>';
// var n12 = new navL2(n2, { name: "redo", context: t22 }, false);
// var t23 = document.createElement("div");
// t23.innerHTML = '<p class="p-left">查找</p><p class="p-right">Ctrl+F</p>';
// var n13 = new navL2(n2, { name: "search", context: t23 }, false);

// var t3 = document.createElement("div");
// t3.innerHTML = "<p>显示(D)</p>";
// var n3 = new navL1(mainMenu, { name: "display", context: t3 });
// /****/
// var t31 = document.createElement("div");
// t31.innerHTML = '<p class="p-left">显示坐标轴</p>';
// var n11 = new navL2(n3, { name: "display axes", context: t31 }, false);
// var t32 = document.createElement("div");
// t32.innerHTML = '<p class="p-left">隐藏对象</p>';
// var n12 = new navL2(n3, { name: "hide object", context: t32 }, false);
// var t33 = document.createElement("div");
// t33.innerHTML = '<p class="p-left">显示网格</p>';
// var n13 = new navL2(n3, { name: "display grid", context: t33 }, false);
