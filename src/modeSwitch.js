export class modeSwitch {
  constructor(canvas, mode, title, iconSrc, div) {
    this.canvas = canvas;
    this.mode = mode;
    this.iconSrc = iconSrc;
    this.title = title;
    this.div = div;

    this.element = document.createElement("input");
    this.element.setAttribute("type", "radio");
    this.element.setAttribute("name", "tool");
    this.element.setAttribute("class", "mode-switch");
    this.element.setAttribute("title", this.title);

    this.element.style.backgroundImage = `url("${this.iconSrc}")`;

    this.element.onclick = () => {
      this.canvas.changeMode(this.mode);
    };
  }

  activate() {
    this.div.appendChild(this.element);
  }
}
