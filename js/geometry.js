function geometry(type, dfnType, dfn, initData, obj) {
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

geometry.prototype.init = function (initData) {
    switch (this.type) {
        case 0:
            this.pInit(initData);
            break;

        case 1:
            this.lInit(initData);
            break;

        case 2:
            this.cInit(initData);
            break;
        default:
            break;
    }
    this.calcData();
}

geometry.prototype.calcData = function () {
    for(var i in this.parents){//如果对象的某一父对象不存在，那它自己也不存在
        if(!this.parents[i].data.exist){
            this.data.exist=false;
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
                                this.cache.p = [this.dfn.p[0], this.dfn.p[1]];
                            } else {
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
                            this.cache.p = [this.dfn.p[0], this.dfn.p[1]];
                        } else {
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
                                this.cache.p = [this.dfn.p[0], this.dfn.p[1]];
                            } else {
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
                            this.cache.p = [this.dfn.p[0], this.dfn.p[1]];
                        } else {
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
                                this.cache.p = [this.dfn.p[0], this.dfn.p[1]];
                            } else {
                                this.data.r = [-Infinity, y1];
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
                            this.cache.p = [this.dfn.p[0], this.dfn.p[1]];
                        } else {
                            this.data.r = [-Infinity, x1];
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

geometry.prototype.pInit = function (initData) {
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

        default:
            break;
    }
}

geometry.prototype.lInit = function (initData) {
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
}

geometry.prototype.cInit = function (initData) {
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
}

geometry.prototype.beginDraw = function (pos) {
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

geometry.prototype.beginDrag = function (pos) {
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

geometry.prototype.beginMove = function (pos) {
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

geometry.prototype.updDrag = function (pos) {
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

geometry.prototype.updMove = function (pos) {
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