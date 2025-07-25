import drawingMode, { drawCase } from "../drawingMode";
import canvas from "../canvas";
import circumcircle from "../shape/circle/circumcircle";
import point from "../shape/point";

const dm_circumcircle = new drawingMode({
  name: "draw circumcircle",
  title: "三点圆",
  description: "选中三点作对应三角形的外接圆",
});
dm_circumcircle.rootCase = new drawCase((root: drawCase) => {
  root.into[point.shapeName] = new drawCase((intoPoint1: drawCase) => {
    intoPoint1.into[point.shapeName] = new drawCase((intoPoint2: drawCase) => {
      intoPoint2.into[point.shapeName] = new drawCase((intoPoint3: drawCase) => {
        intoPoint3.processFn = (cv: canvas) => {
          new circumcircle(cv, cv.chooseObjs.point[0], cv.chooseObjs.point[1], cv.chooseObjs.point[2]);
          cv.resetChoosing();
        };
      });
    });
  });
});

export default dm_circumcircle;
