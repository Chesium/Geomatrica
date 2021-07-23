import canvas from "../canvas";
import drawingMode from "../drawingMode";
import freepoint from "../shape/point/freepoint";
import MousePoint from "../shape/point/MousePoint";
import { crd } from "../misc";
import { isBlank } from "../util";
import twoPointsLine from "../shape/line/twoPointsLine";
import twoPointsCircle from "../shape/circle/twoPointsCircle";

/**
 * 所有用两点构造的对象
 * 
 * 如: 线段、射线、圆(圆心和其上一点)、圆(直径两端点)
 */
export default class twoPointsObj_dm extends drawingMode {
  constructor(finalFn: (canvas: canvas) => twoPointsLine | twoPointsCircle) {
    super(); //无用
    this.rootCase = {};
    this.rootCase.blank = {
      processFn: (canvas: canvas, crd: crd) => {
        var newP = new freepoint(canvas, crd.x, crd.y);
        newP.updInteractionArea();
        newP.updBoundRect();
        newP.updBitmap();
        canvas.chooseObjs.all.push(newP);
        canvas.chooseObjs.point.push(newP);
        //随即转至选中一点的情况
        //---> rootCase.point
        canvas.currentCase = this.rootCase.point;
        canvas.currentCase.processFn(canvas, crd);
      },
    };
    this.rootCase.line = this.rootCase.circle = {
      processFn: (canvas: canvas, crd: crd) => {
        var newP = canvas.chooseObjs.all[0].generatePointOnIt(crd);
        canvas.chooseObjs.all.pop();
        newP.updInteractionArea();
        newP.updBoundRect();
        newP.updBitmap();
        canvas.chooseObjs.all.push(newP);
        canvas.chooseObjs.point.push(newP);
        //随即转至选中一点的情况
        //---> rootCase.point
        canvas.currentCase = this.rootCase.point;
        canvas.currentCase.processFn(canvas, crd);
      },
    };
    this.rootCase.point = {
      processFn: (canvas: canvas, crd: crd) => {
        var prePoint = new MousePoint(canvas);
        canvas.currentCase = this.rootCase.point.point;
        canvas.chooseObjs.all.push(prePoint);
        canvas.chooseObjs.point.push(prePoint);

        var new2pObj = finalFn(canvas);

        var endListener = (ev: MouseEvent) => {
          var focus = canvas.chooseByPos({ x: ev.offsetX, y: ev.offsetY });
          console.log("[drawing 2P obj][mouseup] current focus:", focus);
          if (!isBlank(focus)) {
            if (focus.index == canvas.chooseObjs.point[0].index) {
              console.log("[drawing 2P obj][mouseup] the mouse still in first point -> still drawing");
              return;
            }
          }
          var stickP = prePoint.toPoint();
          stickP.children.push(new2pObj);
          new2pObj.Point2 = stickP;
          new2pObj.parents[1] = new2pObj.Point2;
          new2pObj.update();
          prePoint.children.length = 0;
          prePoint.remove();

          canvas.PIXIapp.view.removeEventListener("mouseup", endListener);
          canvas.PIXIapp.view.removeEventListener("mousedown", endListener);
          canvas.resetChoosing();
        };
        canvas.PIXIapp.view.addEventListener("mouseup", endListener);
        canvas.PIXIapp.view.addEventListener("mousedown", endListener);
      },
    };
  }
}
