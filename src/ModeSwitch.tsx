import React from "react";
import canvas from "./canvas";
import drawingMode from "./drawingMode";
/**
 * ## 绘图模式切换按钮
 */
export default class ModeSwitch extends React.Component<
  { canvas: canvas; iconSrc: string; drawingMode: drawingMode | undefined },
  { checked: boolean }
> {
  /**
   * ## 按钮绑定的画板
   */
  canvas: canvas;
  /**
   * ## 按钮对应的绘图模式
   */
  drawingMode: drawingMode;
  iconStyle: React.CSSProperties;
  /**
   * ## 标题
   * 鼠标移至按钮上显示的信息
   */
  title: string;
  constructor(prop: { canvas: canvas; iconSrc: string; drawingMode: drawingMode | undefined }) {
    super(prop);
    this.canvas = prop.canvas;
    this.iconStyle = { backgroundImage: `url("${prop.iconSrc}")` };
    this.drawingMode = prop.drawingMode;
    this.state = {
      checked:
        this.drawingMode == undefined
          ? false
          : this.canvas.Mode.defaultDrawingModeI == this.drawingMode.indexes[this.canvas.Mode.name],
    };
    if (prop.drawingMode == undefined) {
      this.title = "";
    } else {
      this.title = prop.drawingMode.title;
      prop.drawingMode.switch = this;
    }
  }

  activate() {
    if (this.drawingMode != undefined) {
      this.canvas.changeDrawingMode(this.drawingMode.indexes[this.canvas.Mode.name]);
    }
  }
  render(): React.ReactNode {
    return (
      <input
        type="radio"
        name="tool"
        className="mode-switch"
        title={this.title}
        style={this.iconStyle}
        onClick={() => this.activate()}
        onChange={() => {}}
        checked={this.state.checked}
      />
    );
  }
}
