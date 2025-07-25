import circle from "../circle";
import point from "../point";

export default abstract class twoPointsCircle extends circle {
  Point1!: point;
  Point2!: point;
  init_L3(p1: point, p2: point): void {
    this.Point1 = p1;
    this.Point2 = p2;
    p1.children.push(this);
    p2.children.push(this);
    p2.onObjs.push(this);
    this.parents = [this.Point1, this.Point2];
    this.drawableObj = this.Point2;
  }
}