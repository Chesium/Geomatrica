import pointOnShape from "../pointOnShape";
import circle from "../../circle";
import canvas from "../../../canvas";
import { obj_fc } from "../../../object";

export class pointOnCircle_fc extends obj_fc {
  c: circle;
  init_x: number;
  init_y: number;
}

export default class pointOnCircle extends pointOnShape {
  cosine: number = 0;
  sine: number = 0;
  Circle: circle; //点在这个圆上

  static defineTypeName = "pointOnCircle";
  constructor(dfc: pointOnCircle_fc) {
    super(); //无用
    this.defineTypeName = pointOnCircle.defineTypeName;
    this.init_L1(dfc.canvas, false);
    this.init_L2();
    //================//
    this.Circle = dfc.c;
    this.onObjs.push(dfc.c);
    //对象间父子关系处理
    dfc.c.children.push(this);
    this.parents = [this.Circle];
    //从初始坐标开始找到最近的线上点
    this.x = dfc.init_x;
    this.y = dfc.init_y;
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
    var x0 = this.Circle.x,
      y0 = this.Circle.y,
      r = this.Circle.r;
    if (this.following) {
      var x1 = this.x,
        y1 = this.y;
      var xdif = x1 - x0,
        ydif = y1 - y0;
      var d = Math.sqrt(xdif * xdif + ydif * ydif);
      this.cosine = xdif / d;
      this.sine = ydif / d;
    }
    this.exist = true;
    this.x = x0 + r * this.cosine;
    this.y = y0 + r * this.sine;
  }
  // beginDraw见shape
  // beginDrag见pointOnShape
  // beginMove见shape
  // updDrag见pointOnShape
  // updMove见shape
  // getTagCrd见point
}
