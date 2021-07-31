import intersection from "../intersection";
import line from "../../line";
import canvas from "../../../canvas";
import { calcIntersectionLL, substituteIntoLineEq } from "../../../util";
import { obj_fc } from "../../../object";

export class intersection_LL_fc extends obj_fc {
  l1: line;
  l2: line;
  predefined: boolean = false;
}

export default class intersection_LL extends intersection {
  Line1: line; //点在这条线上
  Line2: line; //点也在这条线上

  static defineTypeName = "intersection_LL";
  constructor(canvas: canvas, l1: line, l2: line, predefined: boolean = false) {
    super(); //无用
    this.defineTypeName = intersection_LL.defineTypeName;
    this.init_L1(canvas, predefined);
    this.init_L2();
    //================//
    this.Line1 = l1;
    this.Line2 = l2;
    this.onObjs.push(l1, l2);
    //对象间父子关系处理
    l1.children.push(this);
    l2.children.push(this);
    this.parents = [this.Line1, this.Line2];
    //================//
    this.calc();
    this.init_end();
  }
  calc(): void {
    if (this.checkNonExistParents()) {
      return;
    }
    var r1 = this.Line1.r,
      r2 = this.Line2.r;
    var itsc = calcIntersectionLL(this.Line1, this.Line2);
    if (!itsc.exist) {
      this.exist = false;
      return;
    }
    if (
      itsc.t1 < Math.min(r1[0], r1[1]) ||
      itsc.t1 > Math.max(r1[0], r1[1]) ||
      itsc.t2 < Math.min(r2[0], r2[1]) ||
      itsc.t2 > Math.max(r2[0], r2[1])
    ) {
      this.exist = false;
      return;
    }
    this.exist = true;
    this.setData(substituteIntoLineEq(itsc.t1, this.Line1));
  }
  // beginDraw见shape
  // beginDrag见shape
  // beginMove见shape
  // updDrag见shape
  // updMove见shape
  // getTagCrd见point
}
