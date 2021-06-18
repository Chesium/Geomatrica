import { obj } from "./obj.js";

export class canvas {
  PIXIappSetting = {
    antialias: true,
    resolution: window.devicePixelRatio || 1,
    autoDensity: true,
    backgroundAlpha: 0,
    resizeTo: document.querySelector("#workarea-container"),
    view: document.querySelector("#workarea"),
    backgroundColor: 0x000000,
    backgroundAlpha: 0,
  };
  zIofT = [10, 5, 5];
  constructor() {
    this.PIXIapp = new PIXI.Application(this.PIXIappSetting);
    this.stage = this.PIXIapp.stage;
    this.O = [];
    this.pO = [];
    this.dO = [];
    this.IAseq = [
      [[], []],
      [[], []],
    ];
    this.Status = 0;
    this.chooseObjs = [];
    // this.processFn;
    this.F = -1;
    this.mode = 1;
    this.showBoundBox = false;
    this.stageBound = [
      [0, 0],
      [this.PIXIapp.view.width, this.PIXIapp.view.height],
    ];

    this.PIXIapp.renderer.plugins.interaction.on("pointerdown", (event) => {
      let pos = { x: event.data.global.x, y: event.data.global.y };
      var FI = this.chooseByGlobalPos(pos);
      switch (this.mode) {
        case 0: //拖动模式
          if (FI != -1) {
            // console.log(this.O[FI].geometry);
            this.O[FI].geometry.beginDrag(pos);
          }
          break;
        case 1: //画线模式
          if (FI == -1) {
            new obj(
              this,
              1,
              0,
              {
                p: [
                  new obj(this, 0, 0, {}, { pos: pos }).geometry,
                  new obj(this, 0, 0, {}, { pos: pos }).geometry,
                ],
              },
              {}
            );
          } else {
            switch (this.O[FI].geometry.type) {
              case 0: //从已有点开始画线
                new obj(
                  this,
                  1,
                  0,
                  {
                    p: [
                      this.O[FI].geometry,
                      new obj(this, 0, 0, {}, { pos: pos }).geometry,
                    ],
                  },
                  {}
                );
                break;
              case 1: //画线时点到线
                new obj(
                  this,
                  1,
                  0,
                  {
                    p: [
                      new obj(
                        this,
                        0,
                        1,
                        { l: this.O[FI].geometry },
                        { pos: pos }
                      ).geometry,
                      new obj(this, 0, 0, {}, { pos: pos }).geometry,
                    ],
                  },
                  {}
                );
                break;
              case 2: //画线时点到圆
                new obj(
                  this,
                  1,
                  0,
                  {
                    p: [
                      new obj(
                        this,
                        0,
                        2,
                        { c: this.O[FI].geometry },
                        { pos: pos }
                      ).geometry,
                      new obj(this, 0, 0, {}, { pos: pos }).geometry,
                    ],
                  },
                  {}
                );
                break;
              default:
                break;
            }
          }
          this.O[this.O.length - 1].geometry.beginDraw(pos);
          break;
        case 2: //画点模式
          if (FI == -1) {
            new obj(this, 0, 0, {}, { pos: pos });
          } else {
            switch (this.O[FI].geometry.type) {
              case 0: //画点时点击点
                break;
              case 1: //画点时点到线
                new obj(this, 0, 1, { l: this.O[FI].geometry }, { pos: pos });
                break;
              case 2: //画点时点到圆
                new obj(this, 0, 2, { c: this.O[FI].geometry }, { pos: pos });
                break;
              default:
                break;
            }
          }
          break;
        case 3: //画圆模式
          if (FI == -1) {
            new obj(
              this,
              2,
              0,
              {
                p: [
                  new obj(this, 0, 0, {}, { pos: pos }).geometry,
                  new obj(this, 0, 0, {}, { pos: pos }).geometry,
                ],
              },
              {}
            );
          } else {
            switch (this.O[FI].geometry.type) {
              case 0: //从已有点开始画圆
                new obj(
                  this,
                  2,
                  0,
                  {
                    p: [
                      this.O[FI].geometry,
                      new obj(this, 0, 0, {}, { pos: pos }).geometry,
                    ],
                  },
                  {}
                );
                break;
              case 1: //画圆时点到线
                new obj(
                  this,
                  2,
                  0,
                  {
                    p: [
                      new obj(
                        this,
                        0,
                        1,
                        { l: this.O[FI].geometry },
                        { pos: pos }
                      ).geometry,
                      new obj(this, 0, 0, {}, { pos: pos }).geometry,
                    ],
                  },
                  {}
                );
                break;
              case 2: //画圆时点到圆
                new obj(
                  this,
                  2,
                  0,
                  {
                    p: [
                      new obj(
                        this,
                        0,
                        2,
                        { c: this.O[FI].geometry },
                        { pos: pos }
                      ).geometry,
                      new obj(this, 0, 0, {}, { pos: pos }).geometry,
                    ],
                  },
                  {}
                );
                break;
              default:
                break;
            }
          }
          this.O[this.O.length - 1].geometry.beginDraw(pos);
          break;
        case 4: //画直线模式
          if (FI == -1) {
            new obj(
              this,
              1,
              1,
              {
                p: [
                  new obj(this, 0, 0, {}, { pos: pos }).geometry,
                  new obj(this, 0, 0, {}, { pos: pos }).geometry,
                ],
              },
              {}
            );
          } else {
            switch (this.O[FI].geometry.type) {
              case 0: //从已有点开始画线
                new obj(
                  this,
                  1,
                  1,
                  {
                    p: [
                      this.O[FI].geometry,
                      new obj(this, 0, 0, {}, { pos: pos }).geometry,
                    ],
                  },
                  {}
                );
                break;
              case 1: //画线时点到线
                new obj(
                  this,
                  1,
                  1,
                  {
                    p: [
                      new obj(
                        this,
                        0,
                        1,
                        { l: this.O[FI].geometry },
                        { pos: pos }
                      ).geometry,
                      new obj(this, 0, 0, {}, { pos: pos }).geometry,
                    ],
                  },
                  {}
                );
                break;
              case 2: //画线时点到圆
                new obj(
                  this,
                  1,
                  1,
                  {
                    p: [
                      new obj(
                        this,
                        0,
                        2,
                        { c: this.O[FI].geometry },
                        { pos: pos }
                      ).geometry,
                      new obj(this, 0, 0, {}, { pos: pos }).geometry,
                    ],
                  },
                  {}
                );
                break;
              default:
                break;
            }
          }
          this.O[this.O.length - 1].geometry.beginDraw(pos);
          break;
        case 5: //画射线模式
          if (FI == -1) {
            new obj(
              this,
              1,
              2,
              {
                p: [
                  new obj(this, 0, 0, {}, { pos: pos }).geometry,
                  new obj(this, 0, 0, {}, { pos: pos }).geometry,
                ],
              },
              {}
            );
          } else {
            switch (this.O[FI].geometry.type) {
              case 0: //从已有点开始画线
                new obj(
                  this,
                  1,
                  2,
                  {
                    p: [
                      this.O[FI].geometry,
                      new obj(this, 0, 0, {}, { pos: pos }).geometry,
                    ],
                  },
                  {}
                );
                break;
              case 1: //画线时点到线
                new obj(
                  this,
                  1,
                  2,
                  {
                    p: [
                      new obj(
                        this,
                        0,
                        1,
                        { l: this.O[FI].geometry },
                        { pos: pos }
                      ).geometry,
                      new obj(this, 0, 0, {}, { pos: pos }).geometry,
                    ],
                  },
                  {}
                );
                break;
              case 2: //画线时点到圆
                new obj(
                  this,
                  1,
                  2,
                  {
                    p: [
                      new obj(
                        this,
                        0,
                        2,
                        { c: this.O[FI].geometry },
                        { pos: pos }
                      ).geometry,
                      new obj(this, 0, 0, {}, { pos: pos }).geometry,
                    ],
                  },
                  {}
                );
                break;
              default:
                break;
            }
          }
          this.O[this.O.length - 1].geometry.beginDraw(pos);
          break;
        case 6: //交点
          if (FI == -1) {
            this.clearChooseList();
          } else {
            this.chooseObjs.push(this.O[FI]);
            this.processFn();
          }
          break;
        default:
          break;
      }
    });

    this.PIXIapp.renderer.plugins.interaction.on("pointermove", (event) => {
      let pos = { x: event.data.global.x, y: event.data.global.y };
      if (this.Status == 1) {
        this.O[this.F].geometry.updDrag(pos);
      }
    });

    this.PIXIapp.renderer.plugins.interaction.on("pointerup", (event) => {
      console.time();
      let pos = { x: event.data.global.x, y: event.data.global.y };
      if (this.F != -1) {
        if (this.O[this.F].geometry.initializing) {
          this.O[this.F].geometry.initializing = false;
          var FI = this.chooseByGlobalPos(pos);
          // console.log(`FI:${FI}`);
          if (FI != -1) {
            var stickP;
            switch (this.O[FI].geometry.type) {
              case 0: //在点上松手
                stickP = this.O[FI].geometry;
                break;

              case 1: //在线上松手
                stickP = new obj(
                  this,
                  0,
                  1,
                  { l: this.O[FI].geometry },
                  { pos: pos }
                ).geometry;
                break;

              case 2: //在圆上松手
                stickP = new obj(
                  this,
                  0,
                  2,
                  { c: this.O[FI].geometry },
                  { pos: pos }
                ).geometry;
                break;

              default:
                break;
            }
            stickP.children.push(this.O[this.F].geometry.children[0]);
            this.O[this.F].geometry.children[0].parents.pop();
            this.O[this.F].geometry.children[0].parents.push(stickP);
            this.O[this.F].geometry.children[0].dfn.p[1] = stickP;
            this.O[this.F].geometry.children.pop();
            this.O[this.F].remove();
          }
        }
      }
      var IAAs = this.IAseq.flat(Infinity);
      for (var i in IAAs) {
        if (IAAs[i].removed) {
          continue;
        }
        // console.log(this.O[i].index, O[i].boundChanged, O[i].bitmapChanged);
        if (IAAs[i].needUpdBound) {
          IAAs[i].updBound();
          IAAs[i].needUpdBound = false;
        }
        if (IAAs[i].needUpdBitmap) {
          IAAs[i].updBitmap();
          IAAs[i].needUpdBitmap = false;
        }
      }
      this.F = -1;
      this.Status = 0;
      console.timeEnd();
    });
  }

