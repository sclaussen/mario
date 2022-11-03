export default class SpriteSheet {
    constructor(spriteSheetImage, width, height) {
        this.spriteSheetImage = spriteSheetImage
        this.width = width
        this.height = height
        this.tiles = new Map();
    }


    defineUsingPixels(name, x, y, width, height) {
        const canvas = document.createElement('canvas');
        canvas.width = width
        canvas.height = height

        const context = canvas.getContext('2d');
        context.drawImage(this.spriteSheetImage, x, y, width, height, 0, 0, width, height);

        this.tiles.set(name, canvas)
    }


    drawUsingPixels(name, context, x, y) {
        const canvas = this.tiles.get(name);
        context.drawImage(canvas, x, y);
    }


    define(name, row, col) {
        this.defineUsingPixels(name, row * this.width, col * this.height, this.width, this.height);
    }


    draw(name, context, row, col) {
        this.drawUsingPixels(name, context, row * this.width, col * this.height);
    }
}
