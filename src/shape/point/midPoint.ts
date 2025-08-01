import canvas from "../../canvas";
import { type objectForSaving } from "../../misc";
import { centerOfGravity } from "../../util";
import point from "../point";

export default class midPoint extends point {
  Point1: point; //点在这条线上
  Point2: point; //点也在这条线上

  static defineTypeName = "midPoint";
  constructor(canvas: canvas, p1: point, p2: point) {
    super(); //无用
    this.defineTypeName = midPoint.defineTypeName;
    this.init_L1(canvas, false);
    this.init_L2();
    //================//
    this.Point1 = p1;
    this.Point2 = p2;
    //对象间父子关系处理
    p1.children.push(this);
    p2.children.push(this);
    this.parents = [this.Point1, this.Point2];
    //================//
    this.calc();
    this.init_end();
  }
  calc(): void {
    if (this.checkNonExistParents()) {
      return;
    }
    this.setData(centerOfGravity(this.Point1, this.Point2));
    this.exist = true;
  }
  // beginDraw见shape
  // beginDrag见shape
  // beginMove见shape
  // updDrag见shape
  // updMove见shape
  // getTagCrd见point

  save(): objectForSaving {
    return {
      index: this.saveI,
      shown: this.shown,
      style: this.style,
      name: this.name,
      def: midPoint.defineTypeName,
      initData: [this.Point1.saveI, this.Point2.saveI],
    };
  }
}
