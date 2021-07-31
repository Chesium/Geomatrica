import drawingMode, { drawCase } from "../drawingMode";
import canvas from "../canvas";
import parallelLine from "../shape/line/parallelLine";
import point from "../shape/point";
import line from "../shape/line";

var dm_parallelLine = new drawingMode({
  name: "draw parallelLine",
  title: "平行线",
  description: "选中一点和一线作过此点的平行线",
});
dm_parallelLine.rootCase = new drawCase((root: drawCase) => {
  root.into[point.shapeName] = new drawCase((intoPoint: drawCase) => {
    intoPoint.into[line.shapeName] = new drawCase((intoLine: drawCase) => {
      intoLine.processFn = (cv: canvas) => {
        new parallelLine({ canvas: cv, p: cv.chooseObjs.point[0], l: cv.chooseObjs.line[0] });
        cv.resetChoosing();
      };
    });
  });
  root.into[line.shapeName] = new drawCase((intoLine: drawCase) => {
    intoLine.into[point.shapeName] = new drawCase((intoPoint: drawCase) => {
      intoPoint.processFn = (cv: canvas) => {
        new parallelLine({ canvas: cv, p: cv.chooseObjs.point[0], l: cv.chooseObjs.line[0] });
        cv.resetChoosing();
      };
    });
  });
});

export default dm_parallelLine;
