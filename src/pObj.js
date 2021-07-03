import geometryFromType from "./geometry/Geometry.js";
import { IAA } from "./IAA.js";
import { obj } from "./obj.js";
export class pObj {
  constructor(canvas, type, dfnType, dfn, initData) {
    // interactive areas
    this.canvas = canvas;
    this.index = canvas.pO.length;
    canvas.pO.push(this);
    this.geometry = geometryFromType(type, dfnType, dfn, initData, this);
    this.IAA = new IAA(type, this.geometry.data, this);
    this.removed = false;

    canvas.IAseq[0][type == 0 ? 0 : 1].push(this.IAA);
  }
  update() {
    this.geometry.calcData();
    this.IAA.update();
  }
  remove() {
    this.IAA.remove();
    this.removed = true;
  }
  toObj() {
    var i = new obj(
      this.canvas,
      this.geometry.type,
      this.geometry.dfnType,
      this.geometry.dfn,
      {}
    ).index;
    this.remove();
    return i;
  }
}
