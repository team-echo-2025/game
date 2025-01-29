type XY = {
    x: number;
    y: number;
}

enum Direction {
    NORTH,
    NORTHEAST,
    EAST,
    SOUTHEAST,
    SOUTH,
    SOUTHWEST,
    WEST,
    NORTHWEST,
}

export default class Player {
    #w_key: Phaser.Input.Keyboard.Key | undefined;
    #a_key: Phaser.Input.Keyboard.Key | undefined;
    #s_key: Phaser.Input.Keyboard.Key | undefined;
    #d_key: Phaser.Input.Keyboard.Key | undefined;
    #speed: number = 100;
    #scene: Phaser.Scene;
    #player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    #velocity: XY = { x: 0, y: 0 };
    #facing: Direction = Direction.SOUTH;
    #is_moving: boolean = false;

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

    #check_key = (key: Phaser.Input.Keyboard.Key | undefined, signs: XY) => {
        if (key && key.isDown) {
            this.#velocity.x += signs.x;
            this.#velocity.y += signs.y;
        }
    }

    #get_direction = (): Direction => {
        if (this.#velocity.x > 0 && this.#velocity.y == 0) {
            return Direction.EAST;
        } else if (this.#velocity.x > 0 && this.#velocity.y > 0) {
            return Direction.SOUTHEAST;
        } else if (this.#velocity.x < 0 && this.#velocity.y > 0) {
            return Direction.SOUTHWEST;
        } else if (this.#velocity.x < 0 && this.#velocity.y < 0) {
            return Direction.NORTHWEST;
        } else if (this.#velocity.x < 0 && this.#velocity.y == 0) {
            return Direction.WEST;
        } else if (this.#velocity.x > 0 && this.#velocity.y < 0) {
            return Direction.NORTHEAST;
        } else if (this.#velocity.y < 0 && this.#velocity.x == 0) {
            return Direction.NORTH;
        } else if (this.#velocity.y > 0 && this.#velocity.x == 0) {
            return Direction.SOUTH;
        } else {
            return this.#facing;
        }
    }

    #handle_movement = () => {
        this.#velocity.x = 0;
        this.#velocity.y = 0;
        this.#check_key(this.#a_key, { x: -1, y: 0 });
        this.#check_key(this.#w_key, { x: 0, y: -1 });
        this.#check_key(this.#s_key, { x: 0, y: 1 });
        this.#check_key(this.#d_key, { x: 1, y: 0 });
        if (this.#velocity.x != 0 || this.#velocity.y != 0) {
            const magnitude = Math.sqrt(Math.pow(this.#velocity.x, 2) + Math.pow(this.#velocity.y, 2));
            this.#velocity.x /= magnitude;
            this.#velocity.y /= magnitude;
        }
        this.#player?.setVelocity(this.#velocity.x * this.#speed, this.#velocity.y * this.#speed);
        this.#is_moving = this.#velocity.x != 0 || this.#velocity.y != 0;
        this.#facing = this.#get_direction();
        switch (this.#facing) {
            case (Direction.NORTH):
                if (this.#is_moving) {
                    this.#player?.play("up", true);
                } else {
                    this.#player?.setFrame(8);
                }
                break;
            case (Direction.EAST):
                if (this.#is_moving) {
                    this.#player?.play("right", true);
                } else {
                    this.#player?.setFrame(16);
                }
                break;
            case (Direction.SOUTH):
                if (this.#is_moving) {
                    this.#player?.play("down", true);
                } else {
                    this.#player?.setFrame(0);
                }
                break;
            case (Direction.WEST):
                if (this.#is_moving) {
                    this.#player?.play("left", true);
                } else {
                    this.#player?.setFrame(24);
                }
                break;
        }
    }

    update() {
        this.#handle_movement();
    }
} 