  chooseByGlobalPos(pos) {
    if (this.mode != 0) {
      var poIAAs = this.IAseq[0].flat(Infinity);
      for (var i in poIAAs) {
        if (!poIAAs[i].removed) {
          if (
            poIAAs[i].bound[0][0] <= pos.x &&
            pos.x <= poIAAs[i].bound[1][0] &&
            poIAAs[i].bound[0][1] <= pos.y &&
            pos.y <= poIAAs[i].bound[1][1]
          ) {
            if (poIAAs[i].checkBitmap(pos)) {
              return poIAAs[i].obj.toObj();
            }
          }
        }
      }
    }
    var oIAAs = this.IAseq[1].flat(Infinity);
    for (var i in oIAAs) {
      if (!oIAAs[i].removed) {
        if (
          oIAAs[i].bound[0][0] <= pos.x &&
          pos.x <= oIAAs[i].bound[1][0] &&
          oIAAs[i].bound[0][1] <= pos.y &&
          pos.y <= oIAAs[i].bound[1][1]
        ) {
          if (oIAAs[i].checkBitmap(pos)) {
            return oIAAs[i].obj.index;
          }
        }
      }
    }
    return -1;
  }

  clearChooseList() {
    for (var i in this.chooseObjs) {
      this.chooseObjs[i].GFD.changeStyleMode(0);
    }
    this.chooseObjs.length = 0;
  }

