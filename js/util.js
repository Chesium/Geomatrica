function chooseByGlobalPos(pos) {
    var IAAs = IAseq.flat(Infinity);
    for (var i in IAAs) {
        if (!IAAs[i].removed) {
            if (IAAs[i].bound[0][0] <= pos.x && pos.x <= IAAs[i].bound[1][0] && IAAs[i].bound[0][1] <= pos.y && pos.y <= IAAs[i].bound[1][1]) {
                if (IAAs[i].checkBitmap(pos)) {
                    return IAAs[i].obj.index;
                }
            }
        }
    }
    return -1;
}

//     y
//     ^
// +-------N
// |*******|
// |*******|  > x
// M-------+

//  00  01   10   11
//[[Xm, Ym],[Xn, Yn]]

function L_DpData_To_epCrd(l, VF) {//visual field
    var Xm = VF[0][0],
        Ym = VF[0][1],
        Xn = VF[1][0],
        Yn = VF[1][1];
    if (l.a == 0) {
        if (l.c == 0) {
            console.log("ERROR in L_DpData_To_epCrd: the line doesn't exist.");
            return;
        }
        //[|]
        if (l.b < Xm || l.b > Xn) {
            return [false, [0, 0], [0, 0]];
        }
        var tM = (Ym - l.d) / l.c,
            tN = (Yn - l.d) / l.c;
        var t1 = Math.max(Math.min(l.r[0], l.r[1]), Math.min(tM, tN)),
            t2 = Math.min(Math.max(l.r[0], l.r[1]), Math.max(tM, tN));
    } else if (l.c == 0) {
        //[-]
        if (l.d < Ym || l.d > Yn) {
            return [false, [0, 0], [0, 0]];
        }
        var tM = (Xm - l.b) / l.a,
            tN = (Xn - l.b) / l.a;
        var t1 = Math.max(Math.min(l.r[0], l.r[1]), Math.min(tM, tN)),
            t2 = Math.min(Math.max(l.r[0], l.r[1]), Math.max(tM, tN));
    } else {
        //[/]
        //compare X
        var Ym_t = (Ym - l.d) / l.c,
            Yn_t = (Yn - l.d) / l.c,
            Xm_t = (Xm - l.b) / l.a,
            Xn_t = (Xn - l.b) / l.a;
        var Ym_t_X = Ym_t * l.a + l.b,
            Yn_t_X = Yn_t * l.a + l.b;
        var Ymn_minX = Math.min(Ym_t_X, Yn_t_X),
            Ymn_maxX = Math.max(Ym_t_X, Yn_t_X),
            Ymn_minX_t = Ym_t_X < Yn_t_X ? Ym_t : Yn_t,
            Ymn_maxX_t = Ym_t_X > Yn_t_X ? Ym_t : Yn_t;
        if ((Ymn_minX < Xm && Ymn_maxX < Xm) || (Ymn_minX > Xn && Ymn_maxX > Xn)) {
            return [false, [0, 0], [0, 0]];
        }
        var tA = Ymn_minX > Xm ? Ymn_minX_t : Xm_t,
            tB = Ymn_maxX < Xn ? Ymn_maxX_t : Xn_t;
        var t1 = Math.max(Math.min(l.r[0], l.r[1]), Math.min(tA, tB)),
            t2 = Math.min(Math.max(l.r[0], l.r[1]), Math.max(tA, tB));
    }
    return [true, [l.a * t1 + l.b, l.c * t1 + l.d], [l.a * t2 + l.b, l.c * t2 + l.d]];
}

function _p(x, y) {
    return { x: x, y: y };
}

function _l(a, b, c, d, r, dr) {
    return { a: a, b: b, c: c, d: d, r: r, dr: dr };
}

function _c(x, y, r) {
    return { x: x, y: y, r: r };
}

function changeMode(newMode) {
    mode = newMode;
    clearChooseList();
    switch (mode) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
            break;

        case 6://两对象交点
            processFn = () => {
                switch (chooseObjs.length) {
                    case 0:
                        //Nothing to do
                        break;

                    case 1:
                        if (chooseObjs[0].geometry.type == 0) {
                            console.log("not supported");
                            chooseObjs.pop();
                        }
                        chooseObjs[0].GFD.changeStyleMode(1);
                        break;

                    case 2:
                        if (chooseObjs[1].geometry.type != chooseObjs[0].geometry.type) {
                            console.log("not supported");
                            chooseObjs.pop();
                        } else {
                            if (chooseObjs[0].geometry.type == 1) {//两线交点
                                new obj(0, 3, { l: [chooseObjs[0].geometry, chooseObjs[1].geometry] }, {});
                            } else {//两圆交点
                                new obj(0, 4, { c: [chooseObjs[0].geometry, chooseObjs[1].geometry] }, {});
                                new obj(0, 5, { c: [chooseObjs[0].geometry, chooseObjs[1].geometry] }, {});
                            }
                            clearChooseList();
                        }
                        break;

                    default:
                        break;
                }
            }
            break;
        default:
            break;
    }
}

function clearChooseList() {
    for (var i in chooseObjs) {
        chooseObjs[i].GFD.changeStyleMode(0);
    }
    chooseObjs.length = 0;
}