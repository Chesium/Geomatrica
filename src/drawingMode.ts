import obj from "./object";
import canvas from "./canvas";
import point from "./shape/point";
import line from "./shape/line";
import circle from "./shape/circle";
import { crd } from "./misc";
import modeSwitch from "./modeSwitch";

/**
 * ## 选中对象列表格式
 */
export interface chooseObjs {
  /**
   * ## 所有种类的图形对象
   */
  all: obj[];
  /**
   * ## 形状为点的图形对象
   */
  point: point[];
  /**
   * ## 形状为线的图形对象
   */
  line: line[];
  /**
   * ## 形状为圆的图形对象
   */
  circle: circle[];
  [index: string]: obj[];
}

/**
 * ## 绘图情况
 *
 * ---
 * 描述一种绘图时的情况和接下来可能进入的情况
 */
export class drawCase {
  /**
   * ## 处理函数
   *
   * ---
   * 进入此情况应该立即执行的函数
   *
   * ---
   * @param  {canvas} canvas 当前画板
   * @param  {crd} crd? 当前鼠标位置（计算用坐标）
   *
   * @returns void
   */
  processFn: (canvas: canvas, crd?: crd) => void | undefined = undefined;

  intoAny: drawCase | undefined = undefined;
  intoBlank: drawCase | undefined = undefined;
  into: { [index: string]: drawCase } = {};

  constructor(initFn: (Case: drawCase) => void = () => {}) {
    initFn(this);
  }
}

/**
 * ## 绘图模式
 *
 * ---
 * 和按钮绑定，
 * 存储切换为此种模式后如何处理用户在画板上的各种操作，
 * 如拖动、点击等
 */
export default class drawingMode {
  /**
   * ## 绘图模式的名称
   *
   * ---
   * 在调试信息、未来的模式选择界面中显示
   */
  name: string;
  /**
   * ## 绘图模式的显示名称
   *
   * ---
   * 鼠标移至按钮上显示的信息
   */
  title: string;
  /**
   * ## 绘图模式的名称
   *
   * ---
   * 在未来的模式选择界面中显示
   */
  description: string;
  /**
   * ## 绘图模式的根/初始 绘图情况
   *
   * ---
   * 从其延申出其他子情况
   */
  rootCase: drawCase;

  /**
   * ## 绘图模式的索引/编号（们）
   * 该绘图模式在不同名称画板模式的`drawingModes`列表中的索引
   */
  indexes: { [index: string]: number } = {};
  /**
   * ## 切换至此模式的按钮
   */
  switch: modeSwitch;
  /**
   */
  constructor(info: { name: string; title: string; description: string }) {
    this.name = info.name;
    this.title = info.title;
    this.description = info.description;
  }
}
