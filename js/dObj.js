function dObj(type, dfnType, dfn, initData) {// interactive areas
    this.index = dO.length;
    dO.push(this);
    this.geometry = new geometry(type, dfnType, dfn, initData, this);
    this.GFD = new GFD(type, this.geometry.data,this);
    this.removed=false;
}

dObj.prototype.update = function () {
    this.geometry.calcData();
    this.GFD.update();
}

dObj.prototype.distance = function () {

}

dObj.prototype.remove = function () {
    this.GFD.remove();
    this.removed = true;
}

dObj.prototype.toObj = function () {
    new obj(this.geometry.type, this.geometry.dfnType, this.geometry.dfn, {});
    this.remove();
}

