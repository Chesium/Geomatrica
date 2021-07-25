import drawingMode, { drawCase } from "../drawingMode";
import canvas from "../canvas";
import { crd } from "../misc";
import freePoint from "../shape/point/freepoint";

var dm_drawPoint = new drawingMode({
  name: "draw points",
  title: "描点",
  description: "画点",
});
dm_drawPoint.rootCase = new drawCase((root: drawCase) => {
  root.intoBlank = new drawCase((intoBlank: drawCase) => {
    intoBlank.processFn = (cv: canvas, crd: crd) => {
      new freePoint(cv, crd.x, crd.y);
      cv.resetChoosing();
    };
  });
  root.intoAny=new drawCase((intoAny:drawCase)=>{
    intoAny.processFn = (cv: canvas, crd: crd) => {
      cv.chooseObjs.all[0].generatePointOnIt(crd);
      cv.resetChoosing();
    };
  });
});

export default dm_drawPoint;
