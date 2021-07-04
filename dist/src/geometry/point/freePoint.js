"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const geometryBase_js_1 = require("../geometryBase.js");
class freePoint extends geometryBase_js_1.default {
    constructor(dfn, initData, obj) {
        super(0, 0, dfn, initData, obj);
    }
    init(initData) {
        this.seqI = 0;
        this.data.exist = true;
        this.data.x = initData.pos.x;
        this.data.y = initData.pos.y;
    }
    //对于自由点，无额外calcData()方法
    //对于点，无额外beginDraw()方法
    beginDrag(pos) {
        this.beginMove(pos);
    }
    beginMove(pos) {
        // console.log("beginMove:",this.obj.index);
        this.focusOnIt();
        this.dragOffset = {
            x: this.data.x - pos.x,
            y: this.data.y - pos.y,
        };
    }
    updDrag(pos) {
        this.updMove(pos);
    }
    updMove(pos) {
        // console.log(`freePoint.updMove([${pos.x},${pos.y}])`);
        // console.log(this.dragOffset);
        // console.log(`freePoint.move no.${this.obj.index}`);
        this.data.x = pos.x + this.dragOffset.x;
        this.data.y = pos.y + this.dragOffset.y;
        this.obj.update();
    }
    //对于点，无额外preDefine()方法
    generateRefCrd() {
        return this.data;
    }
}
exports.default = freePoint;
//# sourceMappingURL=freePoint.js.map