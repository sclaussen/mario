import SpriteSheet from './SpriteSheet.js';
import { loadImage, loadLevel } from './loaders.js';


export function loadMarioSprite() {
    return loadImage('/img/characters.gif').then(spriteSheetImage => {
        const sprites = new SpriteSheet(spriteSheetImage, 16, 16);
        sprites.defineUsingPixels('idle', 276, 44, 16, 16);
        return sprites;
    })
}


export function loadBackgroundSprites() {
    return loadImage('/img/tiles.png').then(spriteSheetImage => {
        const sprites = new SpriteSheet(spriteSheetImage, 16, 16);
        sprites.define('ground', 0, 0);
        sprites.define('sky', 3, 23);
        return sprites;
    })
}
