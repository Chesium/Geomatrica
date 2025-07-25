import Mode from "../Mode";
import {dms} from "../drawingMode/dm";
import {shapes} from "../shape/shape"

/**
 * ## 欧几里得平面几何模式
 * 默认(现今也是唯一)的画板模式
 */
const Euclidean2D = new Mode("Euclidean2D", "Euclidean2D");

Euclidean2D.registerDrawingModes(dms);
Euclidean2D.defaultDrawingModeI = 2;

Euclidean2D.registerShapes(shapes);
// Euclidean2D.registerDefs(defs);


export default Euclidean2D;
