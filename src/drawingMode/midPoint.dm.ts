import drawingMode from "../drawingMode";
import canvas from "../canvas";
import midPoint from "../shape/point/midPoint";

var dm_midPoint = new drawingMode();
dm_midPoint.name = "draw midPoint";
dm_midPoint.title = "中点";
dm_midPoint.description = "选中两点作其中点";
dm_midPoint.rootCase = {};
dm_midPoint.rootCase.point = {};
dm_midPoint.rootCase.point.point={
  processFn(canvas: canvas) {
    new midPoint(canvas, canvas.chooseObjs.point[0], canvas.chooseObjs.point[1]);
    canvas.resetChoosing();
  },
};

export default dm_midPoint;
