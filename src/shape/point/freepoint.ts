import point from "../point";
import { crd } from "../../misc";
import canvas from "../../canvas";
import { obj_fc } from "../../object";

export class freePoint_fc extends obj_fc {
  x: number;
  y: number;
}

export default class freePoint extends point {
  dragOffset: crd;

  static defineTypeName = "freepoint";
  constructor(dfc: freePoint_fc) {
    super(); //无用
    this.defineTypeName = freePoint.defineTypeName;
    this.init_L1(dfc.canvas, false);
    this.init_L2();
    //================//
    this.exist = true;
    this.x = dfc.x;
    this.y = dfc.y;
    this.calc();
    this.canvas.rootObjs.push(this); //自由点特有语句 当前所有根对象均为自由点
    //================//
    this.init_end();
  }
  // calc见shape
  // beginDraw见shape
  beginDrag(crd: crd) {
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
