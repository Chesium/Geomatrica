require("../styles/styles.less");
require("../styles/nav.css");
require("katex/dist/katex.min.css");

import { settings } from "pixi.js";
settings.SORTABLE_CHILDREN = true;

import canvas from "./canvas";
import Euclidean2D from "./Mode/Euclidean2D.mode";
import ModeSwitch from "./modeSwitch";

import * as dm from "./drawingMode/dm";
// import menu, { navL1, navL2 } from "./menu";

import React from "react";
import * as ReactDOM from "react-dom";
import drawingMode from "./drawingMode";

document.title = "Geomatrica";
var favicon = document.createElement("link");
favicon.type = "image/png";
favicon.rel = "icon";
favicon.href = "../favicon.png";
document.getElementsByTagName("head")[0].appendChild(favicon);

var root = document.createElement("div");
root.id = "root";
document.getElementsByTagName("body")[0].appendChild(root);

var app = (
  <div id="main">
    <div id="toolbar" />
    <img id="icon" src="../assets/chesium2.png" />
    <div id="header">
      <div id="headerID" />
      <img id="gm-logo" src="../assets/Geomatrica-icon.svg" />
    </div>
    <div id="workarea-container">
      <canvas id="workarea" />
    </div>
  </div>
);

ReactDOM.render(app, document.getElementById("root"));

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

var buttons: [string, drawingMode | undefined][] = [
  ["move", dm.dm_move],
  ["segment", dm.dm_segment],
  ["point", dm.dm_drawPoint],
  ["circle", dm.dm_CP_circle],
  ["line", dm.dm_straightLine],
  ["halfline", dm.dm_halfLine],
  ["intersection", dm.dm_intersection],
  ["perpendicular", dm.dm_perpendicular],
  ["parallel", dm.dm_parallelLine],
  ["extensionLine", dm.dm_extensionLine],
  ["angleBisector", dm.dm_angleBisector],
  ["tangent", undefined],
  ["perpendicularBisector", undefined],
  ["midPoint", dm.dm_midPoint],
  ["circumcircle", undefined],
];
ReactDOM.render(
  buttons.map((v: [string, drawingMode | undefined]) => (
    <ModeSwitch key={v[0]} canvas={cv} iconSrc={"../assets/" + v[0] + ".svg"} drawingMode={v[1]} />
  )),
  document.getElementById("toolbar")
);

// <img class="expand-icon" src="../assets/expand.svg">

// var mainMenu = new menu(cv, document.getElementById("header"));

// var t1 = document.createElement("div");
// t1.innerHTML = "<p>文件(F)</p>";
// var n1 = new navL1(mainMenu, { name: "file", context: t1 });
// /****/
// var t11 = document.createElement("div");
// t11.innerHTML = '<p class="p-left">新建画板</p>';
// var n11 = new navL2(n1, { name: "new", context: t11 }, true);
// var t12 = document.createElement("div");
// t12.innerHTML = '<p class="p-left">导入画板...</p>';
// var n12 = new navL2(n1, { name: "import", context: t12 }, false);
// var t13 = document.createElement("div");
// t13.innerHTML = '<p class="p-left">导出画板</p><p class="p-right">Ctrl+S</p>';
// var n13 = new navL2(n1, { name: "export", context: t13 }, false);

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
