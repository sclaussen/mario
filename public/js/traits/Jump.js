import { Trait } from '../Sprite.js';


export default class Jump extends Trait {

    constructor() {
        super('jump');

        // Upper limit of the duration
        this.duration = 0.5;
        this.velocity = 200;
        this.engageTime = 0;
    }


    start() {
        this.engageTime = this.duration;
    }


    cancel() {
        this.engageTime = 0;
    }


    update(entity, deltaTime) {
        if (this.engageTime > 0) {
            entity.vel.y = -(this.velocity);
            this.entity -= deltaTime;
        }
    }
}
