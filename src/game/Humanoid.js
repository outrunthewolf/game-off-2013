/**
*
*	Humanoid Class
*
**/
var Humanoid = new BaseClass({

    Implements: createjs.Sprite,

    _accel: .98,
    _deccel: .9,

    speed: 0,
    accel: 0,
    speedX: 0,
    speedY: 0,

    health: 100,
    ammo: 100,
    shield: 100,

    bullets: [],
    stage: null,

    init: function(main) {

        var player = new createjs.Shape();
        player.graphics.beginFill("#ffffff").drawRect(0, 0, 2, 2);
        
        player.x = 150;
        player.y = 150;

        player.width = 2;
        player.height = 2;

        //player.rotation = 0;
       // player.bounds = worldBounds;

        return player;
    },

    // Movement Controls
    thrust: function() {
        // TODO:
    },
    brake: function() {
        // TODO:
    },

    // Attack
    canShoot: true,
    shoot: function() {
        if (this.canShoot) {
            this.canShoot = false;
            var bullet = new Bullet();
            bullet.width = 10;
            bullet.height = 10;
            bullet.x = this.x;
            bullet.y = this.y;
            bullet.speed = Math.max(this.speed + 2, 10);
            bullet.bounds = this.bounds;
            bullet.rotation = this.rotation;
            this.bullets.push(bullet);
            this.stage.addChild(bullet);
            this.fireEvent('shoot');
            (function() { this.canShoot = true; }).delay(75, this);
        }
    },

    // Move Forward
    moveForward: function (speed) {
        this.speed += speed;
        this.speed *= .95;
        this.speed *= this._deccel;
        this.speedX = Math.round(Math.cos(this.rotation * (Math.PI / 180)) * this.speed * -1);
        this.speedY = Math.round(Math.sin(this.rotation * (Math.PI / 180)) * this.speed);
        this.x -= this.speedX;
        this.y += this.speedY;
    },

    die: function() {

    }

});
