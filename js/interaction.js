mainCanvasApp.renderer.plugins.interaction.on("pointerdown", (event) => {
    let pos = { x: event.data.global.x, y: event.data.global.y };
    var FI = chooseByGlobalPos(pos);
    // console.log("Focus on Object No.", FI);
    switch (mode) {
        case 0://�϶�ģʽ
            if (FI != -1) {
                // console.log(O[FI].geometry);
                O[FI].geometry.beginDrag(pos);
            }
            break;
        case 1://����ģʽ
            if (FI == -1) {
                new obj(1, 0, { p: [(new obj(0, 0, {}, { pos: pos })).geometry, (new obj(0, 0, {}, { pos: pos }).geometry)] }, {});
            } else {
                switch (O[FI].geometry.type) {
                    case 0://�����е㿪ʼ����
                        new obj(1, 0, { p: [O[FI].geometry, (new obj(0, 0, {}, { pos: pos }).geometry)] }, {});
                        break;
                    case 1://����ʱ�㵽��
                        new obj(1, 0, { p: [new obj(0, 1, { l: O[FI].geometry }, { pos: pos }).geometry, (new obj(0, 0, {}, { pos: pos }).geometry)] }, {});
                        break;
                    case 2://����ʱ�㵽Բ
                        new obj(1, 0, { p: [new obj(0, 2, { c: O[FI].geometry }, { pos: pos }).geometry, (new obj(0, 0, {}, { pos: pos }).geometry)] }, {});
                        break;
                    default:
                        break;
                }
            }
            O[O.length - 1].geometry.beginDraw(pos);
            break;
        case 2://����ģʽ
            if (FI == -1) {
                new obj(0, 0, {}, { pos: pos });
            } else {
                switch (O[FI].geometry.type) {
                    case 0://����ʱ�����

                        break;
                    case 1://����ʱ�㵽��
                        new obj(0, 1, { l: O[FI].geometry }, { pos: pos });
                        break;
                    case 2://����ʱ�㵽Բ
                        new obj(0, 2, { c: O[FI].geometry }, { pos: pos });
                        break;
                    default:
                        break;
                }
            }
            break;
        case 3://��Բģʽ
            if (FI == -1) {
                new obj(2, 0, { p: [(new obj(0, 0, {}, { pos: pos })).geometry, (new obj(0, 0, {}, { pos: pos }).geometry)] },{});
            } else {
                switch (O[FI].geometry.type) {
                    case 0://�����е㿪ʼ��Բ
                        new obj(2, 0, { p: [O[FI].geometry, (new obj(0, 0, {}, { pos: pos }).geometry)] }, {});
                        break;
                    case 1://��Բʱ�㵽��
                        new obj(2, 0, { p: [new obj(0, 1, { l: O[FI].geometry }, { pos: pos }).geometry, (new obj(0, 0, {}, { pos: pos }).geometry)] }, {});
                        break;
                    case 2://��Բʱ�㵽Բ
                        new obj(2, 0, { p: [new obj(0, 2, { c: O[FI].geometry }, { pos: pos }).geometry, (new obj(0, 0, {}, { pos: pos }).geometry)] }, {});
                        break;
                    default:
                        break;
                }
            }
            O[O.length - 1].geometry.beginDraw(pos);
            break;
        case 4://��ֱ��ģʽ
            if (FI == -1) {
                new obj(1, 1, { p: [(new obj(0, 0, {}, { pos: pos })).geometry, (new obj(0, 0, {}, { pos: pos }).geometry)] }, {});
            } else {
                switch (O[FI].geometry.type) {
                    case 0://�����е㿪ʼ����
                        new obj(1, 1, { p: [O[FI].geometry, (new obj(0, 0, {}, { pos: pos }).geometry)] }, {});
                        break;
                    case 1://����ʱ�㵽��
                        new obj(1, 1, { p: [new obj(0, 1, { l: O[FI].geometry }, { pos: pos }).geometry, (new obj(0, 0, {}, { pos: pos }).geometry)] }, {});
                        break;
                    case 2://����ʱ�㵽Բ
                        new obj(1, 1, { p: [new obj(0, 2, { c: O[FI].geometry }, { pos: pos }).geometry, (new obj(0, 0, {}, { pos: pos }).geometry)] }, {});
                        break;
                    default:
                        break;
                }
            }
            O[O.length - 1].geometry.beginDraw(pos);
            break;
        case 5://������ģʽ
            if (FI == -1) {
                new obj(1, 2, { p: [(new obj(0, 0, {}, { pos: pos })).geometry, (new obj(0, 0, {}, { pos: pos }).geometry)] }, {});
            } else {
                switch (O[FI].geometry.type) {
                    case 0://�����е㿪ʼ����
                        new obj(1, 2, { p: [O[FI].geometry, (new obj(0, 0, {}, { pos: pos }).geometry)] }, {});
                        break;
                    case 1://����ʱ�㵽��
                        new obj(1, 2, { p: [new obj(0, 1, { l: O[FI].geometry }, { pos: pos }).geometry, (new obj(0, 0, {}, { pos: pos }).geometry)] }, {});
                        break;
                    case 2://����ʱ�㵽Բ
                        new obj(1, 2, { p: [new obj(0, 2, { c: O[FI].geometry }, { pos: pos }).geometry, (new obj(0, 0, {}, { pos: pos }).geometry)] }, {});
                        break;
                    default:
                        break;
                }
            }
            O[O.length - 1].geometry.beginDraw(pos);
            break;
        case 6://����
            if (FI == -1) {
                clearChooseList();
            } else {
                chooseObjs.push(O[FI]);
                processFn();
            }
            break;
        default:
            break;
    }
});

mainCanvasApp.renderer.plugins.interaction.on("pointermove", (event) => {
    let pos = { x: event.data.global.x, y: event.data.global.y };
    if (Status == 1) {
        O[F].geometry.updDrag(pos);
    }
});

mainCanvasApp.renderer.plugins.interaction.on("pointerup", (event) => {
    let pos = { x: event.data.global.x, y: event.data.global.y };
    if (F != -1) {
        if (O[F].geometry.initializing) {
            O[F].geometry.initializing = false;
            var FI = chooseByGlobalPos(pos);
            // console.log(`FI:${FI}`);
            if (FI != -1) {
                var stickP;
                switch (O[FI].geometry.type) {
                    case 0://�ڵ�������
                        stickP = O[FI].geometry;
                        break;

                    case 1://����������
                        stickP = new obj(0, 1, { l: O[FI].geometry }, { pos: pos }).geometry;
                        break;

                    case 2://��Բ������
                        stickP = new obj(0, 2, { c: O[FI].geometry }, { pos: pos }).geometry;
                        break;

                    default:
                        break;
                }
                stickP.children.push(O[F].geometry.children[0]);
                O[F].geometry.children[0].parents.pop();
                O[F].geometry.children[0].parents.push(stickP);
                O[F].geometry.children[0].dfn.p[1] = stickP;
                O[F].geometry.children.pop();
                O[F].remove();
            }
        }
    }
    var IAAs=IAseq.flat(Infinity);
    for (var i in IAAs) {
        if(IAAs[i].removed){
            continue;
        }
        // console.log(O[i].index, O[i].boundChanged, O[i].bitmapChanged);
        if (IAAs[i].needUpdBound) {
            IAAs[i].updBound();
            IAAs[i].needUpdBound = false;
        }
        if (IAAs[i].needUpdBitmap) {
            IAAs[i].updBitmap();
            IAAs[i].needUpdBitmap = false;
        }
    }
    F = -1;
    Status = 0;
});