import canvas from "../../canvas";
import point from "../point";
import line from "../line";
import { crd, pos } from "../../misc";
import { calcLineEq, calcPerpendicular, centerOfGravity } from "../../util";

export default class perpendicularBisector extends line {
  Point1: point; //点在这条线上
  Point2: point; //点也在这条线上

  constructor(canvas: canvas, p1: point, p2: point) {
    super(); //无用
    this.defineTypeName = "perpendicularBisector";
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
    var perp = calcPerpendicular(
      centerOfGravity(this.Point1, this.Point2),
      calcLineEq(this.Point1, this.Point2)
    );
    this.a = perp.a;
    this.b = perp.b;
    this.c = perp.c;
    this.d = perp.d;
    this.r = perp.r;
    this.dr = perp.dr;
    this.exist = perp.exist;
    this.refP_t = perp.refP_t;
  }
  getTagCrd(): pos {
    if (!this.exist) {
      return { x: undefined, y: undefined };
    }
    var t = (this.refP_t[0] + this.refP_t[1]) / 2;
    return {
      x: this.a * t + this.b,
      y: this.c * t + this.d,
    };
  }
}
