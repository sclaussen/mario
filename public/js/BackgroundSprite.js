import Sprite from './Sprite.js';


export default class BackgroundSprite extends Sprite {

    constructor(level, canvasMap) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = 256;
        canvas.height = 240;

        level.backgrounds.forEach(background => {
            console.log(background);
            background.ranges.forEach(([ row1, row2, col1, col2 ]) => {
                for (let row = row1; row < row2; row++) {
                    for (let col = col1; col < col2; col++) {
                        context.drawImage(canvasMap[background.tile], row * 16, col * 16);
                    }
                }
            });
        });

        super(canvas);
    }
}
