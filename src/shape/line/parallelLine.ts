import canvas from "../../canvas";
import { pos } from "../../misc";
import line from "../line";
import point from "../point";

export default class parallelLine extends line {
  Point: point;
  Line: line;
  constructor(canvas: canvas, p: point, l: line) {
    super();
    this.defineTypeName = "perpendicular";
    this.init_L1(canvas, false);
    this.init_L2();
    //================//
    this.Point = p;
    this.Line = l;
    //对象间父子关系处理
    l.children.push(this);
    p.children.push(this);
    this.parents = [this.Line, this.Point];
    //================//
    this.calc();
    this.init_end();
  }
  calc(): void {
    if (this.checkNonExistParents()) {
      return;
    }
    var x = this.Point.x,
      y = this.Point.y,
      a = this.Line.a,
      c = this.Line.c;

    if (a == 0) {
      //[|]->[|]
      this.exist = true;
      this.a = 0;
      this.b = x;
      this.c = 1;
      this.d = 0;
    } else {
      //[/][-]->[/][-]
      var k = c / a;
      this.exist = true;
      this.a = 1;
      this.b = 0;
      this.c = k;
      this.d = y - k * x;
    }

    this.dr = this.Line.dr;
    if (this.dr == 1) {
      this.refP_t = [x + 1 / Math.sqrt(1 + k * k), x - 1 / Math.sqrt(1 + k * k)];
    } else {
      this.refP_t = [x - 1 / Math.sqrt(1 + k * k), x + 1 / Math.sqrt(1 + k * k)];
    }
    this.r = [-Infinity, Infinity];
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
