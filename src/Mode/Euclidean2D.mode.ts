import Mode from "../Mode";
import * as dm from "../drawingMode/dm";
import point from "../shape/point";
import line from "../shape/line";
import circle from "../shape/circle";

/**
 * ## 欧几里得平面几何模式
 * 默认(现今也是唯一)的画板模式
 */
var Euclidean2D = new Mode("Euclidean2D", "Euclidean2D");

Euclidean2D.registerDrawingMode(dm.dm_move);
Euclidean2D.registerDrawingMode(dm.dm_drawPoint);
Euclidean2D.registerDrawingMode(dm.dm_segment);
Euclidean2D.registerDrawingMode(dm.dm_halfLine);
Euclidean2D.registerDrawingMode(dm.dm_straightLine);
Euclidean2D.registerDrawingMode(dm.dm_extensionLine);
Euclidean2D.registerDrawingMode(dm.dm_CP_circle);
Euclidean2D.registerDrawingMode(dm.dm_intersection);
Euclidean2D.registerDrawingMode(dm.dm_perpendicular);
Euclidean2D.registerDrawingMode(dm.dm_parallelLine);
Euclidean2D.registerDrawingMode(dm.dm_midPoint);
Euclidean2D.registerDrawingMode(dm.dm_angleBisector);
Euclidean2D.registerDrawingMode(dm.dm_tangent);
Euclidean2D.registerDrawingMode(dm.dm_perpendicularBisector);
Euclidean2D.registerDrawingMode(dm.dm_circumcircle);

Euclidean2D.registerShape(point);
Euclidean2D.registerShape(line);
Euclidean2D.registerShape(circle);

Euclidean2D.defaultDrawingModeI = 2;

export default Euclidean2D;
