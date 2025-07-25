import intersection from "../intersection";
import circle from "../../circle";
import canvas from "../../../canvas";

export class intersection_CC_1 extends intersection {
  Circle1: circle; //点在这条线上
  Circle2: circle; //点也在这条线上

  static defineTypeName = "intersection_CC_1";
  constructor(canvas: canvas, c1: circle, c2: circle, predefined: boolean = false) {
    super(); //无用
    this.defineTypeName = intersection_CC_1.defineTypeName;
    this.init_L1(canvas, predefined);
    this.init_L2();
    //================//
    this.Circle1 = c1;
    this.Circle2 = c2;
    this.onObjs.push(c1, c2);
    //对象间父子关系处理
    c1.children.push(this);
    c2.children.push(this);
    this.parents = [this.Circle1, this.Circle2];
    //================//
    this.calc();
    this.init_end();
  }
  calc(): void {
    if (this.checkNonExistParents()) {
      return;
    }
    const x1 = this.Circle1.x,
      y1 = this.Circle1.y,
      r1 = this.Circle1.r,
      x2 = this.Circle2.x,
      y2 = this.Circle2.y,
      r2 = this.Circle2.r;
    const k = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
    const s = Math.sqrt(k);
    if (s > r1 + r2) {
      this.exist = false;
      return;
    }
    const n = (r1 * r1 - r2 * r2) / (2 * k) + 0.5;
    const p = s * n;
    const xM = x1 + n * (x2 - x1),
      yM = y1 + n * (y2 - y1);
    const q = Math.sqrt(r1 * r1 - p * p) / p;
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

  static defineTypeName = "intersection_CC_2";
  constructor(canvas: canvas, c1: circle, c2: circle, predefined: boolean = false) {
    super(); //无用
    this.defineTypeName = intersection_CC_2.defineTypeName;
    this.init_L1(canvas, predefined);
    this.init_L2();
    //================//
    this.Circle1 = c1;
    this.Circle2 = c2;
    //对象间父子关系处理
    c1.children.push(this);
    c2.children.push(this);
    this.parents = [this.Circle1, this.Circle2];
    //================//
    this.calc();
    this.init_end();
  }
  calc(): void {
    if (this.checkNonExistParents()) {
      return;
    }
    const x1 = this.Circle1.x,
      y1 = this.Circle1.y,
      r1 = this.Circle1.r,
      x2 = this.Circle2.x,
      y2 = this.Circle2.y,
      r2 = this.Circle2.r;
    const k = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
    const s = Math.sqrt(k);
    if (s > r1 + r2) {
      this.exist = false;
      return;
    }
    const n = (r1 * r1 - r2 * r2) / (2 * k) + 0.5;
    const p = s * n;
    const xM = x1 + n * (x2 - x1),
      yM = y1 + n * (y2 - y1);
    const q = Math.sqrt(r1 * r1 - p * p) / p;
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
