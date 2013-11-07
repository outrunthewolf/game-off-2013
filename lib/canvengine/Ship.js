var Ship = new BaseClass({
	
	Implements: Sprite,
	
	_accel: .98,
	_deccel: .95,
	
	speed: 0,
	accel: 0,
	speedX: 0,
	speedY: 0,
	
	health: 100,
	ammo: 100,
	shield: 100,
	
	bullets: [],
	
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
	}

});