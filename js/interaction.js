mainCanvasApp.renderer.plugins.interaction.on("pointerdown", (event) => {
    let pos = { x: event.data.global.x, y: event.data.global.y };
    var FI = chooseByGlobalPos(pos);
    // console.log("Focus on Object No.", FI);
    switch (Cmode) {
        case 0://�϶�ģʽ
            if (FI != -1) {
                O[FI].beginDrag(pos);
            }
            break;
        case 1://����ģʽ
            if (FI == -1) {
                newObj(1, 1, { p: [newObj(0, 1, {}, pos), newObj(0, 1, {}, pos)] });
            } else {
                switch (O[FI].type) {
                    case 0://�����е㿪ʼ����
                        newObj(1, 1, { p: [O[FI], newObj(0, 1, {}, pos)] });
                        break;
                    case 1://����ʱ�㵽��
                        newObj(1, 1, { p: [newObj(0, 2, { l: O[FI] }, pos), newObj(0, 1, {}, pos)] });
                        break;
                    case 2://����ʱ�㵽Բ
                        newObj(1, 1, { p: [newObj(0, 3, { c: O[FI] }, pos), newObj(0, 1, {}, pos)] });
                        break;
                    default:
                        break;
                }
            }
            O[N - 1].beginDraw(pos);
            break;
        case 2://����ģʽ
            if (FI == -1) {
                newObj(0, 1, {}, pos);//��㻭����
            } else {
                switch (O[FI].type) {
                    case 0://����ʱ�����
                        
                        break;
                    case 1://����ʱ�㵽��
                        newObj(0, 2, { l: O[FI] }, pos);
                        break;
                    case 2://����ʱ�㵽Բ
                        newObj(0, 3, { c: O[FI] }, pos);
                        break;
                    default:
                        break;
                }
            }
            break;
        case 3://��Բģʽ
            if (FI == -1) {
                newObj(2, 1, { p: [newObj(0, 1, {}, pos), newObj(0, 1, {}, pos)] });
            } else {
                switch (O[FI].type) {
                    case 0://�����е㿪ʼ��Բ
                        newObj(2, 1, { p: [O[FI], newObj(0, 1, {}, pos)] });
                        break;
                    case 1://��Բʱ�㵽��
                        newObj(2, 1, { p: [newObj(0, 2, { l: O[FI] }, pos), newObj(0, 1, {}, pos)] });
                        break;
                    case 2://��Բʱ�㵽Բ
                        newObj(2, 1, { p: [newObj(0, 3, { c: O[FI] }, pos), newObj(0, 1, {}, pos)] });
                        break;
                    default:
                        break;
                }
            }
            O[N - 1].beginDraw(pos);
            break;
        case 4://��ֱ��ģʽ
            if (FI == -1) {
                newObj(1, 2, { p: [newObj(0, 1, {}, pos), newObj(0, 1, {}, pos)] });
            } else {
                switch (O[FI].type) {
                    case 0://�����е㿪ʼ��ֱ��
                        newObj(1, 2, { p: [O[FI], newObj(0, 1, {}, pos)] });
                        break;
                    case 1://��ֱ��ʱ�㵽��
                        newObj(1, 2, { p: [newObj(0, 2, { l: O[FI] }, pos), newObj(0, 1, {}, pos)] });
                        break;
                    case 2://��ֱ��ʱ�㵽Բ
                        newObj(1, 2, { p: [newObj(0, 3, { c: O[FI] }, pos), newObj(0, 1, {}, pos)] });
                        break;
                    default:
                        break;
                }
            }
            O[N - 1].beginDraw(pos);
            break;
        case 5://������ģʽ
            if (FI == -1) {
                newObj(1, 3, { p: [newObj(0, 1, {}, pos), newObj(0, 1, {}, pos)] });
            } else {
                switch (O[FI].type) {
                    case 0://�����е㿪ʼ������
                        newObj(1, 3, { p: [O[FI], newObj(0, 1, {}, pos)] });
                        break;
                    case 1://������ʱ�㵽��
                        newObj(1, 3, { p: [newObj(0, 2, { l: O[FI] }, pos), newObj(0, 1, {}, pos)] });
                        break;
                    case 2://������ʱ�㵽Բ
                        newObj(1, 3, { p: [newObj(0, 3, { c: O[FI] }, pos), newObj(0, 1, {}, pos)] });
                        break;
                    default:
                        break;
                }
            }
            O[N - 1].beginDraw(pos);
            break;
        default:
            break;
    }
});

mainCanvasApp.renderer.plugins.interaction.on("pointermove", (event) => {
    let pos = { x: event.data.global.x, y: event.data.global.y };
    if(moving){
        O[F].updateDrag(pos);
    }
});

mainCanvasApp.renderer.plugins.interaction.on("pointerup", (event) => {
    let pos = { x: event.data.global.x, y: event.data.global.y };
    if (F != -1) {
        if (O[F].initializing) {
            O[F].initializing = false;
            var FI = chooseByGlobalPos(pos);
            // console.log(`FI:${FI}`);
            if (FI != -1) {
                var stickP;
                switch (O[FI].type) {
                    case 0://�ڵ�������
                        stickP=O[FI];
                        break;

                    case 1://����������
                        stickP = newObj(0, 2, { l: O[FI] }, pos);
                        break;

                    case 2://��Բ������
                        stickP = newObj(0, 3, { c: O[FI] }, pos);
                        break;
                
                    default:
                        break;
                }
                stickP.children.push(O[F].children[0]);
                O[F].children[0].parents.pop();
                O[F].children[0].parents.push(stickP);
                O[F].children[0].dfn.p[1] = stickP;
                O[F].children.pop();
                O[F].remove();
            }
        }
    }
    for (let i in O) {
        // console.log(O[i].index, O[i].boundChanged, O[i].bitmapChanged);
        if (O[i].boundChanged == 1) {
            O[i].updateBound();
            O[i].boundChanged = 0;
        }
        if (O[i].bitmapChanged == 1) {
            O[i].updateBitmap();
            O[i].bitmapChanged = 0;
        }
    }
    F=-1;
    moving = false;
});