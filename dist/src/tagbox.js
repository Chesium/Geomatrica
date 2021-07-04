"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tagbox = void 0;
class tagbox {
    constructor(refCrd, content, obj) {
        //引用传参 显示数据
        this.crd = refCrd;
        this.offset = { x: 5, y: -25 };
        this.content = content;
        this.obj = obj;
        this.element = document.createElement("div");
        this.element.style.position = "absolute";
        this.element.classList.add("graphic-tagbox");
        obj.canvas.PIXIapp.resizeTo.appendChild(this.element);
        this.update();
        this.updateContent();
        this.element.children[0].classList.add("graphic-tag");
        this.element.children[0].onmousedown = (ev) => {
            // console.log("tag-onmousedown", this.obj.canvas.mode);
            this.element.children[0].setAttribute("dragging", "");
            if (this.obj.canvas.mode != 0) {
                return;
            }
            this.obj.canvas.Status = 3;
            this.obj.canvas.F = this.obj.index;
            this.dragPos = [ev.clientX, ev.clientY];
            this.dragBeginOffset = { x: this.offset.x, y: this.offset.y };
        };
        this.element.children[0].onmouseup = () => {
            this.element.children[0].removeAttribute("dragging");
            this.obj.canvas.Status = 0;
        };
    }
    update() {
        var crd = this.obj.canvas.tran(this.crd, true);
        // console.log("trancrd:",crd);
        this.element.style.left = crd.x + this.offset.x + "px";
        this.element.style.top = crd.y + this.offset.y + "px";
        // console.log(this.element.style.left, this.element.style.top);
    }
    updateContent() {
        katex.render(this.content, this.element, {});
        // console.log(this.element);
    }
    remove() {
        this.element.remove();
    }
}
exports.tagbox = tagbox;
//# sourceMappingURL=tagbox.js.map