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

export default class circumcircle extends circle {
  Point1: point;
  Point2: point;
  Point3: point;

  static defineTypeName = "circumcircle";
  constructor(canvas: canvas, p1: point, p2: point, p3: point) {
    super(); //无用
    this.defineTypeName = circumcircle.defineTypeName;
    this.init_L1(canvas, false);
    this.init_L2();
    this.Point1 = p1;
    this.Point2 = p2;
    this.Point3 = p3;
    p1.children.push(this);
    p1.onObjs.push(this);
    p2.children.push(this);
    p2.onObjs.push(this);
    p3.children.push(this);
    p3.onObjs.push(this);
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
    const l = calcPerpendicular(
      centerOfGravity(this.Point1, this.Point2),
      calcLineEq(this.Point1, this.Point2)
    );
    const _center = calcIntersectionLL(
      l,
      calcPerpendicular(centerOfGravity(this.Point1, this.Point3), calcLineEq(this.Point1, this.Point3))
    );
    if (!_center.exist) {
      this.exist = false;
      return;
    }
    const center = substituteIntoLineEq(_center.t1, l);
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
