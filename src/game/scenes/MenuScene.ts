import { Scene } from 'phaser';
import { EventBus } from '../EventBus';
import Player from '../lib/Player';


export default class MenuScene extends Scene {
    background: Phaser.GameObjects.Sprite;
    discord: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    player: Player;

    constructor() {
        super('Game');
        this.player = new Player(this);
    }

    preload() {
        // load assets
        this.load.setPath('assets');
        this.load.image('menu-background', 'menu-background.png');
        this.load.image('discord', 'discordImg.png');
        this.player.preload();
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

        const title = this.add.text(this.game.canvas.width / 2, this.game.canvas.height / 2, "Escape Game", {
            "fontSize": "10rem",
        });
        title.x = title.x - title.width / 2;
        title.y = title.y - title.height / 2;
        //Creating a wall
        this.discord = this.physics.add.sprite(500, 500, "discord");
        this.discord.width = 100; this.discord.height = 100
        this.discord.displayWidth = 100; this.discord.displayHeight = 100
        this.discord.body.immovable = true;

        // player creation
        this.player.create();
        this.physics.add.collider(this.player.sprite, this.discord);
        EventBus.emit('current-scene-ready', this);
    }

    update() {
        // update objects
        this.player.update();
    }
}