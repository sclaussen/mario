import { loadImage, loadLevel } from './loaders.js';
import SpriteSheet from './SpriteSheet.js';
import Sprite from './Sprite.js';
import BackgroundSprite from './BackgroundSprite.js';
import Velocity from './traits/Velocity.js';
import Jump from './traits/Jump.js';
import Sprites from './Sprites.js';
import Timer from './Timer.js';
// import Keyboard from './Keyboard.js';


Promise.all([
    loadImage('./img/tiles.png'),
    loadImage('./img/characters.gif'),
    loadLevel('1-1')
]).then(([ tilesPng, charactersGif, level ]) => {

    const charactersSpriteSheet = new SpriteSheet(charactersGif);
    const marioCanvas = charactersSpriteSheet.createCanvasByPixel(276, 44, 16, 16);
    const marioSprite = new Sprite(marioCanvas);
    marioSprite.addTrait(new Velocity());
    marioSprite.addTrait(new Jump());
    marioSprite.pos.set(64, 200);
    marioSprite.vel.set(200, -600);

    const tilesSpriteSheet = new SpriteSheet(tilesPng, 16, 16);
    const groundCanvas = tilesSpriteSheet.createCanvasByTile(0, 0);
    const skyCanvas = tilesSpriteSheet.createCanvasByTile(3, 23);
    const backgroundSprite = new BackgroundSprite(level, {
        'ground': groundCanvas,
        'sky': skyCanvas
    });

    const sprites = new Sprites([ backgroundSprite, marioSprite ]);

    // const SPACE = 32;
    // const keyboard = new Keyboard();
    // keyboard.addMapping(SPACE, keyState => {
    //     if (keyState) {
    //         mario.jump.start();
    //     } else {
    //         mario.jump.cancel();
    //     }
    // });
    // keyboard.listenTo(window);

    const screen = document.getElementById('screen');
    const context = screen.getContext('2d');

    const gravity = 2000;
    const timer = new Timer(1/60);
    timer.update = function update(deltaTime) {
        marioSprite.update(deltaTime);
        marioSprite.vel.y += gravity * deltaTime;
        sprites.draw(context);
    }

    timer.start();
});
