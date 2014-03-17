/**
 * Created by mordrax on 17/03/14.
 */
/// <reference path='../lib/definitions.d.ts'/>

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {preload: preload, create: create, update: update});
var keyboard = game.input.keyboard.createCursorKeys();


function preload() {
    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('star', 'assets/star.png');
    game.load.spritesheet('dude', 'assets/player.png', 32, 32);
}

function create() {
    game.add.sprite(0, 0, 'dude');
}

function update() {

}