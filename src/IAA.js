// const IAApAlpha = 2e-3;
// const IAApColor = 0xffffff;
// const IAApRadius = 15;

// const IAAl = {
//     width: 15,
//     color: 0xffffff,
//     alpha: 2e-3
// };
import { L_DpData_To_epCrd } from "./util.js";

export class IAA {
  IAApAlpha = 2e-3;
  IAApColor = 0xffffff;
  IAApRadius = 15;

  IAAl = {
    width: 15,
    color: 0xffffff,
    alpha: 2e-3,
  };
  constructor(type, data, obj) {
    // interactive areas
    this.type = type;
    this.data = data; //会变更
    this.obj = obj;
    this.Graphic = new PIXI.Graphics();
    this.boundBox = new PIXI.Graphics();
    this.bound = [
      [0, 0],
      [0, 0],
    ];
    this.bitmap = [];
    this.needUpdBound = false;
    this.needUpdBitmap = false;
    this.locked = false;
    this.removed = false;

    this.Graphic.zIndex = 0;
    this.boundBox.zIndex = 2;

    this.obj.canvas.stage.addChild(this.Graphic);
    this.obj.canvas.stage.addChild(this.boundBox);
    this.update();
  }
  update() {
    if (this.removed) {
      return;
    }
    this.Graphic.clear();
    if (this.data.exist) {
      switch (this.type) {
        case 0: //point
          this.Graphic.beginFill(this.IAApColor, this.IAApAlpha);
          this.Graphic.drawCircle(
            ...this.obj.canvas.tran(this.data),
            this.IAApRadius
          );
          break;

        case 1: //line
          var crd = L_DpData_To_epCrd(this.data, [
            this.obj.canvas.revTran(this.obj.canvas.stageBound[0]),
            this.obj.canvas.revTran(this.obj.canvas.stageBound[1]),
          ]);
          // console.log(crd);
          if (!crd[0]) {
            return;
          }
          this.Graphic.lineStyle(this.IAAl);
          this.Graphic.moveTo(...this.obj.canvas.tran(crd[1]));
          this.Graphic.lineTo(...this.obj.canvas.tran(crd[2]));
          break;

        case 2: //circle
          this.Graphic.lineStyle(this.IAAl);
          this.Graphic.drawCircle(
            ...this.obj.canvas.tran(this.data),
            this.data.r * this.obj.canvas.tr[0]
          );
          break;

        default:
          break;
      }
    }
    this.needUpdBitmap = true;
    this.needUpdBound = true;
  }
  updBound() {
    //ABSL
    let localBounds = this.Graphic.getLocalBounds();
    this.bound = [
      [Math.floor(localBounds.x), Math.floor(localBounds.y)],
      [
        Math.floor(localBounds.x + this.Graphic.width),
        Math.floor(localBounds.y + this.Graphic.height),
      ],
    ];
    //update boundBox
    this.boundBox.clear();
    if (this.obj.canvas.showBoundBox) {
      this.boundBox.lineStyle({
        width: 1,
        color: 0x000000,
        cap: PIXI.LINE_CAP.ROUND,
      });
      this.boundBox.beginFill(0x000000, 0.1);
      this.boundBox.drawRect(
        this.bound[0][0],
        this.bound[0][1],
        this.bound[1][0] - this.bound[0][0],
        this.bound[1][1] - this.bound[0][1]
      );
    }
    this.needUpdBound = false;
  }
  updBitmap() {
    //ABSL
    let px = this.obj.canvas.PIXIapp.renderer.plugins.extract.pixels(
      this.Graphic
    );
    let tran = Array.from(
      { length: px.length / 4 },
      (_, i) => px[4 * i + 3] + px[4 * i + 2] + px[4 * i + 1] + px[4 * i]
    );
    let width = Math.floor(this.Graphic.width);
    this.bitmap = Array.from(
      { length: Math.floor(this.Graphic.height) },
      (_, i) => tran.slice(i * width, (i + 1) * width)
    );
    this.needUpdBitmap = false;
  }
  checkBitmap(pos) {
    //ABSL
    return (
      this.bitmap[Math.floor(pos.y) - this.bound[0][1]][
        Math.floor(pos.x) - this.bound[0][0]
      ] != 0
    );
  }
  remove() {
    this.obj.canvas.stage.removeChild(this.boundBox);
    this.obj.canvas.stage.removeChild(this.Graphic);
    this.boundBox.destroy();
    this.Graphic.destroy();
    this.removed = true;
  }
}
