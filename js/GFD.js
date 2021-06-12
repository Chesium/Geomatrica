function GFD(type, data,obj) {// graphics/geometry for displaying
    this.type = type;
    this.data = data;//»á±ä¸ü
    this.obj = obj;
    this.style = new style(0);
    this.Graphic = new PIXI.Graphics();
    this.hidden = false;
    this.removed = false;

    this.Graphic.zIndex = zIofT[this.type];

    mainCanvas.addChild(this.Graphic);
    this.update();
}

GFD.prototype.update = function () {
    this.Graphic.clear();
    if (this.hidden||(!this.data.exist)) {
        return;
    }
    switch (this.type) {
        case 0://point
            //draw point margin (which doesn't have outline)
            this.Graphic.beginFill(this.style.p.margin.color, this.style.p.margin.alpha);
            this.Graphic.drawCircle(this.data.x, this.data.y, this.style.p.margin.radius);
            //draw point body
            this.Graphic.beginFill(this.style.p.color, this.style.p.alpha);
            this.Graphic.lineStyle(this.style.p.ol);
            this.Graphic.drawCircle(this.data.x, this.data.y, this.style.p.radius);
            break;

        case 1://line
            var crd = L_DpData_To_epCrd(this.data, stageBound);
            if (!crd[0]) {
                return;
            }
            //draw line margin
            this.Graphic.lineStyle(this.style.l.margin);
            this.Graphic.moveTo(crd[1][0], crd[1][1]);
            this.Graphic.lineTo(crd[2][0], crd[2][1]);
            //draw line body
            this.Graphic.lineStyle(this.style.l.body);
            this.Graphic.moveTo(crd[1][0], crd[1][1]);
            this.Graphic.lineTo(crd[2][0], crd[2][1]);
            break;

        case 2://circle
            //draw circle margin
            this.Graphic.lineStyle(this.style.l.margin);
            this.Graphic.drawCircle(this.data.x, this.data.y, this.data.r);
            //draw circle body
            this.Graphic.lineStyle(this.style.l.body);
            this.Graphic.drawCircle(this.data.x, this.data.y, this.data.r);
            break;

        default:
            break;
    }
}

GFD.prototype.changeStyleMode = function (mode) {

}

GFD.prototype.remove = function () {
    mainCanvas.removeChild(this.Graphic);
    this.Graphic.destroy();
    this.removed = true;
};