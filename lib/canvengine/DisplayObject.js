var DisplayObject = new BaseClass({

	Implements: GameEvents,
	init: function() {

		if (!this.addEvent) { console.log(this); return; }
		this.addEvent('addedToStage', this.onAddedToStage.bind(this));
		this.addEvent('removedFromStage', this.onRemovedFromStage.bind(this));
	},

	bounds: [],
	width: 20,
	height: 20,
	x: 0,
	y: 0,
	rotation: 0,
	stage: null,
	alive: true,
	active: true,
	parent: null,

	displayBoundingBox: false,

	// Events
	onAddedToStage: function () {

	},
	onRemovedFromStage: function () {
		this.active = false;
	},

	// Basic Hit Testing
	hitTestPoint: function(x, y) {
		return false;
	},
	hitTestRect: function(obj2, obj1) {
		if (!obj1) obj1 = this;
		if (obj1.x <= obj2.x + ((obj1.width + obj2.width) / 2)
		&&  obj1.x >= obj2.x - ((obj1.width + obj2.width) / 2)
		&&  obj1.y <= obj2.y + ((obj1.height + obj2.height) / 2)
		&&  obj1.y >= obj2.y - ((obj1.height + obj2.height) / 2)
		) return true;
		return false;
	},
	hitTestBounds: function(obj2) {
		var bounds1 = this.getBounds();
		var obj1 = bounds1;
		obj1.x = bounds1.x + bounds1.w / 2;
		obj1.y = bounds1.y + bounds1.h / 2;
		obj1.width = bounds1.w;
		obj1.height = bounds1.h;
		var bounds2 = obj2.getBounds();
		var obj2 = bounds2;
		obj2.x = bounds2.x + bounds2.w / 2;
		obj2.y = bounds2.y + bounds2.h / 2;
		obj2.width = bounds2.w;
		obj2.height = bounds2.h;
		return this.hitTestRect(obj2, obj1);
	},
	hitTest: function(obj2) {
		var obj1 = this;
		if (obj2.rotation == 0 && obj2.rotation == 0) {
			if (this.hitTestRect(obj2)) return true;
		} else if (this.hitTestBounds(obj2)) {
			return true;
			var bounds = this.getBounds();
			var px = obj1.x;
			var py = obj1.y;
			var tw = obj2.width;
			var th = obj2.height;
			var mx = obj2.x + obj2.width / 2;
			var my = obj2.y + obj2.height / 2;
			var quad = 0;
			var isHit = false;

			// Detect
			if (px < mx && py < my) {
				quad = 1;
				if (py > Math.round((th / 2) - (px * .5))) isHit = true;
			} else if (px > mx && py < my) {
				quad = 2;
				if (py > Math.round((px - (tw / 2)) * .5)) isHit = true;
			} else if (px < mx && py > my) {
				quad = 3;
				if (py < Math.round((px * .5) + th / 2)) isHit = true;
			} else if (px > mx && py > my) {
				quad = 4;
				if (py < Math.round((th / 2) - ((px - tw / 2) * .5) + th / 2)) isHit = true;
			}
			if (isHit) return quad;
		}
		return false;
	},

	//
	children: [],
	destroy: function() {
		this.alive = false;
		this.stage.removeChild(this);
	},

	// Get Boundries of Object
	getBounds: function() {
		var rt = (this.rotation * Math.PI) / 180;
		var p1 = this.getRotatedPoint([0 - this.width / 2, 0 - this.height / 2], rt, [this.x, this.y]);
		var p2 = this.getRotatedPoint([0 + this.width / 2, 0 - this.height / 2], rt, [this.x, this.y]);
		var p3 = this.getRotatedPoint([0 + this.width / 2, 0 + this.height / 2], rt, [this.x, this.y]);
		var p4 = this.getRotatedPoint([0 - this.width / 2, 0 + this.height / 2], rt, [this.x, this.y]);
		var x = Math.min(p1[0], p2[0], p3[0], p4[0]);
		var y = Math.min(p1[1], p2[1], p3[1], p4[1]);
		var w = Math.max(Math.abs(p4[0] - p2[0]), Math.abs(p3[0] - p1[0]));
		var h = Math.max(Math.abs(p4[1] - p2[1]), Math.abs(p3[1] - p1[1]));
		return {x:Math.round(x), y:Math.round(y), w:Math.round(w), h:Math.round(h)};
	},
	getRotatedPoint: function(p, r, po) {
		var x = p[0];
		var y = p[1];
		var x1 = (x * Math.cos(r) - y * Math.sin(r)) + po[0];
		var y1 = (x * Math.sin(r) + y * Math.cos(r)) + po[1];
		return [x1, y1];
	},

	lookAt: function (target) {
		var dir = Math.atan2(this.y - target.y, this.x - target.x);
		var rotation = dir * 180 / Math.PI + 180;
		if (rotation < this.rotation) this.rotation -= 10;
		else this.rotation += 10;
	},

	distanceTo: function (target) {
		var xs = 0, ys = 0;
		xs = target.x - this.x;
		xs = xs * xs;
		ys = target.y - this.y;
		ys = ys * ys;
		return Math.sqrt(xs + ys);
	},

	// Internal Rendering
	_render: function() {

	},

});
