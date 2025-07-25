import { Graphics, LINE_CAP } from "pixi.js";
import { type rect, pos, crd, type objectForSaving } from "./misc";
import { generateName } from "./util";
import canvas from "./canvas";
import tagBox from "./tagBox";
import { defaultStyle } from "./style";
import point from "./shape/point";
import { type style } from "./style";

//图形对象类
export default abstract class obj {
  static readonly IAA_color = 0xffffff;
  static readonly IAA_alpha = 2e-3;
  static shapeName: string;

  //形状层静态信息
  protected interactPriority!: number; //交互优先级 越小越先
  shape!: typeof obj;
  // public shapeName: string; //形状参考名
  // public shapeI: number;
  public shapeDescription!: string; //形状参考描述
  protected bodyZIndex!: number; //显示堆叠顺序 越大越前
  //定义层静态信息
  static defineTypeName: string; //定义参考名
  public defineTypeName!: string; //定义参考名
  // public defineI: number;
  public defineTypeDescription!: string; //定义参考描述

  public initializing!: boolean; //是否在初始化
  public preDefined!: boolean; //是否为预定义对象 这些对象只有交互层而无显示层
  public canvas!: canvas; //对象所在的画板
  public index!: number; //对象在画板中的索引 唯一
  public removed: boolean = false; //是否被移除(删除)
  public exist: boolean = false; //对象在当前定义下是否存在
  public parents: obj[] = []; //父对象列表
  public children: obj[] = []; //子对象列表
  public preDefinedChildren: obj[] = []; //预定义子对象列表
  public drawableObj: undefined | obj = undefined;
  public interactive: boolean = true; //是否允许交互(点中)
  protected interactionArea!: Graphics; //交互层PIXI图形
  public boundRect: rect = [
    [0, 0],
    [0, 0],
  ]; //所在区域矩形
  protected boundBox!: Graphics; //显示「所在区域矩形」的PIXI图形 (调试用)
  public needUpdBoundRect: boolean = false; //是否需要在下一次交互更新中刷新「所在区域矩形」
  public bitmap!: number[][]; //存储「所在区域矩形」中确切可交互区域的二值矩阵 大小与「所在区域矩形」相同
  public needUpdBitmap: boolean = false; //是否需要在下一次交互更新中刷新 bitmap
  public drawing: boolean = false; //是否正在绘画该对象
  public shown: boolean = false; //是否显示该对象
  protected body!: Graphics; //显示层PIXI图形
  protected style!: style; //对象的样式
  protected tagCrd: crd = { x: 0, y: 0 }; //用于确认对象标签的坐标
  public tag!: tagBox; //对象标签
  public name!: string; //对象名称

  saveI!: number;

  static shapeIndexes: { [index: string]: number } = {};
  static defIndexes: { [index: string]: number } = {};

  //================//

  calc(): void {} //根据定义计算形状层显示数据(定义层) 默认为空
  beginDraw(crd: crd): void {
    //开始绘画该对象(形状层或定义层)
    if (this.drawableObj != undefined) {
      this.drawableObj.beginDrag(crd);
    }
  }
  beginDrag(crd: crd): void {
    //开始拖动该对象(形状层或定义层)
    //默认与开始移动等同
    this.beginMove(crd);
    this.focusOnIt();
  }
  beginMove(crd: crd): void {
    //开始移动该对象(形状层或定义层)
    //默认为递归使父对象开始移动
    for (const i in this.parents) {
      this.parents[i].beginMove(crd);
    }
  }
  updDrag(crd: crd): void {
    //更新拖动操作(形状层或定义层)
    //默认与更新移动等同
    this.updMove(crd);
  }
  updMove(crd: crd): void {
    //更新移动操作(形状层或定义层)
    //默认为递归更新父对象移动操作
    for (const i in this.parents) {
      this.parents[i].updMove(crd);
    }
  }
  //================//

  abstract preDefine(): void; //进行预定义操作(形状层)
  abstract getTagCrd(): pos; //获取用于确认对象标签的坐标(形状层或定义层)
  abstract updBody(): void; //更新显示层图形 (形状层) 已完成
  abstract updInteractionArea(): void; //更新交互层图形 (形状层) 已完成
  abstract init_L2(): void; //形状层专有初始化(形状层) 已完成
  abstract generatePointOnIt(crd: crd): point;
  // abstract save(): objectForSaving | undefined;

