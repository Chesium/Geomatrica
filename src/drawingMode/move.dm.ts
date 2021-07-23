import drawingMode from "../drawingMode";
import canvas from "../canvas";
import { crd } from "../misc";

var dm_move = new drawingMode();
dm_move.name = "move objects";
dm_move.title = "移动";
dm_move.description = "移动";
dm_move.rootCase = {};
dm_move.rootCase.any = {
  // nextType: "end",
  processFn: (canvas: canvas, crd: crd) => {
    var endListener = () => {
      canvas.resetChoosing();
      canvas.PIXIapp.view.removeEventListener("mouseup", endListener);
    };
    canvas.PIXIapp.view.addEventListener("mouseup", endListener);
    canvas.chooseObjs.all[0].beginDrag(crd);
    // canvas.resetChoosing();
  },
};
dm_move.rootCase.blank = {
  // nextType: "end",
  processFn: (canvas: canvas, crd: crd) => {
    canvas.resetChoosing();
    var pos = canvas.toPos(crd);
    canvas.dragOffset.x = canvas.tr[1] - pos.x;
    canvas.dragOffset.y = canvas.tr[2] - pos.y;
    canvas.Status = 2;
  },
};

export default dm_move;
