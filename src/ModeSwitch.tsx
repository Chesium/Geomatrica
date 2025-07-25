import React from "react";
import drawingMode from "./drawingMode";
import App from "./app";
import { ReactSVG } from "react-svg";
/**
 * ## 绘图模式切换按钮
 */
export default class ModeSwitch extends React.Component<{
  app: App;
  iconSrc: string;
  drawingMode: drawingMode | undefined;
}> {
  title: string;
  element: HTMLElement | null = null;
  setRef: (ref: HTMLElement | null) => void;
  constructor(prop: { app: App; iconSrc: string; drawingMode: drawingMode | undefined }) {
    super(prop);
    if (prop.drawingMode == undefined) {
      this.title = "";
    } else {
      this.title = prop.drawingMode.title;
      prop.drawingMode.switch = this;
    }
    this.setRef = (ref: HTMLElement | null) => {
      this.element = ref;
    };
  }
  activate() {
    if (this.props.drawingMode != undefined && this.props.app.cv != undefined) {
      this.props.app.cv.changeDrawingMode(this.props.drawingMode.indexes[this.props.app.cv.Mode.name]);
    }
    for (const dm of this.props.app.cv.Mode.drawingModes) {
      dm.switch.off();
    }
    this.on();
  }
  on() {
    this.element!.setAttribute("chosen", "");
  }
  off() {
    this.element!.removeAttribute("chosen");
  }
  render(): React.ReactNode {
    return (
      <div className="mode-switch" title={this.title} onClick={() => this.activate()} ref={this.setRef}>
        <ReactSVG src={this.props.iconSrc} className="mode-switch-icon" />
      </div>
    );
  }
}
