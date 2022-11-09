export default class SpriteSheet {

    constructor(spriteSheetImage, tileWidth, tileHeight) {
        this.spriteSheetImage = spriteSheetImage
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
    }


    // Ideally the sprite sheet is defined by a checkerboard of tiles
    // defined by tileWidth and tileHeight making each of them
    // addressable by [row, col].
    createCanvasByTile(row, col) {
        return this.createCanvasByPixel(row * this.tileWidth, col * this.tileHeight, this.tileWidth, this.tileHeight);
    }


    // Some sprites don't fit nicely into a set of consistent tile
    // sizes so it is necessary to reference their location by
    // pixels [x, y] and the width/height of the sprite.
    //
    // Creating a sprite results in a new sprite being stamped
    // onto a canvas.
    createCanvasByPixel(x, y, width, height) {

        // Create the sprite's new canvas and get the canvas context
        const spriteCanvas = document.createElement('canvas');
        const spriteContext = spriteCanvas.getContext('2d');
        spriteCanvas.width = width
        spriteCanvas.height = height

        // Using the sprite sheet image as the source, find the image
        // defined by:
        // - upper left  [x, y]
        // - lower right [x + width, y + height]
        //
        // And then write that image to the new sprite canvas/context
        // at [0, 0] with the same width and height as the source.
        spriteContext.drawImage(this.spriteSheetImage, x, y, width, height, 0, 0, width, height);

        return spriteCanvas;
    }
}
