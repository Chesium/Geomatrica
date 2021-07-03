import geometry from "../geometryBase.js";

export class itsc_LC_1 extends geometry {
  constructor(dfn, initData, obj) {
    super(0, 6, dfn, initData, obj);
  }
  init(initData) {
    this.seqI = 0;

    this.dfn.l.children.push(this);
    this.dfn.c.children.push(this);

    this.parents = [this.dfn.l, this.dfn.c];
  }
  calcData() {
    if (this.checkHiddenParents()) {
      return;
    }

    var a = this.dfn.l.data.a,
      b = this.dfn.l.data.b,
      c = this.dfn.l.data.c,
      d = this.dfn.l.data.d,
      rg = this.dfn.l.data.r, //range of t
      x = this.dfn.c.data.x,
      y = this.dfn.c.data.y,
      r = this.dfn.c.data.r;
    var A = a * a + c * c,
      B = 2 * (a * (b - x) + c * (d - y)),
      C = b * b + d * d + x * x + y * y - r * r - 2 * (b * x + d * y);
    var delta = B * B - 4 * A * C; //判别式Δ
    if (delta < 0) {
      this.data.exist = false;
      return;
    }
    var t1 = (-B + Math.sqrt(delta)) / (2 * A);
    var t2 = -(B / A + t1),
      ts = [],
      t;
    if (t1 >= Math.min(rg[0], rg[1]) && t1 <= Math.max(rg[0], rg[1])) {
      ts.push(t1);
    }
    if (t2 >= Math.min(rg[0], rg[1]) && t2 <= Math.max(rg[0], rg[1])) {
      ts.push(t2);
    }
    if (ts.length == 0) {
      this.data.exist = false;
      return;
    }
    if (this.dfn.l.data.dr == 1) {
      t = Math.max(...ts);
    } else {
      t = Math.min(...ts);
    }
    this.data.exist = true;
    this.data.x = a * t + b;
    this.data.y = c * t + d;
  }
  //对于点，无额外beginDraw()方法
  beginDrag(pos) {
    this.beginMove(pos);
  }
  beginMove(pos) {
    this.dfn.l.beginMove(pos);
    this.dfn.c.beginMove(pos);
  }
  updDrag(pos) {
    this.updMove(pos);
  }
  updMove(pos) {
    this.dfn.l.updMove(pos);
    this.dfn.c.updMove(pos);
  }
  //对于点，无额外preDefine()方法
  generateRefCrd() {
    return this.data;
  }
}

export class itsc_LC_2 extends geometry {
  constructor(dfn, initData, obj) {
    super(0, 7, dfn, initData, obj);
  }
  init(initData) {
    this.seqI = 0;

    this.dfn.l.children.push(this);
    this.dfn.c.children.push(this);

    this.parents = [this.dfn.l, this.dfn.c];
  }
  calcData() {
    if (this.checkHiddenParents()) {
      return;
    }

    var a = this.dfn.l.data.a,
      b = this.dfn.l.data.b,
      c = this.dfn.l.data.c,
      d = this.dfn.l.data.d,
      rg = this.dfn.l.data.r, //range of t
      x = this.dfn.c.data.x,
      y = this.dfn.c.data.y,
      r = this.dfn.c.data.r;
    var A = a * a + c * c,
      B = 2 * (a * (b - x) + c * (d - y)),
      C = b * b + d * d + x * x + y * y - r * r - 2 * (b * x + d * y);
    var delta = B * B - 4 * A * C; //判别式Δ
    if (delta < 0) {
      this.data.exist = false;
      return;
    }
    var t1 = (-B + Math.sqrt(delta)) / (2 * A);
    var t2 = -(B / A + t1),
      ts = [],
      t;
    if (t1 >= Math.min(rg[0], rg[1]) && t1 <= Math.max(rg[0], rg[1])) {
      ts.push(t1);
    }
    if (t2 >= Math.min(rg[0], rg[1]) && t2 <= Math.max(rg[0], rg[1])) {
      ts.push(t2);
    }
    if (ts.length != 2) {
      this.data.exist = false;
      return;
    }
    if (this.dfn.l.data.dr == -1) {
      t = Math.max(...ts);
    } else {
      t = Math.min(...ts);
    }
    this.data.exist = true;
    this.data.x = a * t + b;
    this.data.y = c * t + d;
  }
  //对于点，无额外beginDraw()方法
  beginDrag(pos) {
    this.beginMove(pos);
  }
  beginMove(pos) {
    this.dfn.l.beginMove(pos);
    this.dfn.c.beginMove(pos);
  }
  updDrag(pos) {
    this.updMove(pos);
  }
  updMove(pos) {
    this.dfn.l.updMove(pos);
    this.dfn.c.updMove(pos);
  }
  //对于点，无额外preDefine()方法
  generateRefCrd() {
    return this.data;
  }
}
