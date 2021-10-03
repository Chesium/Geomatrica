import fact from "./fact";

export default class deduction {
  PPL: { index:number,cases: [boolean, boolean, boolean] }[][];
  PL: { cases: [boolean, boolean, boolean] }[][];
  PC: { cases: [boolean, boolean, boolean] }[][];
  CC: { cases: [boolean, boolean, boolean, boolean] }[][];

  facts: fact[];

  
}
