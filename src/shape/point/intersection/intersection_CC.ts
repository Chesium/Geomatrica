import intersection from "../intersection";
import circle from "../../circle";
import canvas from "../../../canvas";

export class intersection_CC_1 extends intersection {
  Circle1: circle; //点在这条线上
  Circle2: circle; //点也在这条线上

  constructor(canvas: canvas, l1: circle, l2: circle, predefined: boolean = false) {
    super(); //无用
    this.defineTypeName = "intersection_CC_1";
    this.init_L1(canvas, predefined);
    this.init_L2();
    //================//
    this.Circle1 = l1;
    this.Circle2 = l2;
    //对象间父子关系处理
    l1.children.push(this);
    l2.children.push(this);
    this.parents = [this.Circle1, this.Circle2];
    //================//
    this.calc();
    this.init_end();
  }
  calc(): void {
    if (this.checkNonExistParents()) {
      return;
    }
    var x1 = this.Circle1.x,
      y1 = this.Circle1.y,
      r1 = this.Circle1.r,
      x2 = this.Circle2.x,
      y2 = this.Circle2.y,
      r2 = this.Circle2.r;
    var k = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
    var s = Math.sqrt(k);
    if (s > r1 + r2) {
      this.exist = false;
      return;
    }
    var n = (r1 * r1 - r2 * r2) / (2 * k) + 0.5;
    var p = s * n;
    var xM = x1 + n * (x2 - x1),
      yM = y1 + n * (y2 - y1);
    var q = Math.sqrt(r1 * r1 - p * p) / p;
    this.exist = true;
    this.x = xM + q * (y1 - yM);
    this.y = yM - q * (x1 - xM);
  }
  // beginDraw见shape
  // beginDrag见shape
  // beginMove见shape
  // updDrag见shape
  // updMove见shape
  // getTagCrd见point
}

export class intersection_CC_2 extends intersection {
  Circle1: circle; //点在这条线上
  Circle2: circle; //点也在这条线上

  constructor(canvas: canvas, l1: circle, l2: circle, predefined: boolean = false) {
    super(); //无用
    this.defineTypeName = "intersection_CC_2";
    this.init_L1(canvas, predefined);
    this.init_L2();
    //================//
    this.Circle1 = l1;
    this.Circle2 = l2;
    //对象间父子关系处理
    l1.children.push(this);
    l2.children.push(this);
    this.parents = [this.Circle1, this.Circle2];
    //================//
    this.calc();
    this.init_end();
  }
  calc(): void {
    if (this.checkNonExistParents()) {
      return;
    }
    var x1 = this.Circle1.x,
      y1 = this.Circle1.y,
      r1 = this.Circle1.r,
      x2 = this.Circle2.x,
      y2 = this.Circle2.y,
      r2 = this.Circle2.r;
    var k = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
    var s = Math.sqrt(k);
    if (s > r1 + r2) {
      this.exist = false;
      return;
    }
    var n = (r1 * r1 - r2 * r2) / (2 * k) + 0.5;
    var p = s * n;
    var xM = x1 + n * (x2 - x1),
      yM = y1 + n * (y2 - y1);
    var q = Math.sqrt(r1 * r1 - p * p) / p;
    this.exist = true;
    this.x = xM - q * (y1 - yM);
    this.y = yM + q * (x1 - xM);
  }
  // beginDraw见shape
  // beginDrag见shape
  // beginMove见shape
  // updDrag见shape
  // updMove见shape
  // getTagCrd见point
}
