import canvas from "../../canvas";
import point from "../point";
import line from "../line";
import { crd, pos } from "../../misc";
import { calcLineEq, calcPerpendicular, centerOfGravity } from "../../util";
import { obj_fc } from "../../object";

export class perpendicularBisector_fc extends obj_fc {
  p1: point;
  p2: point;
}

export default class perpendicularBisector extends line {
  Point1: point; //点在这条线上
  Point2: point; //点也在这条线上

  static defineTypeName = "perpendicularBisector";
  constructor(dfc: perpendicularBisector_fc) {
    super(); //无用
    this.defineTypeName = perpendicularBisector.defineTypeName;
    this.init_L1(dfc.canvas, false);
    this.init_L2();
    //================//
    this.Point1 = dfc.p1;
    this.Point2 = dfc.p2;
    //对象间父子关系处理
    dfc.p1.children.push(this);
    dfc.p2.children.push(this);
    this.parents = [this.Point1, this.Point2];
    //================//
    this.calc();
    this.init_end();
  }
  calc(): void {
    if (this.checkNonExistParents()) {
      return;
    }
    this.setData(
      calcPerpendicular(centerOfGravity(this.Point1, this.Point2), calcLineEq(this.Point1, this.Point2))
    );
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
