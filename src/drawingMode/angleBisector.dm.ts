import drawingMode from "../drawingMode";
import canvas from "../canvas";
import angleBisector_3P from "../shape/line/angleBisector";

var dm_angleBisector = new drawingMode();
dm_angleBisector.name = "draw angleBisector";
dm_angleBisector.title = "角平分线";
dm_angleBisector.description = "选中三点作其构成角的平分线";
dm_angleBisector.rootCase = {};
dm_angleBisector.rootCase.point = {};
dm_angleBisector.rootCase.point.point = {};
dm_angleBisector.rootCase.point.point.point = {
  processFn(canvas: canvas) {
    new angleBisector_3P(
      canvas,
      canvas.chooseObjs.point[0],
      canvas.chooseObjs.point[1],
      canvas.chooseObjs.point[2],
    );
    canvas.resetChoosing();
  },
};

export default dm_angleBisector;
