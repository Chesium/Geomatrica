import canvas from "../../canvas";
import { pos } from "../../misc";
import { calcIntersectionLL, calcLineEq, substituteIntoLineEq } from "../../util";
import line from "../line";
import point from "../point";
import { obj_fc } from "../../object";

export class angleBisector_3P_fc extends obj_fc {
  p1: point;
  p2: point;
  p3: point;
}
export class angleBisector_2L_fc extends obj_fc {
  l1: line;
  l2: line;
}

export default class angleBisector_3P extends line {
  Point1: point;
  Point2: point;
  Point3: point;

  static defineTypeName = "angleBisector_3P";
  constructor(canvas: canvas, p1: point, p2: point, p3: point) {
    super();
    this.defineTypeName = angleBisector_3P.defineTypeName;
    this.init_L1(canvas, false);
    this.init_L2();
    //================//
    this.Point1 = p1;
    this.Point2 = p2;
    this.Point3 = p3;
    //对象间父子关系处理
    p1.children.push(this);
    p1.onObjs.push(this);
    p2.children.push(this);
    p2.onObjs.push(this);
    p3.children.push(this);
    p3.onObjs.push(this);
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
    if ((x1 == x2 && y1 == y2) || (x3 == x2 && y3 == y2)) {
      //1 2 重合 或 3 2 重合
      this.exist = false;
      return;
    }
    var l12 = Math.hypot(x1 - x2, y1 - y2), //边 12 的长度
      l32 = Math.hypot(x3 - x2, y3 - y2); //边 32 的长度
    var k1o_o3 = l12 / l32; //边1o与边o3长度之比
    var ko3_13 = 1 / (k1o_o3 + 1); //边o2与边13长度之比
    var o = {
      x: x3 - (x3 - x1) * ko3_13,
      y: y3 - (y3 - y1) * ko3_13,
    };

    this.setData(calcLineEq(this.Point2, o));
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

  static defineTypeName = "angleBisector_2L_1";
  constructor(canvas: canvas, l1: line, l2: line) {
    super();
    this.defineTypeName = angleBisector_2L_1.defineTypeName;
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
      c1 = this.Line1.c,
      a2 = this.Line2.a,
      c2 = this.Line2.c;
    this.r = [-Infinity, Infinity];
    var itsc = calcIntersectionLL(this.Line1, this.Line2);
    if (!itsc.exist) {
      this.exist = false;
      return;
    }
    this.exist = true;
    var p = substituteIntoLineEq(itsc.t1, this.Line1),
      p1 = substituteIntoLineEq(itsc.t1 + 1, this.Line1),
      p2 = substituteIntoLineEq(itsc.t2 + 1, this.Line2);

    var dnmnt = (a2 * c1 - a1 * c2) * (a2 * c1 + a1 * c2); //角平分线斜率的分母 denominator简称
    var mn_t;
    if (dnmnt == 0) {
      //分母为零 角平分线垂直于x轴
      this.a = 0;
      this.b = p.x;
      this.c = 1;
      this.d = 0;
      mn_t = p.y;
    } else {
      this.a = 1;
      this.b = 0;
      this.c =
        ((a1 * c2 - a2 * c1) * (a1 * a2 - c1 * c2) -
          Math.hypot(a1, c1) * Math.hypot(a2, c2) * Math.abs(a1 * c2 - a2 * c1)) /
        dnmnt;
      this.d = p.y - this.c * p.x;
      mn_t = p.x;
    }
    var pl = calcLineEq(p1, p2);
    var pItsc = calcIntersectionLL(this, pl);
    if (pItsc.t1 > mn_t) {
      this.dr = 1;
      if (dnmnt == 0) {
        this.refP_t = [p.y + 1, p.y - 1];
      } else {
        this.refP_t = [p.x + 1 / Math.sqrt(1 + this.c * this.c), p.x - 1 / Math.sqrt(1 + this.c * this.c)];
      }
    } else {
      this.dr = -1;
      if (dnmnt == 0) {
        this.refP_t = [p.y - 1, p.y + 1];
      } else {
        this.refP_t = [p.x - 1 / Math.sqrt(1 + this.c * this.c), p.x + 1 / Math.sqrt(1 + this.c * this.c)];
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

  static defineTypeName = "angleBisector_2L_2";
  constructor(canvas: canvas, l1: line, l2: line) {
    super();
    this.defineTypeName = angleBisector_2L_2.defineTypeName;
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
      c1 = this.Line1.c,
      a2 = this.Line2.a,
      c2 = this.Line2.c;
    this.r = [-Infinity, Infinity];
    var itsc = calcIntersectionLL(this.Line1, this.Line2);
    if (!itsc.exist) {
      this.exist = false;
      return;
    }
    this.exist = true;
    var p = substituteIntoLineEq(itsc.t1, this.Line1),
      p1 = substituteIntoLineEq(itsc.t1 + 1, this.Line1),
      p2 = substituteIntoLineEq(itsc.t2 + 1, this.Line2);

    var dnmnt = (a2 * c1 - a1 * c2) * (a2 * c1 + a1 * c2); //角平分线斜率的分母 denominator简称
    var mn_t;
    if (dnmnt == 0) {
      //分母为零 角平分线垂直于x轴
      this.a = 0;
      this.b = p.x;
      this.c = 1;
      this.d = 0;
      mn_t = p.y;
    } else {
      this.a = 1;
      this.b = 0;
      this.c =
        ((a1 * c2 - a2 * c1) * (a1 * a2 - c1 * c2) +
          Math.hypot(a1, c1) * Math.hypot(a2, c2) * Math.abs(a1 * c2 - a2 * c1)) /
        dnmnt;
      this.d = p.y - this.c * p.x;
      mn_t = p.x;
    }
    var pl = calcLineEq(p1, p2);
    var pItsc = calcIntersectionLL(this, pl);
    if (pItsc.t1 > mn_t) {
      this.dr = 1;
      if (dnmnt == 0) {
        this.refP_t = [p.y + 1, p.y - 1];
      } else {
        this.refP_t = [p.x + 1 / Math.sqrt(1 + this.c * this.c), p.x - 1 / Math.sqrt(1 + this.c * this.c)];
      }
    } else {
      this.dr = -1;
      if (dnmnt == 0) {
        this.refP_t = [p.y - 1, p.y + 1];
      } else {
        this.refP_t = [p.x - 1 / Math.sqrt(1 + this.c * this.c), p.x + 1 / Math.sqrt(1 + this.c * this.c)];
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
