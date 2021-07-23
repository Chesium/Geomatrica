import { Application, IApplicationOptions } from "pixi.js";
import { Container } from "pixi.js";
import { Text, TextStyle } from "pixi.js";
import { Graphics, LINE_CAP } from "pixi.js";

import { chooseObjs, drawCase } from "./drawingMode";
import shape from "./shape";
import { rect, pos, crd } from "./misc";
import { toPos, floatAdd, floatMul, toPair, getOffsetLeft, getOffsetTop, isBlank, isAvailable } from "./util";
import Mode from "./Mode";
import { defaultStyle, focusStyle } from "./style";

//画板类
export default class canvas {
  /**
   * ## PIXI对象
   * 画板所用的`PIXI.Application`对象
   *
   * ---
   *
   * @member {object}
   */
  PIXIapp: Application;
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
  stage: Container;
  /**
   * ## 图形对象列表
   * 画板中所有正式图形对象被存储在这里
   *
   * ---
   *
   * @member {Array}
   */
  O: shape[] = [];
  /**
   * ## 预定义图形对象列表
   * 画板中所有预定义(predefine)图形对象被存储在这里
   *
   * ---
   *
   * @member {Array}
   */
  pO: shape[] = [];
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
  IAseq: [[shape[], shape[]], [shape[], shape[]]] = [
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
   * `3` : 正在拖动图形标签
   *
   * ---
   *
   * @member {number}
   */
  Status: number = 0;
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
  chooseObjs: chooseObjs = {
    all: [],
    point: [],
    line: [],
    circle: [],
  };
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
  F: number = -1;
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
  drawingModeI: number;

  Mode: Mode;
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
  showBoundBox: boolean = true;
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
  stageBound: rect;
  tr: [number, number, number] = [50, 400, 400];
  rootObjs: shape[] = [];
  dragOffset: pos = { x: 0, y: 0 };
  names: string[] = [];
  nextNameI: { [index: string]: number };
  axisXtype: number = 2;
  axisYtype: number = 2;
  axisStyle: {
    width: number;
    color: number;
    alpha: number;
    cap: LINE_CAP;
  } = {
    width: 1,
    color: 0x000000,
    alpha: 1,
    cap: LINE_CAP.ROUND,
  };
  Xscale: Text[] = [];
  Yscale: Text[] = [];
  scaleFont: TextStyle = new TextStyle({
    fontFamily: "cambria",
    fontSize: 12,
  });
  axis: Graphics;

  currentCase: drawCase;

  constructor(pixiAppSetting: IApplicationOptions, Mode: Mode) {
    this.PIXIapp = new Application(pixiAppSetting);
    this.Mode = Mode;
    this.nextNameI = {
      point: 0,
      line: 0,
      circle: 0,
    };
    this.changeDrawingMode(Mode.defaultDrawingModeI);
    this.stage = this.PIXIapp.stage;
    this.stageBound = [
      [0, 0],
      [
        this.PIXIapp.view.offsetWidth - getOffsetLeft(this.PIXIapp.view),
        this.PIXIapp.view.offsetHeight - getOffsetTop(this.PIXIapp.view),
      ],
    ];

    //初始化坐标轴
    this.axis = new Graphics();
    this.stage.addChild(this.axis);
    this.updAxes();

    //设置鼠标事件
    this.PIXIapp.view.addEventListener("mousedown", (ev: MouseEvent): void => {
      var IAAs = this.IAseq.flat(2);
      for (var i in IAAs) {
        if (IAAs[i].removed) {
          continue;
        }
        if (IAAs[i].needUpdBoundRect) {
          IAAs[i].updBoundRect();
          IAAs[i].needUpdBoundRect = false;
        }
        if (IAAs[i].needUpdBitmap) {
          IAAs[i].updBitmap();
          IAAs[i].needUpdBitmap = false;
        }
      }
      var crd = this.toCrd({ x: ev.offsetX, y: ev.offsetY });
      var focus = this.chooseByGlobalPos({ x: ev.offsetX, y: ev.offsetY });
      console.log("[mousedown] current focus:", focus);
      console.log("[mousedown] current drawing case:", this.currentCase);
      if (this.currentCase != undefined) {
        if (isBlank(focus)) {
          //点击空白处
          //重置选择操作
          this.resetChoosing();
          //处理点击空白情况
          var blankCase = this.currentCase.blank;
          if (isAvailable(blankCase)) {
            this.currentCase = blankCase;
            if (blankCase.processFn !== undefined) {
              blankCase.processFn(this, crd);
            }
          }
        } else {
          //点击了一个对象
          //处理泛形状情况
          var AnyCase = this.currentCase.any;
          if (isAvailable(AnyCase)) {
            //匹配 进入该情况 添加该对象至选中对象列表 执行处理函数
            this.currentCase = AnyCase;
            this.chooseObjs.all.push(focus);
            this.chooseObjs[focus.shapeName].push(focus);
            focus.changeStyle(focusStyle);
            if (AnyCase.processFn !== undefined) {
              AnyCase.processFn(this, crd);
            }
          }
          //查找该对象类型是否符和 当前绘图情况的 某一种[子情况]
          var Tcase = this.currentCase[focus.shapeName];
          if (isAvailable(Tcase)) {
            //匹配 进入该情况 添加该对象至选中对象列表 执行处理函数
            this.currentCase = Tcase;
            this.chooseObjs.all.push(focus);
            this.chooseObjs[focus.shapeName].push(focus);
            focus.changeStyle(focusStyle);
            if (Tcase.processFn !== undefined) {
              Tcase.processFn(this, crd);
            }
          }
        }
      }
    });
    this.PIXIapp.view.addEventListener("mousemove", (ev: MouseEvent): void => {
      // console.log("status",this.Status);
      var crd = this.toCrd({ x: ev.offsetX, y: ev.offsetY });
      switch (this.Status) {
        case 1:
          this.O[this.F].updDrag(crd);
          break;
        case 2:
          this.tr[1] = ev.offsetX + this.dragOffset.x;
          this.tr[2] = ev.offsetY + this.dragOffset.y;
          this.updAll();
          break;
        default:
          break;
      }
    });
    this.PIXIapp.view.addEventListener("mouseup", (ev: MouseEvent): void => {
      var crd = this.toCrd({ x: ev.offsetX, y: ev.offsetY });
      if (this.F != -1) {
        if (this.O[this.F].initializing) {
          this.O[this.F].initializing = false;
          var focus = this.chooseByGlobalPos({ x: ev.offsetX, y: ev.offsetY });
          if (!isBlank(focus)) {
            switch (focus.shapeName) {
              case "point":
                break;
              case "line":
                break;
              case "circle":
                break;
              default:
                break;
            }
          }
        }
      }
      this.F = -1;
      this.Status = 0;
    });
    this.PIXIapp.view.onwheel = (ev: WheelEvent): void => {
      if (ev.deltaY < 0) {
        this.tr[0] *= 1.1;
        this.tr[1] = ev.offsetX + (this.tr[1] - ev.offsetX) * 1.1;
        this.tr[2] = ev.offsetY + (this.tr[2] - ev.offsetY) * 1.1;
      } else {
        this.tr[0] /= 1.1;
        this.tr[1] = ev.offsetX + (this.tr[1] - ev.offsetX) / 1.1;
        this.tr[2] = ev.offsetY + (this.tr[2] - ev.offsetY) / 1.1;
      }
      this.updAll();
    };
  }

  toPos(crd: crd): pos {
    return {
      x: crd.x * this.tr[0] + this.tr[1],
      y: -crd.y * this.tr[0] + this.tr[2],
    };
  }
  toCrd(pos: pos): crd {
    return {
      x: (pos.x - this.tr[1]) / this.tr[0],
      y: -(pos.y - this.tr[2]) / this.tr[0],
    };
  }
  updAll(): void {
    this.updAxes();
    for (var i in this.rootObjs) {
      if (!this.rootObjs[i].removed) {
        this.rootObjs[i].update();
      }
    }
  }
  chooseByGlobalPos(pos: pos): -1 | shape {
    //ABSL
    if (this.drawingModeI != 0) {
      var predefineObjs: shape[] = this.IAseq[0].flat(2);
      for (var i in predefineObjs) {
        if (!predefineObjs[i].removed) {
          if (
            predefineObjs[i].boundRect[0][0] <= pos.x &&
            pos.x <= predefineObjs[i].boundRect[1][0] &&
            predefineObjs[i].boundRect[0][1] <= pos.y &&
            pos.y <= predefineObjs[i].boundRect[1][1]
          ) {
            if (predefineObjs[i].checkBitmap(pos)) {
              return predefineObjs[i].toObj();
            }
          }
        }
      }
    }
    var objs = this.IAseq[1].flat(2);
    for (var i in objs) {
      if (!objs[i].removed) {
        if (
          objs[i].boundRect[0][0] <= pos.x &&
          pos.x <= objs[i].boundRect[1][0] &&
          objs[i].boundRect[0][1] <= pos.y &&
          pos.y <= objs[i].boundRect[1][1]
        ) {
          if (objs[i].checkBitmap(pos)) {
            return objs[i];
          }
        }
      }
    }
    return -1;
  }
  clearChooseList(): void {
    for (var i in this.chooseObjs.all) {
      //重置所有选中元素的样式
      this.chooseObjs.all[i].changeStyle(defaultStyle);
    }
    this.chooseObjs.all.length = 0;
    this.chooseObjs.point.length = 0;
    this.chooseObjs.line.length = 0;
    this.chooseObjs.circle.length = 0;
  }
  resetChoosing(): void {
    console.log(`=====reset choosing=====`);
    this.clearChooseList();
    this.currentCase = this.Mode.drawingModes[this.drawingModeI].rootCase;
  }
  changeDrawingMode(newDrawingModeI: number): void {
    this.drawingModeI = newDrawingModeI;
    this.resetChoosing();
  }
  updAxes(): void {
    this.axis.clear();
    var origin = this.toPos({ x: 0, y: 0 }),
      dp_Xm = this.stageBound[0][0],
      dp_Ym = this.stageBound[0][1],
      dp_Xn = this.stageBound[1][0],
      dp_Yn = this.stageBound[1][1],
      minCrd = this.toCrd(toPos(this.stageBound[0])),
      maxCrd = this.toCrd(toPos(this.stageBound[1]));
    this.axis.lineStyle(this.axisStyle);
    var rsl = 1;
    var wtt = new Text("1", this.scaleFont); //widthTestText
    while (this.tr[0] * rsl < 1.5 * (wtt.width + 10)) {
      if ((rsl + "")[0] == "2") {
        rsl /= 2;
        rsl *= 5;
      } else {
        rsl *= 2;
      }
      wtt.text = rsl + "";
    }
    while (this.tr[0] * rsl > 5 * (wtt.width + 10)) {
      if ((rsl + "")[(rsl + "").length - 1] == "5") {
        rsl *= 2;
        rsl /= 5;
      } else {
        rsl /= 2;
      }
      wtt.text = rsl + "";
    }
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
          for (
            let I = floatMul(Math.ceil(minCrd.x / rsl), rsl);
            I <= floatMul(Math.floor(maxCrd.x / rsl), rsl);
            I = floatAdd(I, rsl)
          ) {
            if (I == 0) {
              continue;
            }
            var DPcrd_t = this.toPos({ x: I, y: 0 });
            this.axis.moveTo(...toPair(DPcrd_t));
            this.axis.lineTo(DPcrd_t.x, origin.y + 3);
          }
        }
      }
      if (this.axisXtype > 1) {
        //添加刻度文字
        //清空先前的
        for (let i in this.Xscale) {
          this.Xscale[i].text = "";
        }
        for (
          let I = floatMul(Math.ceil(minCrd.x / rsl), rsl), i = 1; //i = 0用于原点
          I <= floatMul(Math.floor(maxCrd.x / rsl), rsl);
          I = floatAdd(I, rsl)
        ) {
          if (I == 0) {
            continue;
          }
          var DPcrd_t = this.toPos({ x: I, y: 0 });

          //若Text对象不够了则新建一个作为stage的子对象之一
          if (this.Xscale[i] === undefined) {
            this.Xscale[i] = new Text("", this.scaleFont);
            this.stage.addChild(this.Xscale[i]);
          }

          //更改文字 移动
          this.Xscale[i].text = I + "";
          this.Xscale[i].x = DPcrd_t.x - this.Xscale[i].width / 2;
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
            let I = floatMul(Math.ceil(maxCrd.y / rsl), rsl);
            I <= floatMul(Math.floor(minCrd.y / rsl), rsl);
            I = floatAdd(I, rsl)
          ) {
            if (I == 0) {
              continue;
            }
            var DPcrd_t = this.toPos({ x: 0, y: I });
            this.axis.moveTo(...toPair(DPcrd_t));
            this.axis.lineTo(origin.x - 3, DPcrd_t.y);
          }
        }
      }
      if (this.axisYtype > 1) {
        //添加刻度文字
        //清空先前的
        for (let i in this.Yscale) {
          this.Yscale[i].text = "";
        }
        for (
          let I = floatMul(Math.ceil(maxCrd.y / rsl), rsl), i = 0;
          I <= floatMul(Math.floor(minCrd.y / rsl), rsl);
          I = floatAdd(I, rsl)
        ) {
          if (I == 0) {
            continue;
          }
          var DPcrd_t = this.toPos({ x: 0, y: I });

          //若Text对象不够了则新建一个作为stage的子对象之一
          if (this.Yscale[i] === undefined) {
            this.Yscale[i] = new Text("", this.scaleFont);
            this.stage.addChild(this.Yscale[i]);
          }

          //更改文字 移动
          this.Yscale[i].text = I + "";
          this.Yscale[i].x = origin.x - this.Yscale[i].width - 4;
          this.Yscale[i].y = DPcrd_t.y - this.Yscale[i].height / 2;

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
    if (this.axisXtype > 1 || this.axisYtype > 1) {
      //画原点的"0"标识

      if (this.Xscale[0] === undefined) {
        this.Xscale[0] = new Text("", this.scaleFont);
        this.stage.addChild(this.Xscale[0]);
      }

      //更改文字 移动
      this.Xscale[0].text = "0";
      this.Xscale[0].x = origin.x - this.Xscale[0].width - 2;
      this.Xscale[0].y = origin.y;

      if (
        this.Xscale[0].x < dp_Xm ||
        this.Xscale[0].x > dp_Xn ||
        this.Xscale[0].y < dp_Ym ||
        this.Xscale[0].y > dp_Yn
      ) {
        //原点在屏幕之外
        this.Xscale[0].text = "";
      }
    }
  }
}
