import canvas from "../../canvas";
import CP_circle from "../../shape/circle/twoPointsCircle/CP_circle";
import twoPointsObj_dm from "../twoPointsObj_dm";

var dm_CP_circle = new twoPointsObj_dm(
  {
    name: "draw center-point circle",
    title: "画圆（圆心和一点）",
    description: "画圆（圆心和一点）",
  },
  (canvas: canvas) => {
    return new CP_circle(canvas, canvas.chooseObjs.point[0], canvas.chooseObjs.point[1]);
  }
);

export default dm_CP_circle;
