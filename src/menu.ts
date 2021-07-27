import canvas from "./canvas";

export class nav {
  name: string;
  context: HTMLElement;
  callback: (cv: canvas) => void = () => {};
  element: HTMLElement;
  constructor(info: { name: string; context: HTMLElement }) {
    this.name = info.name;
    this.context = info.context;
  }
}

export class navL3 extends nav {
  L2: navL2;
  constructor(L2: navL2, info: { name: string; context: HTMLElement }) {
    super(info);
    this.L2 = L2;
    if (!L2.haveL3option) {
      console.error("L2 is unable to have L3 options");
      return;
    }
    this.element = document.createElement("li");
    this.element.appendChild(this.context);
    this.element.classList.add("nav-L3");
    this.L2.lsElement.appendChild(this.element);
  }
}

export class navL2 extends nav {
  haveL3option: boolean = false;
  L3options: navL3[] = [];
  L1: navL1;
  lsElement?: HTMLElement;
  constructor(L1: navL1, info: { name: string; context: HTMLElement }, L3: boolean) {
    super(info);
    this.L1 = L1;
    this.haveL3option = L3;
    this.element = document.createElement("li");
    this.element.appendChild(this.context);
    if (L3) {
      this.lsElement = document.createElement("ul");
      this.lsElement.classList.add("navls-L2");
      this.element.appendChild(this.lsElement);
    }
    this.element.classList.add("nav-L2");
    this.L1.lsElement.appendChild(this.element);
  }
}

export class navL1 {
  name: string;
  context: HTMLElement;
  element: HTMLElement;
  lsElement: HTMLElement;
  L2options: navL2[] = [];
  menu: menu;
  constructor(menu: menu, info: { name: string; context: HTMLElement }) {
    this.name = info.name;
    this.context = info.context;
    this.menu = menu;
    this.element = document.createElement("li");
    this.element.appendChild(this.context);
    this.element.classList.add("nav-L1");
    this.menu.element.appendChild(this.element);

    this.lsElement = document.createElement("ul");
    this.lsElement.classList.add("navls-L1");
    this.element.appendChild(this.lsElement);
  }
}

export default class menu {
  element: HTMLElement;
  L1options: navL1[] = [];
  canvas: canvas;
  titlebar: HTMLElement;
  constructor(cv: canvas, titleBar: HTMLElement) {
    this.canvas = cv;
    this.titlebar = titleBar;
    this.element = document.createElement("ul");
    this.element.classList.add("menu");
    this.titlebar.appendChild(this.element);
  }
}
