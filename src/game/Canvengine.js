/**
*
*	Canvengine
*	by Marc Qualie
*
*	A Game Engine designed to make basic games in Canvas
*
**/	
var Canvengine = new BaseClass({
	
	stage: null,
	stageChildren: [],
	fps: 30,
	width: 640,
	height: 480,
	debug: true,
	ticker: null,

	// Construct
	init: function(obj) {

		// Cant be arsed setting all the properties manually
		for(var key in obj)
			this[key] = obj[key];

		// Set up a new stage(canvas)
		this.stage = this.createStage("main");

		// Set up the on enter frame doohicky, with a nice framerate
		createjs.Ticker.setFPS = this.fps;
		createjs.Ticker.addEventListener("tick", this.render);
	},
	
	// Create a new stage, all canvas's are added to the same element,
	// but are independant of each other
	createStage: function(id) {

		// Create a new canvas with an id
		var canvas = document.createElement("canvas");
		canvas.setAttribute("id", id);

		// Append to the canvas, and perhaps store it
		var elem = document.getElementById(this.container);
		elem.appendChild(canvas);

		// Add the stage to a lovely list
		this.stageChildren.push(id);

		// Return a new stage thingy
		return new createjs.Stage(canvas);
	},

	// Clear all children from a specific stage?
	// Not sure bout this, keep thinking 
	clearStageChildren: function(id) {


	},

	// Render function
	render: function() {
		//console.log('nyah');
		return false;
		
		// Loop through all canvas's and collect the children!!
		// its getting late and cold...
		var childs = [];
		for (var i = 0, l = this.stageChildren.length; i < l; i++) {
			var child = this.stageChildren[i];
			childs.push(child);
			if (child.children.length > 0) {
				for (var i2 = 0, l2 = child.children.length; i2 < l2; i2++) {
					var child2 = child.children[i2];
					childs.push(child2);
				}
			}
		}
		
		// Complex Rendering Calculations
		// Note, FYI chris - we can calculate if stuff is dirty here
		// If we see that an element on a canvas is in need of updating
		// we can re-render that particular canvas with somethin aling the lines of
		// child[i].stage.update();
		//
		// Dont forget we can pause the ticker i think
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
	},
});
