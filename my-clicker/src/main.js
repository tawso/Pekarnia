import { GameScene } from "./scenes/GameScene.js";

const config = {
    type: Phaser.AUTO,

    backgroundColor: "#0f0904",

    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },

    scene: [
        GameScene
    ]
};

new Phaser.Game(config);