import twoPointsLine from "../twoPointsLine";
import point from "../../point";
import canvas from "../../../canvas";
import { obj_fc } from "../../../object";

export class halfLine_fc extends obj_fc {
  p1: point;
  p2: point;
}

export default class halfLine extends twoPointsLine {
  static defineTypeName = "halfLine";
  constructor(canvas: canvas, p1: point, p2: point) {
    super(); //无用
    this.defineTypeName = halfLine.defineTypeName;
    this.init_L1(canvas, false);
    this.init_L2();
    this.init_L3(p1, p2);
    this.init_end();
  }
  calc(): void {
    this.calcLine("x--");
  }
  // beginDraw见twoPointsLine
  // beginDrag见shape
  // beginMove见shape
  // updDrag见shape
  // updMove见shape
  // getTagCrd见twoPointsLine
}
