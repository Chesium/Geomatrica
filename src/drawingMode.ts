import shape from "./shape";
import canvas from "./canvas";
import point from "./shape/point";
import line from "./shape/line";
import circle from "./shape/circle";
import { pos } from "./misc";

export interface chooseObjs {
  all: shape[];
  point: point[];
  line: line[];
  circle: circle[];
  [index: string]: shape[];
}

export interface drawCase {
  // nextType: "beginDraw" | "choose" | "end";
  processFn?: (canvas: canvas, crd?: pos) => void;
  any?: drawCase;
  blank?: drawCase;
  point?: drawCase;
  line?: drawCase;
  circle?: drawCase;
  [index: string]: drawCase | ((canvas: canvas, crd?: pos) => void) | undefined;
}

export default class drawingMode {
  name: string;
  title: string;
  description: string;
  rootCase: drawCase;
  indexes: { [index: string]: number } = {};
  constructor() {}
}
