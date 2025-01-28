import { Scene } from 'phaser';
import { EventBus } from '../EventBus';

export class MenuScene extends Scene {
    sign: number = 1;
    background: Phaser.GameObjects.Sprite;
    constructor() {
        super('Game');
    }

    preload() {
        // load assets
        this.load.setPath('assets');
        this.load.image('menu-background', 'menu-background.png');
    }

    create() {

        // create objects
        const background = this.add.sprite(0, 0, 'menu-background')
        background.displayWidth = this.game.canvas.width
        background.width = this.game.canvas.width
        background.displayHeight = this.game.canvas.height
        background.height = this.game.canvas.height
        background.x = background.x + background.width / 2;
        background.y = background.y + background.height / 2;
        this.background = background;
        EventBus.emit('current-scene-ready', this);

        const title = this.add.text(this.game.canvas.width / 2, this.game.canvas.height / 2, "Escape Game", {
            "fontSize": "10rem",
        });
        title.x = title.x - title.width / 2;
        title.y = title.y - title.height / 2;
    }

    update() {
        // update objects
        if (this.background.x > this.game.canvas.width / 2) {
            this.sign *= -1;
        }
        this.background.x += 1;
    }
}