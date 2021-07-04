"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class geometry {
    constructor(type, dfnType, dfn, initData, obj) {
        this.obj = obj;
        this.define(type, dfnType, dfn, initData);
    }
    init(initData) {
        this.calcData();
        if (this.cache.following === true) {
            this.cache.following = false;
        }
    }
    define(type, dfnType, dfn, initData) {
        this.type = type;
        this.dfnType = dfnType;
        this.dfn = Object.assign({}, dfn);
        this.data = { exist: false };
        this.cache = {};
        this.parents = [];
        if (this.children == undefined) {
            this.children = [];
        }
        this.seqI = 0;
        this.initializing = false;
        this.init(initData);
    }
    calcData() { }
    beginDraw(pos) { }
    beginDrag(pos) { }
    beginMove(pos) { }
    updDrag(pos) { }
    updMove(pos) { }
    preDefine() { }
    generateRefCrd() {
        if (!this.data.exist) {
            return { x: undefined, y: undefined };
        }
    }
    focusOnIt() {
        this.obj.canvas.F = this.obj.index;
        this.obj.canvas.Status = 1;
        // console.log("focus on ", this.obj.index);
    }
    checkHiddenParents() {
        for (var i in this.parents) {
            if (!this.parents[i].data.exist) {
                this.data.exist = false;
                return true;
            }
        }
        return false;
    }
}
exports.default = geometry;
//# sourceMappingURL=geometryBase.js.map