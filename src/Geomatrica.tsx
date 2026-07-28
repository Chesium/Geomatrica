import "../styles/styles.css";
import "../styles/nav.css";
import "katex/dist/katex.min.css";

import { settings } from "pixi.js";
import App from "./app";
import drawingMode from "./drawingMode";
import * as dm from "./drawingMode/dm";

settings.SORTABLE_CHILDREN = true;

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

export default function Geomatrica() {
  return <App buttons={buttons} />;
}
