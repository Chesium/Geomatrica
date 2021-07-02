PIXI.settings.SORTABLE_CHILDREN = true;
import { canvas } from "./canvas.js";
import { modeSwitch } from "./modeSwitch.js";
var cv = new canvas();
// console.log(cv);

//////////////////////////////////////////////////////////////////////////////
const toolbar = document.getElementById("toolbar");

const adr = (str) => "../assets/" + str;

var buttons = [
  new modeSwitch(cv, 0, "移动", adr("move.svg"), toolbar),
  new modeSwitch(cv, 1, "线段", adr("segment.svg"), toolbar),
  new modeSwitch(cv, 2, "画点", adr("point.svg"), toolbar),
  new modeSwitch(cv, 3, "画圆", adr("circle.svg"), toolbar),
  new modeSwitch(cv, 4, "直线", adr("line.svg"), toolbar),
  new modeSwitch(cv, 5, "射线", adr("halfline.svg"), toolbar),
  new modeSwitch(cv, 6, "交点", adr("intersection.svg"), toolbar),
  new modeSwitch(cv, 7, "垂线", adr("perpendicular.svg"), toolbar),
  new modeSwitch(cv, 8, "平行线", adr("parallel.svg"), toolbar),
  new modeSwitch(cv, 9, "延长线", adr("extensionLine.svg"), toolbar),
  new modeSwitch(cv, 10, "角平分线", adr("angleBisector.svg"), toolbar),
  new modeSwitch(cv, 11, "切线", adr("tangent.svg"), toolbar),
  new modeSwitch(cv, 12, "中垂线", adr("perpendicularBisector.svg"), toolbar),
  new modeSwitch(cv, 13, "中点", adr("midPoint.svg"), toolbar),
  new modeSwitch(cv, 14, "外接圆", adr("circumcircle.svg"), toolbar),
];

for (let i in buttons) {
  buttons[i].activate();
}

buttons[1].element.setAttribute("checked", "");
