import intersection from "../intersection";
import line from "../../line";
import circle from "../../circle";
import canvas from "../../../canvas";
import { substituteIntoLineEq } from "../../../util";

export class intersection_LC_1 extends intersection {
  Line: line; //点在这条线上
  Circle: circle; //点也在这条线上

  static defineTypeName = "intersection_LC_1";
  constructor(canvas: canvas, l: line, c: circle, predefined: boolean = false) {
    super(); //无用
    this.defineTypeName = intersection_LC_1.defineTypeName;
    this.init_L1(canvas, predefined);
    this.init_L2();
    //================//
    this.Line = l;
    this.Circle = c;
    this.onObjs.push(l, c);
    //对象间父子关系处理
    l.children.push(this);
    c.children.push(this);
    this.parents = [this.Line, this.Circle];
    //================//
    this.calc();
    this.init_end();
  }
  calc(): void {
    if (this.checkNonExistParents()) {
      return;
    }

    const a = this.Line.a,
      b = this.Line.b,
      c = this.Line.c,
      d = this.Line.d,
      rg = this.Line.r, //range of t
      x = this.Circle.x,
      y = this.Circle.y,
      r = this.Circle.r;
    const A = a * a + c * c,
      B = 2 * (a * (b - x) + c * (d - y)),
      C = b * b + d * d + x * x + y * y - r * r - 2 * (b * x + d * y);
    const delta = B * B - 4 * A * C; //判别式Δ
    if (delta < 0) {
      this.exist = false;
      return;
    }
    const t1 = (-B + Math.sqrt(delta)) / (2 * A);
    let t2 = -(B / A + t1),
      ts = [],
      t;
    if (t1 >= Math.min(rg[0], rg[1]) && t1 <= Math.max(rg[0], rg[1])) {
      ts.push(t1);
    }
    if (t2 >= Math.min(rg[0], rg[1]) && t2 <= Math.max(rg[0], rg[1])) {
      ts.push(t2);
    }
    if (ts.length == 0) {
      this.exist = false;
      return;
    }
    if (this.Line.dr == 1) {
      t = Math.max(...ts);
    } else {
      t = Math.min(...ts);
    }
    this.exist = true;
    this.setData(substituteIntoLineEq(t, this.Line));
  }
  // beginDraw见shape
  // beginDrag见shape
  // beginMove见shape
  // updDrag见shape
  // updMove见shape
  // getTagCrd见point
}

export class intersection_LC_2 extends intersection {
  Line: line; //点在这条线上
  Circle: circle; //点也在这条线上

  static defineTypeName = "intersection_LC_2";
  constructor(canvas: canvas, l: line, c: circle, predefined: boolean = false) {
    super(); //无用
    this.defineTypeName = intersection_LC_2.defineTypeName;
    this.init_L1(canvas, predefined);
    this.init_L2();
    //================//
    this.Line = l;
    this.Circle = c;
    //对象间父子关系处理
    l.children.push(this);
    c.children.push(this);
    this.parents = [this.Line, this.Circle];
    //================//
    this.calc();
    this.init_end();
  }
  calc(): void {
    if (this.checkNonExistParents()) {
      return;
    }

    const a = this.Line.a,
      b = this.Line.b,
      c = this.Line.c,
      d = this.Line.d,
      rg = this.Line.r, //range of t
      x = this.Circle.x,
      y = this.Circle.y,
      r = this.Circle.r;
    const A = a * a + c * c,
      B = 2 * (a * (b - x) + c * (d - y)),
      C = b * b + d * d + x * x + y * y - r * r - 2 * (b * x + d * y);
    const delta = B * B - 4 * A * C; //判别式Δ
    if (delta < 0) {
      this.exist = false;
      return;
    }
    const t1 = (-B + Math.sqrt(delta)) / (2 * A);
    let t2 = -(B / A + t1),
      ts = [],
      t;
    if (t1 >= Math.min(rg[0], rg[1]) && t1 <= Math.max(rg[0], rg[1])) {
      ts.push(t1);
    }
    if (t2 >= Math.min(rg[0], rg[1]) && t2 <= Math.max(rg[0], rg[1])) {
      ts.push(t2);
    }
    if (ts.length != 2) {
      this.exist = false;
      return;
    }
    if (this.Line.dr == -1) {
      t = Math.max(...ts);
    } else {
      t = Math.min(...ts);
    }
    this.exist = true;
    this.setData(substituteIntoLineEq(t, this.Line));
  }
  // beginDraw见shape
  // beginDrag见shape
  // beginMove见shape
  // updDrag见shape
  // updMove见shape
  // getTagCrd见point
}
