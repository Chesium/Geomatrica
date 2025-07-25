import canvas from "../../canvas";
import straightLine from "../../shape/line/twoPointsLine/straightLine";
import twoPointsObj_dm from "../twoPointsObj_dm";

const dm_straightLine = new twoPointsObj_dm(
  {
    name: "draw straightLine",
    title: "直线",
    description: "画直线",
  },
  (canvas: canvas) => {
    return new straightLine(canvas, canvas.chooseObjs.point[0], canvas.chooseObjs.point[1]);
  }
);

export default dm_straightLine;
