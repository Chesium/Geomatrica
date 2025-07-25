import fact from "./fact";

export default interface rule {
  name: string;
  description: string;

  check: (fact: fact) => boolean;
  deduce: (facts: fact[]) => fact | undefined;
}
