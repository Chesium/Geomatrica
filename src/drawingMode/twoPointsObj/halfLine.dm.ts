import canvas from "../../canvas";
import halfLine from "../../shape/line/twoPointsLine/halfLine";
import twoPointsObj_dm from "../twoPointsObj_dm";

var dm_halfLine = new twoPointsObj_dm(
  {
    name: "draw halfLine",
    title: "射线",
    description: "画射线",
  },
  (canvas: canvas) => {
    return new halfLine({
      canvas: canvas,
      p1: canvas.chooseObjs.point[0],
      p2: canvas.chooseObjs.point[1],
    });
  }
);

export default dm_halfLine;
