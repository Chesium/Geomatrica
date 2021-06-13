function pObj(type, dfnType, dfn, initData) {// interactive areas
    this.index = pO.length;
    pO.push(this);
    this.geometry = new geometry(type, dfnType, dfn, initData, this);
    this.IAA = new IAA(type, this.geometry.data,this);
    this.removed = false;

    IAseq[0][type==0?0:1].push(this.IAA);
}

pObj.prototype.update = function () {
    this.geometry.calcData();
    this.IAA.update();
}

pObj.prototype.remove = function () {
    this.IAA.remove();
    this.removed = true;
}

pObj.prototype.toObj = function () {
    var i = new obj(this.geometry.type, this.geometry.dfnType, this.geometry.dfn, {}).index;
    this.remove();
    return i;
}