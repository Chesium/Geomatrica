import geometry from "../geometry.js";

export default class perpendicular extends geometry {
  constructor(dfn, initData, obj) {
    super(1, 3, dfn, initData, obj);
  }
  init(initData) {
    this.seqI = 1;

    this.dfn.p.children.push(this);
    this.dfn.l.children.push(this);
    this.parents = [this.dfn.p, this.dfn.l];
  }
  calcData() {
    if (this.checkHiddenParents()) {
      return;
    }

    var x = this.dfn.p.data.x,
      y = this.dfn.p.data.y,
      a = this.dfn.l.data.a,
      b = this.dfn.l.data.b,
      c = this.dfn.l.data.c,
      d = this.dfn.l.data.d;
    if (c == 0) {
      //[-]->[|]
      this.data.exist = true;
      this.data.a = 0;
      this.data.b = x;
      this.data.c = 1;
      this.data.d = 0;
      // this.cache.p = [y, y + 1]; //(x,y)->t1 (x,y+1)->t2

      /**
       *
       *   +-------------+ ↻ +-------------+
       *   |             | ↻ |             |
       *   |             | ↻ |      |      |
       *   |   ------>   | ↻ |      |      |
       *   |             | ↻ |      ↓      |
       *   |             | ↻ |             |
       *   +-------------+ ↻ +-------------+
       *
       */

      //clockwise 90°
      this.data.dr = -this.dfn.l.data.dr;

      if (this.data.dr == 1) {
        this.cache.p = [x + 10 / Math.sqrt(1 + k * k), x - 10 / Math.sqrt(1 + k * k)];
      } else {
        this.cache.p = [x - 10 / Math.sqrt(1 + k * k), x + 10 / Math.sqrt(1 + k * k)];
      }
    } else {
      //[/][|]->[\][-]
      var k = -a / c;
      this.data.exist = true;
      this.data.a = 1;
      this.data.b = 0;
      this.data.c = k;
      this.data.d = y - k * x;

      /**
       *
       *   ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄ ↻ ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
       *   █     *       █ ↻ █             █
       *   █    /        █ ↻ █  ██\        █
       *   █   /         █ ↻ █     ██\     █
       *   █  /          █ ↻ █        █*   █
       *   █             █ ↻ █             █
       *   ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ ↻ ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
       *
       */

      //clockwise 90°
      if (k > 0) {
        this.data.dr = -this.dfn.l.data.dr;
      } else {
        this.data.dr = this.dfn.l.data.dr;
      }
      if (this.data.dr == 1) {
        this.cache.p = [x + 1 / Math.sqrt(1 + k * k), x - 1 / Math.sqrt(1 + k * k)];
      } else {
        this.cache.p = [x - 1 / Math.sqrt(1 + k * k), x + 1 / Math.sqrt(1 + k * k)];
      }
    }
    this.data.r = [-Infinity, Infinity];
  }
  //对于垂线，无额外beginDraw()方法
  beginDrag(pos) {
    this.beginMove(pos);
  }
  beginMove(pos) {
    this.dfn.p.beginMove(pos);
    this.dfn.l.beginMove(pos);
  }
  updDrag(pos) {
    this.updMove(pos);
  }
  updMove(pos) {
    this.dfn.p.updMove(pos);
    this.dfn.l.updMove(pos);
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

    var t = (this.cache.p[1] - this.cache.p[0]) * 2 + this.cache.p[0];

    return {
      x: this.data.a * t + this.data.b,
      y: this.data.c * t + this.data.d,
    };
  }
}
