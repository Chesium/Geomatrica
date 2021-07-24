import canvas from "../../canvas";
import { pos } from "../../misc";
import line from "../line";
import point from "../point";

export default class angleBisector_3P extends line {
  Point1: point;
  Point2: point;
  Point3: point;
  constructor(canvas: canvas, p1: point, p2: point, p3: point) {
    super();
    this.defineTypeName = "angleBisector_3P";
    this.init_L1(canvas, false);
    this.init_L2();
    //================//
    this.Point1 = p1;
    this.Point2 = p2;
    this.Point3 = p3;
    //对象间父子关系处理
    p1.children.push(this);
    p2.children.push(this);
    p3.children.push(this);
    this.parents = [p1, p2, p3];
    //================//
    this.calc();
    this.init_end();
  }
  calc(): void {
    if (this.checkNonExistParents()) {
      return;
    }
    /*
     *   1•
     *    │    o
     *    │
     *   2•─────────────────•3
     */
    var x1 = this.Point1.x,
      y1 = this.Point1.y,
      x2 = this.Point2.x,
      y2 = this.Point2.y,
      x3 = this.Point3.x,
      y3 = this.Point3.y;
    var l12 = Math.hypot(x1 - x2, y1 - y2), //边 12 的长度
      l32 = Math.hypot(x3 - x2, y3 - y2); //边 32 的长度
    var k1o_o3 = l12 / l32; //边1o与边o3长度之比
    var ko3_13 = 1 / (k1o_o3 + 1); //边o2与边13长度之比
    var o_x = x3 - (x3 - x1) * ko3_13,
      o_y = y3 - (y3 - y1) * ko3_13; //o点坐标
    //角平分线即为直线2o

    this.exist = true;
    if (x2 == o_x) {
      if (y2 == o_y) {
        this.exist = false;
      } else {
        this.exist = true;
        this.a = 0;
        this.b = x2;
        this.c = 1;
        this.d = 0;
        this.refP_t = [y2, o_y];
        if (y2 < o_y) {
          this.dr = 1;
        } else {
          this.dr = -1;
        }
      }
    } else {
      this.exist = true;
      this.a = 1;
      this.b = 0;
      this.c = (y2 - o_y) / (x2 - o_x);
      this.d = y2 - this.c * x2;
      this.refP_t = [x2, o_x];
      if (x2 < o_x) {
        this.dr = 1;
      } else {
        this.dr = -1;
      }
    }
    this.r = [-Infinity, Infinity];
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

export class angleBisector_2L_1 extends line {
  Line1: line;
  Line2: line;
  constructor(canvas: canvas, l1: line, l2: line) {
    super();
    this.defineTypeName = "angleBisector_2L_1";
    this.init_L1(canvas, false);
    this.init_L2();
    //================//
    this.Line1 = l1;
    this.Line2 = l2;
    //对象间父子关系处理
    l1.children.push(this);
    l2.children.push(this);
    this.parents = [l1, l2];
    //================//
    this.calc();
    this.init_end();
  }
  calc(): void {
    if (this.checkNonExistParents()) {
      return;
    }
    var a1 = this.Line1.a,
      b1 = this.Line1.b,
      c1 = this.Line1.c,
      d1 = this.Line1.d,
      a2 = this.Line2.a,
      b2 = this.Line2.b,
      c2 = this.Line2.c,
      d2 = this.Line2.d;
    if (a1 * c2 == a2 * c1) {
      //两线平行 角平分线不存在
      this.exist = false;
      return;
    }
    this.exist = true;
    this.r = [-Infinity, Infinity];

    var t1 = (b2 * c2 - b1 * c2 + a2 * d1 - a2 * d2) / (a1 * c2 - a2 * c1),
      t2 = (-b1 * c1 + b2 * c1 + a1 * d1 - a1 * d2) / (a1 * c2 - a2 * c1);
    var m = a1 * t1 + b1,
      n = c1 * t1 + d1,
      dnmnt = (a2 * c1 - a1 * c2) * (a2 * c1 + a1 * c2), //角平分线斜率的分母 denominator简称
      p1_x = a1 * (t1 + this.Line1.dr) + b1,
      p1_y = c1 * (t1 + this.Line1.dr) + d1,
      p2_x = a2 * (t2 + this.Line2.dr) + b2,
      p2_y = c2 * (t2 + this.Line2.dr) + d2,
      mn_t;
    if (dnmnt == 0) {
      //分母为零 角平分线垂直于x轴
      this.a = 0;
      this.b = m;
      this.c = 1;
      this.d = 0;
      mn_t = n;
    } else {
      this.a = 1;
      this.b = 0;
      this.c =
        ((a1 * c2 - a2 * c1) * (a1 * a2 - c1 * c2) -
          Math.hypot(a1, c1) * Math.hypot(a2, c2) * Math.abs(a1 * c2 - a2 * c1)) /
        dnmnt;
      this.d = n - this.c * m;
      mn_t = m;
    }
    var p_a, p_b, p_c, p_d;
    if (p1_x == p2_x) {
      p_a = 0;
      p_b = p1_x;
      p_c = 1;
      p_d = 0;
    } else {
      p_a = 1;
      p_b = 0;
      p_c = (p1_y - p2_y) / (p1_x - p2_x);
      p_d = p1_y - p_c * p1_x;
    }
    var p_t = (-this.b * p_c + p_b * p_c + p_a * this.d - p_a * p_d) / (this.a * p_c - p_a * this.c);
    if (p_t > mn_t) {
      this.dr = 1;
      if (dnmnt == 0) {
        this.refP_t = [n + 1, n - 1];
      } else {
        this.refP_t = [m + 1 / Math.sqrt(1 + this.c * this.c), m - 1 / Math.sqrt(1 + this.c * this.c)];
      }
    } else {
      this.dr = -1;
      if (dnmnt == 0) {
        this.refP_t = [n - 1, n + 1];
      } else {
        this.refP_t = [m - 1 / Math.sqrt(1 + this.c * this.c), m + 1 / Math.sqrt(1 + this.c * this.c)];
      }
    }
  }
  getTagCrd(): pos {
    if (!this.exist) {
      return { x: undefined, y: undefined };
    }
    var t = (this.refP_t[1] - this.refP_t[0]) * 2 + this.refP_t[0];
    return {
      x: this.a * t + this.b,
      y: this.c * t + this.d,
    };
  }
}

export class angleBisector_2L_2 extends line {
  Line1: line;
  Line2: line;
  constructor(canvas: canvas, l1: line, l2: line) {
    super();
    this.defineTypeName = "angleBisector_2L_2";
    this.init_L1(canvas, false);
    this.init_L2();
    //================//
    this.Line1 = l1;
    this.Line2 = l2;
    //对象间父子关系处理
    l1.children.push(this);
    l2.children.push(this);
    this.parents = [l1, l2];
    //================//
    this.calc();
    this.init_end();
  }
  calc(): void {
    if (this.checkNonExistParents()) {
      return;
    }
    var a1 = this.Line1.a,
      b1 = this.Line1.b,
      c1 = this.Line1.c,
      d1 = this.Line1.d,
      a2 = this.Line2.a,
      b2 = this.Line2.b,
      c2 = this.Line2.c,
      d2 = this.Line2.d;
    if (a1 * c2 == a2 * c1) {
      //两线平行 角平分线不存在
      this.exist = false;
      return;
    }
    this.exist = true;
    this.r = [-Infinity, Infinity];

    var t1 = (b2 * c2 - b1 * c2 + a2 * d1 - a2 * d2) / (a1 * c2 - a2 * c1),
      t2 = (-b1 * c1 + b2 * c1 + a1 * d1 - a1 * d2) / (a1 * c2 - a2 * c1);
    var m = a1 * t1 + b1,
      n = c1 * t1 + d1,
      dnmnt = (a2 * c1 - a1 * c2) * (a2 * c1 + a1 * c2), //角平分线斜率的分母 denominator简称
      p1_x = a1 * (t1 + this.Line1.dr) + b1,
      p1_y = c1 * (t1 + this.Line1.dr) + d1,
      p2_x = a2 * (t2 + this.Line2.dr) + b2,
      p2_y = c2 * (t2 + this.Line2.dr) + d2,
      mn_t;
    if (dnmnt == 0) {
      //分母为零 角平分线垂直于x轴
      this.a = 0;
      this.b = m;
      this.c = 1;
      this.d = 0;
      mn_t = n;
    } else {
      this.a = 1;
      this.b = 0;
      this.c =
        ((a1 * c2 - a2 * c1) * (a1 * a2 - c1 * c2) +
          Math.hypot(a1, c1) * Math.hypot(a2, c2) * Math.abs(a1 * c2 - a2 * c1)) /
        dnmnt;
      this.d = n - this.c * m;
      mn_t = m;
    }
    var p_a, p_b, p_c, p_d;
    if (p1_x == p2_x) {
      p_a = 0;
      p_b = p1_x;
      p_c = 1;
      p_d = 0;
    } else {
      p_a = 1;
      p_b = 0;
      p_c = (p1_y - p2_y) / (p1_x - p2_x);
      p_d = p1_y - p_c * p1_x;
    }
    var p_t = (-this.b * p_c + p_b * p_c + p_a * this.d - p_a * p_d) / (this.a * p_c - p_a * this.c);
    if (p_t < mn_t) {
      this.dr = 1;
      if (dnmnt == 0) {
        this.refP_t = [n + 1, n - 1];
      } else {
        this.refP_t = [m + 1 / Math.sqrt(1 + this.c * this.c), m - 1 / Math.sqrt(1 + this.c * this.c)];
      }
    } else {
      this.dr = -1;
      if (dnmnt == 0) {
        this.refP_t = [n - 1, n + 1];
      } else {
        this.refP_t = [m - 1 / Math.sqrt(1 + this.c * this.c), m + 1 / Math.sqrt(1 + this.c * this.c)];
      }
    }
  }
  getTagCrd(): pos {
    if (!this.exist) {
      return { x: undefined, y: undefined };
    }
    var t = (this.refP_t[1] - this.refP_t[0]) * 2 + this.refP_t[0];
    return {
      x: this.a * t + this.b,
      y: this.c * t + this.d,
    };
  }
}
