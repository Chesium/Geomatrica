import { ILineStyleOptions } from "pixi.js";

export interface pos {
  //二维坐标
  x: number;
  y: number;
}

export type crd = pos;

export type pair = [number, number]; //另一种二维坐标 可用于扩展运算符"..."
export type range = pair; //范围

export interface line {
  //线类标准显示用数据
  //描述一个参数方程组:
  //1) x=at+b
  //2) y=ct+d  t∈r
  a: number;
  b: number;
  c: number;
  d: number;
  r: pair;
}

export type rect = [pair, pair]; //矩形格式 [左下点坐标,右上点坐标]

export class style {
  //对象样式格式
  point: {
    radius: number;
    color: number;
    alpha: number;
    outline: ILineStyleOptions;
  }[];
  line: ILineStyleOptions[];
}