  changeMode(newMode) {
    this.mode = newMode;
    this.clearChooseList();
    switch (this.mode) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;

      case 6: //两对象交点
        this.processFn = () => {
          switch (this.chooseObjs.length) {
            case 0:
              //Nothing to do
              break;

            case 1:
              if (this.chooseObjs[0].geometry.type == 0) {
                console.log("not supported");
                this.chooseObjs.pop();
              } else {
                this.chooseObjs[0].GFD.changeStyleMode(1);
              }
              break;

            case 2:
              if (this.chooseObjs[1].geometry.type == 0) {
                console.log("not supported");
                this.chooseObjs.pop();
              } else {
                switch (this.chooseObjs[0].geometry.type) {
                  case 1:
                    switch (this.chooseObjs[1].geometry.type) {
                      case 1: //线-线
                        new obj(
                          this,
                          0,
                          3,
                          {
                            l: [
                              this.chooseObjs[0].geometry,
                              this.chooseObjs[1].geometry,
                            ],
                          },
                          {}
                        );
                        break;

                      case 2: //线-圆
                        new obj(
                          this,
                          0,
                          6,
                          {
                            l: this.chooseObjs[0].geometry,
                            c: this.chooseObjs[1].geometry,
                          },
                          {}
                        );
                        new obj(
                          this,
                          0,
                          7,
                          {
                            l: this.chooseObjs[0].geometry,
                            c: this.chooseObjs[1].geometry,
                          },
                          {}
                        );
                        break;

                      default:
                        break;
                    }
                    break;

                  case 2:
                    switch (this.chooseObjs[1].geometry.type) {
                      case 1: //圆-线
                        new obj(
                          this,
                          0,
                          6,
                          {
                            l: this.chooseObjs[1].geometry,
                            c: this.chooseObjs[0].geometry,
                          },
                          {}
                        );
                        new obj(
                          this,
                          0,
                          7,
                          {
                            l: this.chooseObjs[1].geometry,
                            c: this.chooseObjs[0].geometry,
                          },
                          {}
                        );
                        break;

                      case 2: //圆-圆
                        new obj(
                          this,
                          0,
                          4,
                          {
                            c: [
                              this.chooseObjs[0].geometry,
                              this.chooseObjs[1].geometry,
                            ],
                          },
                          {}
                        );
                        new obj(
                          this,
                          0,
                          5,
                          {
                            c: [
                              this.chooseObjs[0].geometry,
                              this.chooseObjs[1].geometry,
                            ],
                          },
                          {}
                        );
                        break;

                      default:
                        break;
                    }
                    break;

                  default:
                    break;
                }
                this.clearChooseList();
              }
              break;

            default:
              break;
          }
        };
        break;
      default:
        break;
    }
  }
}
