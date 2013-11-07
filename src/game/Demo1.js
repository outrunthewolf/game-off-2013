var Game
    ,worldBounds = [[0, 5000], [0, 5000]]
    ,dotCount = 100
    ,HUD
    ,fullscreen = true
    ;

// Create Board
var gw = document.body.clientWidth; // document.body.clientWidth
var gh = document.body.clientWidth; // document.body.clientHeight
var fullscreen = false;
Game = new Canvengine({
    width: gw,
    height: gh,
    container: 'game',
    fps: 100
});
function resizeGame() {
    var bw = document.body.clientWidth;
    var bh = document.body.clientHeight;
    if (!fullscreen) {
        Game.buildStage(Math.min(bw, gw), Math.min(bh, gh));
    } else {
        Game.buildStage(bw, bh);
    }
    document.getElementById('game').style.marginTop = (bh / 2 - Game.height / 2) + 'px';
    document.getElementById('game').style.marginLeft = (bw / 2 - Game.width / 2) + 'px';
}
addEventListener('resize', resizeGame);
resizeGame();

// Create Player
var player = new Zombie();
player.x = 150;
player.y = 150;
player.width = 150;
player.height = 150;
player.setSourceFromUrl('assets/images/zombie.gif');
player.color = "rgba(0, 127, 0, 0)";
player.rotation = 0;
player.bounds = worldBounds;
Game.player = player;
Game.stage.addChild(player);

// Enemies
var enemies = [];
for (var i = 0; i < 5; i++) {
    var enemy = new Zombie();
    enemy.width = 150;
    enemy.height = 300;
    enemy.x = Math.random() * worldBounds[0][1];
    enemy.y = Math.random() * worldBounds[1][1];
    enemy.setSourceFromUrl('assets/images/zombie.gif');
    enemy.color = "rgba(127, 0, 0, 200)";
    enemy.rotation = 0;
    enemy.bounds = worldBounds;
    Game.stage.addChild(enemy);
    enemies.push(enemy);
}

// Events
Game.onEvent('keydown', function(e) {
//          console.log(e);
    if (e.keyCode == 70) toggleFullscreen();
    this.keyDown[e.keyCode] = true;
});
Game.onEvent('keyup', function(e) {
    this.keyDown[e.keyCode] = false;
});
Game.onEvent('mousemove', function(e) {

});

// HUD
HUD = new DisplayObjectContainer();
HUD.x = 0;
HUD.y = 0;
HUD.width = Game.width;
HUD.height = Game.height;
Game.stage.addChild(HUD);
var HealthMeter = new TextField();
HealthMeter.x = 20;
HealthMeter.y = 20;
HealthMeter.text = 'Health: 100';
HealthMeter.color = '#ffffff';
HUD.addChild(HealthMeter);

// Apply
var img = new Image();
img.onload = function() {
    Game.stage.background = img;
}
img.src = 'assets/images/grass.jpg';

// Calculate Game Logic
Game.onEvent('enterframe', function() {

    //
    HUD.x = 0 - Game.stage.offsetX;
    HUD.y = 0 - Game.stage.offsetY;

    // Player Controls
    if (this.keyDown[37]) this.player.rotation -= 5;
    if (this.keyDown[39]) this.player.rotation += 5;
    if (this.keyDown[38]) this.player.speed += 1;
    if (this.keyDown[40]) this.player.speed *= .95;
    if (this.keyDown[32]) this.player.shoot();

    // Stage Controls
    if (this.keyDown[87]) this.stage.offsetY += 10;
    if (this.keyDown[83]) this.stage.offsetY -= 10;
    if (this.keyDown[65]) this.stage.offsetX += 10;
    if (this.keyDown[68]) this.stage.offsetX -= 10;

    // Update player speed to move
    this.player.speed *= this.player._deccel;
    this.player.speedX = Math.round(Math.cos(this.player.rotation * (Math.PI / 180)) * this.player.speed * -1);
    this.player.speedY = Math.round(Math.sin(this.player.rotation * (Math.PI / 180)) * this.player.speed);
    this.player.x -= this.player.speedX;
    this.player.y += this.player.speedY;

    // Make all enemies follow player
    console.log('enemies:', enemies.length)
    for (var i = 0; i < enemies.length; i++) {
        var enemy = enemies[i];
        enemy.lookAt(this.player);
        enemy.moveForward(Math.random());
    }

    // Keep player within bounds
    if (this.player.x < (0 - this.stage.offsetX) + 100) this.stage.offsetX += this.player.speedX;
    if (this.player.x > (this.width - this.stage.offsetX) - 100) this.stage.offsetX += this.player.speedX;
    if (this.player.y < (0 - this.stage.offsetY) + 100) this.stage.offsetY -= this.player.speedY;
    if (this.player.y > (this.height - this.stage.offsetY) - 100) this.stage.offsetY -= this.player.speedY;

});
