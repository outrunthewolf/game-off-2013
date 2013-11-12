/**
*
*	Bullet Class
*
**/
var Bullet = new BaseClass({
	
	Implements: createjs.Sprite,
	
	speed: 0,
	speedX: 0,
	speedY: 0,
	color: '#ffffff',
	
	move: function() {
		
	},
	
	render: function() {
		if (
			this.x <= this.bounds[0][0] + (this.width / 2)
		||  this.x >= this.bounds[0][1] - (this.width / 2)
		||  this.y <= this.bounds[1][0] + (this.height / 2)
		||  this.y >= this.bounds[1][1] - (this.height / 2)
		) {
			this.destroy();
			return;
		}
		
		this.speedX = Math.round(Math.cos(this.rotation * (Math.PI / 180)) * this.speed * -1);
		this.speedY = Math.round(Math.sin(this.rotation * (Math.PI / 180)) * this.speed);
		this.x -= this.speedX;
		this.y += this.speedY;
	}

});