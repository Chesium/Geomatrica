import canvas from "../../canvas";
import { pos } from "../../misc";
import { calcPerpendicular } from "../../util";
import line from "../line";
import point from "../point";
import { obj_fc } from "../../object";

export class perpendicular_fc extends obj_fc {
  p: point;
  l: line;
}

export default class perpendicular extends line {
  Point: point;
  Line: line;

  static defineTypeName = "perpendicular";
  constructor(dfc: perpendicular_fc) {
    super();
    this.defineTypeName = perpendicular.defineTypeName;
    this.init_L1(dfc.canvas, false);
    this.init_L2();
    //================//
    this.Point = dfc.p;
    this.Line = dfc.l;
    //对象间父子关系处理
    dfc.l.children.push(this);
    dfc.p.children.push(this);
    dfc.p.onObjs.push(this);
    this.parents = [this.Line, this.Point];
    //================//
    this.calc();
    this.init_end();
  }
  calc(): void {
    if (this.checkNonExistParents()) {
      return;
    }
    this.setData(calcPerpendicular(this.Point, this.Line));
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
