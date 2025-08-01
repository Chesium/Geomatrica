import canvas from "../../canvas";
import { crd, pos } from "../../misc";
import { calcLineEq, calcPerpendicular } from "../../util";
import circle from "../circle";
import line from "../line";
import point from "../point";
import pointOnCircle from "../point/pointOnShape/pointOnCircle";

export class tangent_1 extends line {
  Point: point;
  Circle: circle;

  static defineTypeName = "tangent_1";
  constructor(canvas: canvas, p: point, c: circle) {
    super();
    this.defineTypeName = tangent_1.defineTypeName;
    this.init_L1(canvas, false);
    this.init_L2();
    //================//
    this.Point = p;
    this.Circle = c;
    //对象间父子关系处理
    c.children.push(this);
    p.children.push(this);
    p.onObjs.push(this);
    this.parents = [this.Circle, this.Point];
    //================//
    this.calc();
    this.init_end();
  }
  calc(): void {
    if (this.checkNonExistParents()) {
      return;
    }
    if (this.isPointOnCircle()) {
      //点就在该圆上
      //* 相当于过该点作此圆过此点的半径的垂线
      //此时只有一条切线，tangent_2对象不存在
      const perp = calcPerpendicular(this.Point, calcLineEq(this.Circle, this.Point));
      this.a = perp.a;
      this.b = perp.b;
      this.c = perp.c;
      this.d = perp.d;
      this.r = perp.r;
      this.dr = perp.dr!;
      this.exist = perp.exist!;
      this.refP_t = perp.refP_t!;
      return;
    }
    //* 相当于求以该圆与该点为圆心，该点到切点的距离为半径的圆之第一交点
    const x1 = this.Point.x,
      y1 = this.Point.y,
      x2 = this.Circle.x,
      y2 = this.Circle.y,
      r2 = this.Circle.r;
    const k = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
    /**
     * r1为点到切点的距离
     */
    const r1 = Math.sqrt(k - r2 * r2),
      s = Math.sqrt(k);
    if (s > r1 + r2) {
      this.exist = false;
      return;
    }
    const n = (r1 * r1 - r2 * r2) / (2 * k) + 0.5;
    const p = s * n;
    const xM = x1 + n * (x2 - x1),
      yM = y1 + n * (y2 - y1);
    const q = Math.sqrt(r1 * r1 - p * p) / p;
    /**
     * point of tangency 切点
     */
    const POT: crd = { x: xM + q * (y1 - yM), y: yM - q * (x1 - xM) };
    //!                    ↑---------swap---------↑

    this.setData(calcLineEq(this.Point, POT));
  }
  getTagCrd(): pos {
    if (!this.exist) {
      return { x: NaN, y: NaN };
    }
    let t: number;
    if (this.Point instanceof pointOnCircle) {
      if (this.Point.Circle.index == this.Circle.index) {
        t = (this.refP_t[1] - this.refP_t[0]) * 2 + this.refP_t[0];
        return {
          x: this.a * t + this.b,
          y: this.c * t + this.d,
        };
      }
    }
    t = (this.refP_t[0] + this.refP_t[1]) / 2;
    return {
      x: this.a * t + this.b,
      y: this.c * t + this.d,
    };
  }
  isPointOnCircle(): boolean {
    for (const v of this.Point.onObjs) {
      if (v.index == this.Circle.index) {
        return true;
      }
    }
    return false;
  }
}

export class tangent_2 extends line {
  Point: point;
  Circle: circle;

  static defineTypeName = "tangent_2";
  constructor(canvas: canvas, p: point, c: circle) {
    super();
    this.defineTypeName = tangent_2.defineTypeName;
    this.init_L1(canvas, false);
    this.init_L2();
    //================//
    this.Point = p;
    this.Circle = c;
    //对象间父子关系处理
    c.children.push(this);
    p.children.push(this);
    this.parents = [this.Circle, this.Point];
    //================//
    this.calc();
    this.init_end();
  }
  calc(): void {
    if (this.checkNonExistParents()) {
      return;
    }
    if (this.isPointOnCircle()) {
      //点就在该圆上
      //!此时只有一条切线，采用tangent_1对象，不使用tangent_2对象
      this.exist = false;
      return;
    }
    //* 相当于求以该圆与该点为圆心，该点到切点的距离为半径的圆之第二交点
    const x1 = this.Point.x,
      y1 = this.Point.y,
      x2 = this.Circle.x,
      y2 = this.Circle.y,
      r2 = this.Circle.r;
    const k = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
    /**
     * r1为点到切点的距离
     */
    const r1 = Math.sqrt(k - r2 * r2),
      s = Math.sqrt(k);
    if (s > r1 + r2) {
      this.exist = false;
      return;
    }
    const n = (r1 * r1 - r2 * r2) / (2 * k) + 0.5;
    const p = s * n;
    const xM = x1 + n * (x2 - x1),
      yM = y1 + n * (y2 - y1);
    const q = Math.sqrt(r1 * r1 - p * p) / p;
    /**
     * point of tangency 切点
     */
    const POT: crd = { x: xM - q * (y1 - yM), y: yM + q * (x1 - xM) };
    //!                    ↑---------swap---------↑

    this.setData(calcLineEq(this.Point, POT));
  }
  getTagCrd(): pos {
    if (!this.exist) {
      return { x: NaN, y: NaN };
    }
    let t: number;
    if (this.Point instanceof pointOnCircle) {
      if (this.Point.Circle.index == this.Circle.index) {
        t = (this.refP_t[1] - this.refP_t[0]) * 2 + this.refP_t[0];
        return {
          x: this.a * t + this.b,
          y: this.c * t + this.d,
        };
      }
    }
    t = (this.refP_t[0] + this.refP_t[1]) / 2;
    return {
      x: this.a * t + this.b,
      y: this.c * t + this.d,
    };
  }
  isPointOnCircle(): boolean {
    for (const v of this.Point.onObjs) {
      if (v.index == this.Circle.index) {
        return true;
      }
    }
    return false;
  }
}
