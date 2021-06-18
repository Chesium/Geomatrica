import { geometry } from "./geometry.js";
import { GFD } from "./GFD.js";
import { IAA } from "./IAA.js";
export class obj {
  constructor(canvas, type, dfnType, dfn, initData) {
    // interactive areas
    this.canvas = canvas;
    this.index = canvas.O.length;
    canvas.O.push(this);
    this.geometry = new geometry(type, dfnType, dfn, initData, this);
    this.IAA = new IAA(type, this.geometry.data, this);
    this.GFD = new GFD(type, this.geometry.data, this);
    this.removed = false;
    this.pObjs = [];

    canvas.IAseq[1][type == 0 ? 0 : 1].push(this.IAA);

    this.geometry.preDifine();
  }
  update() {
    this.geometry.calcData();
    this.GFD.update();
    this.IAA.update();
    for (var i in this.geometry.children) {
      this.geometry.children[i].obj.update();
    }
    for (var i in this.pObjs) {
      if (!this.pObjs[i].removed) {
        this.pObjs[i].update();
      }
    }
  }
  remove() {
    this.canvas.F = -1;
    this.canvas.Status = 0;
    this.IAA.remove();
    this.GFD.remove();
    this.removed = true;
    for (var i in this.geometry.children) {
      this.geometry.children[i].obj.remove();
    }
  }
}
