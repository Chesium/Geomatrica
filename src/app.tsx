import React from "react";
import drawingMode from "./drawingMode";
import { Menu, N1, N2, N3 } from "./menu";
import ModeSwitch from "./modeSwitch";
import canvas from "./canvas";
import Euclidean2D from "./Mode/Euclidean2D.mode";
import { ReactSVG } from "react-svg";
export default class App extends React.Component<{ buttons: [string, drawingMode | undefined][] }> {
  cv: canvas = null;
  createCanvas: (element: HTMLCanvasElement) => void;
  constructor(props: { buttons: [string, drawingMode | undefined][] }) {
    super(props);
    this.createCanvas = (element: HTMLCanvasElement) => {
      this.cv = new canvas(
        {
          antialias: true,
          resolution: window.devicePixelRatio || 1,
          autoDensity: true,
          resizeTo: element.parentElement,
          view: element,
          backgroundColor: 0x000000,
          backgroundAlpha: 0,
        },
        Euclidean2D
      );
    };
  }
  cvInit() {
    this.cv.changeDrawingMode(this.cv.Mode.defaultDrawingModeI);
  }
  render(): React.ReactNode {
    return (
      <div id="main" ref={() => this.cvInit()}>
        <div id="header">
          <ReactSVG className="gm-logo" src="./assets/Geomatrica-icon.svg" />
          <Menu>
            <N1 name="file" ctx="文件">
              <N2 name="new" lCtx="新建画板" rCtx="Alt+O" haveN3={true}>
                <N3 name="new1" lCtx="NEW 1" />
                <N3 name="new2" lCtx="NEW 2" />
                <N3 name="new3" lCtx="NEW 3" />
              </N2>
              <hr />
              <N2 name="import" lCtx="导入画板" rCtx="Alt+O" haveN3={false} />
              <N2 name="export" lCtx="导出画板" rCtx="Alt+S" haveN3={false} />
            </N1>
            <N1 name="edit" ctx="编辑">
              <N2 name="undo" lCtx="撤销" haveN3={false} />
              <N2 name="redo" lCtx="恢复" haveN3={false} />
              <N2 name="search" lCtx="查找" haveN3={false} />
            </N1>
            <N1 name="display" ctx="显示">
              <N2 name="a" lCtx="AaBbCc" haveN3={false} />
              <N2 name="b" lCtx="DdEeFf" haveN3={false} />
              <N2 name="c" lCtx="GgHhIi" haveN3={false} />
            </N1>
          </Menu>
        </div>
        <div id="workarea-container">
          <canvas id="workarea" ref={this.createCanvas} />
        </div>
        <div className="toolbar">
          <div className="mode-switch-container">
            {this.props.buttons.map((v: [string, drawingMode | undefined]) => (
              <ModeSwitch
                key={v[0]}
                app={this}
                iconSrc={"./assets/switchIcons/" + v[0] + ".svg"}
                drawingMode={v[1]}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
