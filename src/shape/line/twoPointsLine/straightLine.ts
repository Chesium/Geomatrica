import twoPointsLine from "../twoPointsLine";
import point from "../../point";
import canvas from "../../../canvas";

export default class straightLine extends twoPointsLine {
  static defineTypeName = "straightLine";
  constructor(canvas: canvas, p1: point, p2: point) {
    super(); //无用
    this.defineTypeName = straightLine.defineTypeName;
    this.init_L1(canvas, false);
    this.init_L2();
    this.init_L3(p1, p2);
    this.init_end();
  }
  calc(): void {
    this.calcLine("---");
  }
  // beginDraw见twoPointsLine
  // beginDrag见shape
  // beginMove见shape
  // updDrag见shape
  // updMove见shape
  // getTagCrd见twoPointsLine
}
