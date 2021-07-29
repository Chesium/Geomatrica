import canvas from "../../canvas";
import { pos } from "../../misc";
import { calcPerpendicular } from "../../util";
import line from "../line";
import point from "../point";

export default class perpendicular extends line {
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
    p.onObjs.push(this);
    this.parents = [this.Line, this.Point];
    //================//
    this.calc();
    this.init_end();
  }
  calc(): void {
    if (this.checkNonExistParents()) {
      return;
    }
    var perp = calcPerpendicular(this.Point, this.Line);
    this.a = perp.a;
    this.b = perp.b;
    this.c = perp.c;
    this.d = perp.d;
    this.r = perp.r;
    this.dr = perp.dr;
    this.exist = perp.exist;
    this.refP_t = perp.refP_t;
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
