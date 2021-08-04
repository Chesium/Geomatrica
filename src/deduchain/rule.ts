import fact from "./fact";

export default class rule {
  name: string;
  description: string;

  check: (fact: fact) => boolean;
  deduce: (facts: fact[]) => fact | undefined;
}
