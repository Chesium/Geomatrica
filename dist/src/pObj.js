"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pObj = void 0;
const Geometry_js_1 = require("./geometry/Geometry.js");
const IAA_js_1 = require("./IAA.js");
const obj_js_1 = require("./obj.js");
class pObj {
    constructor(canvas, type, dfnType, dfn, initData) {
        // interactive areas
        this.canvas = canvas;
        this.index = canvas.pO.length;
        canvas.pO.push(this);
        this.geometry = Geometry_js_1.default(type, dfnType, dfn, initData, this);
        this.IAA = new IAA_js_1.IAA(type, this.geometry.data, this);
        this.removed = false;
        canvas.IAseq[0][type == 0 ? 0 : 1].push(this.IAA);
    }
    update() {
        this.geometry.calcData();
        this.IAA.update();
    }
    remove() {
        this.IAA.remove();
        this.removed = true;
    }
    toObj() {
        var i = new obj_js_1.obj(this.canvas, this.geometry.type, this.geometry.dfnType, this.geometry.dfn, {}).index;
        this.remove();
        return i;
    }
}
exports.pObj = pObj;
//# sourceMappingURL=pObj.js.map