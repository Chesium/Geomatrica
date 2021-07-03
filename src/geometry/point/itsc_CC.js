import geometry from "../geometryBase.js";

export class itsc_CC_1 extends geometry {
  constructor(dfn, initData, obj) {
    super(0, 4, dfn, initData, obj);
  }
  init(initData) {
    this.seqI = 0;

    this.dfn.c[0].children.push(this);
    this.dfn.c[1].children.push(this);

    this.parents = [this.dfn.c[0], this.dfn.c[1]];
  }
  calcData() {
    if (this.checkHiddenParents()) {
      return;
    }

    var x1 = this.dfn.c[0].data.x,
      y1 = this.dfn.c[0].data.y,
      r1 = this.dfn.c[0].data.r,
      x2 = this.dfn.c[1].data.x,
      y2 = this.dfn.c[1].data.y,
      r2 = this.dfn.c[1].data.r;
    var k = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
    var s = Math.sqrt(k);
    if (s > r1 + r2) {
      this.data.exist = false;
      return;
    }
    var n = (r1 * r1 - r2 * r2) / (2 * k) + 0.5;
    var p = s * n;
    var xM = x1 + n * (x2 - x1),
      yM = y1 + n * (y2 - y1);
    var q = Math.sqrt(r1 * r1 - p * p) / p;
    this.data.exist = true;
    this.data.x = xM + q * (y1 - yM);
    this.data.y = yM - q * (x1 - xM);
  }
  //对于点，无额外beginDraw()方法
  beginDrag(pos) {
    this.beginMove(pos);
  }
  beginMove(pos) {
    this.dfn.c[0].beginMove(pos);
    this.dfn.c[1].beginMove(pos);
  }
  updDrag(pos) {
    this.updMove(pos);
  }
  updMove(pos) {
    this.dfn.c[0].updMove(pos);
    this.dfn.c[1].updMove(pos);
  }
  //对于点，无额外preDefine()方法
  generateRefCrd() {
    return this.data;
  }
}

export class itsc_CC_2 extends geometry {
  constructor(dfn, initData, obj) {
    super(0, 5, dfn, initData, obj);
  }
  init(initData) {
    this.seqI = 0;

    this.dfn.c[0].children.push(this);
    this.dfn.c[1].children.push(this);

    this.parents = [this.dfn.c[0], this.dfn.c[1]];
  }
  calcData() {
    if (this.checkHiddenParents()) {
      return;
    }

    var x1 = this.dfn.c[0].data.x,
      y1 = this.dfn.c[0].data.y,
      r1 = this.dfn.c[0].data.r,
      x2 = this.dfn.c[1].data.x,
      y2 = this.dfn.c[1].data.y,
      r2 = this.dfn.c[1].data.r;
    var k = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
    var s = Math.sqrt(k);
    if (s > r1 + r2) {
      this.data.exist = false;
      return;
    }
    var n = (r1 * r1 - r2 * r2) / (2 * k) + 0.5;
    var p = s * n;
    var xM = x1 + n * (x2 - x1),
      yM = y1 + n * (y2 - y1);
    var q = Math.sqrt(r1 * r1 - p * p) / p;
    this.data.exist = true;
    this.data.x = xM - q * (y1 - yM);
    this.data.y = yM + q * (x1 - xM);
  }
  //对于点，无额外beginDraw()方法
  beginDrag(pos) {
    this.beginMove(pos);
  }
  beginMove(pos) {
    this.dfn.c[0].beginMove(pos);
    this.dfn.c[1].beginMove(pos);
  }
  updDrag(pos) {
    this.updMove(pos);
  }
  updMove(pos) {
    this.dfn.c[0].updMove(pos);
    this.dfn.c[1].updMove(pos);
  }
  //对于点，无额外preDefine()方法
  generateRefCrd() {
    return this.data;
  }
}
