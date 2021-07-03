import geometry from "../geometryBase.js";

export default class itsc_LL extends geometry {
  constructor(dfn, initData, obj) {
    super(0, 3, dfn, initData, obj);
  }
  init(initData) {
    this.seqI = 0;

    this.dfn.l[0].children.push(this);
    this.dfn.l[1].children.push(this);

    this.parents = [this.dfn.l[0], this.dfn.l[1]];
  }
  calcData() {
    if (this.checkHiddenParents()) {
      return;
    }

    var a1 = this.dfn.l[0].data.a,
      b1 = this.dfn.l[0].data.b,
      c1 = this.dfn.l[0].data.c,
      d1 = this.dfn.l[0].data.d,
      r1 = this.dfn.l[0].data.r,
      a2 = this.dfn.l[1].data.a,
      b2 = this.dfn.l[1].data.b,
      c2 = this.dfn.l[1].data.c,
      d2 = this.dfn.l[1].data.d,
      r2 = this.dfn.l[1].data.r;
    if (a1 * c2 == a2 * c1) {
      //两线平行无交点
      this.data.exist = false;
      return;
    }
    var t1 = (b2 * c2 - b1 * c2 + a2 * d1 - a2 * d2) / (a1 * c2 - a2 * c1),
      t2 = (b2 * c1 - b1 * c1 + a1 * d1 - a1 * d2) / (a1 * c2 - a2 * c1);
    if (
      t1 < Math.min(r1[0], r1[1]) ||
      t1 > Math.max(r1[0], r1[1]) ||
      t2 < Math.min(r2[0], r2[1]) ||
      t2 > Math.max(r2[0], r2[1])
    ) {
      this.data.exist = false;
      return;
    }
    this.data.exist = true;
    this.data.x = a1 * t1 + b1;
    this.data.y = c1 * t1 + d1;
  }
  //对于点，无额外beginDraw()方法
  beginDrag(pos) {
    this.beginMove(pos);
  }
  beginMove(pos) {
    this.dfn.l[0].beginMove(pos);
    this.dfn.l[1].beginMove(pos);
  }
  updDrag(pos) {
    this.updMove(pos);
  }
  updMove(pos) {
    this.dfn.l[0].updMove(pos);
    this.dfn.l[1].updMove(pos);
  }
  //对于点，无额外preDefine()方法
  generateRefCrd() {
    return this.data;
  }
}
