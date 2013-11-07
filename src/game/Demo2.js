

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


/****
*	
*	PRELOADER SHIZZLE
*
****/
var holder = false;
var manifest = false;
var totalLoaded = 0;
var stage = false;
var message = false;

function init(obj) {

	// Set up manifest files
	manifest = [
		{src:"assets/images/stars.png", id:"stars"},
		{src:"assets/images/ship.png", id:"ship"},
	];

	// Create new stage
	stage = Stage.newStage();

	// Add a preloader to the stage
	message = new createjs.Text("CHRIS", "20px; Arial", "#FFF"); 
	message.x = 20;
	message.y = 10;
	stage.addChild(this.message);
	stage.update();

	// Preloader
	preloader = new createjs.LoadQueue(true);
	preloader.addEventListener("progress", handleProgress);
	
	// Load the manifest for any assets
	preloader.loadManifest(manifest);

	// Begin the preloader
	preloader.load();
}

// Handle a file load
function handleProgress() {
	message.text = "Loading " + (preloader.progress * 100 | 0) + "%";
	stage.update();
}
