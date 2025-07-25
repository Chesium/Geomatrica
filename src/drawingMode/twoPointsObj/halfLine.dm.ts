import canvas from "../../canvas";
import halfLine from "../../shape/line/twoPointsLine/halfLine";
import twoPointsObj_dm from "../twoPointsObj_dm";

const dm_halfLine = new twoPointsObj_dm(
  {
    name: "draw halfLine",
    title: "射线",
    description: "画射线",
  },
  (canvas: canvas) => {
    return new halfLine(canvas, canvas.chooseObjs.point[0], canvas.chooseObjs.point[1]);
  }
);

export default dm_halfLine;
