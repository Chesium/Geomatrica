//��������б�
var O = [];
var pO = [];
var dO = [];
var IAseq = [[[], []], [[], []]];

//unused
var Status = 0;
//0:default 1:moving 2:choosing
// var moving = false;
var F = -1;
var mode = 1;
var showBoundBox = true;
// var stageBound = [[30, 30], [300, 300]];
var stageBound = [[0, 0], [mainCanvasApp.view.width, mainCanvasApp.view.height]];