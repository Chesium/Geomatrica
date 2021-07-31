import obj from "../object";
import { pairForm } from "../util";
import { crd, pos, stdCircle } from "../misc";
import pointOnCircle from "./point/pointOnShape/pointOnCircle";
import point from "./point";
import { intersection_LC_1, intersection_LC_2 } from "./point/intersection/intersection_LC";
import line from "./line";
import { intersection_CC_1, intersection_CC_2 } from "./point/intersection/intersection_CC";

export default abstract class circle extends obj {
  static readonly IAA_width = 15;
  static shapeName = "circle";

  x: number;
  y: number;
  r: number;

  init_L2() {
    this.shape = circle;
    this.shapeDescription = "all circles";
    this.interactPriority = 1;
    this.bodyZIndex = 5;
  }

  updBody(): void {
    this.body.clear();
    if (!this.shown || !this.exist) {
      return;
    }
    for (var i in this.style.line) {
      this.body.lineStyle(this.style.line[i]);
      this.body.drawCircle(...pairForm(this.canvas.toPos(this)), this.r * this.canvas.trCoe[0]);
    }
  }

  updInteractionArea(): void {
    this.interactionArea.clear();
    if (this.removed || !this.exist || !this.interactive) {
      return;
    }
    this.interactionArea.lineStyle({
      width: circle.IAA_width,
      color: obj.IAA_color,
      alpha: obj.IAA_alpha,
    });
    this.interactionArea.drawCircle(...pairForm(this.canvas.toPos(this)), this.r * this.canvas.trCoe[0]);

    this.needUpdBitmap = true;
    this.needUpdBoundRect = true;
  }

  getTagCrd(): pos {
    if (!this.exist) {
      return { x: undefined, y: undefined };
    }
    return {
      x: this.x + this.r / 1.4142135623730951,
      y: this.y + this.r / 1.4142135623730951,
    };
  }

  preDefine(): void {
    for (var i in this.canvas.O) {
      var t: obj = this.canvas.O[i];
      if (!t.shown || t.removed || t.index == this.index) {
        continue;
      }
      if (t instanceof line) {
        new intersection_LC_1({ canvas: this.canvas, l: t, c: this, predefined: true });
        new intersection_LC_2({ canvas: this.canvas, l: t, c: this, predefined: true });
      }
      if (t instanceof circle) {
        new intersection_CC_1({ canvas: this.canvas, c1: this, c2: t, predefined: true });
        new intersection_CC_2({ canvas: this.canvas, c1: this, c2: t, predefined: true });
      }
    }
  }

  generatePointOnIt(crd: crd): point {
    return new pointOnCircle({ canvas: this.canvas, c: this, init_x: crd.x, init_y: crd.y });
  }

  setData(c: stdCircle): void {
    this.x = c.x;
    this.y = c.y;
    this.r = c.r;
    this.exist = c.exist;
  }
}
