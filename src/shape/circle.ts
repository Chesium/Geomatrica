import shape from "../shape";
import { pairForm } from "../util";
import { crd, pos } from "../misc";
import pointOnCircle from "./point/pointOnShape/pointOnCircle";
import point from "./point";

export default abstract class circle extends shape {
  static readonly IAA_width = 15;

  x: number;
  y: number;
  r: number;

  init_L2() {
    this.shapeName = "circle";
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
      color: shape.IAA_color,
      alpha: shape.IAA_alpha,
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
    //暂时不实现
  }

  backL1() {
    delete this.x;
    delete this.y;
    delete this.r;
  }

  generatePointOnIt(crd: crd): point {
    return new pointOnCircle(this.canvas, this, crd.x, crd.y);
  }
}
