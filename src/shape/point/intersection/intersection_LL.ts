import intersection from "../intersection";
import line from "../../line";
import canvas from "../../../canvas";

export default class intersection_LL extends intersection {
  Line1: line; //点在这条线上
  Line2: line; //点也在这条线上

  constructor(canvas: canvas, l1: line, l2: line, predefined: boolean = false) {
    super(); //无用
    this.defineTypeName = "intersection_LL";
    this.init_L1(canvas, predefined);
    this.init_L2();
    //================//
    this.Line1 = l1;
    this.Line2 = l2;
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
    var a1 = this.Line1.a,
      b1 = this.Line1.b,
      c1 = this.Line1.c,
      d1 = this.Line1.d,
      r1 = this.Line1.r,
      a2 = this.Line2.a,
      b2 = this.Line2.b,
      c2 = this.Line2.c,
      d2 = this.Line2.d,
      r2 = this.Line2.r;
    if (a1 * c2 == a2 * c1) {
      //两线平行无交点
      this.exist = false;
      return;
    }
    var t1 = (b2 * c2 - b1 * c2 + a2 * d1 - a2 * d2) / (a1 * c2 - a2 * c1),
      t2 = (b2 * c1 - b1 * c1 + a1 * d1 - a1 * d2) / (a1 * c2 - a2 * c1);
    if (
      t1 < Math.min(r1[0], r1[1]) ||
      t1 > Math.max(r1[0], r1[1]) ||
      t2 < Math.min(r2[0], r2[1]) ||
      t2 > Math.max(r2[0], r2[1])
    ) {
      this.exist = false;
      return;
    }
    this.exist = true;
    this.x = a1 * t1 + b1;
    this.y = c1 * t1 + d1;
  }
  // beginDraw见shape
  // beginDrag见shape
  // beginMove见shape
  // updDrag见shape
  // updMove见shape
  // getTagCrd见point
}
