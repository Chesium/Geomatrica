import { rect, stdLine, pos, pair, crd, range } from "./misc";
import obj from "./object";
import { drawCase } from "./drawingMode";
import canvas from "./canvas";

export function posForm(pair: pair): pos {
  //将pos对象转为pair二元组
  return { x: pair[0], y: pair[1] };
}

export function pairForm(pos: pos): pair {
  //将pair二元组转为pos对象
  return [pos.x, pos.y];
}

export function L_DpData_To_epCrd(l: stdLine, VF: rect): [boolean, crd, crd] {
  /*
   *      y
   *      ^
   *  +-------N
   *  |*******|
   *  |*******|  > x
   *  M-------+
   *
   *   00  01   10   11
   * [[Xm, Ym],[Xn, Yn]]
   */
  //根据线类的显示数据和显示区域矩形 计算 该线在该区域中的两端点位置(crd,非pos)
  //若画面中该线不可见 则返回的元组中第一个布尔值为false
  // console.log(l,VF);
  //visual field
  var Xm: number = VF[0][0],
    Yn: number = VF[0][1], //changed
    Xn: number = VF[1][0],
    Ym: number = VF[1][1]; //changed ^ swapped
  if (l.a == 0) {
    if (l.c == 0) {
      console.log("ERROR in L_DpData_To_epCrd: the line doesn't exist.");
      return [false, { x: NaN, y: NaN }, { x: NaN, y: NaN }];
    }
    //[|]
    if (l.b < Xm || l.b > Xn) {
      return [false, { x: NaN, y: NaN }, { x: NaN, y: NaN }];
    }
    var tM: number = (Ym - l.d) / l.c,
      tN: number = (Yn - l.d) / l.c;
    var t1: number = Math.max(Math.min(l.r[0], l.r[1]), Math.min(tM, tN)),
      t2: number = Math.min(Math.max(l.r[0], l.r[1]), Math.max(tM, tN));
  } else if (l.c == 0) {
    //[-]
    // console.log("c==0", l.d, Ym, Yn);
    if (l.d < Ym || l.d > Yn) {
      return [false, { x: NaN, y: NaN }, { x: NaN, y: NaN }];
    }
    // console.log("access");
    var tM: number = (Xm - l.b) / l.a,
      tN: number = (Xn - l.b) / l.a;
    var t1: number = Math.max(Math.min(l.r[0], l.r[1]), Math.min(tM, tN)),
      t2: number = Math.min(Math.max(l.r[0], l.r[1]), Math.max(tM, tN));
  } else {
    //[/]
    //compare X
    var Ym_t: number = (Ym - l.d) / l.c,
      Yn_t: number = (Yn - l.d) / l.c,
      Xm_t: number = (Xm - l.b) / l.a,
      Xn_t: number = (Xn - l.b) / l.a;
    var Ym_t_X: number = Ym_t * l.a + l.b,
      Yn_t_X: number = Yn_t * l.a + l.b;
    var Ymn_minX: number = Math.min(Ym_t_X, Yn_t_X),
      Ymn_maxX: number = Math.max(Ym_t_X, Yn_t_X),
      Ymn_minX_t: number = Ym_t_X < Yn_t_X ? Ym_t : Yn_t,
      Ymn_maxX_t: number = Ym_t_X > Yn_t_X ? Ym_t : Yn_t;
    if ((Ymn_minX < Xm && Ymn_maxX < Xm) || (Ymn_minX > Xn && Ymn_maxX > Xn)) {
      return [false, { x: 0, y: 0 }, { x: 0, y: 0 }];
    }
    var tA: number = Ymn_minX > Xm ? Ymn_minX_t : Xm_t,
      tB: number = Ymn_maxX < Xn ? Ymn_maxX_t : Xn_t;
    var t1: number = Math.max(Math.min(l.r[0], l.r[1]), Math.min(tA, tB)),
      t2: number = Math.min(Math.max(l.r[0], l.r[1]), Math.max(tA, tB));
  }
  return [true, { x: l.a * t1 + l.b, y: l.c * t1 + l.d }, { x: l.a * t2 + l.b, y: l.c * t2 + l.d }];
}

