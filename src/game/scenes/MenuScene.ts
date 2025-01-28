import { Scene } from 'phaser';
import { EventBus } from '../EventBus';

export class MenuScene extends Scene {
    constructor() {
        super('Game');
    }

    preload() {
        this.load.setPath('assets');
        // load assets
    }

    create() {
        EventBus.emit('current-scene-ready', this);
        // create objects
    }

    update() {
        // update objects
    }
}