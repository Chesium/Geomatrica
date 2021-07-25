import drawingMode, { drawCase } from "../drawingMode";
import canvas from "../canvas";
import perpendicular from "../shape/line/perpendicular";
import point from "../shape/point";
import line from "../shape/line";

var dm_perpendicular = new drawingMode({
  name: "draw perpendicular",
  title: "垂直",
  description: "选中一点和一线作过此点的垂线",
});
dm_perpendicular.rootCase = new drawCase((root: drawCase) => {
  root.into[point.shapeName] = new drawCase((intoPoint: drawCase) => {
    intoPoint.into[line.shapeName] = new drawCase((intoLine: drawCase) => {
      intoLine.processFn = (cv: canvas) => {
        new perpendicular(cv, cv.chooseObjs.point[0], cv.chooseObjs.line[0]);
        cv.resetChoosing();
      };
    });
  });
  root.into[line.shapeName] = new drawCase((intoLine: drawCase) => {
    intoLine.into[point.shapeName] = new drawCase((intoPoint: drawCase) => {
      intoPoint.processFn = (cv: canvas) => {
        new perpendicular(cv, cv.chooseObjs.point[0], cv.chooseObjs.line[0]);
        cv.resetChoosing();
      };
    });
  });
});

export default dm_perpendicular;
