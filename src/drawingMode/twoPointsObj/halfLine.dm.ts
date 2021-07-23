import canvas from "../../canvas";
import halfLine from "../../shape/line/twoPointsLine/halfLine";
import twoPointsObj_dm from "../twoPointsObj_dm";

var dm_halfLine = new twoPointsObj_dm((canvas: canvas) => {
  return new halfLine(canvas, canvas.chooseObjs.point[0], canvas.chooseObjs.point[1]);
});

export default dm_halfLine;
