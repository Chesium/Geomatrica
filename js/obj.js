function newObj(type, subType, dfn, init) {
    O[N] = {
        //��O�б��е�����
        index: N,

        //����
        type: type,
        
        //������
        subType: subType,

        //����������,��ͬ��type��subtype��ʽ��ͬ
        dfn: { ...dfn },

        //��ʾ������,��ͬ��type��ʽ��ͬ
        data: {},

        //�洢һЩ��type��subtype����Ļ���
        cache: {},

        //���������򲻴���
        empty: false,

        //�����ϸ���������ĵ�����Ӷ���,��������Ϊtrue
        draggable: false,

        //�����ڳ�ʼ��ʱ�϶���ͼ
        drawable: false,

        //�Ӷ��������б�
        children: [],

        //�����������б�
        parents: [],

        //��Ҫ��PIXI��ʾ��ͼ��
        Graphic: new PIXI.Graphics(),

        //ѡ��ʱ ������ɼ���ͼ��������õ�PIXIͼ��
        margin: new PIXI.Graphics(),

        //����ȷ�Ͽɵ㷶Χ�Ĳ��ɼ�PIXIͼ��
        clickArea: new PIXI.Graphics(),

        //��ʶ�ö���ɵ㷶Χ���ڵľ����Ƿ�ı�
        boundChanged: false,

        //��ʶ�ö���ɵ㷶Χ����״�Ƿ�ı�
        bitmapChanged: false,

        //������ʾ��ʽ
        style: _DefaultStyle_,

        //�Ƿ����ڳ�ʼ��(drawing)
        initializing: false,

        //�Ƿ�ɼ�
        displaying: true,


        //(������)�ö���ɵ㷶Χ���ڵľ���
        boundbox: new PIXI.Graphics(),

        beginDraw: function (pos) {
            alert("beginDraw(", pos, ") function of object No.", this.index, "isn't defined!")
        },


        beginDrag: function (pos) {
            alert("beginDrag(", pos, ") function of object No.", this.index, "isn't defined!")
        },


        beginMove: function (pos) {
            alert("beginMove(", pos, ") function of object No.", this.index, "isn't defined!")
        },


        updateDrag: function (pos) {
            alert("updateDrag(", pos, ") function of object No.", this.index, "isn't defined!")
        },


        updateMove: function (pos) {
            alert("updateMove(", pos, ") function of object No.", this.index, "isn't defined!")
        },


        calcData: function () {
            alert("calcData() function of object No.", this.index, "isn't defined!")
        },


        update: function () {
            alert("update() function of object No.", this.index, "isn't defined!")
        },


        updateBound: function () {
            // console.log("updateBound:", this.index);
            let localBounds = this.clickArea.getLocalBounds()
            this.bound = [[Math.floor(localBounds.x), Math.floor(localBounds.y)], [Math.floor(localBounds.x + this.clickArea.width), Math.floor(localBounds.y + this.clickArea.height)]];

            this.boundbox.clear();
            if (showBoundBox) {
                this.boundbox.lineStyle(this.style.point.outline);
                this.boundbox.beginFill(0x000000, 0.1);
                this.boundbox.drawRect(this.bound[0][0], this.bound[0][1], this.bound[1][0] - this.bound[0][0], this.bound[1][1] - this.bound[0][1]);
            }
        },


        updateBitmap: function () {
            // console.log("updateBitmap:", this.index);
            let px = mainCanvasApp.renderer.plugins.extract.pixels(this.clickArea);
            // console.log(px);
            let tran = Array.from({ length: px.length / 4 }, (_, i) => px[4 * i + 3] + px[4 * i + 2] + px[4 * i + 1] + px[4 * i]);
            let width = Math.floor(this.clickArea.width);
            this.bitmap = Array.from({ length: Math.floor(this.clickArea.height) }, (_, i) => tran.slice(i * width, (i + 1) * width));
        },


        chooseByLocalPos: function (pos) {
            // console.log(pos, Math.floor(pos.y) - this.bound[0][1], Math.floor(pos.x) - this.bound[0][0], this.bitmap);
            return this.bitmap[Math.floor(pos.y) - this.bound[0][1]][Math.floor(pos.x) - this.bound[0][0]];
        },

        
        remove: function (pos) {
            for (let i in this.children) {
                this.children[i].remove();
            }
            this.clickArea.choosable = false;
            mainCanvas.removeChild(this.Graphic);
            mainCanvas.removeChild(this.clickArea);
            mainCanvas.removeChild(this.boundbox);
            mainCanvas.removeChild(this.margin);
            this.displaying = true;
        }
    }
    switch (type) {
        case 0://point
            pointInit(O[N], init);
            break;
        case 1://line
            lineInit(O[N], init);
            break;
        case 2://circle
            circleInit(O[N], init);
            break;
        default:
            alert("Unknown type!");
            break;
    }
    O[N].boundbox.zIndex = 100000;
    O[N].Graphic.obj = O[N];
    O[N].clickArea.obj = O[N];

    O[N].boundbox.choosable = false;
    O[N].Graphic.choosable = false;
    O[N].margin.choosable = false;
    O[N].clickArea.choosable = true;

    mainCanvas.addChild(O[N].margin);
    mainCanvas.addChild(O[N].Graphic);
    mainCanvas.addChild(O[N].boundbox);
    mainCanvas.addChild(O[N].clickArea);
    return O[N++];
}