/**
* Created by mordrax on 17/03/14.
*/
/// <reference path='../lib/definitions.d.ts'/>
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'screen', { preload: preload, create: create, update: update });
var keyboard;
var hero;

function preload() {
    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('star', 'assets/star.png');
    game.load.spritesheet('dude', 'assets/player.png', 32, 32);
}

function create() {
    hero = game.add.sprite(0, 0, 'dude');
    keyboard = game.input.keyboard.createCursorKeys();
}

function update() {
    game.physics.arcade.moveToPointer(hero, 300, game.input.activePointer);
}
//# sourceMappingURL=game.js.map
