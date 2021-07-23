import point from "../point";
import { crd } from "../../misc";

export default abstract class pointOnShape extends point {
  following: boolean; //是否跟随鼠标

  //对象上的点属于半约束点

  //拖动和移动 不同
  //拖动为使其在某对象"上"运动
  beginDrag(crd: crd) {
    this.focusOnIt();
  }
  updDrag(crd: crd) {
    //从鼠标位置出发找最近符和的位置
    this.x = crd.x;
    this.y = crd.y;
    this.following = true;
    this.update(); //内含calc()
    this.following = false;
  }
}
