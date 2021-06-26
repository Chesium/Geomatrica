import { obj } from "./obj.js";
import { getOffsetLeft, getOffsetTop } from "./util.js";
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
  /**
   * ## 创建一个画板
   * 画板的构造函数
   * @constructor
   */
  constructor() {
    // console.log("sss");
    /**
     * ## PIXI对象
     * 画板所用的`PIXI.Application`对象
     *
     * ---
     *
     * @member {object}
     */
    this.PIXIapp = new PIXI.Application(this.PIXIappSetting);

    /**
     * ## PIXI舞台
     * 画板所用`PIXI.Application`对象的`stage`成员
     *
     * ---
     *
     * 在`PIXI`内作为所有图形对象的父对象
     * 一般调用其`addChild()`、`removeChild()`方法
     *
     * ---
     *
     * @member {object}
     */
    this.stage = this.PIXIapp.stage;

    /**
     * ## 图形对象列表
     * 画板中所有正式图形对象被存储在这里
     *
     * ---
     *
     * @member {Array}
     */
    this.O = [];

    /**
     * ## 预定义图形对象列表
     * 画板中所有预定义(predefine)图形对象被存储在这里
     *
     * ---
     *
     * @member {Array}
     */
    this.pO = [];

    /**
     * ## 交互区域响应序列
     * 画板中各可点击图形对象交互区域的响应序列
     *
     * ---
     *
     * 存储IAA类(Interaction Area)
     * 列表中位置越前的对象权重越高且点击时越先被判定
     * 使用前先展开（用`.flat(Infinity)`）
     *
     * ---
     *
     * @member {Array}
     */
    this.IAseq = [
      [[], []],
      [[], []],
    ];

    /**
     * ## 画板状态
     * 区别与于mode（画板模式）的一个值
     *
     * ---
     *
     * 目前只有两种可能的值:
     * `1` : 空闲
     * `2` : 正在拖动图形对象
     *
     * ---
     *
     * @member {number}
     */
    this.Status = 0;

    /**
     * ## 选中的图形对象列表
     * 多选时选中的图形对象列表
     *
     * ---
     *
     * 对于某些模式需要同时选中多个图形对象
     * 此时选中的图形对象存放在这里
     *
     * ---
     *
     * @member {Array}
     */
    this.chooseObjs = [];

    /**
     * ## 获得焦点的图形对象
     * 目前获得焦点的图形对象在`O`（）中的索引
     *
     * ---
     *
     * 若无获得焦点的图形对象则为`-1`
     *
     * ---
     *
     * @member {Array}
     */
    this.F = -1;

    /**
     * ## 绘图模式
     * 决定鼠标操作在画板上画的图形类型
     *
     * ---
     *
     * 现有7种取值:
     * `0` : 移动图形对象
     * `1` : 画线段(默认)
     * `2` : 画点
     * `3` : 画圆(圆心和圆上一点)
     * `4` : 画直线
     * `5` : 画射线
     * `6` : 选中两个不为点的对象作其交点
     *
     * ---
     *
     * @member {number}
     */
    this.mode = 1;

    /**
     * ## 显示边界盒
     * 是否显示图形对象的`boundbox`（边界盒）
     *
     * ---
     *
     * 判定点击时先会判断鼠标位置在哪些图形对象的边界盒内
     * 再对照该图形对象的`bitmap`数组进一步确认
     * 若为`true`则会在每一个图形对象后显示一个半透明的灰色矩形
     * 标识其边界盒
     *
     * ---
     *
     * @member {boolean}
     */
    this.showBoundBox = false;

    /**
     * ## 画板区域
     * 当前画板的范围
     *
     * ---
     *
     * 用于在计算直线、射线等无限图形时确认显示范围
     * 格式:`[[xmin,ymin],[xmax,ymax]]`
     *
     * ---
     *
     * @member {Array}
     */
    this.stageBound = [
      [0, 0],
      [
        this.PIXIapp.view.offsetWidth - getOffsetLeft(this.PIXIapp.view),
        this.PIXIapp.view.offsetHeight - getOffsetTop(this.PIXIapp.view),
      ],
    ];

    this.tr = [50, 400, 400];

    this.rootObjs = [];

    this.dragOffset = { x: 0, y: 0 }; //ABSL

    this.names = [];

    this.nextNameI = [0, 0, 0];

    this.axisXtype = 2;
    this.axisYtype = 2;

    this.axisStyle = {
      width: 1,
      color: 0x00000,
      alpha: 1,
      cap: PIXI.LINE_CAP.ROUND,
    };

    this.Xscale = [];
    this.Yscale = [];

    this.scaleFont = new PIXI.TextStyle({
      fontFamily: "cambria",
      fontSize: 12,
    });

    this.axis = new PIXI.Graphics();
    this.stage.addChild(this.axis);
    this.updAxes();

    // this.ObyN={};

    this.PIXIapp.renderer.plugins.interaction.on("pointerdown", (event) => {
      let pos = this.revTran(
        {
          x: event.data.global.x,
          y: event.data.global.y,
        },
        true
      );
      // console.log(pos);
      var FI = this.chooseByGlobalPos({
        x: event.data.global.x,
        y: event.data.global.y,
      });
      // console.log(`FI=${FI}`);
      switch (this.mode) {
        case 0: //拖动模式
          if (FI != -1) {
            // console.log(this.O[FI].geometry);
            this.O[FI].geometry.beginDrag(pos);
          } else {
            //begin drag canvas
            this.dragOffset.x = this.tr[1] - event.data.global.x;
            this.dragOffset.y = this.tr[2] - event.data.global.y;
            this.Status = 2;
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
        case 7: //垂线
        case 8: //平行线
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
      // let pos = { x: event.data.global.x, y: event.data.global.y };
      let pos = this.revTran(
        {
          x: event.data.global.x,
          y: event.data.global.y,
        },
        true
      );
      // console.log("status:",this.Status);
      switch (this.Status) {
        case 0:
          break;

        case 1:
          this.O[this.F].geometry.updDrag(pos);
          break;

        case 2:
          //Move the canvas
          this.tr[1] = event.data.global.x + this.dragOffset.x;
          this.tr[2] = event.data.global.y + this.dragOffset.y;
          this.updAll();
          break;

        case 3:
          // console.log("status3", this.F);
          this.O[this.F].tag.offset.x =
            event.data.global.x +
            getOffsetLeft(this.PIXIapp.resizeTo) -
            this.O[this.F].tag.dragPos[0] +
            this.O[this.F].tag.dragBeginOffset.x;
          this.O[this.F].tag.offset.y =
            event.data.global.y +
            getOffsetTop(this.PIXIapp.resizeTo) -
            this.O[this.F].tag.dragPos[1] +
            this.O[this.F].tag.dragBeginOffset.y;
          // console.log(this.O[this.F].tag.offset);
          this.O[this.F].tag.update();
          break;

        default:
          break;
      }
    });

    this.PIXIapp.renderer.plugins.interaction.on("pointerup", (event) => {
      // console.time();
      let pos = this.revTran(
        {
          x: event.data.global.x,
          y: event.data.global.y,
        },
        true
      );
      // let pos = { x: event.data.global.x, y: event.data.global.y };
      if (this.F != -1) {
        if (this.O[this.F].geometry.initializing) {
          this.O[this.F].geometry.initializing = false;
          var FI = this.chooseByGlobalPos({
            x: event.data.global.x,
            y: event.data.global.y,
          });
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
      // console.timeEnd();
    });

    this.PIXIapp.view.onwheel = (event) => {
      if (event.wheelDelta > 0) {
        this.tr[0] *= 1.1;
        this.tr[1] = event.offsetX + (this.tr[1] - event.offsetX) * 1.1;
        this.tr[2] = event.offsetY + (this.tr[2] - event.offsetY) * 1.1;
      } else {
        this.tr[0] /= 1.1;
        this.tr[1] = event.offsetX + (this.tr[1] - event.offsetX) / 1.1;
        this.tr[2] = event.offsetY + (this.tr[2] - event.offsetY) / 1.1;
      }
      this.updAll();
    };
  }

  tran(pos, posForm = false) {
    if (typeof pos[0] != "undefined") {
      pos = { x: pos[0], y: pos[1] };
    }
    if (posForm) {
      return {
        x: pos.x * this.tr[0] + this.tr[1],
        y: -pos.y * this.tr[0] + this.tr[2],
      };
    } else {
      return [
        pos.x * this.tr[0] + this.tr[1],
        -pos.y * this.tr[0] + this.tr[2],
      ];
    }
  }

  revTran(pos, posForm = false) {
    if (typeof pos[0] != "undefined") {
      pos = { x: pos[0], y: pos[1] };
    }
    if (posForm) {
      return {
        x: (pos.x - this.tr[1]) / this.tr[0],
        y: -(pos.y - this.tr[2]) / this.tr[0],
      };
    } else {
      return [
        (pos.x - this.tr[1]) / this.tr[0],
        -(pos.y - this.tr[2]) / this.tr[0],
      ];
    }
  }

  updAll() {
    this.updAxes();
    for (var i in this.rootObjs) {
      if (!this.rootObjs[i].removed) {
        this.rootObjs[i].update();
      }
    }
  }

  chooseByGlobalPos(pos) {
    //ABSL
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
                        // console.log("error");
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

      case 7: //垂线
        this.processFn = () => {
          switch (this.chooseObjs.length) {
            case 0:
              //Nothing to do
              break;

            case 1:
              if (this.chooseObjs[0].geometry.type == 2) {
                //画垂线时点到圆
                console.log("not supported");
                this.chooseObjs.pop();
              } else {
                this.chooseObjs[0].GFD.changeStyleMode(1);
              }
              break;

            case 2:
              if (this.chooseObjs[1].geometry.type == 2) {
                //画垂线时点到圆
                console.log("not supported");
                this.chooseObjs.pop();
              } else {
                //结算
                switch (this.chooseObjs[0].geometry.type) {
                  case 0: //[点][...]
                    switch (this.chooseObjs[1].geometry.type) {
                      case 0: //点-点
                        console.log("not supported");
                        this.chooseObjs.pop();
                        break;

                      case 1: //点-线
                        // debugger;
                        new obj(
                          this,
                          1,
                          3,
                          {
                            p: this.chooseObjs[0].geometry,
                            l: this.chooseObjs[1].geometry,
                          },
                          {}
                        );
                        break;

                      default:
                        break;
                    }
                    break;

                  case 1: //[线][...]
                    switch (this.chooseObjs[1].geometry.type) {
                      case 0: //线-点
                        new obj(
                          this,
                          1,
                          3,
                          {
                            p: this.chooseObjs[1].geometry,
                            l: this.chooseObjs[0].geometry,
                          },
                          {}
                        );
                        break;

                      case 1: //线-线
                        console.log("not supported");
                        this.chooseObjs.pop();
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
      case 8: //平行线
        this.processFn = () => {
          switch (this.chooseObjs.length) {
            case 0:
              //Nothing to do
              break;

            case 1:
              if (this.chooseObjs[0].geometry.type == 2) {
                //画平行线时点到圆
                console.log("not supported");
                this.chooseObjs.pop();
              } else {
                this.chooseObjs[0].GFD.changeStyleMode(1);
              }
              break;

            case 2:
              if (this.chooseObjs[1].geometry.type == 2) {
                //画平行线时点到圆
                console.log("not supported");
                this.chooseObjs.pop();
              } else {
                //结算
                switch (this.chooseObjs[0].geometry.type) {
                  case 0: //[点][...]
                    switch (this.chooseObjs[1].geometry.type) {
                      case 0: //点-点
                        console.log("not supported");
                        this.chooseObjs.pop();
                        break;

                      case 1: //点-线
                        // debugger;
                        new obj(
                          this,
                          1,
                          4,
                          {
                            p: this.chooseObjs[0].geometry,
                            l: this.chooseObjs[1].geometry,
                          },
                          {}
                        );
                        break;

                      default:
                        break;
                    }
                    break;

                  case 1: //[线][...]
                    switch (this.chooseObjs[1].geometry.type) {
                      case 0: //线-点
                        new obj(
                          this,
                          1,
                          4,
                          {
                            p: this.chooseObjs[1].geometry,
                            l: this.chooseObjs[0].geometry,
                          },
                          {}
                        );
                        break;

                      case 1: //线-线
                        console.log("not supported");
                        this.chooseObjs.pop();
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

  //     y
  //     ^
  // +-------N
  // |*******|
  // |*******|  > x
  // M-------+

  //[[dp_Xm, dp_Ym],[dp_Xn, dp_Yn]]
  //  00  01   10   11
  updAxes() {
    this.axis.clear();
    var origin = this.tran([0, 0], true),
      dp_Xm = this.stageBound[0][0],
      dp_Ym = this.stageBound[0][1],
      dp_Xn = this.stageBound[1][0],
      dp_Yn = this.stageBound[1][1],
      minCrd = this.revTran(this.stageBound[0], true),
      maxCrd = this.revTran(this.stageBound[1], true);
    // console.log(minCrd, maxCrd);
    this.axis.lineStyle(this.axisStyle);
    if (this.axisXtype != 0) {
      if (origin.y < dp_Ym || origin.y > dp_Yn) {
        //invisible
      } else {
        //X轴可见 画直线
        this.axis.moveTo(dp_Xm, origin.y);
        this.axis.lineTo(dp_Xn, origin.y);
        //画箭头
        this.axis.lineTo(dp_Xn - 8, origin.y - 5);
        this.axis.moveTo(dp_Xn, origin.y);
        this.axis.lineTo(dp_Xn - 8, origin.y + 5);

        if (this.axisXtype > 1) {
          //画刻度
          for (let I = Math.ceil(minCrd.x); I <= Math.floor(maxCrd.x); I += 1) {
            if (I == 0) {
              continue;
            }
            var DPcrd_t = this.tran([I, 0]);
            this.axis.moveTo(...DPcrd_t);
            this.axis.lineTo(DPcrd_t[0], origin.y + 3);
          }
        }
      }
      //添加刻度文字
      //清空先前的
      for (let i in this.Xscale) {
        this.Xscale[i].text = "";
      }
      for (
        let I = Math.ceil(minCrd.x), i = 0;
        I <= Math.floor(maxCrd.x);
        I += 1
      ) {
        if (I == 0) {
          continue;
        }
        var DPcrd_t = this.tran([I, 0]);

        //若Text对象不够了则新建一个作为stage的子对象之一
        if (this.Xscale[i] === undefined) {
          this.Xscale[i] = new PIXI.Text("", this.scaleFont);
          this.stage.addChild(this.Xscale[i]);
        }

        //更改文字 移动
        this.Xscale[i].text = I + "";
        this.Xscale[i].x = DPcrd_t[0] - this.Xscale[i].width / 2;
        this.Xscale[i].y = origin.y + 2;

        //特殊情况
        if (this.Xscale[i].y < dp_Ym) {
          //X轴隐藏在屏幕上方
          this.Xscale[i].y = dp_Ym;
        }
        if (this.Xscale[i].y > dp_Yn - this.Xscale[i].height) {
          //X轴隐藏在屏幕下方
          this.Xscale[i].y = dp_Yn - this.Xscale[i].height;
        }

        i++;
      }
    }
    if (this.axisYtype != 0) {
      if (origin.x < dp_Xm || origin.x > dp_Xn) {
        //invisible
      } else {
        //visible
        this.axis.moveTo(origin.x, dp_Yn);
        this.axis.lineTo(origin.x, dp_Ym);
        //画箭头
        this.axis.lineTo(origin.x - 5, dp_Ym + 8);
        this.axis.moveTo(origin.x, dp_Ym);
        this.axis.lineTo(origin.x + 5, dp_Ym + 8);

        if (this.axisYtype > 1) {
          //画刻度
          for (
            let I = Math.ceil(maxCrd.y);
            I <= Math.floor(minCrd.y);
            I += 1
          ) {
            if (I == 0) {
              continue;
            }
            var DPcrd_t = this.tran([0, I]);
            this.axis.moveTo(...DPcrd_t);
            this.axis.lineTo(origin.x - 3, DPcrd_t[1]);
          }
        }
      }
      //添加刻度文字
      //清空先前的
      for (let i in this.Yscale) {
        this.Yscale[i].text = "";
      }
      for (
        let I = Math.ceil(maxCrd.y), i = 0;
        I <= Math.floor(minCrd.y);
        I += 1
      ) {
        if (I == 0) {
          continue;
        }
        var DPcrd_t = this.tran([0, I]);

        //若Text对象不够了则新建一个作为stage的子对象之一
        if (this.Yscale[i] === undefined) {
          this.Yscale[i] = new PIXI.Text("", this.scaleFont);
          this.stage.addChild(this.Yscale[i]);
        }

        //更改文字 移动
        this.Yscale[i].text = I + "";
        this.Yscale[i].x = origin.x - this.Yscale[i].width - 4;
        this.Yscale[i].y = DPcrd_t[1] - this.Yscale[i].height / 2;

        // 特殊情况
        if (this.Yscale[i].x < dp_Xm) {
          //Y轴隐藏在屏幕左方
          this.Yscale[i].x = dp_Xm;
        }
        if (this.Yscale[i].x > dp_Xn - this.Yscale[i].width) {
          //Y轴隐藏在屏幕右方
          this.Yscale[i].x = dp_Xn - this.Yscale[i].width;
        }

        i++;
      }
    }
  }
}
