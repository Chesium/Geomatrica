import drawingMode, { drawCase } from "../drawingMode";
import canvas from "../canvas";
import intersection_LL from "../shape/point/intersection/intersection_LL";
import { intersection_LC_1, intersection_LC_2 } from "../shape/point/intersection/intersection_LC";
import { intersection_CC_1, intersection_CC_2 } from "../shape/point/intersection/intersection_CC";
import line from "../shape/line";
import circle from "../shape/circle";

var dm_intersection = new drawingMode({
  name: "draw intersection",
  title: "交点",
  description: "选中两对象作其交点",
});
dm_intersection.rootCase = new drawCase((root: drawCase) => {
  root.into[line.shapeName] = new drawCase((intoLine1: drawCase) => {
    intoLine1.into[line.shapeName] = new drawCase((intoLine2: drawCase) => {
      intoLine2.processFn = (cv: canvas) => {
        new intersection_LL({
          canvas: cv,
          l1: cv.chooseObjs.line[0],
          l2: cv.chooseObjs.line[1],
          predefined: false,
        });
        cv.resetChoosing();
      };
    });
    intoLine1.into[circle.shapeName] = new drawCase((intoCircle: drawCase) => {
      intoCircle.processFn = (cv: canvas) => {
        new intersection_LC_1({
          canvas: cv,
          l: cv.chooseObjs.line[0],
          c: cv.chooseObjs.circle[0],
          predefined: false,
        });
        new intersection_LC_2({
          canvas: cv,
          l: cv.chooseObjs.line[0],
          c: cv.chooseObjs.circle[0],
          predefined: false,
        });
        cv.resetChoosing();
      };
    });
  });
  root.into[circle.shapeName] = new drawCase((intoCircle1: drawCase) => {
    intoCircle1.into[line.shapeName] = new drawCase((intoLine: drawCase) => {
      intoLine.processFn = (cv: canvas) => {
        new intersection_LC_1({
          canvas: cv,
          l: cv.chooseObjs.line[0],
          c: cv.chooseObjs.circle[0],
          predefined: false,
        });
        new intersection_LC_2({
          canvas: cv,
          l: cv.chooseObjs.line[0],
          c: cv.chooseObjs.circle[0],
          predefined: false,
        });
        cv.resetChoosing();
      };
    });
    intoCircle1.into[circle.shapeName] = new drawCase((intoCircle2: drawCase) => {
      intoCircle2.processFn = (cv: canvas) => {
        new intersection_CC_1({
          canvas: cv,
          c1: cv.chooseObjs.circle[0],
          c2: cv.chooseObjs.circle[1],
          predefined: false,
        });
        new intersection_CC_2({
          canvas: cv,
          c1: cv.chooseObjs.circle[0],
          c2: cv.chooseObjs.circle[1],
          predefined: false,
        });
        cv.resetChoosing();
      };
    });
  });
});

export default dm_intersection;
