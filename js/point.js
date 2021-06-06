function pointInit(obj, init) {
    obj.Graphic.zIndex = 100;
    obj.margin.zIndex = 10;
    obj.clickArea.zIndex = 1000;
    switch (obj.subType) {
        case 0:
            break;

        case 1:
            obj.draggable = true

            obj.data = { ...init };

            obj.update = function () {
                this.Graphic.clear();
                this.Graphic.beginFill(this.style.point.color, this.style.point.alpha);
                this.Graphic.lineStyle(this.style.point.outline);
                this.Graphic.drawCircle(this.data.x, this.data.y, this.style.point.radius);
                this.margin.clear();
                this.margin.beginFill(this.style.pointMargin.color, this.style.pointMargin.alpha);
                this.margin.drawCircle(this.data.x, this.data.y, this.style.pointMargin.radius);
                this.clickArea.clear();
                this.clickArea.beginFill(this.style.clickAreaPoint.color, this.style.clickAreaPoint.alpha);
                this.clickArea.drawCircle(this.data.x, this.data.y, this.style.clickAreaPoint.radius);
                this.boundChanged = true;
                for (let i in this.children) {
                    this.children[i].update();
                }
            }

            obj.beginDrag = function (pos) {
                obj.beginMove(pos);
            }
            obj.beginMove = function (pos) {
                this.dragOffset = {
                    x: this.data.x - pos.x,
                    y: this.data.y - pos.y
                };
                F = this.index;
                moving = true;
            }
            obj.updateDrag = function (pos) {
                obj.updateMove(pos);
            }
            obj.updateMove = function (pos) {
                this.data.x = pos.x + this.dragOffset.x;
                this.data.y = pos.y + this.dragOffset.y;
                this.update();
            }
            obj.updateBound();
            obj.update();
            obj.updateBitmap();
            break;

        case 2:
            obj.draggable = true

            obj.dfn.l.children.push(obj);
            obj.parents = [obj.dfn.l];

            obj.data = { ...init };
            obj.cache.proportion = 0.5;

            obj.calcData = function () {
                let a = this.dfn.l.data.a,
                    b = this.dfn.l.data.b,
                    c = this.dfn.l.data.c,
                    d = this.dfn.l.data.d,
                    r = this.dfn.l.data.r;
                if (!this.cache.following) {
                    // console.log(`ppt:${this.cache.proportion}`);
                    let t = (r[1] - r[0]) * this.cache.proportion + r[0];
                    this.data.x = a * t + b;
                    this.data.y = c * t + d;
                    return;
                }
                if (c == 0 && a == 0) {
                    alert("the line doesn't exist");
                    return;
                }
                let t = (a * (this.data.x - b) + c * (this.data.y - d)) / (a * a + c * c);
                if (t < Math.min(r[0], r[1])) {
                    this.data = {
                        x: this.dfn.l.cache.p[0].data.x,
                        y: this.dfn.l.cache.p[0].data.y
                    };
                    this.cache.proportion = 0;
                } else if (t > Math.max(r[0], r[1])) {
                    this.data = {
                        x: this.dfn.l.cache.p[1].data.x,
                        y: this.dfn.l.cache.p[1].data.y
                    };
                    this.cache.proportion = 1;
                } else {
                    this.data.x = a * t + b;
                    this.data.y = c * t + d;
                    this.cache.proportion = (t - r[0]) / (r[1] - r[0]);
                }
            }

            obj.update = function () {
                this.calcData();
                this.Graphic.clear()
                this.Graphic.beginFill(this.style.point.color, this.style.point.alpha)
                this.Graphic.lineStyle(this.style.point.outline)
                this.Graphic.drawCircle(this.data.x, this.data.y, this.style.point.radius)
                this.margin.clear();
                this.margin.beginFill(this.style.pointMargin.color, this.style.pointMargin.alpha);
                this.margin.drawCircle(this.data.x, this.data.y, this.style.pointMargin.radius);
                this.clickArea.clear();
                this.clickArea.beginFill(this.style.clickAreaPoint.color, this.style.clickAreaPoint.alpha);
                this.clickArea.drawCircle(this.data.x, this.data.y, this.style.clickAreaPoint.radius);
                this.boundChanged = true
                for (let i in this.children) {
                    this.children[i].update();
                }
            }

            obj.beginDrag = function (pos) {
                F = this.index;
                moving = true;
            }

            obj.beginMove = function (pos) {
                this.dfn.l.beginDrag(pos);
                F = this.index;
                moving = true;
            }

            obj.updateDrag = function (pos) {
                this.data = { ...pos };
                this.cache.following = true;
                this.update();
                this.cache.following = false;
            }

            obj.updateMove = function (pos) {
                this.dfn.l.updateMove(pos);
                this.update();
            }

            obj.updateBound();
            obj.cache.following = true;
            obj.update();
            obj.cache.following = false;
            obj.updateBitmap();
            break;

        case 3://圆上的点
            obj.draggable = true

            obj.dfn.c.children.push(obj);
            obj.parents = [obj.dfn.c];

            obj.data = { ...init };
            obj.cache.cosine = 0;//X
            obj.cache.sine = 0;//Y

            obj.calcData = function () {
                let x0 = this.dfn.c.data.x,
                    y0 = this.dfn.c.data.y,
                    r = this.dfn.c.data.r;
                if (this.cache.following) {
                    let x1 = this.data.x,
                        y1 = this.data.y;
                    let xdif = x1 - x0,
                        ydif = y1 - y0;
                    let d = Math.sqrt(xdif * xdif + ydif * ydif);
                    this.cache.cosine = xdif / d;
                    this.cache.sine = ydif / d;
                }
                this.data = {
                    x: x0 + r * this.cache.cosine,
                    y: y0 + r * this.cache.sine
                };
            }

            obj.update = function () {
                this.calcData();
                this.Graphic.clear()
                this.Graphic.beginFill(this.style.point.color, this.style.point.alpha)
                this.Graphic.lineStyle(this.style.point.outline)
                this.Graphic.drawCircle(this.data.x, this.data.y, this.style.point.radius)
                this.margin.clear();
                this.margin.beginFill(this.style.pointMargin.color, this.style.pointMargin.alpha);
                this.margin.drawCircle(this.data.x, this.data.y, this.style.pointMargin.radius);
                this.clickArea.clear();
                this.clickArea.beginFill(this.style.clickAreaPoint.color, this.style.clickAreaPoint.alpha);
                this.clickArea.drawCircle(this.data.x, this.data.y, this.style.clickAreaPoint.radius);
                this.boundChanged = true
                for (let i in this.children) {
                    this.children[i].update();
                }
            }

            obj.beginDrag = function (pos) {
                F = this.index;
                moving = true;
            }

            obj.beginMove = function (pos) {
                this.dfn.c.beginDrag(pos);
                F = this.index;
                moving = true;
            }

            obj.updateDrag = function (pos) {
                this.data = { ...pos };
                this.cache.following = true;
                this.update();
                this.cache.following = false;
            }

            obj.updateMove = function (pos) {
                this.dfn.c.updateMove(pos);
                this.update();
            }

            obj.updateBound();
            obj.cache.following = true;
            obj.update();
            obj.cache.following = false;
            obj.updateBitmap();
            break;

        case 4://线与线的交点
            obj.draggable = true

            obj.dfn.l[0].children.push(obj);
            obj.dfn.l[1].children.push(obj);
            obj.parents = [obj.dfn.l[0], obj.dfn.l[1]];

            obj.calcData = function () {
                let a1 = this.dfn.l[0].data.a,
                    b1 = this.dfn.l[0].data.b,
                    c1 = this.dfn.l[0].data.c,
                    d1 = this.dfn.l[0].data.d,
                    r1 = this.dfn.l[0].data.r,
                    a2 = this.dfn.l[1].data.a,
                    b2 = this.dfn.l[1].data.b,
                    c2 = this.dfn.l[1].data.c,
                    d2 = this.dfn.l[1].data.d,
                    r2 = this.dfn.l[1].data.r;
                let t1 = (c2 * (b2 - b1) + a2 * (d1 - d2)) / (a1 * c2 - a2 * c1);
                this.data = {
                    x: a1 * t1 + b1,
                    y: c1 * t1 + d1
                };
            }

            obj.update = function () {
                this.calcData();
                this.Graphic.clear()
                this.Graphic.beginFill(this.style.point.color, this.style.point.alpha)
                this.Graphic.lineStyle(this.style.point.outline)
                this.Graphic.drawCircle(this.data.x, this.data.y, this.style.point.radius)
                this.margin.clear();
                this.margin.beginFill(this.style.pointMargin.color, this.style.pointMargin.alpha);
                this.margin.drawCircle(this.data.x, this.data.y, this.style.pointMargin.radius);
                this.clickArea.clear();
                this.clickArea.beginFill(this.style.clickAreaPoint.color, this.style.clickAreaPoint.alpha);
                this.clickArea.drawCircle(this.data.x, this.data.y, this.style.clickAreaPoint.radius);
                this.boundChanged = true
                for (let i in this.children) {
                    this.children[i].update();
                }
            }

            obj.beginDrag = function (pos) {
                F = this.index;
                moving = true;
            }

            obj.beginMove = function (pos) {
                this.dfn.l.beginDrag(pos);
                F = this.index;
                moving = true;
            }

            obj.updateDrag = function (pos) {
                this.data = { ...pos };
                this.cache.following = true;
                this.update();
                this.cache.following = false;
            }

            obj.updateMove = function (pos) {
                this.dfn.l.updateMove(pos);
                this.update();
            }

            obj.updateBound();
            obj.cache.following = true;
            obj.update();
            obj.cache.following = false;
            obj.updateBitmap();
            break;
        default:
            break;
    }
}