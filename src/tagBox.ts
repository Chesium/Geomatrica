import obj from "./object";
import { pos, crd } from "./misc";
import { render } from "katex";

export default class tagBox {
  crd: crd; //标签参照坐标
  offset: pos = { x: 5, y: -25 }; //将crd转为pos再加上此偏移向量即为标签坐标
  content: string; //内容 用于Katex渲染
  obj: obj; //该标签属于的对象
  element: HTMLElement; //该标签对应的HTML元素
  dragging: boolean = false;
  dragPos: pos | undefined; //拖动开始时的鼠标位置
  dragBeginOffset: pos | undefined; //拖动开始时的offset
  constructor(tagCrd: crd, content: string, obj: obj) {
    //初始化
    this.crd = tagCrd;
    this.obj = obj;
    this.content = content;
    this.element = document.createElement("div");
    this.element.style.position = "absolute";
    this.element.classList.add("graphic-tagbox");
    if (obj.canvas.PIXIapp.resizeTo instanceof HTMLElement) {
      obj.canvas.PIXIapp.resizeTo.appendChild(this.element);
    }
    //初始更新
    this.update();
    this.updateContent();
    this.element.children[0].classList.add("graphic-tag");
    this.element.children[0].addEventListener("mousedown", (ev: Event) => {
      //只有处于移动模式时采才可拖动标签
      console.log("tagbox:click");
      if (this.obj.canvas.Mode.drawingModes[this.obj.canvas.drawingModeI].name == "move objects") {
        this.element.children[0].setAttribute("dragging", "");
        this.dragging = true;
        this.obj.canvas.Status = 3; //"3"标识该画板中正在拖动一个标签
        this.obj.canvas.F = this.obj.index;
        this.dragPos = { x: (ev as MouseEvent).pageX, y: (ev as MouseEvent).pageY };
        // console.log("tagbox beginDrag dragpos:", this.dragPos);
        this.dragBeginOffset = { x: this.offset.x, y: this.offset.y };
      }
    });
    this.obj.canvas.PIXIapp.resizeTo.addEventListener("mousemove", (ev: Event) => {
      if (this.obj.canvas.Status == 3 && this.dragging) {
        // console.log("tagbox updDrag origin this:", this);
        this.offset.x = (ev as MouseEvent).pageX - this.dragPos!.x + this.dragBeginOffset!.x;
        this.offset.y = (ev as MouseEvent).pageY - this.dragPos!.y + this.dragBeginOffset!.y;
        this.update();
      }
    });
    this.obj.canvas.PIXIapp.resizeTo.addEventListener("mouseup", () => {
      console.log("tagbox: mouseUP status:", this.obj.canvas.Status);
      //结束拖动
      if (this.obj.canvas.Status == 3 && this.dragging) {
        this.element.children[0].removeAttribute("dragging");
        this.dragging = false;
        this.obj.canvas.Status = 0;
      }
    });
  }
  update(): void {
    const tx = 80;
    const ty = 30;
    //对象 不存在 已移除 不显示(被隐藏) 则不显示标签
    if (!this.obj.exist || this.obj.removed || !this.obj.shown) {
      this.element.style.visibility = "hidden";
    } else {
      this.element.style.visibility = "visible";
    }
    const pos = this.obj.canvas.toPos(this.crd);
    this.element.style.left = pos.x + this.offset.x + tx + "px";
    this.element.style.top = pos.y + this.offset.y + ty + "px";
  }
  updateContent(): void {
    //用Katex渲染
    render(this.content, this.element, {});
  }
  remove(): void {
    this.element.remove();
  }
}
