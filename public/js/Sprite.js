import Coordinate from './Coordinate.js';


export class Trait {

    constructor(name) {
        this.NAME = name;
    }


    update() {
        console.warn('Unhandled update() in trait');
    }
}


export default class Sprite {

    constructor(canvas) {
        this.canvas = canvas;
        this.pos = new Coordinate(0, 0);
        this.vel = new Coordinate(0, 0);
        this.traits = [];
    }


    draw(context) {
        context.drawImage(this.canvas, this.pos.x, this.pos.y);
    }


    addTrait(trait) {
        this.traits.push(trait);
        this[trait.NAME] = trait;
    }


    update(deltaTime) {
        this.traits.forEach(trait => {
            trait.update(this, deltaTime);
        });
    }
}
