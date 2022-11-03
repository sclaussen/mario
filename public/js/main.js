import { loadLevel } from './loaders.js';
import { loadMarioSprite, loadBackgroundSprites } from './sprites.js';
import Compositor from './compositor.js';



function createBackground(backgrounds, sprites) {
    const backgroundCanvas = document.createElement('canvas');
    backgroundCanvasContext = backgroundCanvas.getContext('2d');
    backgroundCanvas.width = 256;
    backgroundCanvas.height = 240;
    backgrounds.forEach(background => {
        background.ranges.forEach(([ row1, row2, col1, col2 ]) => {
            for (let row = row1; row < row2; row++) {
                for (let col = col1; col < col2; col++) {
                    sprites.draw(background.tile, backgroundCanvasContext, row, col);
                }
            }
        });
    });

    return function drawBackground(context) {
        context.drawImage(backgroundCanvas, 0, 0);
    };
}


function createMario(sprite, pos) {
    return function drawMario(context) {
        sprite.drawUsingPixels('idle', context, pos.x, pos.y);
    }
}


const screen = document.getElementById('screen');
const context = screen.getContext('2d');


Promise.all([
    loadMarioSprite(),
    loadBackgroundSprites(),
    loadLevel('1-1')
]).then(([ marioSprite, backgroundSprites, level ]) => {

    const compositor = new Compositor();

    const drawBackground = createBackground(level.backgrounds, backgroundSprites);
    compositor.layers.push(drawBackground);

    const pos = {
        x: 3,
        y: 3
    }
    const drawMario = createMario(marioSprite, pos);
    compositor.layers.push(drawMario);


    // const vel = {
    //     x: 2,
    //     y: -10
    // }


    function update() {
        pos.x += 2;
        pos.y += 2;
        compositor.draw(context);
        requestAnimationFrame(update);
    }

    update();
});
