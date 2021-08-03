import { Application, IApplicationOptions } from "pixi.js";
import { Container } from "pixi.js";
import { Text, TextStyle } from "pixi.js";
import { Graphics, LINE_CAP } from "pixi.js";

import { chooseObjs, drawCase } from "./drawingMode";
import obj from "./object";
import { rect, pos, crd } from "./misc";
import { posForm, floatAdd, floatMul, pairForm, getOffsetLeft, getOffsetTop } from "./util";
import Mode from "./Mode";
import { defaultStyle, focusStyle } from "./style";
import dm_move from "./drawingMode/move.dm";

/**
 * ## 画板
 *
 * ---
 * 所有的绘图操作都在这里进行
 */
export default class canvas {
  /**
   * ## PIXI对象
   * 画板所用的`PIXI.Application`对象
   */
  PIXIapp: Application;
  /**
   * ## PIXI舞台
   * 就是`this.PIXIapp.stage`
   *
   * ---
   * 在`PIXI`内作为所有图形对象的父对象
   *
   * 一般调用其`addChild()`、`removeChild()`方法
   */
  stage: Container;
  /**
   * ## 图形对象列表
   * 画板中所有正式图形对象被存储在这里
   *
   * ---
   * "objects"的缩写
   */
  O: obj[] = [];
  /**
   * ## 交互区域响应序列
   * 画板中各可点击图形对象交互区域的响应序列
   *
   * ---
   * `IAseq[0]`存储预定义对象
   *
   * `IAseq[1]`存储正式对象 `[0][0]`为点类 `[0][1]`为线类（包括圆）
   *
   * 列表中位置越前的对象权重越高且点击时越先被判定
   *
   * 使用前先压平（用`.flat(2)`，需加ES2019列表库）
   *
   * "interaction sequence"的简称
   */
  IAseq: [[obj[], obj[]], [obj[], obj[]]] = [
    [[], []],
    [[], []],
  ];
  /**
   * ## 画板状态
   * 区别与于`Mode`（画板模式）、`drawingModeI`（绘图模式编号）的一个值
   *
   * ---
   * 目前有3种可能的值:
   *
   * `0` : 空闲
   *
   * `1` : 正在拖动图形对象
   *
   * `2` : 正在拖动图形标签
   */
  Status: number = 0;
  /**
   * ## 选中的图形对象列表
   * 选中的图形对象存放在这里
   */
  chooseObjs: chooseObjs = {
    all: [],
    point: [],
    line: [],
    circle: [],
  };
  /**
   * ## 获得焦点的图形对象
   * 目前获得焦点的图形对象在`this.O`中的索引
   *
   * ---
   * 若无获得焦点的图形对象则为`-1`
   *
   * "focus"的简称
   */
  F: number = -1;
  /**
   * ## 绘图模式编号
   * 决定鼠标操作在画板上画的图形类型
   *
   * ---
   * 具体指当前绘图模式在`this.Mode.drawingModes`中的索引
   */
  drawingModeI: number;
  /**
   * ## 画板模式
   * 决定能在这画板上画什么、怎么画
   */
  Mode: Mode;
  /**
   * ## 显示边界盒
   * 是否显示图形对象的`boundBox`（边界盒）
   *
   * ---
   *
   * 判定点击时先会判断鼠标位置在哪些图形对象的边界盒内，
   * 再对照该图形对象的`bitmap`数组进一步确认，
   * 若为`true`则会在每一个图形对象后显示一个半透明的灰色矩形标识其边界盒
   *
   * 边界盒在每次鼠标按下时更新，所以会出现不准的情况
   */
  showBoundBox: boolean = false;
  /**
   * ## 画板区域
   * 当前画板的范围
   *
   * ---
   * 用于在渲染直线、射线等无限图形时确认显示范围
   */
  stageBound: rect;
  /**
   * ## 图形渲染变换系数
   * 指图形数据从计算用`crd`格式转为显示用`pos`数据时的变化量
   *
   * ---
   * `trCoe[0]` : 放大倍数
   *
   * `trCoe[1]` : x坐标变化量
   *
   * `trCoe[2]` : y坐标变化量
   */
  trCoe: [number, number, number] = [50, 400, 400];
  /**
   * ## 根对象列表
   * 存储所有没有父对象的对象
   *
   * ---
   * 所有其他对象都是这些对象的子对象，
   * 所以在`updAll()`中就更新这些对象就行了
   *
   * 目前这些对象都是`freepoint`（自由点）
   *
   * 今后的 固定坐标点（定值点）、自定义函数的图像也都是根对象
   */
  rootObjs: obj[] = [];
  /**
   * ## 画板拖动偏移
   * 存储画板原点位置与拖动起始位置的偏移量
   *
   * ---
   * 用于处理拖动画板的操作
   */
  dragOffset: pos = { x: 0, y: 0 };
  /**
   * ## 对象已用名列表
   *
   * ---
   * 存储全部有对象用过的名称
   */
  names: string[] = [];
  /**
   * ## 下一个默认名字的索引
   *
   * ---
   * 在下一次生成默认图形对象名时作为`generateName()`的参数
   */
  nextNameI: { [index: string]: number };
  /**
   * ## X坐标轴显示类型
   *
   * ---
   * 目前有3种取值:
   *
   * `0` : 不显示
   *
   * `1` : 只显示轴，没有刻度
   *
   * `2` : 显示轴和刻度
   */
  axisXtype: number = 2;
  /**
   * ## Y坐标轴显示类型
   *
   * ---
   * 目前有3种取值:
   *
   * `0` : 不显示
   *
   * `1` : 只显示轴，没有刻度
   *
   * `2` : 显示轴和刻度
   */
  axisYtype: number = 2;
  /**
   * ## 坐标轴样式
   *
   * ---
   * 有4个属性:
   *
   * `width` : 线条宽度
   *
   * `color` : 线条颜色
   *
   * `alpha` : 线条不透明度
   *
   * `cap`   : 线条端点样式
   */
  axisStyle: {
    /**
     * ## 线条宽度
     */
    width: number;
    /**
     * ## 线条颜色
     */
    color: number;
    /**
     * ## 线条不透明度
     */
    alpha: number;
    /**
     * ## 线条端点样式
     */
    cap: LINE_CAP;
  } = {
    width: 1,
    color: 0x000000,
    alpha: 1,
    cap: LINE_CAP.ROUND,
  };
  /**
   * ## X坐标轴刻度值PIXI文字列表
   * 用于显示X坐标轴上所有刻度值的PIXI文字（`PIXI.Text`）列表
   */
  Xscale: Text[] = [];
  /**
   * ## Y坐标轴刻度值PIXI文字列表
   * 用于显示Y坐标轴上所有刻度值的PIXI文字（`PIXI.Text`）列表
   */
  Yscale: Text[] = [];
  /**
   * ## 坐标轴刻度值的PIXI文字样式
   * 用于显示坐标轴上所有刻度值的PIXI文字的样式（`PIXI.TextStyle`）
   */
  scaleFont: TextStyle = new TextStyle({
    fontFamily: "cambria",
    fontSize: 12,
  });
  /**
   * ## 坐标轴的PIXI图形对象
   * 用于显示坐标轴的PIXI图形对象（`PIXI.Graphics`）
   */
  axis: Graphics;
  /**
   * ## 当前绘图情况
   *
   * ---
   * 标识该步应执行哪些函数、之后还会出现什么情况
   */
  currentCase: drawCase;
  /**
   * ## 是否处于根情况
   *
   * ---
   * 是否处在当前绘图模式的根情况中
   */
  inRootCase: boolean = true;
  /**
   * ## 刚刚结束绘图
   *
   * ---
   * 此时取消一次画板的点击判断
   */
  justEndDrawing: boolean = false;

