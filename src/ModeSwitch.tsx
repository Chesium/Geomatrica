import React from "react";
import drawingMode from "./drawingMode";
import App from "./app";
/**
 * ## 绘图模式切换按钮
 */
export default class ModeSwitch extends React.Component<
  { app:App; iconSrc: string; drawingMode: drawingMode | undefined },
  { checked: boolean }
> {
  title: string;
  constructor(prop: { app:App ; iconSrc: string; drawingMode: drawingMode | undefined }) {
    super(prop);
    this.state = {
      checked: false,
    };
    if (prop.drawingMode == undefined) {
      this.title = "";
    } else {
      this.title = prop.drawingMode.title;
      prop.drawingMode.switch = this;
    }
  }
  activate() {
    if (this.props.drawingMode != undefined && this.props.app.cv != undefined) {
      this.props.app.cv.changeDrawingMode(
        this.props.drawingMode.indexes[this.props.app.cv.Mode.name]
      );
    }
  }
  render(): React.ReactNode {
    return (
      <input
        type="radio"
        name="tool"
        className="mode-switch"
        title={this.title}
        style={{ backgroundImage: `url("${this.props.iconSrc}")` }}
        onClick={() => this.activate()}
        onChange={() => {}}
        checked={this.state.checked}
      />
    );
  }
}
