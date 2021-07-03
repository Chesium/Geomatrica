import geometry from "../geometry.js";

export default class pointOnLine extends geometry {
  constructor(dfn, initData, obj) {
    super(0, 1, dfn, initData, obj);
  }
  init(initData) {
    this.seqI = 0;

    this.dfn.l.children.push(this);
    this.parents = [this.dfn.l];
    //init cache
    this.cache.proportion = 0.5; //比例默认值
    this.cache.following = true; //是否跟随鼠标

    //Actually not real
    this.data.x = initData.pos.x;
    this.data.y = initData.pos.y;
  }
  calcData() {
    if (this.checkHiddenParents()) {
      return;
    }

    var a = this.dfn.l.data.a,
      b = this.dfn.l.data.b,
      c = this.dfn.l.data.c,
      d = this.dfn.l.data.d,
      r = this.dfn.l.data.r,
      t1 = this.dfn.l.cache.p[0],
      t2 = this.dfn.l.cache.p[1];
    if (!this.cache.following) {
      var t = (t2 - t1) * this.cache.proportion + t1;
      this.data.exist = true;
      this.data.x = a * t + b;
      this.data.y = c * t + d;
      return;
    }
    if (c == 0 && a == 0) {
      console.log("ERROR in calcData:the line doesn't exist.");
      return;
    }
    var t = (a * (this.data.x - b) + c * (this.data.y - d)) / (a * a + c * c);
    if (t < Math.min(r[0], r[1])) {
      this.data.exist = true;
      this.data.x = a * t1 + b;
      this.data.y = c * t1 + d;
      this.cache.proportion = 0;
    } else if (t > Math.max(r[0], r[1])) {
      this.data.exist = true;
      this.data.x = a * t2 + b;
      this.data.y = c * t2 + d;
      this.cache.proportion = 1;
    } else {
      this.data.exist = true;
      this.data.x = a * t + b;
      this.data.y = c * t + d;
      this.cache.proportion = (t - t1) / (t2 - t1);
      // console.log("ppt=", this.cache.proportion);
    }
  }
  //对于点，无额外beginDraw()方法
  beginDrag(pos) {
    this.focusOnIt();
  }
  beginMove(pos) {
    this.dfn.l.beginDrag(pos);
  }
  updDrag(pos) {
    this.data.x = pos.x;
    this.data.y = pos.y;
    this.cache.following = true;
    this.obj.update();
    this.cache.following = false;
  }
  updMove(pos) {
    this.dfn.l.updMove(pos);
  }
  //对于点，无额外preDefine()方法
  generateRefCrd() {
    return this.data;
  }
}