  update(): void {
    if (this.removed) {
      return;
    }
    //根据对象形状层显示数据更新显示层图形、交互层图形、对象标签和子对象
    this.calc();

    //更新交互层图形
    this.updInteractionArea();

    //更新显示层图形
    if (!this.preDefined) {
      this.updBody();
      //更新对象标签
      const tagCrd = this.getTagCrd();
      this.tagCrd.x = tagCrd.x;
      this.tagCrd.y = tagCrd.y;
      this.tag.update();
      for (var i in this.children) {
        //递归更新子对象
        this.children[i].update();
      }
      for (var i in this.preDefinedChildren) {
        //递归更新预定义子对象
        if (!this.preDefinedChildren[i].removed && this.preDefinedChildren[i].preDefined) {
          //有可能已成实对象 所以还要判定一次是否为预定义对象
          this.preDefinedChildren[i].update();
        }
      }
    }
  }
  updBoundRect(): void {
    //刷新「所在区域矩形」
    const localBounds = this.interactionArea.getLocalBounds();
    this.boundRect = [
      [Math.floor(localBounds.x), Math.floor(localBounds.y)],
      [
        Math.floor(localBounds.x + this.interactionArea.width),
        Math.floor(localBounds.y + this.interactionArea.height),
      ],
    ];
    //update boundBox
    this.boundBox.clear();
    if (this.canvas.showBoundBox) {
      this.boundBox.lineStyle({
        width: 1,
        color: 0x000000,
        cap: LINE_CAP.ROUND,
      });
      this.boundBox.beginFill(0x000000, 0.1);
      this.boundBox.drawRect(
        this.boundRect[0][0],
        this.boundRect[0][1],
        this.boundRect[1][0] - this.boundRect[0][0],
        this.boundRect[1][1] - this.boundRect[0][1]
      );
    }
    this.needUpdBoundRect = false;
  }
  updBitmap(): void {
    //刷新「所在区域矩形」中确切可交互区域的二值矩阵
    const px: number[] = this.canvas.PIXIapp.renderer.plugins.extract.pixels(this.interactionArea);
    const tran: number[] = Array.from(
      { length: px.length / 4 },
      (_: any, i: number) => px[4 * i + 3] + px[4 * i + 2] + px[4 * i + 1] + px[4 * i]
    );
    const width: number = Math.floor(this.interactionArea.width);
    this.bitmap = Array.from({ length: Math.floor(this.interactionArea.height) }, (_: any, i: number) =>
      tran.slice(i * width, (i + 1) * width)
    );
    this.needUpdBitmap = false;
  }
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

    if (!this.preDefined) {
      //移除 body
      this.canvas.stage.removeChild(this.body);
      this.body.destroy();
      this.tag.remove();
    }

    //递归移除子对象 预定义子对象
    for (var i in this.children) {
      this.children[i].remove();
    }
    if (!this.preDefined) {
      for (var i in this.preDefinedChildren) {
        this.preDefinedChildren[i].remove();
      }
    }
  }
  focusOnIt(): void {
    //在画板中聚焦于此对象 开始拖动
    this.canvas.F = this.index;
    this.canvas.Status = 1;
  }
  checkNonExistParents(): boolean {
    //检查是否有不存在的父对象 若有则设自己为不存在 否则返回false
    for (const i in this.parents) {
      if (!this.parents[i].exist) {
        this.exist = false;
        return true;
      }
    }
    return false;
  }
  init_L1(canvas: canvas, preDefined: boolean): void {
    //初始化(上段)
    // console.log("init_L1 canvas:",canvas);
    this.initializing = true;
    this.preDefined = preDefined;
    this.canvas = canvas;
    this.index = canvas.O.length;
    canvas.O.push(this);
    this.interactionArea = new Graphics();
    this.interactionArea.zIndex = 0;
    this.canvas.stage.addChild(this.interactionArea);
    this.boundBox = new Graphics();
    this.boundBox.zIndex = 2;
    this.canvas.stage.addChild(this.boundBox);
    this.style = defaultStyle;
    if (this.preDefined) {
    } else {
      this.shown = true;
      this.body = new Graphics();
      this.canvas.stage.addChild(this.body);
    }
  }
  init_end(): void {
    //初始化(下段)
    this.preDefine();
    this.updInteractionArea();
    if (this.preDefined) {
      this.canvas.IAseq[0][this.interactPriority].push(this);
    } else {
      this.canvas.IAseq[1][this.interactPriority].push(this);
      this.updBody();
      this.preDefine();
      this.body.zIndex = this.bodyZIndex;
      if (this.name == undefined) {
        this.name = generateName(this.shape.shapeName, this.canvas.nextNameI[this.shape.shapeName]);
        this.canvas.nextNameI[this.shape.shapeName]++;
      }
      this.canvas.names.push(this.name);
      this.tagCrd = this.getTagCrd();
      console.log(`[NEW OBJ]: <${this.shape.shapeName}> <${this.defineTypeName}> "${this.name}"`);
      this.tag = new tagBox(this.tagCrd, this.name, this);
    }
    // this.initializing = false;
  }
  changeStyle(newStyle: style): void {
    if (this.removed) {
      return;
    }
    this.style = newStyle;
    this.updBody();
  }
  checkBitmap(pos: pos): boolean {
    return (
      this.bitmap[Math.floor(pos.y) - this.boundRect[0][1]][Math.floor(pos.x) - this.boundRect[0][0]] != 0
    );
  }
  toObj<I extends obj>(this: I): I {
    if (this.preDefined) {
      this.preDefined = false;

      this.canvas.IAseq[1][this.interactPriority].push(this);
      this.shown = true;
      this.body = new Graphics();
      this.body.zIndex = this.bodyZIndex;
      this.canvas.stage.addChild(this.body);
      if (this.name == undefined) {
        this.name = generateName(this.shape.shapeName, this.canvas.nextNameI[this.shape.shapeName]);
        this.canvas.nextNameI[this.shape.shapeName]++;
      }
      this.canvas.names.push(this.name);
      this.tagCrd = this.getTagCrd();
      this.tag = new tagBox(this.tagCrd, this.name, this);

      this.update();
    }
    return this;
  }
}
