import dm_drawPoint from "./drawPoint.dm";
import dm_intersection from "./intersection.dm";
import dm_move from "./move.dm";
import dm_segment from "./twoPointsObj/segment.dm";
import dm_halfLine from "./twoPointsObj/halfLine.dm";
import dm_straightLine from "./twoPointsObj/straightLine.dm";
import dm_extensionLine from "./twoPointsObj/extensionLine.dm";
import dm_CP_circle from "./twoPointsObj/CP_circle.dm";
import dm_perpendicular from "./perpendicular.dm";
import dm_parallelLine from "./parallelLine.dm";
import dm_midPoint from "./midPoint.dm";
import dm_angleBisector from "./angleBisector.dm";
import dm_tangent from "./tangent.dm";
import dm_perpendicularBisector from "./perpendicularBisector.dm";
import dm_circumcircle from "./circumcircle.dm";

export {
  dm_drawPoint,
  dm_intersection,
  dm_move,
  dm_segment,
  dm_halfLine,
  dm_straightLine,
  dm_extensionLine,
  dm_CP_circle,
  dm_perpendicular,
  dm_parallelLine,
  dm_midPoint,
  dm_angleBisector,
  dm_tangent,
  dm_perpendicularBisector,
  dm_circumcircle,
};

export const dms = [
  dm_move,
  dm_drawPoint,
  dm_segment,
  dm_intersection,
  dm_halfLine,
  dm_straightLine,
  dm_extensionLine,
  dm_CP_circle,
  dm_perpendicular,
  dm_parallelLine,
  dm_midPoint,
  dm_angleBisector,
  dm_tangent,
  dm_perpendicularBisector,
  dm_circumcircle,
];
