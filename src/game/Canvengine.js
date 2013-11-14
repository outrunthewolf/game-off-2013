/**
*
*	Canvengine
*	by Marc Qualie
*
*	A Game Engine designed to make basic games in Canvas
*
**/	
var Canvengine = new BaseClass({
	
	stageChildren: [],
	stage: null,
	player: null,

	// Construct
	init: function(obj) {

		// Cant be arsed setting all the properties manually
		for(var key in obj)
			this[key] = obj[key];

		// Set up a new stage(canvas)
		this.stage = this.createStage("main");

		var self = this;

		// Load some events
		this.stage.addEventListener("preloaderComplete", function()
		{
			self.startGame();

			// Set up the on enter frame doohicky, with a nice framerate
			createjs.Ticker.setFPS = self.fps;
			createjs.Ticker.addEventListener("tick", self.render);
		});

		// Create a preloader
		var preloader = new Preloader(this);
	},
	
	// Create a new stage, all canvas's are added to the same element,
	// but are independant of each other
	createStage: function(id) {

		// Create a new canvas with an id
		var canvas = document.createElement("canvas");
		canvas.setAttribute("id", id);
		
		// set sizes
		canvas.style.width = this.width + 'px';
		canvas.style.height = this.height + 'px';

		// Append to the canvas, and perhaps store it
		var elem = document.getElementById(this.container);
		elem.appendChild(canvas);

		// Return a new stage thingy
		var st = new createjs.Stage(canvas);

		// Add the stage to a lovely list
		this.stageChildren[id] = st;
		return st;
	},

	// Clear all children from a specific stage?
	// Not sure bout this, keep thinking 
	clearStage: function(id) {
		this.stageChildren[id].clear();
	},

	// start a game
	startGame: function()
	{
		console.log("here");

		// Create Player
		this.player = new Humanoid(this);
		this.createStage("player");
		this.stage.addChild(this.player);

		console.log(this.player);

		// create a new scene

		// load controls

		// load HUD

	},

	// Render function
	// I suppose here we can collect the data and 
	render: function() {
	
		// Loop through all canvas's and collect the children!!
		// its getting late and cold...
		/*
		var childs = [];
		for (var i = 0, l = this.stageChildren.length; i < l; i++) {
			var child = this.stageChildren[i];
			childs.push(child);
			
		}
		
		// if a player or zomble is specified to be within th world.
		// check its bounds
		this.checkBounds(item);
		*/
		this.player.x++;
		
	},

	checkBounds: function(item) {
		// Keep an item within the world
		if (item.x < (0 - this.stage.offsetX) + 100) this.stage.offsetX += item.speedX;
		if (item.x > (this.width - this.stage.offsetX) - 100) this.stage.offsetX += item.speedX;
		if (item.y < (0 - this.stage.offsetY) + 100) this.stage.offsetY -= item.speedY;
		if (item.y > (this.height - this.stage.offsetY) - 100) this.stage.offsetY -= item.speedY;
	}
});
