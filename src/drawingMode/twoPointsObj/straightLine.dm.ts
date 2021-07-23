import canvas from "../../canvas";
import straightLine from "../../shape/line/twoPointsLine/straightLine";
import twoPointsObj_dm from "../twoPointsObj_dm";

var dm_straightLine = new twoPointsObj_dm((canvas: canvas) => {
  return new straightLine(canvas, canvas.chooseObjs.point[0], canvas.chooseObjs.point[1]);
});

export default dm_straightLine;
