import point from "../point";
import { crd } from "../../misc";
import canvas from "../../canvas";

export default class freePoint extends point {
  dragOffset!: crd;

  static defineTypeName = "freepoint";
  constructor(canvas: canvas, x: number, y: number) {
    super(); //无用
    this.defineTypeName = freePoint.defineTypeName;
    this.init_L1(canvas, false);
    this.init_L2();
    //================//
    this.exist = true;
    this.x = x;
    this.y = y;
    this.calc();
    this.canvas.rootObjs.push(this); //自由点特有语句 当前所有根对象均为自由点
    //================//
    this.init_end();
  }
  // calc见shape
  // beginDraw见shape
  beginDrag() {
    this.focusOnIt();
    this.dragOffset = { x: 0, y: 0 };
  }
  beginMove(crd: crd): void {
    // this.focusOnIt();
    console.log(`Freepoint index[${this.index}] begin to move`);
    this.dragOffset = {
      x: this.x - crd.x,
      y: this.y - crd.y,
    };
  }
  // updDrag见shape
  updMove(crd: crd): void {
    this.x = crd.x + this.dragOffset.x;
    this.y = crd.y + this.dragOffset.y;
    this.update();
  }
  // getTagCrd见point
}
