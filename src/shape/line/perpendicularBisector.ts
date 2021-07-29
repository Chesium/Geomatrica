import canvas from "../../canvas";
import point from "../point";
import line from "../line";
import { crd, pos } from "../../misc";
import { calcLineEq } from "../../util";

export default class perpendicularBisector extends line {
  Point1: point; //点在这条线上
  Point2: point; //点也在这条线上

  constructor(canvas: canvas, p1: point, p2: point) {
    super(); //无用
    this.defineTypeName = "perpendicularBisector";
    this.init_L1(canvas, false);
    this.init_L2();
    //================//
    this.Point1 = p1;
    this.Point2 = p2;
    //对象间父子关系处理
    p1.children.push(this);
    p2.children.push(this);
    this.parents = [this.Point1, this.Point2];
    //================//
    this.calc();
    this.init_end();
  }
  calc(): void {
    if (this.checkNonExistParents()) {
      return;
    }
    var midP: crd = { x: (this.Point1.x + this.Point2.x) / 2, y: (this.Point1.y + this.Point2.y) / 2 };
    var l = calcLineEq(this.Point1, this.Point2);
    if (l.c == 0) {
      this.exist = true;
      this.a = 0;
      this.b = midP.x;
      this.c = 1;
      this.d = 0;
      this.dr = l.dr == 1 ? -1 : 1;
      if (this.dr == 1) {
        this.refP_t = [midP.x + 10 / Math.sqrt(1 + k * k), midP.x - 10 / Math.sqrt(1 + k * k)];
      } else {
        this.refP_t = [midP.x - 10 / Math.sqrt(1 + k * k), midP.x + 10 / Math.sqrt(1 + k * k)];
      }
    } else {
      var k = -l.a / l.c;
      this.exist = true;
      this.a = 1;
      this.b = 0;
      this.c = k;
      this.d = midP.y - k * midP.x;
      if (k > 0) {
        this.dr = l.dr == 1 ? -1 : 1;
      } else {
        this.dr = l.dr;
      }
      if (this.dr == 1) {
        this.refP_t = [midP.x + 1 / Math.sqrt(1 + k * k), midP.x - 1 / Math.sqrt(1 + k * k)];
      } else {
        this.refP_t = [midP.x - 1 / Math.sqrt(1 + k * k), midP.x + 1 / Math.sqrt(1 + k * k)];
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
