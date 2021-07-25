import obj from "../object";
import { crd, pos } from "../misc";
import { pairForm } from "../util";

export default abstract class point extends obj {
  static readonly IAA_radius = 15;
  static shapeName = "point";

  x: number;
  y: number;

  init_L2() {
    this.interactPriority = 0;
    this.shape = point;
    this.shapeDescription = "all points";
    this.bodyZIndex = 10;
    this.drawableObj = this;
  }

  updBody(): void {
    this.body.clear();
    if (!this.shown || !this.exist) {
      return;
    }
    for (var i in this.style.point) {
      this.body.beginFill(this.style.point[i].color, this.style.point[i].alpha);
      this.body.lineStyle(this.style.point[i].outline);
      this.body.drawCircle(...pairForm(this.canvas.toPos(this)), this.style.point[i].radius);
    }
  }

  updInteractionArea(): void {
    this.interactionArea.clear();
    if (this.removed || !this.exist || !this.interactive) {
      return;
    }
    this.interactionArea.beginFill(obj.IAA_color, obj.IAA_alpha);
    this.interactionArea.drawCircle(...pairForm(this.canvas.toPos(this)), point.IAA_radius);

    this.needUpdBitmap = true;
    this.needUpdBoundRect = true;
  }
  //点不会和其他形状"相交" 故preDefine()方法为空
  preDefine(): void {}
  //点的标签位置和点一样
  getTagCrd(): pos {
    return { x: this.x, y: this.y };
  }

  generatePointOnIt(crd: crd): point {
    return this;
  }
}
