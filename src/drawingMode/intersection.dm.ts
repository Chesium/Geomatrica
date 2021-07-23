import drawingMode from "../drawingMode";
import canvas from "../canvas";
import intersection_LL from "../shape/point/intersection/intersection_LL";
import { intersection_LC_1, intersection_LC_2 } from "../shape/point/intersection/intersection_LC";
import { intersection_CC_1, intersection_CC_2 } from "../shape/point/intersection/intersection_CC";

var dm_intersection = new drawingMode();
dm_intersection.name = "draw intersection";
dm_intersection.title = "交点";
dm_intersection.description = "选中两对象作其交点";
dm_intersection.rootCase = {};
dm_intersection.rootCase.line = {};
dm_intersection.rootCase.circle = {};
dm_intersection.rootCase.line.line = {
  //线-线
  // nextType: "end",
  processFn(canvas: canvas) {
    new intersection_LL(canvas, canvas.chooseObjs.line[0], canvas.chooseObjs.line[1]);
    canvas.resetChoosing();
  },
};
dm_intersection.rootCase.line.circle = dm_intersection.rootCase.circle.line = {
  //线-圆
  // nextType: "end",
  processFn(canvas: canvas) {
    new intersection_LC_1(canvas, canvas.chooseObjs.line[0], canvas.chooseObjs.circle[0]);
    new intersection_LC_2(canvas, canvas.chooseObjs.line[0], canvas.chooseObjs.circle[0]);
    canvas.resetChoosing();
  },
};
dm_intersection.rootCase.circle.circle = {
  //圆-圆
  // nextType: "end",
  processFn(canvas: canvas) {
    new intersection_CC_1(canvas, canvas.chooseObjs.circle[0], canvas.chooseObjs.circle[1]);
    new intersection_CC_2(canvas, canvas.chooseObjs.circle[0], canvas.chooseObjs.circle[1]);
    canvas.resetChoosing();
  },
};

export default dm_intersection;
