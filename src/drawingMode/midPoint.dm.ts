import drawingMode, { drawCase } from "../drawingMode";
import canvas from "../canvas";
import midPoint from "../shape/point/midPoint";
import point from "../shape/point";

const dm_midPoint = new drawingMode({
  name: "draw midPoint",
  title: "中点",
  description: "选中两点作其中点",
});
dm_midPoint.rootCase = new drawCase((root: drawCase) => {
  root.into[point.shapeName] = new drawCase((intoPoint1: drawCase) => {
    intoPoint1.into[point.shapeName] = new drawCase((intoPoint2: drawCase) => {
      intoPoint2.processFn = (cv: canvas) => {
        new midPoint(cv, cv.chooseObjs.point[0], cv.chooseObjs.point[1]);
        cv.resetChoosing();
      };
    });
  });
});

export default dm_midPoint;
