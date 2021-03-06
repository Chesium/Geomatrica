require("../styles/styles.less");
require("../styles/nav.css");
require("katex/dist/katex.min.css");
require("../favicon.png");

import { settings } from "pixi.js";
settings.SORTABLE_CHILDREN = true;
import * as dm from "./drawingMode/dm";
import React from "react";
import * as ReactDOM from "react-dom";
import drawingMode from "./drawingMode";
import App from "./app";

document.title = "Geomatrica";
var favicon = document.createElement("link");
favicon.type = "image/png";
favicon.rel = "icon";
favicon.href = "favicon.png";
document.getElementsByTagName("head")[0].appendChild(favicon);

var root = document.createElement("div");
root.id = "root";
document.getElementsByTagName("body")[0].appendChild(root);

var buttons: [string, drawingMode | undefined][] = [
  ["move", dm.dm_move],
  ["segment", dm.dm_segment],
  ["freepoint", dm.dm_drawPoint],
  ["CP_circle", dm.dm_CP_circle],
  ["straightLine", dm.dm_straightLine],
  ["halfLine", dm.dm_halfLine],
  ["intersection", dm.dm_intersection],
  ["perpendicular", dm.dm_perpendicular],
  ["parallelLine", dm.dm_parallelLine],
  ["extensionLine", dm.dm_extensionLine],
  ["angleBisector", dm.dm_angleBisector],
  ["tangent", dm.dm_tangent],
  ["perpendicularBisector", dm.dm_perpendicularBisector],
  ["midPoint", dm.dm_midPoint],
  ["circumcircle", dm.dm_circumcircle],
];

ReactDOM.render(<App buttons={buttons} />, document.getElementById("root"));
