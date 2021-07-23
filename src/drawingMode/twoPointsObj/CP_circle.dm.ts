import canvas from "../../canvas";
import CP_circle from "../../shape/circle/twoPointsCircle/CP_circle";
import twoPointsObj_dm from "../twoPointsObj_dm";

var dm_CP_circle = new twoPointsObj_dm((canvas: canvas) => {
  return new CP_circle(canvas, canvas.chooseObjs.point[0], canvas.chooseObjs.point[1]);
});

export default dm_CP_circle;
