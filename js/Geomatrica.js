function importJS(name) {
    document.write("<script type='text/javascript' src='js/"+name+".js'></script>");
}

const JSs = [
    "init",
    "global",
    "util",
    "style",
    "geometry",
    "GFD",
    "IAA",
    "pObj",
    "dObj",
    "obj",
    "interaction",
    "toolbar"
];

for(var i in JSs){
    importJS(JSs[i]);
}