export function generateName(shapeName: string, index: number): string {
  //根据索引生成不同形状对象的默认名称
  //latex
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  switch (shapeName) {
    case "point": //point
      var name: string = upper[index % 26];
      var subscript: number = Math.floor(index / 26);
      return subscript > 0 ? name + "_{" + subscript + "}" : name;
    case "line": //line
      return "l" + "_{" + (index + 1) + "}";
    case "circle": //circle
      return "c" + "_{" + (index + 1) + "}";
    default:
      break;
  }
}

export function getOffsetLeft(obj: any) {
  //获取一个HTMLElement的Left位置
  var tmp: number = obj.offsetLeft;
  var node = obj.offsetParent;
  while (node != null) {
    tmp += node.offsetLeft;
    node = node.offsetParent;
  }
  return tmp;
}

export function getOffsetTop(obj: any) {
  //获取一个HTMLElement的Top位置
  var tmp: number = obj.offsetTop;
  var node = obj.offsetParent;
  while (node != null) {
    tmp += node.offsetTop;
    node = node.offsetParent;
  }
  return tmp;
}

export function floatAdd(a: number, b: number) {
  //无误差浮点数加法
  var c: number, d: number, e: number;
  try {
    c = a.toString().split(".")[1].length;
  } catch (f) {
    c = 0;
  }
  try {
    d = b.toString().split(".")[1].length;
  } catch (f) {
    d = 0;
  }
  return (e = Math.pow(10, Math.max(c, d))), (floatMul(a, e) + floatMul(b, e)) / e;
}

export function floatMul(a: number, b: number) {
  //无误差浮点数乘法
  var c: number = 0,
    d: string = a.toString(),
    e: string = b.toString();
  try {
    c += d.split(".")[1].length;
  } catch (f) {}
  try {
    c += e.split(".")[1].length;
  } catch (f) {}
  return (Number(d.replace(".", "")) * Number(e.replace(".", ""))) / Math.pow(10, c);
}

export function isAvailable(
  Case: drawCase | ((canvas: canvas, crd?: pos) => void) | undefined
): Case is drawCase {
  if (Case == undefined) {
    return false;
  }
  return (
    (<drawCase>Case).constructor !== undefined &&
    (<(canvas: canvas, crd?: pos) => void>Case).call === undefined
  );
}

export function calcIntersectionLL(l1: stdLine, l2: stdLine): { exist: boolean; t1: number; t2: number } {
  var dnmnt = l1.a * l2.c - l2.a * l1.c;
  if (dnmnt == 0) {
    return { exist: false, t1: NaN, t2: NaN };
  }
  return {
    exist: true,
    t1: (l2.b * l2.c - l1.b * l2.c + l2.a * l1.d - l2.a * l2.d) / dnmnt,
    t2: (l2.b * l1.c - l1.b * l1.c + l1.a * l1.d - l1.a * l2.d) / dnmnt,
  };
}

export function substituteIntoLineEq(t: number, l: stdLine): crd {
  return { x: l.a * t + l.b, y: l.c * t + l.d };
}

export const allReal: range = [-Infinity, Infinity];

export function calcLineEq(p1: crd, p2: crd): stdLine {
  if (p1.x == p2.x) {
    if (p1.y == p2.y) {
      return {
        exist: false,
        a: NaN,
        b: NaN,
        c: NaN,
        d: NaN,
        r: allReal,
        dr: 1,
        refP_t: [NaN, NaN],
      };
    }
    return {
      exist: true,
      a: 0,
      b: p1.x,
      c: 1,
      d: 0,
      r: allReal,
      dr: p1.y < p2.y ? 1 : -1,
      refP_t: [p1.y, p2.y],
    };
  } else {
    var k = (p1.y - p2.y) / (p1.x - p2.x);
    return {
      exist: true,
      a: 1,
      b: 0,
      c: k,
      d: p1.y - k * p1.x,
      r: allReal,
      dr: p1.x < p2.x ? 1 : -1,
      refP_t: [p1.x, p2.x],
    };
  }
}
