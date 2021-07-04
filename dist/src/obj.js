"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obj = void 0;
const Geometry_js_1 = require("./geometry/Geometry.js");
const GFD_js_1 = require("./GFD.js");
const IAA_js_1 = require("./IAA.js");
const util_js_1 = require("./util.js");
const tagbox_js_1 = require("./tagbox.js");
class obj {
    constructor(canvas, type, dfnType, dfn, initData) {
        // interactive areas
        this.canvas = canvas;
        this.index = canvas.O.length;
        canvas.O.push(this);
        this.geometry = Geometry_js_1.default(type, dfnType, dfn, initData, this);
        this.IAA = new IAA_js_1.IAA(type, this.geometry.data, this);
        this.GFD = new GFD_js_1.GFD(type, this.geometry.data, this);
        this.removed = false;
        this.pObjs = [];
        canvas.IAseq[1][type == 0 ? 0 : 1].push(this.IAA);
        if (type == 0 && dfnType == 0) {
            //自由点
            this.canvas.rootObjs.push(this);
        }
        this.name = util_js_1.generateName(type, canvas.nextNameI[type]);
        canvas.nextNameI[type]++;
        // console.log(this.name);
        canvas.names.push(this.name);
        this.refCrd = this.geometry.generateRefCrd();
        this.tag = new tagbox_js_1.tagbox(this.refCrd, this.name, this);
        this.geometry.preDefine();
        // console.log(this);
    }
    update() {
        this.geometry.calcData();
        this.GFD.update();
        this.IAA.update();
        var refCrd_t = this.geometry.generateRefCrd();
        this.refCrd.x = refCrd_t.x;
        this.refCrd.y = refCrd_t.y;
        // console.log(this.index,this.refCrd,this.tag.crd);
        this.tag.update();
        for (var i in this.geometry.children) {
            this.geometry.children[i].obj.update();
        }
        for (var i in this.pObjs) {
            if (!this.pObjs[i].removed) {
                this.pObjs[i].update();
            }
        }
    }
    remove() {
        this.canvas.F = -1;
        this.canvas.Status = 0;
        this.IAA.remove();
        this.GFD.remove();
        this.tag.remove();
        this.removed = true;
        for (var i in this.geometry.children) {
            this.geometry.children[i].obj.remove();
        }
    }
}
exports.obj = obj;
//# sourceMappingURL=obj.js.map