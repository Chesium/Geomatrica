import Mode from "../Mode";
import * as dm from "../drawingMode/dm";

var Euclidean2D = new Mode("Euclidean2D", "Euclidean2D");

Euclidean2D.registerDrawingMode(dm.dm_move);
Euclidean2D.registerDrawingMode(dm.dm_drawPoint);
Euclidean2D.registerDrawingMode(dm.dm_segment);
Euclidean2D.registerDrawingMode(dm.dm_halfLine);
Euclidean2D.registerDrawingMode(dm.dm_straightLine);
Euclidean2D.registerDrawingMode(dm.dm_extensionLine);
Euclidean2D.registerDrawingMode(dm.dm_CP_circle);
Euclidean2D.registerDrawingMode(dm.dm_intersection);

Euclidean2D.defaultDrawingModeI = 2;

export default Euclidean2D;
