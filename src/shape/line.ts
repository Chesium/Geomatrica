import shape from "../shape";
import { crd, range } from "../misc";
import { L_DpData_To_epCrd, toPos, toPair } from "../util";
import point from "./point";
import pointOnLine from "./point/pointOnShape/pointOnLine";

export default abstract class line extends shape {
  static readonly IAA_width = 15;

  a: number;
  b: number;
  c: number;
  d: number;
  r: range;
  dr: -1 | 1;

  refP_t: range;

  init_L2(): void {
    this.interactPriority = 1;
    this.shapeName = "line";
    this.shapeDescription = "all lines";
    this.bodyZIndex = 5;
  }

  updBody(): void {
    this.body.clear();
    if (!this.shown || !this.exist) {
      return;
    }
    var endPoints = L_DpData_To_epCrd(this, [
      toPair(this.canvas.toCrd(toPos(this.canvas.stageBound[0]))),
      toPair(this.canvas.toCrd(toPos(this.canvas.stageBound[1]))),
    ]);
    if (!endPoints[0]) {
      return;
    }
    for (var i in this.style.line) {
      this.body.lineStyle(this.style.line[i]);
      this.body.moveTo(...toPair(this.canvas.toPos(toPos(endPoints[1]))));
      this.body.lineTo(...toPair(this.canvas.toPos(toPos(endPoints[2]))));
    }
  }

  updInteractionArea(): void {
    this.interactionArea.clear();
    if (this.removed || !this.exist || !this.interactive) {
      return;
    }
    var endPoints = L_DpData_To_epCrd(this, [
      toPair(this.canvas.toCrd(toPos(this.canvas.stageBound[0]))),
      toPair(this.canvas.toCrd(toPos(this.canvas.stageBound[1]))),
    ]);
    if (!endPoints[0]) {
      return;
    }
    this.interactionArea.lineStyle({
      width: line.IAA_width,
      color: shape.IAA_color,
      alpha: shape.IAA_alpha,
    });
    this.interactionArea.moveTo(...toPair(this.canvas.toPos(toPos(endPoints[1]))));
    this.interactionArea.lineTo(...toPair(this.canvas.toPos(toPos(endPoints[2]))));

    this.needUpdBitmap = true;
    this.needUpdBoundRect = true;
  }

  preDefine(): void {
    //暂时不实现
  }

  backL1() {
    delete this.a;
    delete this.b;
    delete this.c;
    delete this.d;
    delete this.r;
    delete this.dr;
  }

  generatePointOnIt(crd: crd): point {
    return new pointOnLine(this.canvas, this, crd.x, crd.y);
  }
}
