/**
 * ## 显示用坐标
 */
export interface pos {
  //二维坐标
  x: number;
  y: number;
}
/**
 * ## 计算用坐标
 */
export type crd = pos;
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
/**
 * ## 线的标准显示用数据
 * 描述一个参数方程组:
 * 1) x=at+b
 * 2) y=ct+d  t∈r
 */
export interface stdLine {
  exist: boolean;
  a: number;
  b: number;
  c: number;
  d: number;
  r: pair;
  dr?: -1 | 1;
  refP_t?: pair;
}
/**
 * ## 矩形
 *
 * ---
 * 描述一个矩形
 * 格式 : `[左下点坐标,右上点坐标]`
 */
export type rect = [pair, pair];
