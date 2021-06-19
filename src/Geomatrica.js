

PIXI.settings.SORTABLE_CHILDREN = true;
import { canvas } from "./canvas.js";
var cv = new canvas();
// console.log(cv);

//////////////////////////////////////////////////////////////////////////////
const toolbar = document.getElementById("toolbar");
const buttonN = 7;
const buttonsMode = [0, 1, 2, 3, 4, 5, 6];
const buttonTitles = ["移动", "画点", "线段", "画圆", "直线", "射线", "交点"];

var buttons = [];

for (let i = 0; i < buttonN; i++) {
  buttons.push(document.createElement("input"));
  toolbar.appendChild(buttons[i]);
  buttons[i].setAttribute("type", "radio");
  buttons[i].setAttribute("name", "tool");
  buttons[i].setAttribute("id", "button-" + (i + 1));
  buttons[i].setAttribute("class", "mode-switch");
  buttons[i].setAttribute("title", buttonTitles[i]);
  buttons[i].onclick = () => {
    cv.changeMode(buttonsMode[i]);
  };
}

buttons[1].setAttribute("checked", "");
