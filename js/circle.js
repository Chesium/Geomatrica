function circleInit(obj, init) {
    obj.Graphic.zIndex = 50;
    obj.margin.zIndex = 5;
    obj.clickArea.zIndex = 500;
    switch (obj.subType) {
        case 0://empty
            break;

        case 1://圆心和圆上一点
            obj.cache._x1 = obj.dfn.p[0].data.x;
            obj.cache._y1 = obj.dfn.p[0].data.y;
            obj.cache._x2 = obj.dfn.p[1].data.x;
            obj.cache._y2 = obj.dfn.p[1].data.y;
            obj.dfn.p[0].children.push(obj);
            obj.dfn.p[1].children.push(obj);
            obj.parents = [obj.dfn.p[0], obj.dfn.p[1]];
            obj.draggable = true
            
            obj.updateBitmap = function () {
                // console.log("updateBitmap:", this.index);
                let px = mainCanvasApp.renderer.plugins.extract.pixels(this.clickArea);
                let tran = Array.from({ length: px.length / 4 }, (_, i) => px[4 * i + 3] + px[4 * i + 2] + px[4 * i + 1] + px[4 * i]);
                let width = Math.floor(this.clickArea.width);
                this.bitmap = Array.from({ length: Math.floor(this.clickArea.height) }, (_, i) => tran.slice(i * width, (i + 1) * width));
                obj.cache._x1 = obj.dfn.p[0].data.x;
                obj.cache._y1 = obj.dfn.p[0].data.y;
                obj.cache._x2 = obj.dfn.p[1].data.x;
                obj.cache._y2 = obj.dfn.p[1].data.y;
            }

            obj.calcData = function () {
                let x1 = this.dfn.p[0].data.x,
                    y1 = this.dfn.p[0].data.y,
                    x2 = this.dfn.p[1].data.x,
                    y2 = this.dfn.p[1].data.y;
                this.data={
                    x: x1,
                    y: y1,
                    r: Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2))
                };
            }

            obj.update = function () {
                this.calcData();
                let x1 = this.dfn.p[0].data.x,
                    y1 = this.dfn.p[0].data.y,
                    x2 = this.dfn.p[1].data.x,
                    y2 = this.dfn.p[1].data.y;
                this.Graphic.clear();
                this.clickArea.clear();
                this.margin.clear();
                if (!this.empty) {
                    this.Graphic.lineStyle(this.style.line);
                    this.clickArea.lineStyle(this.style.clickAreaLine);
                    this.margin.lineStyle(this.style.lineMargin);
                    this.boundChanged = true;
                    this.bitmapChanged = true;
                    this.Graphic.drawCircle(this.data.x, this.data.y, this.data.r);
                    this.clickArea.drawCircle(this.data.x, this.data.y, this.data.r);
                    this.margin.drawCircle(this.data.x, this.data.y, this.data.r);
                    if (x1 - this.cache._x1 == x2 - this.cache._x2 &&
                        y1 - this.cache._y1 == y2 - this.cache._y2) {
                        this.bitmapChanged = false;
                    }
                }
                for (let i in this.children) {
                    this.children[i].update();
                }
            }

            obj.beginDraw = function (pos) {
                this.dfn.p[1].beginDrag(pos);
                // console.log(`set init:[${this.dfn.p[1].index}]`);
                this.dfn.p[1].initializing = true;
            }

            obj.beginDrag = function (pos) {
                obj.beginMove(pos);
            }

            obj.beginMove = function (pos) {
                this.dfn.p[0].beginMove(pos);
                this.dfn.p[1].beginMove(pos);
                F = this.index;
                moving = true;
            }

            obj.updateDrag = function (pos) {
                obj.updateMove(pos);
            }

            obj.updateMove = function (pos) {
                this.dfn.p[0].updateMove(pos);
                this.dfn.p[1].updateMove(pos);
            }
            obj.update();
            obj.updateBound();
            break;

        default:
            break;
    }
}