import SpriteSheet from './SpriteSheet.js';


export default class Sprites {

    constructor(all) {
        this.all = all;
    }


    draw(context) {
        this.all.forEach(sprite => {
            sprite.draw(context);
        });
    }
}
