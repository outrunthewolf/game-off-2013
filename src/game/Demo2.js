

// Some kind of class for manipulating scenes(canvas)
var Stage = {

	// New scene handler
	newStage: function(id)
	{
		var holder = document.getElementById('stage');

		// Create a new canvas with an id
		var canvas = document.createElement("canvas");
		canvas.setAttribute("id", id);

		// Append to the canvas, and perhaps store it
		holder.appendChild(canvas);

		// Return a new stage thingy
		return new createjs.Stage(canvas);
	},

	// Clear a scene
	clear_stage: function()
	{

	}
};


var Demo2 = new BaseClass({

	holder: false,
	manifest: false,
	totalLoaded: "test",
	stage: false,
	message: false,
	self: this,

	init: function(obj) {

		// Set up manifest files
		manifest = [
			{src:"assets/images/stars.png", id:"stars"},
			{src:"assets/images/ship.png", id:"ship"},
		];

		// Create new stage
		this.stage = Stage.newStage();
		console.log(this.stage);

		// Add a preloader to the stage
		this.message = new createjs.Text("CHRIS", "20px; Arial", "#FFF"); 
		this.message.x = 20;
		this.message.y = 10;
		this.stage.addChild(this.message);
		this.stage.update();

		// Preloader
		preloader = new createjs.LoadQueue(true);
		preloader.addEventListener("progress", this.handleProgress);
		preloader.addEventListener("complete", this.handleComplete);
		
		// Load the manifest for any assets
		preloader.loadManifest(manifest);

		// Begin the preloader
		preloader.load();
	},

	// Handle a file load
	handleProgress: function() {
		console.log(this.message);
		self.message.text = "Loading " + (preloader.progress * 100 | 0) + "%";
		stage.update();
 	}


});

