class dObj {
    constructor(type, dfnType, dfn, initData) {// interactive areas
        this.index = dO.length;
        dO.push(this);
        this.geometry = new geometry(type, dfnType, dfn, initData, this);
        this.GFD = new GFD(type, this.geometry.data, this);
        this.removed = false;
    }
    update() {
        this.geometry.calcData();
        this.GFD.update();
    }
    remove() {
        this.GFD.remove();
        this.removed = true;
    }
    toObj() {
        new obj(this.geometry.type, this.geometry.dfnType, this.geometry.dfn, {});
        this.remove();
    }
}