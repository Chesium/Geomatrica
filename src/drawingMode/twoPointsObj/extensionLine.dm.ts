import canvas from "../../canvas";
import extensionLine from "../../shape/line/twoPointsLine/extensionLine";
import twoPointsObj_dm from "../twoPointsObj_dm";

var dm_extensionLine = new twoPointsObj_dm(
  {
    name: "draw extensionLine",
    title: "延长线",
    description: "画延长线",
  },
  (canvas: canvas) => {
    return new extensionLine(canvas, canvas.chooseObjs.point[0], canvas.chooseObjs.point[1]);
  }
);

export default dm_extensionLine;
