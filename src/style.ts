import { LINE_CAP } from "pixi.js";
import { ILineStyleOptions } from "pixi.js";

/**
 * ## 图形对象的样式
 */
export class style {
  /**
   * ## 点的样式列表
   *
   * ---
   * 位置相同，互相堆叠，靠前的先渲染
   */
  point: {
    /**
     * ## 直径
     */
    radius: number;
    /**
     * ## 颜色
     */
    color: number;
    /**
     * ## 不透明度
     */
    alpha: number;
    /**
     * ## 轮廓线格式
     */
    outline: ILineStyleOptions;
  }[];
  /**
   * ## 线的样式列表
   *
   * ---
   * 位置相同，互相堆叠，靠前的先渲染
   */
  line: ILineStyleOptions[];
}

var defaultStyle: style = {
  point: [
    {
      radius: 5,
      color: 0x1565c0,
      alpha: 1,
      outline: {
        width: 1,
        color: 0x000000,
        alpha: 1,
        cap: LINE_CAP.ROUND,
      },
    },
  ],
  line: [
    {
      width: 2.5,
      color: 0x7b7b7b,
      alpha: 1,
      cap: LINE_CAP.ROUND,
    },
  ],
};

var focusStyle: style = {
  point: [
    {
      //margin
      radius: 10,
      color: 0xff0000,
      alpha: 0.2,
      outline: {},
    },
    {
      radius: 5,
      color: 0x1565c0,
      alpha: 1,
      outline: {
        width: 1,
        color: 0x000000,
        alpha: 1,
        cap: LINE_CAP.ROUND,
      },
    },
  ],
  line: [
    {
      //margin
      width: 7,
      color: 0xdfdfdf,
      alpha: 1,
      cap: LINE_CAP.ROUND,
    },
    {
      width: 2.5,
      color: 0x7b7b7b,
      alpha: 1,
      cap: LINE_CAP.ROUND,
    },
  ],
};

export { defaultStyle, focusStyle };
