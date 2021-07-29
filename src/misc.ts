/**
 * ## 显示用坐标
 */
export class pos {
  //二维坐标
  x: number = NaN;
  y: number = NaN;
}
/**
 * ## 计算用坐标
 */
export class crd {
  //二维坐标
  x: number = NaN;
  y: number = NaN;
}

// export const EMPTY_P = { x: NaN, y: NaN };
/**
 * ## 数对
 *
 * ---
 * 另一种平面坐标 可用于扩展运算符`...`
 */
export type pair = [number, number];
/**
 * ## 范围
 *
 * ---
 * 描述一个范围
 */
export type range = pair;
export const REAL_NUMBER: range = [-Infinity, Infinity];
/**
 * ## 线的标准显示用数据
 * 描述一个参数方程组:
 * 1) x=at+b
 * 2) y=ct+d  t∈r
 */
export class stdLine {
  exist: boolean = false;
  a: number = NaN;
  b: number = NaN;
  c: number = NaN;
  d: number = NaN;
  r: pair = REAL_NUMBER;
  dr?: -1 | 1 = 1;
  refP_t?: pair = [NaN, NaN];
}

// export const EMPTY_LINE: stdLine = {
//   exist: false,
//   a: NaN,
//   b: NaN,
//   c: NaN,
//   d: NaN,
//   r: REAL_NUMBER,
//   dr: 1,
//   refP_t: [NaN, NaN],
// };

export class stdCircle extends crd {
  exist: boolean=false;
  r: number=NaN;
}

// export const EMPTY_CIRCLE: stdCircle = {
//   exist: false,
//   x: NaN,
//   y: NaN,
//   r: NaN,
// };

/**
 * ## 矩形
 *
 * ---
 * 描述一个矩形
 * 格式 : `[左下点坐标,右上点坐标]`
 */
export type rect = [pair, pair];
