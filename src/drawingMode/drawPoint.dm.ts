import drawingMode from "../drawingMode";
import canvas from "../canvas";
import pointOnLine from "../shape/point/pointOnShape/pointOnLine";
import pointOnCircle from "../shape/point/pointOnShape/pointOnCircle";
import { crd } from "../misc";
import freePoint from "../shape/point/freepoint";

var dm_drawPoint = new drawingMode();
dm_drawPoint.name = "draw points";
dm_drawPoint.title = "描点";
dm_drawPoint.description = "画点";
dm_drawPoint.rootCase = {};

dm_drawPoint.rootCase.blank = {
  processFn(canvas: canvas, crd: crd) {
    new freePoint(canvas, crd.x, crd.y);
    canvas.resetChoosing();
  },
};

dm_drawPoint.rootCase.point = {
  // nextType: "end",
  processFn(canvas: canvas) {
    canvas.resetChoosing();
  },
};

dm_drawPoint.rootCase.line = {
  // nextType: "end",
  processFn(canvas: canvas, crd: crd) {
    new pointOnLine(canvas, canvas.chooseObjs.line[0], crd.x, crd.y);
    canvas.resetChoosing();
  },
};

dm_drawPoint.rootCase.circle = {
  // nextType: "end",
  processFn(canvas: canvas, crd: crd) {
    new pointOnCircle(canvas, canvas.chooseObjs.circle[0], crd.x, crd.y);
    canvas.resetChoosing();
  },
};

export default dm_drawPoint;
