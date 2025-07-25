import "../styles/styles.css";
import "../styles/nav.css";
import "katex/dist/katex.min.css";

import { settings } from "pixi.js";
settings.SORTABLE_CHILDREN = true;
import drawingMode from "./drawingMode";
import * as dm from "./drawingMode/dm";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";

document.title = "Geomatrica";
const favicon = document.createElement("link");
favicon.type = "image/png";
favicon.rel = "icon";
favicon.href = "favicon.png";
document.getElementsByTagName("head")[0].appendChild(favicon);

const root = document.createElement("div");
root.id = "root";
document.getElementsByTagName("body")[0].appendChild(root);

const buttons: [string, drawingMode | undefined][] = [
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

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App buttons={buttons} />);
}