  /**
   * @param  {IApplicationOptions} pixiAppSetting 创建PIXI应用（`PIXI.Application`）的参数
   * @param  {Mode} Mode 初始画板模式
   */
  constructor(pixiAppSetting: IApplicationOptions, Mode: Mode) {
    this.PIXIapp = new Application(pixiAppSetting);
    this.Mode = Mode;
    this.nextNameI = {
      point: 0,
      line: 0,
      circle: 0,
    };
    // this.changeDrawingMode(Mode.defaultDrawingModeI);
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
    this.PIXIapp.resizeTo.addEventListener("mousedown", (ev: MouseEvent): void => {
      if (this.justEndDrawing) {
        this.justEndDrawing = false;
        return;
      }
      if (!(this.PIXIapp.resizeTo instanceof HTMLElement)) {
        return;
      }
      if (this.Status == 3) {
        return;
      }
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
      var crd = this.toCrd({
        x: ev.pageX - this.PIXIapp.resizeTo.offsetLeft,
        y: ev.pageY - this.PIXIapp.resizeTo.offsetTop,
      });
      console.log(
        "[mousedown] pos:",
        ev.pageX - this.PIXIapp.resizeTo.offsetLeft,
        " ",
        ev.pageY - this.PIXIapp.resizeTo.offsetTop
      );
      var focus = this.chooseByPos({
        x: ev.pageX - this.PIXIapp.resizeTo.offsetLeft,
        y: ev.pageY - this.PIXIapp.resizeTo.offsetTop,
      });
      console.log("[mousedown] current focus:", focus);
      console.log("[mousedown] current drawing case:", this.currentCase);
      if (this.currentCase != undefined) {
        if (focus instanceof obj) {
          //点击了一个对象
          //处理泛形状情况
          var AnyCase = this.currentCase.intoAny;
          if (AnyCase != undefined) {
            //匹配 进入该情况 添加该对象至选中对象列表 执行处理函数
            this.currentCase = AnyCase;
            this.inRootCase = false;
            this.chooseObjs.all.push(focus);
            this.chooseObjs[focus.shape.shapeName].push(focus);
            focus.changeStyle(focusStyle);
            if (AnyCase.processFn !== undefined) {
              AnyCase.processFn(this, crd);
            }
          }
          //查找该对象类型是否符和 当前绘图情况的 某一种[子情况]
          var Tcase = this.currentCase.into[focus.shape.shapeName];
          if (Tcase != undefined) {
            //匹配 进入该情况 添加该对象至选中对象列表 执行处理函数
            this.currentCase = Tcase;
            this.inRootCase = false;
            this.chooseObjs.all.push(focus);
            this.chooseObjs[focus.shape.shapeName].push(focus);
            focus.changeStyle(focusStyle);
            if (Tcase.processFn !== undefined) {
              Tcase.processFn(this, crd);
            }
          }
        } else {
          //点击空白处
          //重置选择操作
          this.resetChoosing();
          //处理点击空白情况
          var blankCase = this.currentCase.intoBlank;
          if (blankCase != undefined) {
            this.currentCase = blankCase;
            this.inRootCase = false;
            if (blankCase.processFn !== undefined) {
              blankCase.processFn(this, crd);
            }
          }
        }
      }
    });
    this.PIXIapp.resizeTo.addEventListener("mousemove", (ev: MouseEvent): void => {
      if (!(this.PIXIapp.resizeTo instanceof HTMLElement)) {
        return;
      }
      if (this.Status == 3) {
        return;
      }
      // console.log("status",this.Status);
      var crd = this.toCrd({
        x: ev.pageX - this.PIXIapp.resizeTo.offsetLeft,
        y: ev.pageY - this.PIXIapp.resizeTo.offsetTop,
      });
      switch (this.Status) {
        case 1:
          this.O[this.F].updDrag(crd);
          break;
        case 2:
          this.trCoe[1] = ev.pageX - this.PIXIapp.resizeTo.offsetLeft + this.dragOffset.x;
          this.trCoe[2] = ev.pageY - this.PIXIapp.resizeTo.offsetTop + this.dragOffset.y;
          this.updAll();
          // console.log("[update drag->canvas] trcoe:", this.trCoe);
          break;
        default:
          break;
      }
    });
    this.PIXIapp.resizeTo.addEventListener("mouseup", (ev: MouseEvent): void => {
      if (!(this.PIXIapp.resizeTo instanceof HTMLElement)) {
        return;
      }
      if (this.Status == 3) {
        return;
      }
      var crd = this.toCrd({
        x: ev.pageX - this.PIXIapp.resizeTo.offsetLeft,
        y: ev.pageY - this.PIXIapp.resizeTo.offsetTop,
      });
      if (this.F != -1) {
        if (this.O[this.F].initializing) {
          this.O[this.F].initializing = false;
          var focus = this.chooseByPos({
            x: ev.pageX - this.PIXIapp.resizeTo.offsetLeft,
            y: ev.pageY - this.PIXIapp.resizeTo.offsetTop,
          });
        }
      }
      this.F = -1;
      this.Status = 0;
    });
    this.PIXIapp.resizeTo.addEventListener("wheel", (ev: WheelEvent): void => {
      if (!(this.PIXIapp.resizeTo instanceof HTMLElement)) {
        return;
      }
      if (ev.deltaY < 0) {
        this.trCoe[0] *= 1.1;
        this.trCoe[1] =
          ev.pageX -
          this.PIXIapp.resizeTo.offsetLeft +
          (this.trCoe[1] - ev.pageX + this.PIXIapp.resizeTo.offsetLeft) * 1.1;
        this.trCoe[2] =
          ev.pageY -
          this.PIXIapp.resizeTo.offsetTop +
          (this.trCoe[2] - ev.pageY + this.PIXIapp.resizeTo.offsetTop) * 1.1;
      } else {
        this.trCoe[0] /= 1.1;
        this.trCoe[1] =
          ev.pageX -
          this.PIXIapp.resizeTo.offsetLeft +
          (this.trCoe[1] - ev.pageX + this.PIXIapp.resizeTo.offsetLeft) / 1.1;
        this.trCoe[2] =
          ev.pageY -
          this.PIXIapp.resizeTo.offsetTop +
          (this.trCoe[2] - ev.pageY + this.PIXIapp.resizeTo.offsetTop) / 1.1;
      }
      this.updAll();
    });
    document.addEventListener("keydown", (ev: KeyboardEvent): void => {
      console.log("[keydown] code: ", ev.code);
      if (ev.code == "Escape") {
        if (this.inRootCase) {
          this.changeDrawingMode(dm_move.indexes[this.Mode.name]);
        } else {
          this.resetChoosing();
        }
      }
    });
    this.PIXIapp.view.removeAttribute("style");
  }
  /**
   * ## 转换至显示用坐标`pos`
   *
   * ---
   * 将计算用坐标`crd`转换至显示用坐标`pos`
   *
   * ---
   * @param  {crd} crd
   * @returns pos
   */
  toPos(crd: crd): pos {
    return {
      x: crd.x * this.trCoe[0] + this.trCoe[1],
      y: -crd.y * this.trCoe[0] + this.trCoe[2],
    };
  }
  /**
   * ## 转换至计算用坐标`crd`
   *
   * ---
   * 将显示用坐标`pos`转换至计算用坐标`crd`
   *
   * ---
   * @param  {crd} crd
   * @returns pos
   */
  toCrd(pos: pos): crd {
    return {
      x: (pos.x - this.trCoe[1]) / this.trCoe[0],
      y: -(pos.y - this.trCoe[2]) / this.trCoe[0],
    };
  }
  /**
   * ## 更新所有对象
   *
   * ---
   * @returns void
   */
  updAll(): void {
    this.updAxes();
    for (var i in this.rootObjs) {
      if (!this.rootObjs[i].removed) {
        this.rootObjs[i].update();
      }
    }
  }
  /**
   * ## 获取选中的图形对象
   *
   * ---
   * 根据显示用坐标`pos`获取选中的图形对象
   *
   * @param  {pos} pos
   * @returns -1 | shape
   */
  chooseByPos(pos: pos): -1 | obj {
    //ABSL
    if (this.drawingModeI != 0) {
      var predefineObjs: obj[] = this.IAseq[0].flat(2);
      console.log("predefineObjs:", predefineObjs);
      for (var po of predefineObjs) {
        console.log("po:", po);
        if (!po.removed) {
          if (
            po.boundRect[0][0] <= pos.x &&
            pos.x <= po.boundRect[1][0] &&
            po.boundRect[0][1] <= pos.y &&
            pos.y <= po.boundRect[1][1]
          ) {
            if (po.checkBitmap(pos)) {
              return po.toObj();
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
  /**
   * ## 清除选中对象列表
   *
   * ---
   * 还原所有选中对象的样式
   *
   * ---
   * @returns void
   */
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
  /**
   * ## 重置选择操作
   *
   * ---
   * 还原所有选中对象的样式+重置绘图情况
   *
   * ---
   * @returns void
   */
  resetChoosing(): void {
    console.log(`=====reset choosing=====`);
    this.clearChooseList();
    this.currentCase = this.Mode.drawingModes[this.drawingModeI].rootCase;
    this.inRootCase = true;
  }
  /**
   * ## 更改绘图模式
   *
   * ---
   * @param  {number} newDrawingModeI 新绘图模式的索引（编号）
   * @returns void
   */
  changeDrawingMode(newDrawingModeI: number): void {
    console.log(
      `this.Mode.drawingModes[${newDrawingModeI}].switch:`,
      this.Mode.drawingModes[newDrawingModeI].switch
    );
    if (this.drawingModeI != undefined) {
      if (this.Mode.drawingModes[this.drawingModeI].switch != undefined) {
        // this.Mode.drawingModes[this.drawingModeI].switch.setState(() => ({ checked: false }));
        this.Mode.drawingModes[this.drawingModeI].switch.off();
      }
    }
    if (this.Mode.drawingModes[newDrawingModeI].switch != undefined) {
      // this.Mode.drawingModes[newDrawingModeI].switch.setState(() => ({ checked: true }));
      this.Mode.drawingModes[newDrawingModeI].switch.on();
    }
    this.drawingModeI = newDrawingModeI;
    this.resetChoosing();
  }
  /**
   * ## 绘制/更新坐标轴
   *
   * ---
   * @returns void
   */
  updAxes(): void {
    // console.log("[update AXES]");
    this.axis.clear();
    var origin = this.toPos({ x: 0, y: 0 }),
      dp_Xm = this.stageBound[0][0],
      dp_Ym = this.stageBound[0][1],
      dp_Xn = this.stageBound[1][0],
      dp_Yn = this.stageBound[1][1],
      minCrd = this.toCrd(posForm(this.stageBound[0])),
      maxCrd = this.toCrd(posForm(this.stageBound[1]));
    this.axis.lineStyle(this.axisStyle);
    var rsl = 1;
    var wtt = new Text("1", this.scaleFont); //widthTestText
    while (this.trCoe[0] * rsl < 1.5 * (wtt.width + 10)) {
      if ((rsl + "")[0] == "2") {
        rsl /= 2;
        rsl *= 5;
      } else {
        rsl *= 2;
      }
      wtt.text = rsl + "";
    }
    while (this.trCoe[0] * rsl > 5 * (wtt.width + 10)) {
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
            this.axis.moveTo(...pairForm(DPcrd_t));
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
            this.axis.moveTo(...pairForm(DPcrd_t));
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

  // save():string{
  //   for(var obj of this.O){

  //   }
  // }
}
