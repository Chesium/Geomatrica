import drawingMode from "../drawingMode";
import canvas from "../canvas";
import perpendicular from "../shape/line/perpendicular";

var dm_perpendicular = new drawingMode();
dm_perpendicular.name = "draw perpendicular";
dm_perpendicular.title = "垂直";
dm_perpendicular.description = "选中一点和一线作过此点的垂线";
dm_perpendicular.rootCase = {};
dm_perpendicular.rootCase.point = {};
dm_perpendicular.rootCase.line = {};
dm_perpendicular.rootCase.line.point = dm_perpendicular.rootCase.point.line = {
  processFn(canvas: canvas) {
    new perpendicular(canvas, canvas.chooseObjs.point[0], canvas.chooseObjs.line[0]);
    canvas.resetChoosing();
  },
};

export default dm_perpendicular;
