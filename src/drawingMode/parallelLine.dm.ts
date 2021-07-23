import drawingMode from "../drawingMode";
import canvas from "../canvas";
import parallelLine from "../shape/line/parallelLine";

var dm_parallelLine = new drawingMode();
dm_parallelLine.name = "draw parallelLine";
dm_parallelLine.title = "平行线";
dm_parallelLine.description = "选中一点和一线作过此点的平行线";
dm_parallelLine.rootCase = {};
dm_parallelLine.rootCase.point = {};
dm_parallelLine.rootCase.line = {};
dm_parallelLine.rootCase.line.point = dm_parallelLine.rootCase.point.line = {
  processFn(canvas: canvas) {
    new parallelLine(canvas, canvas.chooseObjs.point[0], canvas.chooseObjs.line[0]);
    canvas.resetChoosing();
  },
};

export default dm_parallelLine;
