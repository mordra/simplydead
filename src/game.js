Player = function (game, bullets){
    this.fireRate = 1000;
    this.nextFire = 0;
    this.health = 5;
    this.alive = true;
    this.bullets = bullets;
    this.game = game;
    this.sprite = game.add.sprite(32, 32, 'player');
    this.sprite.anchor.setTo(0.5, 0.5);
    this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.bounce.setTo(0.1, 0.1);
    this.sprite.body.immovable = true;
}

Player.prototype.fire = function(){
    if (this.game.time.now > this.nextFire && this.bullets.countDead() > 0)
    {
        this.nextFire = this.game.time.now + this.fireRate;
        var bullet = this.bullets.getFirstExists(false);
        if (!bullet)
            return;
        bullet.reset(this.sprite.x, this.sprite.y);
        // item, speed in ms
        bullet.rotation = this.game.physics.arcade.moveToPointer(bullet, 1000) + Math.PI / 2;
    }
}

Player.prototype.damage = function() {
    this.health -= 1;
    if (this.health <= 0)
    {
        this.alive = false;
        this.sprite.kill();
        // game over
    }
}



Ogre = function (index, game, player, bullets) {
    var x = game.world.randomX;
    var y = game.world.randomY;

    this.game = game;
    this.health = 3;
    this.player = player;
    this.bullets = bullets;
    this.fireRate = 1000;
    this.nextFire = 0;
    this.alive = true;
    this.sprite = game.add.sprite(x, y, 'ogre');
    this.sprite.anchor.set(0.5);
    this.sprite.name = index.toString();
    this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.sprite.body.immovable = false;
    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.bounce.setTo(0.1, 0.1);


};


Ogre.prototype.damage = function() {
    this.health -= 1;
    if (this.health <= 0)
    {
        this.alive = false;
        this.sprite.kill();
    }
}


Ogre.prototype.update = function() {
    if (this.game.physics.arcade.distanceBetween(this.sprite, this.player.sprite) < 300)
    {
        if (this.game.time.now > this.nextFire && this.bullets.countDead() > 0)
        {
            this.nextFire = this.game.time.now + this.fireRate;
            var bullet = this.bullets.getFirstDead();
            bullet.reset(this.sprite.x, this.sprite.y);
            bullet.rotation = this.game.physics.arcade.moveToObject(bullet, this.player.sprite, 500)+ Math.PI / 2;;
        }
    }
};




var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var keyboard;
var player;
var playerBullets;
var enemy;
var enemyBullets;


function preload() {
    game.load.spritesheet('player', 'assets/player.png', 32, 32);
    game.load.spritesheet('bullet', 'assets/bullet.png', 32, 32);
    game.load.spritesheet('ogre', 'assets/ogre.png', 64, 64 );
}

function create() {

    //  Our bullet group
    playerBullets = game.add.group();
    playerBullets.enableBody = true;
    playerBullets.physicsBodyType = Phaser.Physics.ARCADE;
    playerBullets.createMultiple(10, 'bullet');
    playerBullets.setAll('anchor.x', 0.5);
    playerBullets.setAll('anchor.y', Math.PI / 2);
    playerBullets.setAll('outOfBoundsKill', true);
    playerBullets.setAll('checkWorldBounds', true);

    player = new Player(game, playerBullets)
    keyboard = game.input.keyboard.createCursorKeys();


    //  The enemies bullet group
    enemyBullets = game.add.group();
    enemyBullets.enableBody = true;
    enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
    enemyBullets.createMultiple(1, 'bullet');
    enemyBullets.setAll('anchor.x', 0.5);
    enemyBullets.setAll('anchor.y', 0.5);
    enemyBullets.setAll('outOfBoundsKill', true);
    enemyBullets.setAll('checkWorldBounds', true);

    //  Create some baddies to waste :)
    enemy = [];
    enemyMax = 1;
    for (var i = 0; i < enemyMax; i++)
    {
        enemy.push(new Ogre(i, game, player, enemyBullets));
    }



}

function update() {

    game.physics.arcade.overlap(enemyBullets, player.sprite, bulletHit, null, this);

    for (var i = 0; i < enemy.length; i++)
    {
        if (enemy[i].alive)
        {
            game.physics.arcade.collide(player.sprite, enemy[i].sprite);
            game.physics.arcade.overlap(playerBullets, enemy[i].sprite, bulletHit, null, this);
            enemy[i].update();
        }
    }


    player.sprite.body.velocity.setTo(0, 0);
    if (keyboard.left.isDown) {
        player.sprite.body.velocity.x = -200;
    }
    if (keyboard.right.isDown) {
        player.sprite.body.velocity.x = 200;
    }
    if (keyboard.up.isDown) {
        player.sprite.body.velocity.y = -200;
    }
    if (keyboard.down.isDown) {
        player.sprite.body.velocity.y = 200;
    }

    player.sprite.rotation = game.physics.arcade.angleToPointer(player.sprite);

    if (game.input.activePointer.isDown) {
        //  Boom!
        player.fire();
    }
}

function bulletHit (target, bullet) {
    bullet.kill();

    if (target === player.sprite){
        player.damage();
    }
    else {
        enemy[target.name].damage();
    }

}



