const toolbar = document.getElementById("toolbar");
const buttonN = 7;
const buttonsMode = [0, 1, 2, 3, 4, 5, 6];
const buttonTitles = [
    "移动",
    "两点连线�?",
    "画点",
    "圆心和圆上一�?",
    "过两点的直线",
    "射线",
    "两对象的交点"
];

var buttons = [];

for (let i = 0; i < buttonN; i++) {
    buttons.push(document.createElement("button"));
    toolbar.appendChild(buttons[i]);
    buttons[i].setAttribute("class", "mode-switch button-" + (i + 1));
    buttons[i].setAttribute("title", buttonTitles[i]);
    buttons[i].setAttribute("activated", "false");
    buttons[i].onclick=function () {
        changeMode(buttonsMode[i]);
        // mode=buttonsMode[i];
        for(let i in buttons){
            buttons[i].setAttribute("activated", "false");
        }
        this.setAttribute("activated", "true");
    }
}

buttons[1].setAttribute("activated", "true");