import line from "../line";
import point from "../point";
import { pos } from "../../misc";

export default abstract class twoPointsLine extends line {
  Point1: point;
  Point2: point;
  init_L3(p1: point, p2: point): void {
    this.Point1 = p1;
    this.Point2 = p2;
    p1.children.push(this);
    p2.children.push(this);
    this.parents = [this.Point1, this.Point2];
    this.drawableObj = this.Point2;
  }

  calcLine(type: "x-x" | "x--" | "---" | "xx-"): void {
    //线段 射线 直线 延长线
    if (this.checkNonExistParents()) {
      return;
    }
    this.exist = true;
    var x1 = this.Point1.x,
      y1 = this.Point1.y,
      x2 = this.Point2.x,
      y2 = this.Point2.y;
    if (x1 == x2) {
      if (y1 == y2) {
        this.exist = false;
      } else {
        this.exist = true;
        this.a = 0;
        this.b = x1;
        this.c = 1;
        this.d = 0;
        this.refP_t = [y1, y2];
        if (y1 < y2) {
          switch (type) {
            case "x-x":
              this.r = [y1, y2];
              break;
            case "x--":
              this.r = [y1, Infinity];
              break;
            case "---":
              this.r = [-Infinity, Infinity];
              break;
            case "xx-":
              this.r = [y2, Infinity];
              break;
          }
          this.dr = 1;
        } else {
          switch (type) {
            case "x-x":
              this.r = [y1, y2];
              break;
            case "x--":
              this.r = [-Infinity, y1];
              break;
            case "---":
              this.r = [-Infinity, Infinity];
              break;
            case "xx-":
              this.r = [-Infinity, y2];
              break;
          }
          this.dr = -1;
        }
      }
    } else {
      this.exist = true;
      this.a = 1;
      this.b = 0;
      this.c = (y1 - y2) / (x1 - x2);
      this.d = y1 - this.c * x1;
      this.refP_t = [x1, x2];
      if (x1 < x2) {
        switch (type) {
          case "x-x":
            this.r = [x1, x2];
            break;
          case "x--":
            this.r = [x1, Infinity];
            break;
          case "---":
            this.r = [-Infinity, Infinity];
            break;
          case "xx-":
            this.r = [x2, Infinity];
            break;
        }
        this.dr = 1;
      } else {
        switch (type) {
          case "x-x":
            this.r = [x1, x2];
            break;
          case "x--":
            this.r = [-Infinity, x1];
            break;
          case "---":
            this.r = [-Infinity, Infinity];
            break;
          case "xx-":
            this.r = [-Infinity, x2];
            break;
        }
        this.dr = -1;
      }
    }
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
