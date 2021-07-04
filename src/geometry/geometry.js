import * as Points from "./point/Points.js";
import * as Lines from "./line/Lines.js";
import * as Circles from "./circle/Circles.js";

export default function geometryFromType(type, dfnType, dfn, initData, obj) {
  switch (type) {
    case 0: //点
      switch (dfnType) {
        case 0:
          return new Points.freePoint(dfn, initData, obj);
        case 1:
          return new Points.pointOnLine(dfn, initData, obj);
        case 2:
          return new Points.pointOnCircle(dfn, initData, obj);
        case 3:
          return new Points.itsc_LL(dfn, initData, obj);
        case 4:
          return new Points.itsc_CC_1(dfn, initData, obj);
        case 5:
          return new Points.itsc_CC_2(dfn, initData, obj);
        case 6:
          return new Points.itsc_LC_1(dfn, initData, obj);
        case 7:
          return new Points.itsc_LC_2(dfn, initData, obj);
        default:
          break;
      }
      break;
    case 1: //线
      switch (dfnType) {
        case 0:
          return new Lines.segment(dfn, initData, obj);
        case 1:
          return new Lines.line(dfn, initData, obj);
        case 2:
          return new Lines.halfLine(dfn, initData, obj);
        case 3:
          return new Lines.perpendicular(dfn, initData, obj);
        case 4:
          return new Lines.parallelLine(dfn, initData, obj);
        case 5:
          return new Lines.extensionLine(dfn, initData, obj);
        case 6:
          return new Lines.angleBisector_1(dfn, initData, obj);
        case 7:
          return new Lines.angleBisector_2(dfn, initData, obj);
        case 8:
          return new Lines.angleBisector_3(dfn, initData, obj);
        default:
          break;
      }
      break;
    case 2: //圆
      switch (dfnType) {
        case 0:
          return new Circles.circle(dfn, initData, obj);
        default:
          break;
      }
      break;
    default:
      break;
  }
}
