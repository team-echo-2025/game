type XY = {
    x: number;
    y: number;
}
export default class Player {
    #w_key: Phaser.Input.Keyboard.Key | undefined;
    #a_key: Phaser.Input.Keyboard.Key | undefined;
    #s_key: Phaser.Input.Keyboard.Key | undefined;
    #d_key: Phaser.Input.Keyboard.Key | undefined;
    #speed: number = 100;
    #scene: Phaser.Scene;
    #player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

    get sprite() {
        return this.#player;
    }

    constructor(scene: Phaser.Scene) {
        this.#scene = scene;
    }

    preload() {
        this.#scene.load.spritesheet('player', 'player.png', {
            frameWidth: 64,
            frameHeight: 64
        })
    }

    create() {
        this.#player = this.#scene.physics.add.sprite(0, 0, 'player');
        this.#scene.cameras.main.startFollow(this.#player);
        this.#player.setCollideWorldBounds(true);
        this.#scene.cameras.main.zoomTo(3);
        this.#scene.anims.create({
            key: 'left',
            frames: this.#scene.anims.generateFrameNumbers('player', { start: 57, end: 61 }),
            duration: 1000,
            repeat: -1
        })
        this.#scene.anims.create({
            key: 'right',
            frames: this.#scene.anims.generateFrameNumbers('player', { start: 49, end: 53 }),
            duration: 1000,
            repeat: -1,
        })
        this.#scene.anims.create({
            key: 'up',
            frames: this.#scene.anims.generateFrameNumbers('player', { start: 41, end: 45 }),
            duration: 1000,
            repeat: -1,
        })
        this.#scene.anims.create({
            key: 'down', frames: this.#scene.anims.generateFrameNumbers('player', { start: 32, end: 37 }),
            duration: 1000,
            repeat: -1,
        })
        this.#w_key = this.#scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        this.#a_key = this.#scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        this.#s_key = this.#scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.S)
        this.#d_key = this.#scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.D)
    }

    #check_key = (key: Phaser.Input.Keyboard.Key | undefined, signs: XY): XY => {
        if (key && key.isDown) {
            return signs;
        } else {
            return { x: 0, y: 0 }
        }
    }

    #handle_movement = () => {
        let xy: XY = { x: 0, y: 0 };
        let temp = this.#check_key(this.#w_key, { x: 0, y: -1 });
        xy.x += temp.x
        xy.y += temp.y
        temp = this.#check_key(this.#a_key, { x: -1, y: 0 });
        xy.x += temp.x
        xy.y += temp.y
        temp = this.#check_key(this.#s_key, { x: 0, y: 1 });
        xy.x += temp.x
        xy.y += temp.y
        temp = this.#check_key(this.#d_key, { x: 1, y: 0 });
        xy.x += temp.x
        xy.y += temp.y
        if (xy.x != 0 || xy.y != 0) {
            const magnitude = Math.sqrt(Math.pow(Math.abs(xy.x), 2) + Math.pow(Math.abs(xy.y), 2));
            xy.x /= magnitude;
            xy.y /= magnitude;
        }
        this.#player?.setVelocity(xy.x * this.#speed, xy.y * this.#speed);
        if (xy.y > 0) {
            this.#player?.play("down", true);
        } else if (xy.y < 0) {
            this.#player?.play("up", true);
        } else if (xy.x > 0) {
            this.#player?.play("right", true);
        } else if (xy.x < 0) {
            this.#player?.play("left", true);
        } else {
            this.#player?.setFrame(0);
        }
    }

    update() {
        this.#handle_movement();
    }
} 