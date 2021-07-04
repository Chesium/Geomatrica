"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const geometryBase_js_1 = require("../geometryBase.js");
const util_js_1 = require("../../util.js");
const pObj_js_1 = require("../../pObj.js");
class line extends geometryBase_js_1.default {
    constructor(dfn, initData, obj) {
        super(1, 1, dfn, initData, obj);
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
        if (x1 == x2) {
            if (y1 == y2) {
                this.data.exist = false;
            }
            else {
                this.data.exist = true;
                this.data.a = 0;
                this.data.b = x1;
                this.data.c = 1;
                this.data.d = 0;
                this.data.r = [-Infinity, Infinity];
                this.cache.p = [y1, y2];
                if (y1 < y2) {
                    this.data.dr = 1;
                }
                else {
                    this.data.dr = -1;
                }
            }
        }
        else {
            this.data.exist = true;
            this.data.a = 1;
            this.data.b = 0;
            this.data.c = (y1 - y2) / (x1 - x2);
            this.data.r = [-Infinity, Infinity];
            this.data.d = y1 - this.data.c * x1;
            this.cache.p = [x1, x2];
            if (x1 < x2) {
                this.data.dr = 1;
            }
            else {
                this.data.dr = -1;
            }
        }
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
                    if (util_js_1.haveEqualIndex(this.parents, this.obj.canvas.O[i].geometry.parents)) {
                        continue;
                    }
                    this.obj.pObjs.push(new pObj_js_1.pObj(this.obj.canvas, 0, 3, { l: [this, this.obj.canvas.O[i].geometry] }, {}));
                    break;
                case 2:
                    this.obj.pObjs.push(new pObj_js_1.pObj(this.obj.canvas, 0, 6, { l: this, c: this.obj.canvas.O[i].geometry }, {}));
                    this.obj.pObjs.push(new pObj_js_1.pObj(this.obj.canvas, 0, 7, { l: this, c: this.obj.canvas.O[i].geometry }, {}));
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
        var t = (this.cache.p[0] + this.cache.p[1]) / 2;
        return {
            x: this.data.a * t + this.data.b,
            y: this.data.c * t + this.data.d,
        };
    }
}
exports.default = line;
//# sourceMappingURL=line.js.map