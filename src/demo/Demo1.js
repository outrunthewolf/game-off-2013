var Game
    ,worldBounds = [[0, 2000], [0, 2000]]
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
player.width = 32;
player.height = 32;
//player.setSourceFromUrl('assets/images/zombie.gif');
player.color = "rgba(0, 0, 127, 200)";
player.rotation = 0;
player.bounds = worldBounds;
Game.player = player;
Game.stage.addChild(player);

// Enemies
var enemies = [];
for (var i = 0; i < 5; i++) {
    var enemy = new Zombie();
    enemy.width = 32;
    enemy.height = 32;
    enemy.x = Math.random() * worldBounds[0][1];
    enemy.y = Math.random() * worldBounds[1][1];
//    enemy.setSourceFromUrl('assets/images/zombie.gif');
    enemy.color = "rgba(127, 0, 0, 200)";
    enemy.rotation = 0;
    enemy.bounds = worldBounds;
    Game.stage.addChild(enemy);
    enemies.push(enemy);
}

// Events
Game.onEvent('keydown', function(e) {
//          console.log(e);
//    if (e.keyCode == 70) toggleFullscreen();
    this.keyDown[e.keyCode] = true;
    console.log(e.keyCode);
});
Game.onEvent('keyup', function(e) {
    this.keyDown[e.keyCode] = false;
});
Game.onEvent('mousemove', function(e) {
    player.lookAt({x: e.pageX, y: e.pageY}, true);
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

    // Align HUD to top right of scren
    HUD.x = 0 - Game.stage.offsetX;
    HUD.y = 0 - Game.stage.offsetY;

    // Player Movement (arrows)
    if (this.keyDown[37]) this.player.rotation -= 3;
    if (this.keyDown[39]) this.player.rotation += 3;
    if (this.keyDown[38]) this.player.speed += 0.5;
    if (this.keyDown[40]) this.player.speed *= .93;

    // Player Movement (wasd)
    if (this.keyDown[65]) this.player.x -= 2;
    if (this.keyDown[68]) this.player.x += 2;
    if (this.keyDown[87]) this.player.y -= 2;
    if (this.keyDown[83]) this.player.y += 2;

    // Shoot
    if (this.keyDown[32]) this.player.shoot();

    // Stage Controls
    // if (this.keyDown[87]) this.stage.offsetY += 10;
    // if (this.keyDown[83]) this.stage.offsetY -= 10;
    // if (this.keyDown[65]) this.stage.offsetX += 10;
    // if (this.keyDown[68]) this.stage.offsetX -= 10;

    // Update player speed to move
    this.player.speed *= this.player._deccel;
    this.player.speedX = Math.round(Math.cos(this.player.rotation * (Math.PI / 180)) * this.player.speed * -1);
    this.player.speedY = Math.round(Math.sin(this.player.rotation * (Math.PI / 180)) * this.player.speed);
    this.player.x -= this.player.speedX;
    this.player.y += this.player.speedY;

    // Make all enemies follow player
    for (var i = 0; i < enemies.length; i++) {
        var enemy = enemies[i];
        var speed = 0;
        if (player.distanceTo(enemy) < 200) {
            enemy.lookAt(this.player);
            speed = 0.3;
        } else {
            if (Math.random() > 0.999) {
                enemy.rotation += 45;
            }
            speed = 0.2;
        }
        enemy.moveForward(speed);
    }

    // Shoot
    if (Game.mouseIsDown) {
        player.shoot();
    }

    // Keep player within bounds
    if (this.player.x < (0 - this.stage.offsetX) + 100) this.stage.offsetX += this.player.speedX;
    if (this.player.x > (this.width - this.stage.offsetX) - 100) this.stage.offsetX += this.player.speedX;
    if (this.player.y < (0 - this.stage.offsetY) + 100) this.stage.offsetY -= this.player.speedY;
    if (this.player.y > (this.height - this.stage.offsetY) - 100) this.stage.offsetY -= this.player.speedY;

});
