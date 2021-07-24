import Mode from "../Mode";
import * as dm from "../drawingMode/dm";

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

Euclidean2D.defaultDrawingModeI = 2;

export default Euclidean2D;
