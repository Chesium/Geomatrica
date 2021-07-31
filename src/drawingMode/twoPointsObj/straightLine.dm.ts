import canvas from "../../canvas";
import straightLine from "../../shape/line/twoPointsLine/straightLine";
import twoPointsObj_dm from "../twoPointsObj_dm";

var dm_straightLine = new twoPointsObj_dm(
  {
    name: "draw straightLine",
    title: "直线",
    description: "画直线",
  },
  (canvas: canvas) => {
    return new straightLine({
      canvas: canvas,
      p1: canvas.chooseObjs.point[0],
      p2: canvas.chooseObjs.point[1],
    });
  }
);

export default dm_straightLine;
