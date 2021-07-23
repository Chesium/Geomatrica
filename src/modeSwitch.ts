import canvas from "./canvas";
import drawingMode from "./drawingMode";

export default class modeSwitch {
  canvas: canvas;
  drawingMode: drawingMode;
  iconSrc: string;
  title: string;
  parentDiv: HTMLElement;
  element: HTMLElement;

  constructor(
    canvas: canvas,
    title: string,
    iconSrc: string,
    parentDiv: HTMLElement,
    drawingMode: drawingMode = undefined
  ) {
    this.canvas = canvas;
    this.iconSrc = iconSrc;
    this.title = title;
    this.parentDiv = parentDiv;
    this.drawingMode = drawingMode;

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

  activate() {
    this.parentDiv.appendChild(this.element);
  }
}
