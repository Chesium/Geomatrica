import drawingMode from "./drawingMode";
import obj from "./object";

/**
 * ## 画板模式
 * 可以理解为许多`drawingMode`的集合
 * 现今只有`Euclidean2D`一种
 * 今后可以添加像 尺规作图 立体几何等模式
 */
export default class Mode {
  /**
   * ## 模式的名称
   *
   * ---
   * 在调试信息、未来的模式选择界面中显示 也作为该模式的**唯一**标识符
   */
  readonly name: string;
  /**
   * ## 模式的描述
   *
   * ---
   * 在未来的模式选择界面中显示
   */
  readonly description: string;
  /**
   * ## 模式里的绘图模式(工具)列表
   *
   * ---
   * 该模式的所有形状信息、渲染函数、对象构造方法都在里面
   */
  drawingModes: drawingMode[] = [];
  /**
   * ## 模式里的形状列表
   */
  shapes: typeof obj[] = [];
  /**
   * ## 模式默认绘图模式(工具)索引(编号)
   * 默认绘图模式在`this.drawingModes`中的索引
   */
  defaultDrawingModeI: number = 0;
  /**
   * @param  {string} name 模式的名称
   * @param  {string} description 模式的描述
   */
  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }
  /**
   * ## 注册绘图模式
   * 添加一个绘图模式(工具)至该模式
   *
   * ---
   * @param  {drawingMode} newDrawingMode 新的绘图模式
   * @returns void
   */
  registerDrawingMode(newDrawingMode: drawingMode): void {
    if (newDrawingMode.indexes[this.name] != undefined) {
      return;
    }
    newDrawingMode.indexes[this.name] = this.drawingModes.length;
    this.drawingModes.push(newDrawingMode);
  }
  registerShape(newShape: typeof obj): void {
    if (newShape.indexes[this.name] != undefined) {
      return;
    }
    newShape.indexes[this.name] = this.shapes.length;
    this.shapes.push(newShape);
  }
}
