import drawingMode, { drawCase } from "../drawingMode";
import canvas from "../canvas";
import { tangent_1, tangent_2 } from "../shape/line/tangent";
import point from "../shape/point";
import circle from "../shape/circle";

var dm_tangent = new drawingMode({
  name: "draw tangent",
  title: "切线",
  description: "选中一点和一圆作该圆过此点的切线",
});
dm_tangent.rootCase = new drawCase((root: drawCase) => {
  root.into[point.shapeName] = new drawCase((intoPoint: drawCase) => {
    intoPoint.into[circle.shapeName] = new drawCase((intoCircle: drawCase) => {
      intoCircle.processFn = (cv: canvas) => {
        new tangent_1({ canvas: cv, p: cv.chooseObjs.point[0], c: cv.chooseObjs.circle[0] });
        new tangent_2({ canvas: cv, p: cv.chooseObjs.point[0], c: cv.chooseObjs.circle[0] });
        cv.resetChoosing();
      };
    });
  });
  root.into[circle.shapeName] = new drawCase((intoCircle: drawCase) => {
    intoCircle.into[point.shapeName] = new drawCase((intoPoint: drawCase) => {
      intoPoint.processFn = (cv: canvas) => {
        new tangent_1({ canvas: cv, p: cv.chooseObjs.point[0], c: cv.chooseObjs.circle[0] });
        new tangent_2({ canvas: cv, p: cv.chooseObjs.point[0], c: cv.chooseObjs.circle[0] });
        cv.resetChoosing();
      };
    });
  });
});

export default dm_tangent;
