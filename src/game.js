var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var keyboard;
var player;
var bullets;

function preload() {
    game.load.spritesheet('player', 'assets/player.png', 32, 32);
    game.load.spritesheet('bullet', 'assets/bullet.png', 32, 32);
}

function create() {
    //game.physics.setBoundsToWorld();
    player = game.add.sprite(0, 0, 'player');
    game.physics.enable(player, Phaser.Physics.ARCADE);
    keyboard = game.input.keyboard.createCursorKeys();
    player.body.collideWorldBounds = true;
    player.body.bounce.setTo(1, 1);
    player.body.immovable = true;
    player.anchor.setTo(0.5, 0.5);

    //  Our bullet group
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(300, 'bullet', 0, false);
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 0.5);
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('checkWorldBounds', true);
}

function update() {
    player.body.velocity.setTo(0, 0);
    if (keyboard.left.isDown) {
        player.body.velocity.x = -200;
    }
    if (keyboard.right.isDown) {
        player.body.velocity.x = 200;
    }
    if (keyboard.up.isDown) {
        player.body.velocity.y = -200;
    }
    if (keyboard.down.isDown) {
        player.body.velocity.y = 200;
    }

    player.rotation = game.physics.arcade.angleToPointer(player);

    if (game.input.activePointer.isDown) {
        //  Boom!
        fire();
    }
}

function fire() {
    var bullet = bullets.getFirstExists(false);
    if (!bullet)
        return;
    bullet.reset(player.x, player.y);
    bullet.rotation = game.physics.arcade.moveToPointer(bullet, 1000, game.input.activePointer, 500) + Math.PI / 2;
}
