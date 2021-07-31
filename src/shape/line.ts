import obj from "../object";
import { crd, range, stdLine } from "../misc";
import { L_DpData_To_epCrd, posForm, pairForm } from "../util";
import point from "./point";
import pointOnLine from "./point/pointOnShape/pointOnLine";
import intersection_LL from "./point/intersection/intersection_LL";
import circle from "./circle";
import { intersection_LC_1, intersection_LC_2 } from "./point/intersection/intersection_LC";

function haveEqualIndex(arr1: obj[], arr2: obj[]) {
  for (var i = 0; i < arr2.length; i++) {
    for (var j = 0; j < arr1.length; j++) {
      if (arr1[j].index == arr2[i].index) {
        return true;
      }
    }
  }
  return false;
}

export default abstract class line extends obj {
  static readonly IAA_width = 15;
  static shapeName = "line";

  a: number;
  b: number;
  c: number;
  d: number;
  r: range;
  dr: -1 | 1;

  refP_t: range;

  init_L2(): void {
    this.interactPriority = 1;
    this.shape = line;
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
      color: obj.IAA_color,
      alpha: obj.IAA_alpha,
    });
    this.interactionArea.moveTo(...pairForm(this.canvas.toPos(endPoints[1])));
    this.interactionArea.lineTo(...pairForm(this.canvas.toPos(endPoints[2])));

    this.needUpdBitmap = true;
    this.needUpdBoundRect = true;
  }

  preDefine(): void {
    for (var i in this.canvas.O) {
      var t: obj = this.canvas.O[i];
      if (!t.shown || t.removed || t.index == this.index) {
        continue;
      }
      if (t instanceof line) {
        if (haveEqualIndex(this.parents, t.parents)) {
          continue;
        }
        new intersection_LL({ canvas: this.canvas, l1: this, l2: t, predefined: true });
      }
      if (t instanceof circle) {
        new intersection_LC_1({ canvas: this.canvas, l: this, c: t, predefined: true });
        new intersection_LC_2({ canvas: this.canvas, l: this, c: t, predefined: true });
      }
    }
  }

  generatePointOnIt(crd: crd): point {
    return new pointOnLine({ canvas: this.canvas, l: this, init_x: crd.x, init_y: crd.y });
  }

  setData(l: stdLine): void {
    this.a = l.a;
    this.b = l.b;
    this.c = l.c;
    this.d = l.d;
    this.r = l.r;
    this.dr = l.dr;
    this.exist = l.exist;
    this.refP_t = l.refP_t;
  }
}
