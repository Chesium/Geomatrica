import point from "../../point";
import canvas from "../../../canvas";
import twoPointsCircle from "../twoPointsCircle";
import { obj_fc } from "../../../object";

export class CP_circle_fc extends obj_fc {
  center: point;
  point: point;
}

export default class CP_circle extends twoPointsCircle {
  static defineTypeName = "CP_circle";
  constructor(canvas: canvas, center: point, point: point) {
    super(); //无用
    this.defineTypeName = CP_circle.defineTypeName;
    this.init_L1(canvas, false);
    this.init_L2();
    this.init_L3(center, point);
    this.calc();
    this.init_end();
  }
  calc(): void {
    if (this.checkNonExistParents()) {
      return;
    }
    var x1 = this.Point1.x,
      y1 = this.Point1.y,
      x2 = this.Point2.x,
      y2 = this.Point2.y;
    this.x = x1;
    this.y = y1;
    this.r = Math.hypot(x1 - x2, y1 - y2);
    this.exist = this.r > 0;
  }
  // beginDraw见shape
  // beginDrag见shape
  // beginMove见shape
  // updDrag见shape
  // updMove见shape
  // getTagCrd见circle
}
