import canvas from "./canvas";
import drawingMode from "./drawingMode";

/**
 * ## 绘图模式切换按钮
 */
export default class modeSwitch {
  /**
   * ## 按钮绑定的画板
   */
  canvas: canvas;
  /**
   * ## 按钮对应的绘图模式
   */
  drawingMode: drawingMode;
  /**
   * ## 按钮图标的路径
   */
  iconSrc: string;
  /**
   * ## 标题
   * 鼠标移至按钮上显示的信息
   */
  title: string;
  /**
   * ## 按钮在HTML中的父元素
   */
  parentDiv: HTMLElement;
  /**
   * ## 按钮的HTML元素
   */
  element: HTMLElement;
  /**
   * @param  {canvas} canvas 按钮绑定的画板
   * @param  {string} iconSrc 按钮图标的路径
   * @param  {HTMLElement} parentDiv 按钮在HTML中的父元素
   * @param  {drawingMode|undefined} drawingMode 按钮对应的绘图模式
   */
  constructor(canvas: canvas, iconSrc: string, parentDiv: HTMLElement, drawingMode: drawingMode = undefined) {
    this.canvas = canvas;
    this.iconSrc = iconSrc;
    this.parentDiv = parentDiv;
    this.drawingMode = drawingMode;
    if (drawingMode == undefined) {
      this.title = "";
    } else {
      this.title = drawingMode.title;
    }

    this.element = document.createElement("input");
    this.element.setAttribute("type", "radio");
    this.element.setAttribute("name", "tool");
    this.element.setAttribute("class", "mode-switch");
    this.element.setAttribute("title", this.title);

    this.element.style.backgroundImage = `url("${this.iconSrc}")`;

    this.element.onclick = () => {
      if (this.drawingMode != undefined) {
        this.canvas.changeDrawingMode(this.drawingMode.indexes[this.canvas.Mode.name]);
      }
    };
  }
  /**
   * ## 激活按钮
   * 将按钮添加至HTML中
   */
  activate() {
    this.parentDiv.appendChild(this.element);
  }
}
