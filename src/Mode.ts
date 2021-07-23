import drawingMode from "./drawingMode";

export default class Mode {
  readonly name: string; //唯一 重复会出错
  readonly description: string;

  // private shapes: typeof shape[] = [];
  // private definitions: typeof shape[] = [];
  drawingModes: drawingMode[] = [];
  defaultDrawingModeI: number=0;

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }
  // registerShape(newShape: typeof shape): void {
  //   if (newShape.indexes[this.name] != undefined) {
  //     return;
  //   }
  //   newShape.indexes[this.name] = this.shapes.length;
  //   this.shapes.push(newShape);
  // }
  // registerDefinition(newDefinition: typeof shape): void {
  //   if (newDefinition.indexes[this.name] != undefined) {
  //     return;
  //   }
  //   newDefinition.indexes[this.name] = this.definitions.length;
  //   this.definitions.push(newDefinition);
  // }
  registerDrawingMode(newDrawingMode: drawingMode): void {
    if (newDrawingMode.indexes[this.name] != undefined) {
      return;
    }
    newDrawingMode.indexes[this.name] = this.drawingModes.length;
    this.drawingModes.push(newDrawingMode);
  }
}
