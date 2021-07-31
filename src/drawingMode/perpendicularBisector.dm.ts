import drawingMode, { drawCase } from "../drawingMode";
import canvas from "../canvas";
import perpendicularBisector from "../shape/line/perpendicularBisector";
import point from "../shape/point";

var dm_perpendicularBisector = new drawingMode({
  name: "draw perpendicularBisector",
  title: "中垂线",
  description: "选中两点作其中垂线",
});
dm_perpendicularBisector.rootCase = new drawCase((root: drawCase) => {
  root.into[point.shapeName] = new drawCase((intoPoint1: drawCase) => {
    intoPoint1.into[point.shapeName] = new drawCase((intoPoint2: drawCase) => {
      intoPoint2.processFn = (cv: canvas) => {
        new perpendicularBisector({
          canvas: cv,
          p1: cv.chooseObjs.point[0],
          p2: cv.chooseObjs.point[1],
        });
        cv.resetChoosing();
      };
    });
  });
});

export default dm_perpendicularBisector;
