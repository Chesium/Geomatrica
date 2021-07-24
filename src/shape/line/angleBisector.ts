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
    this.defineTypeName = "perpendicular";
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
