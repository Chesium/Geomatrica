const Dfsty = [
    {//[0]Default
        p: {
            radius: 5,
            color: 0xff0000,
            alpha: 1,
            ol: {
                width: 1,
                color: 0x000000,
                alpha: 1,
                cap: PIXI.LINE_CAP.ROUND
            },
            margin: {
                radius: 10,
                color: 0xff0000,
                alpha: 0.2,
            }
        },
        l: {
            body: {
                width: 5,
                color: 0x000000,
                alpha: 1,
                cap: PIXI.LINE_CAP.ROUND
            },
            margin: {
                width: 10,
                color: 0x000000,
                alpha: 0.2,
                cap: PIXI.LINE_CAP.ROUND
            }
        }
    },
];

function style(preset = 0) {
    this.p = {
        radius: 5,
        color: 0xff0000,
        alpha: 1,
        ol: {
            width: 1,
            color: 0x000000,
            alpha: 1,
            cap: PIXI.LINE_CAP.ROUND
        },
        margin: {
            radius: 10,
            color: 0xff0000,
            alpha: 0.2,
        }
    };
    this.l = {
        body: {
            width: 5,
            color: 0x000000,
            alpha: 1,
            cap: PIXI.LINE_CAP.ROUND
        },
        margin: {
            width: 10,
            color: 0x000000,
            alpha: 0.2,
            cap: PIXI.LINE_CAP.ROUND
        }
    };
}