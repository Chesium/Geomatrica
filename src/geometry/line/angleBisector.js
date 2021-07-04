import geometry from "../geometryBase.js";
import { haveEqualIndex } from "../../util.js";
import { pObj } from "../../pObj.js";
export class angleBisector_1 extends geometry {
  constructor(dfn, initData, obj) {
    super(1, 6, dfn, initData, obj);
  }
  init(initData) {
    this.seqI = 1;

    this.dfn.p[0].children.push(this);
    this.dfn.p[1].children.push(this);
    this.dfn.p[2].children.push(this);
    this.parents = [this.dfn.p[0], this.dfn.p[1], this.dfn.p[2]];
    this.calcData();
  }
  calcData() {
    if (this.checkHiddenParents()) {
      return;
    }

    var x0 = this.dfn.p[0].data.x,
      y0 = this.dfn.p[0].data.y,
      x1 = this.dfn.p[1].data.x,
      y1 = this.dfn.p[1].data.y,
      x2 = this.dfn.p[2].data.x,
      y2 = this.dfn.p[2].data.y;

    var l01 = (x0 - x1) * (x0 - x1) + (y0 - y1) * (y0 - y1),
      l21 = (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1);

    var k = 1 / (Math.sqrt(l01 / l21) + 1); // 0M:02

    var xm = x2 - k * (x2 - x0),
      ym = y2 - k * (y2 - y0);

    if (x1 == xm && y1 == ym) {
      //x0、x1、x2共线，让0绕1顺转90°
      xm = x1 + y1 - y0;
      ym = y1 - x1 + x0;
    }

    this.data.exist = true;
    if (x1 == xm) {
      this.data.a = 0;
      this.data.b = x1;
      this.data.c = 1;
      this.data.d = 0;
      this.data.r = [-Infinity, Infinity];
      this.cache.p = [y1, ym];
      if (y1 < ym) {
        this.data.dr = 1;
      } else {
        this.data.dr = -1;
      }
    } else {
      this.data.a = 1;
      this.data.b = 0;
      this.data.c = (y1 - ym) / (x1 - xm);
      this.data.r = [-Infinity, Infinity];
      this.data.d = y1 - this.data.c * x1;
      this.cache.p = [x1, xm];
      if (x1 < xm) {
        this.data.dr = 1;
      } else {
        this.data.dr = -1;
      }
    }
  }
  //对于角平分线，无额外beginDraw()方法
  beginDrag(pos) {
    this.beginMove(pos);
    this.focusOnIt();
  }
  beginMove(pos) {
    this.dfn.p[0].beginMove(pos);
    this.dfn.p[1].beginMove(pos);
    this.dfn.p[2].beginMove(pos);
  }
  updDrag(pos) {
    this.updMove(pos);
  }
  updMove(pos) {
    this.dfn.p[0].updMove(pos);
    this.dfn.p[1].updMove(pos);
    this.dfn.p[2].updMove(pos);
  }
  preDefine() {
    for (var i in this.obj.canvas.O) {
      if (this.obj.canvas.O[i].removed || this.obj.canvas.O[i].index == this.obj.index) {
        continue;
      }
      switch (this.obj.canvas.O[i].geometry.type) {
        case 0:
          //Nothing to do
          break;

        case 1:
          if (haveEqualIndex(this.parents, this.obj.canvas.O[i].geometry.parents)) {
            continue;
          }
          this.obj.pObjs.push(
            new pObj(this.obj.canvas, 0, 3, { l: [this, this.obj.canvas.O[i].geometry] }, {})
          );
          break;

        case 2:
          this.obj.pObjs.push(
            new pObj(this.obj.canvas, 0, 6, { l: this, c: this.obj.canvas.O[i].geometry }, {})
          );
          this.obj.pObjs.push(
            new pObj(this.obj.canvas, 0, 7, { l: this, c: this.obj.canvas.O[i].geometry }, {})
          );
          break;

        default:
          break;
      }
    }
  }
  generateRefCrd() {
    if (!this.data.exist) {
      return { x: undefined, y: undefined };
    }

    var t = (this.cache.p[0] + this.cache.p[1]) / 2;

    return {
      x: this.data.a * t + this.data.b,
      y: this.data.c * t + this.data.d,
    };
  }
}

export class angleBisector_2 extends geometry {}

export class angleBisector_3 extends geometry {}