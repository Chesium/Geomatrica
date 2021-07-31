import point from "../point";
import canvas from "../../canvas";
import circle from "../circle";
import {
  calcIntersectionLL,
  calcLineEq,
  calcPerpendicular,
  centerOfGravity,
  substituteIntoLineEq,
} from "../../util";
import { obj_fc } from "../../object";

export class circumcircle_fc extends obj_fc {
  p1: point;
  p2: point;
  p3: point;
}

export default class circumcircle extends circle {
  Point1: point;
  Point2: point;
  Point3: point;

  static defineTypeName = "circumcircle";
  constructor(dfc: circumcircle_fc) {
    super(); //无用
    this.defineTypeName = circumcircle.defineTypeName;
    this.init_L1(dfc.canvas, false);
    this.init_L2();
    this.Point1 = dfc.p1;
    this.Point2 = dfc.p2;
    this.Point3 = dfc.p3;
    dfc.p1.children.push(this);
    dfc.p1.onObjs.push(this);
    dfc.p2.children.push(this);
    dfc.p2.onObjs.push(this);
    dfc.p3.children.push(this);
    dfc.p3.onObjs.push(this);
    this.parents = [this.Point1, this.Point2, this.Point3];
    this.drawableObj = this.Point3;
    this.calc();
    this.init_end();
  }
  calc(): void {
    if (this.checkNonExistParents()) {
      return;
    }
    this.exist = true;
    var l = calcPerpendicular(
      centerOfGravity(this.Point1, this.Point2),
      calcLineEq(this.Point1, this.Point2)
    );
    var _center = calcIntersectionLL(
      l,
      calcPerpendicular(centerOfGravity(this.Point1, this.Point3), calcLineEq(this.Point1, this.Point3))
    );
    if (!_center.exist) {
      this.exist = false;
      return;
    }
    var center = substituteIntoLineEq(_center.t1, l);
    this.x = center.x;
    this.y = center.y;
    this.r = Math.hypot(this.x - this.Point1.x, this.y - this.Point1.y);
    this.exist = this.r > 0;
  }
  // beginDraw见shape
  // beginDrag见shape
  // beginMove见shape
  // updDrag见shape
  // updMove见shape
  // getTagCrd见circle
}
