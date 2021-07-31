import twoPointsLine from "../twoPointsLine";
import point from "../../point";
import canvas from "../../../canvas";
import { obj_fc } from "../../../object";

export class straightLine_fc extends obj_fc {
  p1: point;
  p2: point;
}

export default class straightLine extends twoPointsLine {
  static defineTypeName = "straightLine";
  constructor(dfc: straightLine_fc) {
    super(); //无用
    this.defineTypeName = straightLine.defineTypeName;
    this.init_L1(dfc.canvas, false);
    this.init_L2();
    this.init_L3(dfc.p1, dfc.p2);
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
