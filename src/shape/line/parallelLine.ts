import canvas from "../../canvas";
import { pos } from "../../misc";
import calcParallelLine from "../../util";
import line from "../line";
import point from "../point";

export default class parallelLine extends line {
  Point: point;
  Line: line;

  static defineTypeName = "parallelLine";
  constructor(canvas: canvas, p: point, l: line) {
    super();
    this.defineTypeName = parallelLine.defineTypeName;
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
    this.setData(calcParallelLine(this.Point, this.Line));
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
