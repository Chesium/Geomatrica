import shape from "../shape";
import { crd, range } from "../misc";
import { L_DpData_To_epCrd, posForm, pairForm } from "../util";
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
      pairForm(this.canvas.toCrd(posForm(this.canvas.stageBound[0]))),
      pairForm(this.canvas.toCrd(posForm(this.canvas.stageBound[1]))),
    ]);
    if (!endPoints[0]) {
      return;
    }
    for (var i in this.style.line) {
      this.body.lineStyle(this.style.line[i]);
      this.body.moveTo(...pairForm(this.canvas.toPos(endPoints[1])));
      this.body.lineTo(...pairForm(this.canvas.toPos(endPoints[2])));
    }
  }

  updInteractionArea(): void {
    this.interactionArea.clear();
    if (this.removed || !this.exist || !this.interactive) {
      return;
    }
    var endPoints = L_DpData_To_epCrd(this, [
      pairForm(this.canvas.toCrd(posForm(this.canvas.stageBound[0]))),
      pairForm(this.canvas.toCrd(posForm(this.canvas.stageBound[1]))),
    ]);
    if (!endPoints[0]) {
      return;
    }
    this.interactionArea.lineStyle({
      width: line.IAA_width,
      color: shape.IAA_color,
      alpha: shape.IAA_alpha,
    });
    this.interactionArea.moveTo(...pairForm(this.canvas.toPos(endPoints[1])));
    this.interactionArea.lineTo(...pairForm(this.canvas.toPos(endPoints[2])));

    this.needUpdBitmap = true;
    this.needUpdBoundRect = true;
  }

  preDefine(): void {
    //暂时不实现
  }

  generatePointOnIt(crd: crd): point {
    return new pointOnLine(this.canvas, this, crd.x, crd.y);
  }
}
