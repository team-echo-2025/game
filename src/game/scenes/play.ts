import { Scene } from 'phaser';
import { EventBus } from '../EventBus';

export class PlayScene extends Scene {
    pressedKey = true;
    sign: number = 1;
    background: Phaser.GameObjects.Sprite;
    nakedMan: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
    discord: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
    Wkey: any
    Skey: any
    Akey: any
    Dkey: any
    constructor() {
        super('Play');
    }

    preload() {
        // load assets
        this.load.setPath('assets');
        this.load.image('menu-background', 'menu-background.png');
        this.load.image('discord', 'discordImg.png');
        this.load.spritesheet('nakedMan', 'nakedMan.png', {
            frameWidth: 64,
            frameHeight: 64
        })
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

        const title = this.add.text(this.game.canvas.width / 2, this.game.canvas.height / 2, "Gippity", {
            "fontSize": "10rem",
        });
        title.x = title.x - title.width / 2;
        title.y = title.y - title.height / 2;
        //Creating a wall
        this.discord = this.physics.add.sprite(500,500,"discord");
        this.discord.width = 100; this.discord.height = 100
        this.discord.displayWidth = 100; this.discord.displayHeight = 100
        this.discord.body.immovable = true;
        //Start of nakedMan  npm run dev
        this.nakedMan = this.physics.add.sprite(0,0,"nakedMan");
        //Animating NakedMan
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('nakedMan', {/*frames: [0,1,2,3,4,5,6,7],*/ start: 0, end: 7}),
            duration: 5000,
            repeat: -1,
        })
        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('nakedMan', {/*frames: [0,1,2,3,4,5,6,7],*/ start: 8, end: 15}),
            duration: 5000,
            repeat: -1,
        })
        // this.input.keyboard?.once("keydown", (temp:KeyboardEvent)=>{
        //     console.log(temp);
        //     if(temp.key == "W")
        //         this.nakedMan.play("walk")
        //     })
            //nakedMan collides with things
            this.physics.add.collider(this.nakedMan, this.discord);
            //nakedMan Movements
        this.Wkey = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        this.Akey = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        this.Skey = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.S)
        this.Dkey = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        this.nakedMan.body.setCollideWorldBounds(true);
        
    }

    update() {
        // update objects
        if (this.background.x > this.game.canvas.width / 2) {
            this.sign *= -1;
        }
        this.background.x += 1;
        this.nakedMan.body.setVelocity(0);
        if (this.Wkey.isDown && !this.pressedKey){
                this.nakedMan.play("walk")
                this.pressedKey = true;
        }
        if(!this.Wkey.isDown){
            this.pressedKey = false;
        }
        if (this.Wkey.isDown){
            this.nakedMan.body.setVelocityY(-300);
        }
        if (this.Akey.isDown){
            this.nakedMan.body.setVelocityX(-300);
            this.nakedMan.play("run")
        }
        if (this.Skey.isDown){
            this.nakedMan.body.setVelocityY(300);
        }
        if (this.Dkey.isDown){
            this.nakedMan.body.setVelocityX(300);
        }
        
    }
}
