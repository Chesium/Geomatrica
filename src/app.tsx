import React from "react";
import drawingMode from "./drawingMode";
import { Menu, N1, N2, N3 } from "./menu";
import ModeSwitch from "./ModeSwitch";
import canvas from "./canvas";
import Euclidean2D from "./Mode/Euclidean2D.mode";
import logoUrl from "../assets/Geomatrica-icon.svg?url";
import angleBisectorIcon from "../assets/switchIcons/angleBisector.svg?url";
import circumcircleIcon from "../assets/switchIcons/circumcircle.svg?url";
import cpCircleIcon from "../assets/switchIcons/CP_circle.svg?url";
import extensionLineIcon from "../assets/switchIcons/extensionLine.svg?url";
import freepointIcon from "../assets/switchIcons/freepoint.svg?url";
import halfLineIcon from "../assets/switchIcons/halfLine.svg?url";
import intersectionIcon from "../assets/switchIcons/intersection.svg?url";
import midPointIcon from "../assets/switchIcons/midPoint.svg?url";
import moveIcon from "../assets/switchIcons/move.svg?url";
import parallelLineIcon from "../assets/switchIcons/parallelLine.svg?url";
import perpendicularIcon from "../assets/switchIcons/perpendicular.svg?url";
import perpendicularBisectorIcon from "../assets/switchIcons/perpendicularBisector.svg?url";
import segmentIcon from "../assets/switchIcons/segment.svg?url";
import straightLineIcon from "../assets/switchIcons/straightLine.svg?url";
import tangentIcon from "../assets/switchIcons/tangent.svg?url";

const iconUrls: Record<string, string> = {
  angleBisector: angleBisectorIcon,
  circumcircle: circumcircleIcon,
  CP_circle: cpCircleIcon,
  extensionLine: extensionLineIcon,
  freepoint: freepointIcon,
  halfLine: halfLineIcon,
  intersection: intersectionIcon,
  midPoint: midPointIcon,
  move: moveIcon,
  parallelLine: parallelLineIcon,
  perpendicular: perpendicularIcon,
  perpendicularBisector: perpendicularBisectorIcon,
  segment: segmentIcon,
  straightLine: straightLineIcon,
  tangent: tangentIcon,
};

export default class App extends React.Component<{
  buttons: [string, drawingMode | undefined][];
}> {
  cv?: canvas;
  private canvasElement = React.createRef<HTMLCanvasElement>();
  private workareaElement = React.createRef<HTMLDivElement>();

  constructor(props: { buttons: [string, drawingMode | undefined][] }) {
    super(props);
  }

  componentDidMount(): void {
    const element = this.canvasElement.current;
    const workarea = this.workareaElement.current;
    if (!element || !workarea) {
      return;
    }

    this.cv = new canvas(
      {
        antialias: true,
        resolution: window.devicePixelRatio || 1,
        autoDensity: true,
        resizeTo: workarea,
        view: element,
        backgroundColor: 0x000000,
        backgroundAlpha: 0,
      },
      Euclidean2D,
    );
    this.cv.changeDrawingMode(this.cv.Mode.defaultDrawingModeI);
  }

  componentWillUnmount(): void {
    this.cv?.destroy();
    this.cv = undefined;
  }

  render(): React.ReactNode {
    return (
      <div className="geomatrica-root">
        <div className="geomatrica-header">
          <img className="gm-logo" src={logoUrl} alt="Geomatrica" />
          <Menu>
            <N1 name="file" ctx="File">
              <N2 name="new" lCtx="New Canvas" rCtx="Alt+O" haveN3={true}>
                <N3 name="new1" lCtx="NEW 1" />
                <N3 name="new2" lCtx="NEW 2" />
                <N3 name="new3" lCtx="NEW 3" />
              </N2>
              <hr />
              <N2
                name="import"
                lCtx="Import Canvas"
                rCtx="Alt+O"
                haveN3={false}
              />
              <N2
                name="export"
                lCtx="Export Canvas"
                rCtx="Alt+S"
                haveN3={false}
              />
            </N1>
            <N1 name="edit" ctx="Edit">
              <N2 name="undo" lCtx="Undo" haveN3={false} />
              <N2 name="redo" lCtx="Redo" haveN3={false} />
              <N2 name="search" lCtx="Search" haveN3={false} />
            </N1>
            <N1 name="display" ctx="Display">
              <N2 name="a" lCtx="AaBbCc" haveN3={false} />
              <N2 name="b" lCtx="DdEeFf" haveN3={false} />
              <N2 name="c" lCtx="GgHhIi" haveN3={false} />
            </N1>
          </Menu>
        </div>
        <div
          className="workarea-container"
          ref={this.workareaElement}
          tabIndex={0}
        >
          <canvas className="workarea" ref={this.canvasElement} />
        </div>
        <div className="toolbar">
          <div className="mode-switch-container">
            {this.props.buttons.map((v: [string, drawingMode | undefined]) => (
              <ModeSwitch
                key={v[0]}
                app={this}
                iconSrc={iconUrls[v[0]]}
                drawingMode={v[1]}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
