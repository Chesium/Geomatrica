import pointOnShape from "../pointOnShape";
import line from "../../line";
import canvas from "../../../canvas";
import { substituteIntoLineEq } from "../../../util";

export default class pointOnLine extends pointOnShape {
  proportion: number = 0.5; //比例默认值
  Line: line; //点在这条线上

  static defineTypeName = "pointOnLine";
  constructor(canvas: canvas, l: line, init_x: number, init_y: number) {
    super(); //无用
    this.defineTypeName = pointOnLine.defineTypeName;
    this.init_L1(canvas, false);
    this.init_L2();
    //================//
    this.Line = l;
    this.onObjs.push(l);
    //对象间父子关系处理
    l.children.push(this);
    this.parents = [this.Line];
    //从初始坐标开始找到最近的线上点
    this.x = init_x;
    this.y = init_y;
    this.following = true;
    this.calc();
    this.following = false;
    //================//
    this.init_end();
  }
  calc(): void {
    if (this.checkNonExistParents()) {
      return;
    }
    const a = this.Line.a,
      b = this.Line.b,
      c = this.Line.c,
      d = this.Line.d,
      r = this.Line.r,
      t1 = this.Line.refP_t[0],
      t2 = this.Line.refP_t[1];
    if (!this.following) {
      var t = (t2 - t1) * this.proportion + t1;
      this.exist = true;
      this.setData(substituteIntoLineEq(t, this.Line));
      return;
    }
    if (c == 0 && a == 0) {
      console.log("ERROR in calcData:the line doesn't exist.");
      return;
    }
    var t = (a * (this.x - b) + c * (this.y - d)) / (a * a + c * c);
    if (t < Math.min(r[0], r[1])) {
      this.exist = true;
      this.setData(substituteIntoLineEq(t1, this.Line));
      this.proportion = 0;
    } else if (t > Math.max(r[0], r[1])) {
      this.exist = true;
      this.setData(substituteIntoLineEq(t2, this.Line));
      this.proportion = 1;
    } else {
      this.exist = true;
      this.setData(substituteIntoLineEq(t, this.Line));
      this.proportion = (t - t1) / (t2 - t1);
    }
  }
  // beginDraw见shape
  // beginDrag见pointOnShape
  // beginMove见shape
  // updDrag见pointOnShape
  // updMove见shape
  // getTagCrd见point
}
