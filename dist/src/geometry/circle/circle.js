"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const geometryBase_js_1 = require("../geometryBase.js");
const pObj_js_1 = require("../../pObj.js");
class circle extends geometryBase_js_1.default {
    constructor(dfn, initData, obj) {
        super(2, 0, dfn, initData, obj);
    }
    init(initData) {
        this.seqI = 1;
        this.dfn.p[0].children.push(this);
        this.dfn.p[1].children.push(this);
        this.parents = [this.dfn.p[0], this.dfn.p[1]];
    }
    calcData() {
        if (this.checkHiddenParents()) {
            return;
        }
        var x1 = this.dfn.p[0].data.x, y1 = this.dfn.p[0].data.y, x2 = this.dfn.p[1].data.x, y2 = this.dfn.p[1].data.y;
        this.data.exist = true;
        this.data.x = x1;
        this.data.y = y1;
        this.data.r = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
    }
    beginDraw(pos) {
        this.dfn.p[1].beginDrag(pos);
        this.dfn.p[1].initializing = true;
    }
    beginDrag(pos) {
        this.beginMove(pos);
        this.focusOnIt();
    }
    beginMove(pos) {
        // console.log("object");
        this.dfn.p[0].beginMove(pos);
        this.dfn.p[1].beginMove(pos);
    }
    updDrag(pos) {
        this.updMove(pos);
    }
    updMove(pos) {
        // console.log("geometry updMove 1.0/1/2");
        this.dfn.p[0].updMove(pos);
        this.dfn.p[1].updMove(pos);
    }
    preDefine() {
        for (var i in this.obj.canvas.O) {
            if (this.obj.canvas.O[i].removed || this.obj.canvas.O[i].index == this.obj.index) {
                continue;
            }
            switch (this.obj.canvas.O[i].geometry.type) {
                case 0:
                    //Nothing to do
                    break;
                case 1:
                    this.obj.pObjs.push(new pObj_js_1.pObj(this.obj.canvas, 0, 6, { l: this.obj.canvas.O[i].geometry, c: this }, {}));
                    this.obj.pObjs.push(new pObj_js_1.pObj(this.obj.canvas, 0, 7, { l: this.obj.canvas.O[i].geometry, c: this }, {}));
                    break;
                case 2:
                    this.obj.pObjs.push(new pObj_js_1.pObj(this.obj.canvas, 0, 4, { c: [this, this.obj.canvas.O[i].geometry] }, {}));
                    this.obj.pObjs.push(new pObj_js_1.pObj(this.obj.canvas, 0, 5, { c: [this, this.obj.canvas.O[i].geometry] }, {}));
                    break;
                default:
                    break;
            }
        }
    }
    generateRefCrd() {
        if (!this.data.exist) {
            return { x: undefined, y: undefined };
        }
        return {
            x: this.data.x + this.data.r / 1.4142135623730951,
            y: this.data.y + this.data.r / 1.4142135623730951,
        };
    }
}
exports.default = circle;
//# sourceMappingURL=circle.js.map