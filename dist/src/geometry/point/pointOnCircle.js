"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const geometryBase_js_1 = require("../geometryBase.js");
class pointOnCircle extends geometryBase_js_1.default {
    constructor(dfn, initData, obj) {
        super(0, 2, dfn, initData, obj);
    }
    init(initData) {
        this.seqI = 0;
        this.dfn.c.children.push(this);
        this.parents = [this.dfn.c];
        //init cache
        this.cache.cosine = 0; //ΔX
        this.cache.sine = 0; //ΔY
        this.cache.following = true; //是否跟随鼠标
        //Actually not real
        this.data.x = initData.pos.x;
        this.data.y = initData.pos.y;
        this.calcData();
        this.cache.following = false;
    }
    calcData() {
        if (this.checkHiddenParents()) {
            return;
        }
        var x0 = this.dfn.c.data.x, y0 = this.dfn.c.data.y, r = this.dfn.c.data.r;
        if (this.cache.following) {
            var x1 = this.data.x, y1 = this.data.y;
            var xdif = x1 - x0, ydif = y1 - y0;
            var d = Math.sqrt(xdif * xdif + ydif * ydif);
            this.cache.cosine = xdif / d;
            this.cache.sine = ydif / d;
        }
        this.data.exist = true;
        this.data.x = x0 + r * this.cache.cosine;
        this.data.y = y0 + r * this.cache.sine;
    }
    //对于点，无额外beginDraw()方法
    beginDrag(pos) {
        this.focusOnIt();
    }
    beginMove(pos) {
        this.dfn.c.beginDrag(pos);
    }
    updDrag(pos) {
        this.data.x = pos.x;
        this.data.y = pos.y;
        this.cache.following = true;
        this.obj.update();
        this.cache.following = false;
    }
    updMove(pos) {
        this.dfn.c.updMove(pos);
    }
    //对于点，无额外preDefine()方法
    generateRefCrd() {
        return this.data;
    }
}
exports.default = pointOnCircle;
//# sourceMappingURL=pointOnCircle.js.map