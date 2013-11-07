/* -- -- -- -- --
	
	
	Canvengine
	by Marc Qualie
	
	
	A Game Engine designed to make basic games in Canvas
	

-- -- -- -- -- */


var Canvengine = new BaseClass({
	
	init: function(obj) {
		
		this.container = document.getElementById(obj.container);
		this.canvas = document.createElement('canvas');
		this.context = this.canvas.getContext('2d');
		this.container.appendChild(this.canvas);
		this.stage = new Stage();
		this.stage.root = this;
		
		obj.fps = Math.min(obj.fps, 60);
		this.buildStage(obj.width, obj.height);
		this.calculate.loop(15, this);
		this.render.loop(Math.floor(1000 / obj.fps), this);
		
		(function() {
			this.fps = this.frames;
			this.frames = 0;
		}).loop(1000, this);
		
	},
	
	buildStage: function(w, h) {
		this.width = w;
		this.height = h;
		this.canvas.width = w;
		this.canvas.height = h;
	},
	
	container: null,
	width: 640,
	height: 480,
	canvas: null,
	context: null,
	stage: null,
	player: null,
	debug: true,
	fps: 0,
	opf: 0,
	frames: 0,
	
	displayGlobalBoundingBox: false,
	
	keyDown: {},
	nativeEvents: ['keydown', 'keyup', 'mouseover', 'mouseout', 'mousemove'],
	renderFunc: null,
	
	// Complex Event System
	onEvent: function(evt, func) {
		if (this.nativeEvents.indexOf(evt) > -1) {
			var con = evt.indexOf('key') > -1 ? window : this.container;
			con.addEventListener(evt, func.bind(this));
		} else if (evt == 'enterframe') {
			this.renderFunc = func.bind(this);
		}
	},
	
	// Render
	calculate: function() {
		if (this.renderFunc) this.renderFunc.bind(this)();
	},
	renders: 0,
	render: function() {
		this.canvas.width = this.canvas.width;
		var cx = this.context;
//		cx.clearRect(0, 0, Game.width, Game.height);
		
//		if (this.stage.offsetX != this.stage._offsetX) {
//			cx.translate(this.stage.offsetX - this.stage._offsetX, 0);
//			this.stage._offsetX = this.stage.offsetX;
//		}
//		if (this.stage.offsetY != this.stage._offsetY) {
//			cx.translate(0, this.stage.offsetY - this.stage._offsetY);
//			this.stage._offsetY = this.stage.offsetY;
//		}
//		if (this.stage.offsetX > 0) this.stage.offsetX = -1;
//		if (this.stage.offsetY > 0) this.stage.offsetY = -1;
//		this.stage.vwidth = this.width - this.stage.offsetX;
//		this.stage.vheight = this.height - this.stage.offsetY;
		
		// Loop through all containers.. =\
		var childs = [];
		for (var i = 0, l = this.stage.children.length; i < l; i++) {
			var child = this.stage.children[i];
			childs.push(child);
			if (child.children.length > 0) {
				for (var i2 = 0, l2 = child.children.length; i2 < l2; i2++) {
					var child2 = child.children[i2];
					childs.push(child2);
				}
			}
		}
		
		// Render Stage Background
		cx.translate(this.stage.offsetX, this.stage.offsetY);
		if (this.stage.background) {
			var bg = this.stage.background;
			var w = bg.width;
			var h = bg.height;
			var ox = Math.floor(Math.abs(this.stage.offsetX) / w);
			var oy = Math.floor(Math.abs(this.stage.offsetY) / h);
			for (var col = 0, colM = Math.ceil(this.width / w); col <= colM; col ++) {
				for (var row = 0, rowM = Math.ceil(this.height / h); row <= rowM; row ++) {
					cx.drawImage(bg, (col + ox) * w, (row + oy) * h, w, h);
				}
			}
		}
		
		// Complex Rendering Calculations
		this.opf = 0;
		for (var i = 0, l = childs.length; i < l; i++) {
			var child = childs[i];
			if (!child) continue;
			if (!child.alive) continue;
			
			// Limit To Bounds
			if (child.render) child.render();
			if (child.bounds[0]) {
				if (child.x < child.bounds[0][0] + (child.width / 2)) child.x = child.bounds[0][0] + (child.width / 2);
				if (child.x > child.bounds[0][1] - (child.width / 2)) child.x = child.bounds[0][1] - (child.width / 2);
			}
			if (child.bounds[1]) {
				if (child.y < child.bounds[1][0] + (child.height / 2)) child.y = child.bounds[1][0] + (child.height / 2);
				if (child.y > child.bounds[1][1] - (child.height / 2)) child.y = child.bounds[1][1] - (child.height / 2);
			}
			var childX = Math.round(child.x);
			var childY = Math.round(child.y);
			
			// Apply offset
			var parent = child.parent;
			if (parent && parent.class != 'Stage' && 1) {
				childX += parent.x;
				childY += parent.y;
			}
			
			// Don't render Objects outside the stage view (fuck sake!?)
			if (childX < -this.stage.offsetX) continue;
			if (childX > -this.stage.offsetX + this.width) continue;
			if (childY < -this.stage.offsetY) continue;
			if (childY > -this.stage.offsetY + this.height) continue;
			
			// Do complex Translations and rotations
			cx.save();
			cx.translate(childX, childY);
			cx.rotate(child.rotation * Math.PI / 180);
			cx.translate(0 - childX, 0 - childY);
			
			// Draw Source image
			if (child.source) {
				cx.drawImage(child.source, childX - (child.width / 2), childY - (child.height / 2));
			} else {
				cx.fillStyle = child.color ? child.color : '#000000';
				cx.fillRect(childX - (child.width / 2), childY - (child.height / 2), child.width, child.height);
			}
			cx.restore();
			
			// Draw Bounding Box
			if (child.displayBoundingBox || this.displayGlobalBoundingBox) {
//				var rt = (child.rotation * Math.PI) / 180;
				var bounds = child.getBounds();
				var p1 = [bounds.x, bounds.y];
				var p2 = [bounds.x + bounds.w, bounds.y];
				var p3 = [bounds.x + bounds.w, bounds.y + bounds.h];
				var p4 = [bounds.x, bounds.y + bounds.h];
				cx.beginPath();
				cx.strokeStyle = "#ffffff";
				cx.lineWidth = 1;
				cx.moveTo(p1[0], p1[1]);
				cx.lineTo(p2[0], p2[1]);
				cx.lineTo(p3[0], p3[1]);
				cx.lineTo(p4[0], p4[1]);
				cx.lineTo(p1[0], p1[1]);
				cx.stroke();
			}
			
			this.opf++;
		}
		this.frames ++;
		this.renders ++;
		
		// Debugging
		if (this.debug) {
			var el = document.getElementById('canvengine-debugger');
			if (!el) {
				el = document.createElement('div');
				el.id = 'canvengine-debugger';
				this.container.appendChild(el); 
			}
			var playerBounds = this.player.getBounds();
			el.innerHTML = ''
				+ 'Player: ' + this.player.x + ', ' + this.player.y + ' (' + this.player.width + ', ' + this.player.height + ')'
				+ '<br/>-- ' + playerBounds.x + ', ' + playerBounds.y + ' (' + playerBounds.w + ', ' + playerBounds.h + ')'
				+ '<br/>Stage: ' + this.width + ', ' + this.height + ' (' + this.stage.offsetX + ', ' + this.stage.offsetY + ')'
//				+ '<br/>-- ' + this.stage.vwidth + ', ' + this.stage.vheight + ''
				+ '<br/>FPS: ' + this.fps + ' (' + this.opf + '/' + childs.length + ' Rendering)'
				+ '<br/>Background Offset: ' + ox + ', ' + oy
				+ '';
		}
		
	}

});

var Stage = new BaseClass({
	
	class: 'Stage',
	init: function() {
		
	},
	
	offsetX: 0,
	_offsetX: 0,
	offsetY: 0,
	_offsetY: 0,
	vwidth: 0,
	vheight: 0,
	root: null,
	background: null,
	
	// Children
	children: [],
	addChild: function(obj) {
		obj.stage = this;
		this.children.push(obj);
		obj.fireEvent('addedToStage');
	},
	removeChild: function(obj) {
		this.children.erase(obj);
		obj.fireEvent('removedFromStage');
	},
	contains: function(obj) {
		return;
	}

});