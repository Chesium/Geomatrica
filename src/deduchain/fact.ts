import deduction from "./deduction";
import type rule from "./rule";

export default abstract class fact {
  static typeName: string;
  typeName!: string;
  
  deduction!:deduction;
  index!:number;

  lemma!: rule;
  conditions: fact[] = [];//parents
  verified: boolean = false;

  verify(): boolean{
    return this.lemma.check(this);
  }
}
