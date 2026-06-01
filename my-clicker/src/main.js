import { GameScene } from "./scenes/GameScene.js";

const config = {
    type: Phaser.AUTO,
    backgroundColor: "#0f0904",
    width: window.innerWidth,
    height: window.innerHeight,
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        fullscreenTarget: 'body'
    },
    render: {
        pixelArt: false,
        antialias: true
    },
    scene: [GameScene],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    }
};

console.log('🚀 Инициализация Phaser...');
const game = new Phaser.Game(config);
console.log('✅ Phaser инициализирован');