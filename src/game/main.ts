import { MenuScene } from './scenes/MenuScene';
import { AUTO, Game, Types } from "phaser";

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Types.Core.GameConfig = {
    type: AUTO,
    scale: {
        width: '100%',
        height: '100%',
    },
    pixelArt: true,
    parent: 'game-container',
    backgroundColor: '#028af8',
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
        }
    },
    scene: [
        MenuScene
    ]
};

const StartGame = (parent: string) => {
    return new Game({ ...config, parent });
}

export default StartGame;