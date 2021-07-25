import drawingMode, { drawCase } from "../drawingMode";
import canvas from "../canvas";
import { crd } from "../misc";

var dm_move = new drawingMode({
  name: "move objects",
  title: "移动",
  description: "移动对象或画板",
});

dm_move.rootCase = new drawCase((root: drawCase) => {
  root.intoAny = new drawCase((intoAny: drawCase) => {
    intoAny.processFn = (cv: canvas, crd: crd) => {
      var endListener = () => {
        cv.resetChoosing();
        cv.PIXIapp.view.removeEventListener("mouseup", endListener);
      };
      cv.PIXIapp.view.addEventListener("mouseup", endListener);
      cv.chooseObjs.all[0].beginDrag(crd);
    };
  });
  root.intoBlank = new drawCase((intoBlank: drawCase) => {
    intoBlank.processFn = (cv: canvas, crd: crd) => {
      cv.resetChoosing();
      var pos = cv.toPos(crd);
      cv.dragOffset.x = cv.trCoe[1] - pos.x;
      cv.dragOffset.y = cv.trCoe[2] - pos.y;
      cv.Status = 2;
    };
  });
});

export default dm_move;
