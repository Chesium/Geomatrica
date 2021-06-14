class geometry{
    constructor(type, dfnType, dfn, initData, obj) {
        this.type = type;
        this.dfnType = dfnType;
        this.dfn = { ...dfn };
        this.obj = obj;
        this.data = { exist: false };
        this.cache = {};
        this.parents = [];
        this.children = [];
        this.seqI = 0;
        // this.exist = false;
        this.initializing = false;

        this.init(initData);
    }
    init(initData){
        switch (this.type) {
            case 0:
                this.seqI = 0;
                switch (this.dfnType) {
                    case 0://自由点
                        this.data.exist = true;
                        this.data.x = initData.pos.x;
                        this.data.y = initData.pos.y;
                        break;

                    case 1://线上的点
                        this.dfn.l.children.push(this);
                        this.parents = [this.dfn.l];
                        //init cache
                        this.cache.proportion = 0.5;//比例默认值
                        this.cache.following = true;//是否跟随鼠标

                        //Actually not real
                        this.data.x = initData.pos.x;
                        this.data.y = initData.pos.y;
                        break;

                    case 2://圆上的点
                        this.dfn.c.children.push(this);
                        this.parents = [this.dfn.c];
                        //init cache
                        this.cache.cosine = 0;//ΔX
                        this.cache.sine = 0;//ΔY
                        this.cache.following = true;//是否跟随鼠标

                        //Actually not real
                        this.data.x = initData.pos.x;
                        this.data.y = initData.pos.y;
                        break;

                    case 3://两线交点
                        this.dfn.l[0].children.push(this);
                        this.dfn.l[1].children.push(this);

                        this.parents = [this.dfn.l[0], this.dfn.l[1]];
                        break;

                    case 4://两圆的第一个交点
                    case 5://两圆的第二个交点
                        this.dfn.c[0].children.push(this);
                        this.dfn.c[1].children.push(this);

                        this.parents = [this.dfn.c[0], this.dfn.c[1]];
                        break;

                    case 6://圆与线的第一个交点
                    case 7://圆与线的第二个交点
                        this.dfn.l.children.push(this);
                        this.dfn.c.children.push(this);

                        this.parents = [this.dfn.l, this.dfn.c];
                        break;

                    default:
                        break;
                }
                break;

            case 1:
                this.seqI = 1;
                switch (this.dfnType) {
                    case 0://线段
                    case 1://直线
                    case 2://射线
                        this.dfn.p[0].children.push(this);
                        this.dfn.p[1].children.push(this);
                        this.parents = [this.dfn.p[0], this.dfn.p[1]];
                        break;

                    default:
                        break;
                }
                break;

            case 2:
                this.seqI = 1;
                switch (this.dfnType) {
                    case 0://圆心和圆上一点
                        this.dfn.p[0].children.push(this);
                        this.dfn.p[1].children.push(this);
                        this.parents = [this.dfn.p[0], this.dfn.p[1]];
                        break;

                    default:
                        break;
                }
                break;

            default:
                break;
        }
        this.calcData();
    }
    calcData() {
        for (var i in this.parents) {//如果对象的某一父对象不存在，那它自己也不存在
            if (!this.parents[i].data.exist) {
                this.data.exist = false;
                return;
            }
        }
        switch (this.type) {
            case 0://点
                switch (this.dfnType) {
                    case 0://自由点
                        //Nothing to do
                        break;

                    case 1://线上的点
                        var a = this.dfn.l.data.a,
                            b = this.dfn.l.data.b,
                            c = this.dfn.l.data.c,
                            d = this.dfn.l.data.d,
                            r = this.dfn.l.data.r;
                        if (!this.cache.following) {
                            var t = (r[1] - r[0]) * this.cache.proportion + r[0];
                            this.data.exist = true;
                            this.data.x = a * t + b;
                            this.data.y = c * t + d;
                            return;
                        }
                        if (c == 0 && a == 0) {
                            console.log("ERROR in calcData:the line doesn't exist.");
                            return;
                        }
                        var t = (a * (this.data.x - b) + c * (this.data.y - d)) / (a * a + c * c);
                        if (t < Math.min(r[0], r[1])) {
                            this.data.exist = true;
                            this.data.x = this.dfn.l.cache.p[0].data.x;
                            this.data.y = this.dfn.l.cache.p[0].data.y;
                            this.cache.proportion = 0;

                        } else if (t > Math.max(r[0], r[1])) {
                            this.data.exist = true;
                            this.data.x = this.dfn.l.cache.p[1].data.x;
                            this.data.y = this.dfn.l.cache.p[1].data.y;
                            this.cache.proportion = 1;
                        } else {
                            this.data.exist = true;
                            this.data.x = a * t + b;
                            this.data.y = c * t + d;
                            this.cache.proportion = (t - r[0]) / (r[1] - r[0]);
                        }
                        break;

                    case 2://圆上的点
                        var x0 = this.dfn.c.data.x,
                            y0 = this.dfn.c.data.y,
                            r = this.dfn.c.data.r;
                        if (this.cache.following) {
                            var x1 = this.data.x,
                                y1 = this.data.y;
                            var xdif = x1 - x0,
                                ydif = y1 - y0;
                            var d = Math.sqrt(xdif * xdif + ydif * ydif);
                            this.cache.cosine = xdif / d;
                            this.cache.sine = ydif / d;
                        }
                        this.data.exist = true;
                        this.data.x = x0 + r * this.cache.cosine;
                        this.data.y = y0 + r * this.cache.sine;
                        break;

                    case 3://两线交点
                        // console.log("calc intersections");
                        var a1 = this.dfn.l[0].data.a,
                            b1 = this.dfn.l[0].data.b,
                            c1 = this.dfn.l[0].data.c,
                            d1 = this.dfn.l[0].data.d,
                            r1 = this.dfn.l[0].data.r,
                            a2 = this.dfn.l[1].data.a,
                            b2 = this.dfn.l[1].data.b,
                            c2 = this.dfn.l[1].data.c,
                            d2 = this.dfn.l[1].data.d,
                            r2 = this.dfn.l[1].data.r;
                        if (a1 * c2 == a2 * c1) {//两线平行无交点
                            this.data.exist = false;
                            return;
                        }
                        var t1 = (b2 * c2 - b1 * c2 + a2 * d1 - a2 * d2) / (a1 * c2 - a2 * c1),
                            t2 = (b2 * c1 - b1 * c1 + a1 * d1 - a1 * d2) / (a1 * c2 - a2 * c1);
                        if (t1 < Math.min(r1[0], r1[1])
                            || t1 > Math.max(r1[0], r1[1])
                            || t2 < Math.min(r2[0], r2[1])
                            || t2 > Math.max(r2[0], r2[1])) {
                            this.data.exist = false;
                            return;
                        }
                        this.data.exist = true;
                        this.data.x = a1 * t1 + b1;
                        this.data.y = c1 * t1 + d1;
                        break;

                    case 4://两圆的第一个交点
                        var x1 = this.dfn.c[0].data.x,
                            y1 = this.dfn.c[0].data.y,
                            r1 = this.dfn.c[0].data.r,
                            x2 = this.dfn.c[1].data.x,
                            y2 = this.dfn.c[1].data.y,
                            r2 = this.dfn.c[1].data.r;
                        var k = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
                        var s = Math.sqrt(k);
                        if (s > r1 + r2) {
                            this.data.exist = false;
                            return;
                        }
                        var n = (r1 * r1 - r2 * r2) / (2 * k) + 0.5;
                        var p = s * n;
                        var xM = x1 + n * (x2 - x1),
                            yM = y1 + n * (y2 - y1);
                        var q = Math.sqrt(r1 * r1 - p * p) / p;
                        this.data.exist = true;
                        this.data.x = xM + q * (y1 - yM);
                        this.data.y = yM - q * (x1 - xM);
                        break;

                    case 5://两圆的第二个交点
                        var x1 = this.dfn.c[0].data.x,
                            y1 = this.dfn.c[0].data.y,
                            r1 = this.dfn.c[0].data.r,
                            x2 = this.dfn.c[1].data.x,
                            y2 = this.dfn.c[1].data.y,
                            r2 = this.dfn.c[1].data.r;
                        var k = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
                        var s = Math.sqrt(k);
                        if (s > r1 + r2) {
                            this.data.exist = false;
                            return;
                        }
                        var n = (r1 * r1 - r2 * r2) / (2 * k) + 0.5;
                        var p = s * n;
                        var xM = x1 + n * (x2 - x1),
                            yM = y1 + n * (y2 - y1);
                        var q = Math.sqrt(r1 * r1 - p * p) / p;
                        this.data.exist = true;
                        this.data.x = xM - q * (y1 - yM);
                        this.data.y = yM + q * (x1 - xM);
                        break;

                    case 6://圆与线的第一个交点
                        var a = this.dfn.l.data.a,
                            b = this.dfn.l.data.b,
                            c = this.dfn.l.data.c,
                            d = this.dfn.l.data.d,
                            rg = this.dfn.l.data.r,//range of t
                            x = this.dfn.c.data.x,
                            y = this.dfn.c.data.y,
                            r = this.dfn.c.data.r;
                        var A = a * a + c * c,
                            B = 2 * (a * (b - x) + c * (d - y)),
                            C = b * b + d * d + x * x + y * y - r * r - 2 * (b * x + d * y);
                        var delta = B * B - 4 * A * C;//判别式Δ
                        if (delta < 0) {
                            this.data.exist = false;
                            return;
                        }
                        var t1 = (-B + Math.sqrt(delta)) / (2 * A);
                        var t2 = -(B / A + t1), ts = [], t;
                        if (t1 >= Math.min(rg[0], rg[1]) && t1 <= Math.max(rg[0], rg[1])) {
                            ts.push(t1);
                        }
                        if (t2 >= Math.min(rg[0], rg[1]) && t2 <= Math.max(rg[0], rg[1])) {
                            ts.push(t2);
                        }
                        if (ts.length == 0) {
                            this.data.exist = false;
                            return;
                        }
                        if (this.dfn.l.data.dr == 1) {
                            t = Math.max(...ts);
                        } else {
                            t = Math.min(...ts);
                        }
                        this.data.exist = true;
                        this.data.x = a * t + b;
                        this.data.y = c * t + d;
                        break;

                    case 7://圆与线的第二个交点
                        var a = this.dfn.l.data.a,
                            b = this.dfn.l.data.b,
                            c = this.dfn.l.data.c,
                            d = this.dfn.l.data.d,
                            rg = this.dfn.l.data.r,//range of t
                            x = this.dfn.c.data.x,
                            y = this.dfn.c.data.y,
                            r = this.dfn.c.data.r;
                        var A = a * a + c * c,
                            B = 2 * (a * (b - x) + c * (d - y)),
                            C = b * b + d * d + x * x + y * y - r * r - 2 * (b * x + d * y);
                        var delta = B * B - 4 * A * C;//判别式Δ
                        if (delta < 0) {
                            this.data.exist = false;
                            return;
                        }
                        var t1 = (-B + Math.sqrt(delta)) / (2 * A);
                        var t2 = -(B / A + t1), ts = [], t;
                        if (t1 >= Math.min(rg[0], rg[1]) && t1 <= Math.max(rg[0], rg[1])) {
                            ts.push(t1);
                        }
                        if (t2 >= Math.min(rg[0], rg[1]) && t2 <= Math.max(rg[0], rg[1])) {
                            ts.push(t2);
                        }
                        if (ts.length != 2) {
                            this.data.exist = false;
                            return;
                        }
                        if (this.dfn.l.data.dr == -1) {
                            t = Math.max(...ts);
                        } else {
                            t = Math.min(...ts);
                        }
                        this.data.exist = true;
                        this.data.x = a * t + b;
                        this.data.y = c * t + d;
                        break;

                    default:
                        break;
                }
                break;

            case 1://线
                // console.log(this.dfn);
                switch (this.dfnType) {
                    case 0://线段
                        var x1 = this.dfn.p[0].data.x,
                            y1 = this.dfn.p[0].data.y,
                            x2 = this.dfn.p[1].data.x,
                            y2 = this.dfn.p[1].data.y;
                        if (x1 == x2) {
                            if (y1 == y2) {
                                this.data.exist = false;
                            } else {
                                this.data.exist = true;
                                this.data.a = 0;
                                this.data.b = x1;
                                this.data.c = 1;
                                this.data.d = 0;
                                this.data.r = [y1, y2];
                                if (y1 < y2) {
                                    this.data.dr = 1;
                                    this.cache.p = [this.dfn.p[0], this.dfn.p[1]];
                                } else {
                                    this.data.dr = -1;
                                    this.cache.p = [this.dfn.p[1], this.dfn.p[0]];
                                }
                            }
                        } else {
                            this.data.exist = true;
                            this.data.a = 1;
                            this.data.b = 0;
                            this.data.c = (y1 - y2) / (x1 - x2);
                            this.data.r = [x1, x2];
                            this.data.d = y1 - this.data.c * x1;
                            if (x1 < x2) {
                                this.data.dr = 1;
                                this.cache.p = [this.dfn.p[0], this.dfn.p[1]];
                            } else {
                                this.data.dr = -1;
                                this.cache.p = [this.dfn.p[1], this.dfn.p[0]];
                            }
                        }
                        break;

                    case 1://直线
                        var x1 = this.dfn.p[0].data.x,
                            y1 = this.dfn.p[0].data.y,
                            x2 = this.dfn.p[1].data.x,
                            y2 = this.dfn.p[1].data.y;
                        if (x1 == x2) {
                            if (y1 == y2) {
                                this.data.exist = false;
                            } else {
                                this.data.exist = true;
                                this.data.a = 0;
                                this.data.b = x1;
                                this.data.c = 1;
                                this.data.d = 0;
                                this.data.r = [-Infinity, Infinity];
                                if (y1 < y2) {
                                    this.data.dr = 1;
                                    this.cache.p = [this.dfn.p[0], this.dfn.p[1]];
                                } else {
                                    this.data.dr = -1;
                                    this.cache.p = [this.dfn.p[1], this.dfn.p[0]];
                                }
                            }
                        } else {
                            this.data.exist = true;
                            this.data.a = 1;
                            this.data.b = 0;
                            this.data.c = (y1 - y2) / (x1 - x2);
                            this.data.r = [-Infinity, Infinity];
                            this.data.d = y1 - this.data.c * x1;
                            if (x1 < x2) {
                                this.data.dr = 1;
                                this.cache.p = [this.dfn.p[0], this.dfn.p[1]];
                            } else {
                                this.data.dr = -1;
                                this.cache.p = [this.dfn.p[1], this.dfn.p[0]];
                            }
                        }
                        break;

                    case 2://射线
                        this.data.exist = true;
                        var x1 = this.dfn.p[0].data.x,
                            y1 = this.dfn.p[0].data.y,
                            x2 = this.dfn.p[1].data.x,
                            y2 = this.dfn.p[1].data.y;
                        if (x1 == x2) {
                            if (y1 == y2) {
                                this.data.exist = false;
                            } else {
                                this.data.exist = true;
                                this.data.a = 0;
                                this.data.b = x1;
                                this.data.c = 1;
                                this.data.d = 0;
                                if (y1 < y2) {
                                    this.data.r = [y1, Infinity];
                                    this.data.dr = 1;
                                    this.cache.p = [this.dfn.p[0], this.dfn.p[1]];
                                } else {
                                    this.data.r = [-Infinity, y1];
                                    this.data.dr = -1;
                                    this.cache.p = [this.dfn.p[1], this.dfn.p[0]];
                                }
                            }
                        } else {
                            this.data.exist = true;
                            this.data.a = 1;
                            this.data.b = 0;
                            this.data.c = (y1 - y2) / (x1 - x2);
                            this.data.d = y1 - this.data.c * x1;
                            if (x1 < x2) {
                                this.data.r = [x1, Infinity];
                                this.data.dr = 1;
                                this.cache.p = [this.dfn.p[0], this.dfn.p[1]];
                            } else {
                                this.data.r = [-Infinity, x1];
                                this.data.dr = -1;
                                this.cache.p = [this.dfn.p[1], this.dfn.p[0]];
                            }
                        }
                        break;

                    default:
                        break;
                }
                break;

            case 2://圆
                switch (this.dfnType) {
                    case 0://圆心和圆上一点
                        var x1 = this.dfn.p[0].data.x,
                            y1 = this.dfn.p[0].data.y,
                            x2 = this.dfn.p[1].data.x,
                            y2 = this.dfn.p[1].data.y;
                        this.data.exist = true;
                        this.data.x = x1;
                        this.data.y = y1;
                        this.data.r = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
                        break;

                    default:
                        break;
                }
                break;

            default:
                break;
        }
    }
    beginDraw(pos) {
        switch (this.type) {
            case 0:
                //无需“画”点
                break;

            case 1:
                switch (this.dfnType) {
                    case 0:
                    case 1:
                    case 2:
                        this.dfn.p[1].beginDrag(pos);
                        this.dfn.p[1].initializing = true;
                        break;

                    default:
                        break;
                }
                break;

            case 2:
                switch (this.dfnType) {
                    case 0:
                        this.dfn.p[1].beginDrag(pos);
                        this.dfn.p[1].initializing = true;
                        break;

                    default:
                        break;
                }
                break;

            default:
                break;
        }
    }
    beginDrag(pos) {
        switch (this.type) {
            case 0://点
                switch (this.dfnType) {
                    case 0:
                        this.beginMove(pos);
                        break;

                    case 1:
                    case 2:
                        F = this.obj.index;
                        Status = 1;
                        break;

                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                        this.beginMove(pos);
                        break;

                    default:
                        break;
                }
                break;

            case 1:
                switch (this.dfnType) {
                    case 0:
                    case 1:
                    case 2:
                        this.beginMove(pos);
                        break;

                    default:
                        break;
                }
                break;

            case 2:
                switch (this.dfnType) {
                    case 0:
                        this.beginMove(pos);
                        break;

                    default:
                        break;
                }
                break;

            default:
                break;
        }
    }
    beginMove(pos) {
        F = this.obj.index;
        Status = 1;
        switch (this.type) {
            case 0://点
                switch (this.dfnType) {
                    case 0:
                        this.dragOffset = {
                            x: this.data.x - pos.x,
                            y: this.data.y - pos.y
                        };
                        break;

                    case 1:
                        this.dfn.l.beginDrag(pos);
                        break;

                    case 2:
                        this.dfn.c.beginDrag(pos);
                        break;

                    case 3:
                        this.dfn.l[0].beginMove(pos);
                        this.dfn.l[1].beginMove(pos);
                        break;

                    case 4:
                    case 5:
                        this.dfn.c[0].beginMove(pos);
                        this.dfn.c[1].beginMove(pos);
                        break;

                    case 6:
                    case 7:
                        this.dfn.l.beginMove(pos);
                        this.dfn.c.beginMove(pos);
                        break;

                    default:
                        break;
                }
                break;

            case 1:
                switch (this.dfnType) {
                    case 0:
                    case 1:
                    case 2:
                        // console.log("object");
                        this.dfn.p[0].beginMove(pos);
                        this.dfn.p[1].beginMove(pos);
                        break;

                    default:
                        break;
                }
                break;

            case 2:
                switch (this.dfnType) {
                    case 0:
                        this.dfn.p[0].beginMove(pos);
                        this.dfn.p[1].beginMove(pos);
                        break;

                    default:
                        break;
                }
                break;

            default:
                break;
        }
        F = this.obj.index;
        Status = 1;
    }
    updDrag(pos) {
        switch (this.type) {
            case 0:
                switch (this.dfnType) {
                    case 0:
                        this.updMove(pos);
                        break;

                    case 1:
                    case 2:
                        this.data.x = pos.x;
                        this.data.y = pos.y;
                        this.cache.following = true;
                        this.obj.update();
                        this.cache.following = false;
                        break;

                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                        this.updMove(pos);
                        break;

                    default:
                        break;
                }
                break;

            case 1:
                switch (this.dfnType) {
                    case 0:
                    case 1:
                    case 2:
                        this.updMove(pos);
                        break;

                    default:
                        break;
                }
                break;

            case 2:
                switch (this.dfnType) {
                    case 0:
                        this.updMove(pos);
                        break;

                    default:
                        break;
                }
                break;

            default:
                break;
        }
    }
    updMove(pos) {
        switch (this.type) {
            case 0:
                switch (this.dfnType) {
                    case 0:
                        this.data.x = pos.x + this.dragOffset.x;
                        this.data.y = pos.y + this.dragOffset.y;
                        break;

                    case 1:
                        this.dfn.l.updMove(pos);
                        break;

                    case 2:
                        this.dfn.c.updMove(pos);
                        break;

                    case 3:
                        this.dfn.l[0].updMove(pos);
                        this.dfn.l[1].updMove(pos);
                        break;

                    case 4:
                    case 5:
                        this.dfn.c[0].updMove(pos);
                        this.dfn.c[1].updMove(pos);
                        break;

                    case 6:
                    case 7:
                        this.dfn.l.updMove(pos);
                        this.dfn.c.updMove(pos);
                        break;

                    default:
                        break;
                }
                this.obj.update();
                break;

            case 1:
                switch (this.dfnType) {
                    case 0:
                    case 1:
                    case 2:
                        // console.log("geometry updMove 1.0/1/2");
                        this.dfn.p[0].updMove(pos);
                        this.dfn.p[1].updMove(pos);
                        break;

                    default:
                        break;
                }
                break;

            case 2:
                switch (this.dfnType) {
                    case 0:
                        this.dfn.p[0].updMove(pos);
                        this.dfn.p[1].updMove(pos);
                        break;

                    default:
                        break;
                }
                break;

            default:
                break;
        }
    }
    preDifine() {
        for (var i in O) {
            if (O[i].removed || O[i].index == this.obj.index) {
                continue;
            }
            switch (this.type) {
                case 0:
                    //Nothing to do
                    break;

                case 1:
                    switch (O[i].geometry.type) {
                        case 0:
                            //Nothing to do
                            break;

                        case 1:
                            if (haveEqualIndex(this.parents, O[i].geometry.parents)) {
                                continue;
                            }
                            this.obj.pObjs.push(new pObj(0, 3, { l: [this, O[i].geometry] }, {}));
                            break;

                        case 2:
                            this.obj.pObjs.push(new pObj(0, 6, { l: this, c: O[i].geometry }, {}));
                            this.obj.pObjs.push(new pObj(0, 7, { l: this, c: O[i].geometry }, {}));
                            break;

                        default:
                            break;
                    }
                    break;

                case 2:
                    switch (O[i].geometry.type) {
                        case 0:
                            //Nothing to do
                            break;

                        case 1:
                            this.obj.pObjs.push(new pObj(0, 6, { l: O[i].geometry, c: this }, {}));
                            this.obj.pObjs.push(new pObj(0, 7, { l: O[i].geometry, c: this }, {}));
                            break;

                        case 2:
                            this.obj.pObjs.push(new pObj(0, 4, { c: [this, O[i].geometry] }, {}));
                            this.obj.pObjs.push(new pObj(0, 5, { c: [this, O[i].geometry] }, {}));
                            break;

                        default:
                            break;
                    }
                    break;

                default:
                    break;
            }
        }
    }
}