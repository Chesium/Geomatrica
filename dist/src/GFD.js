"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GFD = void 0;
const util_js_1 = require("./util.js");
const style_js_1 = require("./style.js");
class GFD {
    constructor(type, data, obj) {
        // graphics/geometry for displaying
        this.type = type;
        this.data = data; //会变更
        this.obj = obj;
        // this.style = Dfsty[0];
        this.styleMode = 0;
        this.Graphic = new PIXI.Graphics();
        this.hidden = false;
        this.removed = false;
        this.Graphic.zIndex = obj.canvas.zIofT[this.type];
        obj.canvas.stage.addChild(this.Graphic);
        this.update();
    }
    update() {
        this.Graphic.clear();
        if (this.hidden || !this.data.exist) {
            return;
        }
        switch (this.type) {
            case 0: //point
                //draw point margin (which doesn't have outline)
                this.Graphic.beginFill(style_js_1.Dfsty[this.styleMode].p.margin.color, style_js_1.Dfsty[this.styleMode].p.margin.alpha);
                this.Graphic.drawCircle(...this.obj.canvas.tran(this.data), style_js_1.Dfsty[this.styleMode].p.margin.radius);
                //draw point body
                this.Graphic.beginFill(style_js_1.Dfsty[this.styleMode].p.color, style_js_1.Dfsty[this.styleMode].p.alpha);
                this.Graphic.lineStyle(style_js_1.Dfsty[this.styleMode].p.ol);
                this.Graphic.drawCircle(...this.obj.canvas.tran(this.data), style_js_1.Dfsty[this.styleMode].p.radius);
                break;
            case 1: //line
                var crd = util_js_1.L_DpData_To_epCrd(this.data, [
                    this.obj.canvas.revTran(this.obj.canvas.stageBound[0]),
                    this.obj.canvas.revTran(this.obj.canvas.stageBound[1])
                ]);
                if (!crd[0]) {
                    return;
                }
                //draw line margin
                this.Graphic.lineStyle(style_js_1.Dfsty[this.styleMode].l.margin);
                this.Graphic.moveTo(...this.obj.canvas.tran(crd[1]));
                this.Graphic.lineTo(...this.obj.canvas.tran(crd[2]));
                //draw line body
                this.Graphic.lineStyle(style_js_1.Dfsty[this.styleMode].l.body);
                this.Graphic.moveTo(...this.obj.canvas.tran(crd[1]));
                this.Graphic.lineTo(...this.obj.canvas.tran(crd[2]));
                break;
            case 2: //circle
                //draw circle margin
                this.Graphic.lineStyle(style_js_1.Dfsty[this.styleMode].l.margin);
                this.Graphic.drawCircle(...this.obj.canvas.tran(this.data), this.data.r * this.obj.canvas.tr[0]);
                //draw circle body
                this.Graphic.lineStyle(style_js_1.Dfsty[this.styleMode].l.body);
                this.Graphic.drawCircle(...this.obj.canvas.tran(this.data), this.data.r * this.obj.canvas.tr[0]);
                break;
            default:
                break;
        }
    }
    changeStyleMode(newMode) {
        this.styleMode = newMode;
        this.update();
    }
    remove() {
        this.obj.canvas.stage.removeChild(this.Graphic);
        this.Graphic.destroy();
        this.removed = true;
    }
}
exports.GFD = GFD;
//# sourceMappingURL=GFD.js.map