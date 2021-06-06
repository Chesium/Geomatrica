function chooseByGlobalPos(pos) {
    for (let i = mainCanvas.children.length - 1; i >= 0; i--) {//µ¹Ğò±éÀú
        if (mainCanvas.children[i].choosable) {
            if (mainCanvas.children[i].obj.bound[0][0] <= pos.x && pos.x <= mainCanvas.children[i].obj.bound[1][0] && mainCanvas.children[i].obj.bound[0][1] <= pos.y && pos.y <= mainCanvas.children[i].obj.bound[1][1]) {
                if (mainCanvas.children[i].obj.chooseByLocalPos(pos)) {
                    return mainCanvas.children[i].obj.index;
                }
            }
        }
    }
    return -1;
}