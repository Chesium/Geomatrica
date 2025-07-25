import type ddcObj from "../ddcObj";
import fact from "../fact";

export default interface collineation extends fact {
  typeName : "collineation";
  points:ddcObj[];
}