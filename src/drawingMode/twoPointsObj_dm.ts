import canvas from "../canvas";
import drawingMode, { drawCase } from "../drawingMode";
import freepoint from "../shape/point/freepoint";
import MousePoint from "../shape/point/MousePoint";
import { crd } from "../misc";
import twoPointsLine from "../shape/line/twoPointsLine";
import twoPointsCircle from "../shape/circle/twoPointsCircle";
import obj from "../object";
import point from "../shape/point";
import line from "../shape/line";

/**
 * 所有用两点构造的对象
 *
 * 如: 线段、射线、圆(圆心和其上一点)、圆(直径两端点)
 */
export default class twoPointsObj_dm extends drawingMode {
  constructor(
    info: { name: string; title: string; description: string },
    finalFn: (canvas: canvas) => twoPointsLine | twoPointsCircle
  ) {
    super(info);
    this.rootCase = new drawCase((root: drawCase) => {
      root.intoBlank = new drawCase((intoBlank: drawCase) => {
        intoBlank.processFn = (cv: canvas, crd: crd) => {
          const newP = new freepoint(cv, crd.x, crd.y);
          newP.updInteractionArea();
          newP.updBoundRect();
          newP.updBitmap();
          cv.chooseObjs.all.push(newP);
          cv.chooseObjs.point.push(newP);
          //随即转至选中一点的情况
          //---> rootCase.point
          cv.currentCase = this.rootCase.into[point.shapeName];
          cv.currentCase.processFn(cv, crd);
        };
      });
      root.into[line.shapeName] = new drawCase((intoLine: drawCase) => {
        intoLine.processFn = (cv: canvas, crd: crd) => {
          const newP = cv.chooseObjs.all[0].generatePointOnIt(crd);
          cv.chooseObjs.all.pop();
          newP.updInteractionArea();
          newP.updBoundRect();
          newP.updBitmap();
          cv.chooseObjs.all.push(newP);
          cv.chooseObjs.point.push(newP);
          //随即转至选中一点的情况
          //---> rootCase.point
          cv.currentCase = this.rootCase.into[point.shapeName];
          cv.currentCase.processFn(cv, crd);
        };
      });
      root.into[point.shapeName] = new drawCase((intoPoint: drawCase) => {
        intoPoint.processFn = (cv: canvas) => {
          const prePoint = new MousePoint(cv);
          cv.currentCase = this.rootCase.into[point.shapeName].into[point.shapeName];
          cv.chooseObjs.all.push(prePoint);
          cv.chooseObjs.point.push(prePoint);

          const new2pObj = finalFn(cv);

          const endListener = (ev: MouseEvent) => {
            const focus = cv.chooseByPos({ x: ev.offsetX, y: ev.offsetY });
            console.log("[drawing 2P obj][mouseup] current focus:", focus);
            if (focus instanceof obj) {
              if (focus.index == cv.chooseObjs.point[0].index) {
                console.log("[drawing 2P obj][mouseup] the mouse still in first point -> still drawing");
                cv.justEndDrawing = true;
                return;
              }
            }
            const stickP = prePoint.toPoint();
            stickP.children.push(new2pObj);
            new2pObj.Point2 = stickP;
            new2pObj.parents[1] = new2pObj.Point2;
            new2pObj.update();
            prePoint.children.length = 0;
            prePoint.remove();

            cv.PIXIapp.view.removeEventListener("mouseup", endListener);
            cv.PIXIapp.view.removeEventListener("mousedown", endListener);
            cv.resetChoosing();
          };
          cv.PIXIapp.view.addEventListener("mouseup", endListener);
          cv.PIXIapp.view.addEventListener("mousedown", endListener);
        };
      });
    });
  }
}
