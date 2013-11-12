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

		// Create a preloader
		var preloader = new Preloader(this);

		// Set up the on enter frame doohicky, with a nice framerate
		//createjs.Ticker.setFPS = this.fps;
		//createjs.Ticker.addEventListener("tick", this.render);
		//this.render();
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
	// I suppose here we can collect the data and 
	render: function() {
	
		// Loop through all canvas's and collect the children!!
		// its getting late and cold...
		var childs = [];
		for (var i = 0, l = this.stageChildren.length; i < l; i++) {
			var child = this.stageChildren[i];
			childs.push(child);
			
		}
		
		console.log(childs);
		
	},
});
