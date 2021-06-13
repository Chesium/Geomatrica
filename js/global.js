//对象列表们
var O = [];
var pO = [];
var dO = [];
var IAseq = [[[], []], [[], []]];

var Status = 0;
//0:default 1:moving 2:which is the one you want?

var chooseObjs=[];
var processFn;

var F = -1;
var mode = 1;
var showBoundBox = true;
var stageBound = [[0, 0], [mainCanvasApp.view.width, mainCanvasApp.view.height]];