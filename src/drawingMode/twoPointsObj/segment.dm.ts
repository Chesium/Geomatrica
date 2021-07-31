import canvas from "../../canvas";
import segment from "../../shape/line/twoPointsLine/segment";
import twoPointsObj_dm from "../twoPointsObj_dm";

var dm_segment = new twoPointsObj_dm(
  {
    name: "draw segment",
    title: "线段",
    description: "画线段",
  },
  (canvas: canvas) => {
    return new segment({
      canvas: canvas,
      p1: canvas.chooseObjs.point[0],
      p2: canvas.chooseObjs.point[1],
    });
  }
);

export default dm_segment;
