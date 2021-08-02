import rule from "./rule";

export default abstract class fact {
  static typeName:string;
  typeName:string;
  lemma:rule;
  conditions:fact[];
}
