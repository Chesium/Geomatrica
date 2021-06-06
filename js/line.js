function lineInit(obj, init) {
    obj.margin.zIndex = 5;
    obj.Graphic.zIndex = 50;
    obj.clickArea.zIndex = 500;
    switch (obj.subType) {
        case 0://empty
            break;

        case 1://segment [free] points dfn:{p[0]:_,p[1]:_}
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
                // console.log(px);
                let tran = Array.from({ length: px.length / 4 }, (_, i) => px[4 * i + 3] + px[4 * i + 2] + px[4 * i + 1] + px[4 * i]);
                let width = Math.floor(this.clickArea.width);
                this.bitmap = Array.from({ length: Math.floor(this.clickArea.height) }, (_, i) => tran.slice(i * width, (i + 1) * width));
                obj.cache._x1 = obj.dfn.p[0].data.x;
                obj.cache._y1 = obj.dfn.p[0].data.y;
                obj.cache._x2 = obj.dfn.p[1].data.x;
                obj.cache._y2 = obj.dfn.p[1].data.y;
            }

            obj.calcData = function () {
                this.empty = false;
                let x1 = this.dfn.p[0].data.x,
                    y1 = this.dfn.p[0].data.y,
                    x2 = this.dfn.p[1].data.x,
                    y2 = this.dfn.p[1].data.y;
                if (x1 == x2) {
                    if (y1 == y2) {
                        this.empty = true;
                    } else {
                        this.data = {
                            a: 0, b: x1,
                            c: 1, d: 0,
                            r: [y1, y2]
                        };
                        if (y1 < y2) {
                            this.cache.p = [this.dfn.p[0], this.dfn.p[1]];
                        } else {
                            this.cache.p = [this.dfn.p[1], this.dfn.p[0]];
                        }
                    }
                } else {
                    this.data = {
                        a: 1, b: 0,
                        c: (y1 - y2) / (x1 - x2), d: NaN,
                        r: [x1, x2]
                    };
                    this.data.d = y1 - this.data.c * x1;
                    if (x1 < x2) {
                        this.cache.p = [this.dfn.p[0], this.dfn.p[1]];
                    } else {
                        this.cache.p = [this.dfn.p[1], this.dfn.p[0]];
                    }
                }
            }

            obj.update = function () {
                this.calcData();
                let x1 = this.dfn.p[0].data.x,
                    y1 = this.dfn.p[0].data.y,
                    x2 = this.dfn.p[1].data.x,
                    y2 = this.dfn.p[1].data.y;
                this.Graphic.clear();
                this.margin.clear();
                this.clickArea.clear();
                if (!this.empty) {
                    this.Graphic.lineStyle(this.style.line);
                    this.Graphic.moveTo(x1, y1);
                    this.Graphic.lineTo(x2, y2);
                    this.clickArea.lineStyle(this.style.clickAreaLine);
                    this.clickArea.moveTo(x1, y1);
                    this.clickArea.lineTo(x2, y2);
                    this.margin.lineStyle(this.style.lineMargin);
                    this.margin.moveTo(x1, y1);
                    this.margin.lineTo(x2, y2);
                    this.boundChanged = true;
                    this.bitmapChanged = true;
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

        case 2://两点连线所在直线
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
                this.empty = false;
                let x1 = this.dfn.p[0].data.x,
                    y1 = this.dfn.p[0].data.y,
                    x2 = this.dfn.p[1].data.x,
                    y2 = this.dfn.p[1].data.y;
                if (x1 == x2) {
                    if (y1 == y2) {
                        this.empty = true;
                    } else {
                        this.data = {
                            a: 0, b: x1,
                            c: 1, d: 0,
                            r: [-Infinity, Infinity]
                        };
                        if (y1 < y2) {
                            this.cache.p = [this.dfn.p[0], this.dfn.p[1]];
                        } else {
                            this.cache.p = [this.dfn.p[1], this.dfn.p[0]];
                        }
                    }
                } else {
                    this.data = {
                        a: 1, b: 0,
                        c: (y1 - y2) / (x1 - x2), d: NaN,
                        r: [-Infinity, Infinity]
                    };
                    this.data.d = y1 - this.data.c * x1;
                    if (x1 < x2) {
                        this.cache.p = [this.dfn.p[0], this.dfn.p[1]];
                    } else {
                        this.cache.p = [this.dfn.p[1], this.dfn.p[0]];
                    }
                }
            }

            obj.update = function () {
                this.calcData();

                var a = this.data.a,
                    b = this.data.b,
                    c = this.data.c,
                    d = this.data.d;

                var x1, x2, y1, y2;

                this.margin.clear();
                this.Graphic.clear()
                this.clickArea.clear();
                if (!this.empty) {

                    if (a == 0) {//竖线
                        x1 = b;
                        y1 = stageBound[0][1];
                        x2 = b;
                        y2 = stageBound[1][1];
                    } else if (c == 0) {//横线 不存在ac均为零的情况
                        x1 = stageBound[0][0];
                        y1 = d;
                        x2 = stageBound[1][0];
                        y2 = d;
                    } else {//斜线
                        let t0 = (stageBound[0][1] - d) / c,
                            t1 = (stageBound[1][1] - d) / c;

                        let t0x = a * t0 + b,
                            t1x = a * t1 + b;

                        if (Math.min(t0x, t1x) < stageBound[0][0]) {
                            let t = (stageBound[0][0] - b) / a;
                            x1 = stageBound[0][0];
                            y1 = c * t + d;
                        } else {
                            x1 = Math.min(t0x, t1x);
                            y1 = stageBound[t0x < t1x ? 0 : 1][1];
                        }

                        if (Math.max(t0x, t1x) > stageBound[1][0]) {
                            let t = (stageBound[1][0] - b) / a;
                            x2 = stageBound[1][0];
                            y2 = c * t + d;
                        } else {
                            x2 = Math.max(t0x, t1x);
                            y2 = stageBound[t0x > t1x ? 0 : 1][1];
                        }
                    }

                    this.Graphic.lineStyle(this.style.line)
                    this.Graphic.moveTo(x1, y1)
                    this.Graphic.lineTo(x2, y2)
                    this.clickArea.lineStyle(this.style.clickAreaLine);
                    this.clickArea.moveTo(x1, y1);
                    this.clickArea.lineTo(x2, y2);
                    this.margin.lineStyle(this.style.lineMargin);
                    this.margin.moveTo(x1, y1);
                    this.margin.lineTo(x2, y2);
                    this.boundChanged = true
                    this.bitmapChanged = true
                    if (x1 - this.cache._x1 == x2 - this.cache._x2 &&
                        y1 - this.cache._y1 == y2 - this.cache._y2) {
                        this.bitmapChanged = false
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

        case 3://射线
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
                this.empty = false;
                let x1 = this.dfn.p[0].data.x,
                    y1 = this.dfn.p[0].data.y,
                    x2 = this.dfn.p[1].data.x,
                    y2 = this.dfn.p[1].data.y;
                if (x1 == x2) {
                    if (y1 == y2) {
                        this.empty = true;
                    } else {
                        this.data = {
                            a: 0, b: x1,
                            c: 1, d: 0
                        };
                        if (y1 < y2) {
                            this.data.r = [y1, Infinity];
                            this.cache.p = [this.dfn.p[0], this.dfn.p[1]];
                        } else {
                            this.data.r = [-Infinity, y1];
                            this.cache.p = [this.dfn.p[1], this.dfn.p[0]];
                        }
                    }
                } else {
                    this.data = {
                        a: 1, b: 0,
                        c: (y1 - y2) / (x1 - x2)
                    };
                    this.data.d = y1 - this.data.c * x1;
                    if (x1 < x2) {
                        this.data.r = [x1, Infinity];
                        this.cache.p = [this.dfn.p[0], this.dfn.p[1]];
                    } else {
                        this.data.r = [-Infinity, x1];
                        this.cache.p = [this.dfn.p[1], this.dfn.p[0]];
                    }
                }
            }

            obj.update = function () {
                this.calcData();

                var a = this.data.a,
                    b = this.data.b,
                    c = this.data.c,
                    d = this.data.d,
                    r = this.data.r;

                var x1 = this.dfn.p[0].data.x,
                    y1 = this.dfn.p[0].data.y,
                    x2, y2;

                this.margin.clear();
                this.Graphic.clear()
                this.clickArea.clear();
                if (!this.empty) {

                    if (a == 0) {//竖线
                        x2 = b;
                        y2 = stageBound[1][1];
                    } else if (c == 0) {//横线 不存在ac均为零的情况
                        x2 = stageBound[1][0];
                        y2 = d;
                    } else {//斜线
                        let _t = [
                            (stageBound[0][1] - d) / c,
                            (stageBound[1][1] - d) / c
                        ];
                        var ti = _t[0] < r[0] || _t[0] > r[1] ? 1 : 0;
                        let _tx = a * _t[ti] + b;
                        if (_tx < stageBound[0][0]) {
                            let t = (stageBound[0][0] - b) / a;
                            x2 = stageBound[0][0];
                            y2 = c * t + d;
                        } else if (_tx > stageBound[1][0]) {
                            let t = (stageBound[1][0] - b) / a;
                            x2 = stageBound[1][0];
                            y2 = c * t + d;
                        } else {
                            x2 = _tx;
                            y2 = stageBound[ti][1];
                        }
                    }

                    this.Graphic.lineStyle(this.style.line)
                    this.Graphic.moveTo(x1, y1)
                    this.Graphic.lineTo(x2, y2)
                    this.clickArea.lineStyle(this.style.clickAreaLine);
                    this.clickArea.moveTo(x1, y1);
                    this.clickArea.lineTo(x2, y2);
                    this.margin.lineStyle(this.style.lineMargin);
                    this.margin.moveTo(x1, y1);
                    this.margin.lineTo(x2, y2);
                    this.boundChanged = true
                    this.bitmapChanged = true
                    if (x1 - this.cache._x1 == x2 - this.cache._x2 &&
                        y1 - this.cache._y1 == y2 - this.cache._y2) {
                        this.bitmapChanged = false
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

        case 3://射线
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
                this.empty = false;
                let x1 = this.dfn.p[0].data.x,
                    y1 = this.dfn.p[0].data.y,
                    x2 = this.dfn.p[1].data.x,
                    y2 = this.dfn.p[1].data.y;
                if (x1 == x2) {
                    if (y1 == y2) {
                        this.empty = true;
                    } else {
                        this.data = {
                            a: 0, b: x1,
                            c: 1, d: 0
                        };
                        if (y1 < y2) {
                            this.data.r = [y1, Infinity];
                            this.cache.p = [this.dfn.p[0], this.dfn.p[1]];
                        } else {
                            this.data.r = [-Infinity, y1];
                            this.cache.p = [this.dfn.p[1], this.dfn.p[0]];
                        }
                    }
                } else {
                    this.data = {
                        a: 1, b: 0,
                        c: (y1 - y2) / (x1 - x2)
                    };
                    this.data.d = y1 - this.data.c * x1;
                    if (x1 < x2) {
                        this.data.r = [x1, Infinity];
                        this.cache.p = [this.dfn.p[0], this.dfn.p[1]];
                    } else {
                        this.data.r = [-Infinity, x1];
                        this.cache.p = [this.dfn.p[1], this.dfn.p[0]];
                    }
                }
            }

            obj.update = function () {
                this.calcData();

                var a = this.data.a,
                    b = this.data.b,
                    c = this.data.c,
                    d = this.data.d,
                    r = this.data.r;

                var x1 = this.dfn.p[0].data.x,
                    y1 = this.dfn.p[0].data.y,
                    x2, y2;

                this.Graphic.clear()
                this.margin.clear();
                this.clickArea.clear();
                if (!this.empty) {

                    if (a == 0) {//竖线
                        x2 = b;
                        y2 = stageBound[1][1];
                    } else if (c == 0) {//横线 不存在ac均为零的情况
                        x2 = stageBound[1][0];
                        y2 = d;
                    } else {//斜线
                        let _t = [
                            (stageBound[0][1] - d) / c,
                            (stageBound[1][1] - d) / c
                        ];
                        var ti = _t[0] < r[0] || _t[0] > r[1] ? 1 : 0;
                        let _tx = a * _t[ti] + b;
                        if (_tx < stageBound[0][0]) {
                            let t = (stageBound[0][0] - b) / a;
                            x2 = stageBound[0][0];
                            y2 = c * t + d;
                        } else if (_tx > stageBound[1][0]) {
                            let t = (stageBound[1][0] - b) / a;
                            x2 = stageBound[1][0];
                            y2 = c * t + d;
                        } else {
                            x2 = _tx;
                            y2 = stageBound[ti][1];
                        }
                    }

                    this.Graphic.lineStyle(this.style.line)
                    this.Graphic.moveTo(x1, y1)
                    this.Graphic.lineTo(x2, y2)
                    this.clickArea.lineStyle(this.style.clickAreaLine);
                    this.clickArea.moveTo(x1, y1);
                    this.clickArea.lineTo(x2, y2);
                    this.margin.lineStyle(this.style.lineMargin);
                    this.margin.moveTo(x1, y1);
                    this.margin.lineTo(x2, y2);
                    this.boundChanged = true
                    this.bitmapChanged = true
                    if (x1 - this.cache._x1 == x2 - this.cache._x2 &&
                        y1 - this.cache._y1 == y2 - this.cache._y2) {
                        this.bitmapChanged = false
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