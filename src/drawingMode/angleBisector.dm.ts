import drawingMode, { drawCase } from "../drawingMode";
import canvas from "../canvas";
import angleBisector_3P, { angleBisector_2L_1, angleBisector_2L_2 } from "../shape/line/angleBisector";
import point from "../shape/point";
import line from "../shape/line";

const dm_angleBisector = new drawingMode({
  name: "draw angleBisector",
  title: "角平分线",
  description: "选中三点作其构成角的平分线",
});
dm_angleBisector.rootCase = new drawCase((root: drawCase) => {
  root.into[point.shapeName] = new drawCase((intoPoint1: drawCase) => {
    intoPoint1.into[point.shapeName] = new drawCase((intoPoint2: drawCase) => {
      intoPoint2.into[point.shapeName] = new drawCase((intoPoint3: drawCase) => {
        intoPoint3.processFn = (cv: canvas) => {
          new angleBisector_3P(cv, cv.chooseObjs.point[0], cv.chooseObjs.point[1], cv.chooseObjs.point[2]);
          cv.resetChoosing();
        };
      });
    });
  });
  root.into[line.shapeName] = new drawCase((intoLine1: drawCase) => {
    intoLine1.into[line.shapeName] = new drawCase((intoLine2: drawCase) => {
      intoLine2.processFn = (cv: canvas) => {
        new angleBisector_2L_1(cv, cv.chooseObjs.line[0], cv.chooseObjs.line[1]);
        new angleBisector_2L_2(cv, cv.chooseObjs.line[0], cv.chooseObjs.line[1]);
        cv.resetChoosing();
      };
    });
  });
});

export default dm_angleBisector;
