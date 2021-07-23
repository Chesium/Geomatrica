import canvas from "../../canvas";
import segment from "../../shape/line/twoPointsLine/segment";
import twoPointsObj_dm from "../twoPointsObj_dm";

var dm_segment = new twoPointsObj_dm((canvas: canvas) => {
  return new segment(canvas, canvas.chooseObjs.point[0], canvas.chooseObjs.point[1]);
});

export default dm_segment;
