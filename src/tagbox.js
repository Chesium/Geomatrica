export class tagbox {
  constructor(refCrd, content, obj) {
    //引用传参 显示数据
    this.crd = refCrd;
    this.offset = {x:5, y:-25};
    this.content = content;
    this.obj = obj;

    this.element = document.createElement("div");
    this.element.style.position = "absolute";
    this.element.style.height = "20px";
    this.element.style.width = "20px";
    this.element.style.backgroundColor = "transparent";
    this.element.classList.add("graphic-tag");
    obj.canvas.PIXIapp.resizeTo.appendChild(this.element);

    this.update();
    this.updateContent();
  }

  update() {
    var crd=this.obj.canvas.tran(this.crd,true);
    // console.log("trancrd:",crd);
    this.element.style.left =
      crd.x +
      this.offset.x +
      "px";
    this.element.style.top =
      crd.y +
      this.offset.y +
      "px";
    // console.log(this.element.style.left, this.element.style.top);
  }

  updateContent(){
    katex.render(this.content,this.element,{});
  }

  remove(){
    this.element.remove();
  }
}