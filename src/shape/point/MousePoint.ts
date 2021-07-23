import point from "../point";
import { crd } from "../../misc";
import canvas from "../../canvas";
import { isBlank } from "../../util";
import freepoint from "./freepoint";

interface moveEventListener extends EventListenerObject {
  self: MousePoint;
}

export default class MousePoint extends point {
  moveEventListener: moveEventListener;
  constructor(canvas: canvas) {
    super(); //无用
    this.name = "MOUSE";
    this.defineTypeName="MousePoint";
    this.init_L1(canvas, false);
    this.init_L2();
    //================//
    this.exist = true;
    this.interactive = false;
    this.shown = false;
    this.canvas.rootObjs.push(this);

    this.moveEventListener = {
      self: this,
      handleEvent(ev: MouseEvent): void {
        var crd: crd = this.self.canvas.toCrd({ x: ev.offsetX, y: ev.offsetY });
        this.self.x = crd.x;
        this.self.y = crd.y;
        this.self.update();
      },
    };

    this.canvas.PIXIapp.view.addEventListener("mousemove", this.moveEventListener);
    //================//
    this.init_end();
  }
  // calc见shape
  // beginDraw见shape
  // beginDrag见shape
  // updDrag见shape
  // getTagCrd见point

  remove(): void {
    //移除对象

    this.canvas.F = -1;
    this.canvas.Status = 0;

    //移除 interaction area
    this.canvas.stage.removeChild(this.boundBox);
    this.canvas.stage.removeChild(this.interactionArea);
    this.boundBox.destroy();
    this.interactionArea.destroy();
    this.removed = true;

    //移除 body
    this.canvas.stage.removeChild(this.body);
    this.body.destroy();
    this.removed = true;

    this.canvas.PIXIapp.view.removeEventListener("mousedown", this.moveEventListener);

    //递归移除子对象
    for (var i in this.children) {
      this.children[i].remove();
    }
  }

  toPoint(): point {
    var focus = this.canvas.chooseByPos(this.canvas.toPos(this));
    if (isBlank(focus)) {
      return new freepoint(this.canvas, this.x, this.y);
    } else {
      return focus.generatePointOnIt(this);
    }
  }
}
