function obj(type, dfnType, dfn, initData) {// interactive areas
    this.index = O.length;
    O.push(this);
    this.geometry = new geometry(type, dfnType, dfn, initData, this);
    this.IAA = new IAA(type, this.geometry.data,this);
    this.GFD = new GFD(type, this.geometry.data,this);
    this.removed = false;

    IAseq[1][type == 0 ? 0 : 1].push(this.IAA);
}

obj.prototype.update = function () {
    this.geometry.calcData();
    this.GFD.update();
    this.IAA.update();
    for(var i in this.geometry.children){
        this.geometry.children[i].obj.update();
    }
}

obj.prototype.remove = function () {
    F=-1;
    moving=false;
    this.IAA.remove();
    this.GFD.remove();
    this.removed = true;
    for(var i in this.geometry.children){
        this.geometry.children[i].obj.remove();
    }
}