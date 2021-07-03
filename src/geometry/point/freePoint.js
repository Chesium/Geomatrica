import geometry from "../geometry.js";

export default class freePoint extends geometry {
  constructor(dfn, initData, obj) {
    super(0, 0, dfn, initData, obj);
  }
  init(initData) {
    this.seqI = 0;
    this.data.exist = true;
    this.data.x = initData.pos.x;
    this.data.y = initData.pos.y;
  }
  //对于自由点，无额外calcData()方法
  //对于点，无额外beginDraw()方法
  beginDrag(pos) {
    this.beginMove(pos);
  }
  beginMove(pos) {
    this.focusOnIt();
    this.dragOffset = {
      x: this.data.x - pos.x,
      y: this.data.y - pos.y,
    };
  }
  updDrag(pos) {
    this.updMove(pos);
  }
  updMove(pos) {
    this.data.x = pos.x + this.dragOffset.x;
    this.data.y = pos.y + this.dragOffset.y;
  }
  //对于点，无额外preDefine()方法
  generateRefCrd(){
    return this.data;
  }
}
