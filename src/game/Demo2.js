

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
		{src:"assets/images/grass.jpg", id:"grass"},
		{src:"assets/images/zombie.gif", id:"zombie"},
		{src:"assets/sound/tada.ogg", id:"music"},
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
	preloader.installPlugin(createjs.Sound);
	preloader.addEventListener("progress", handleProgress);
	preloader.addEventListener("complete", handleComplete);
	
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

// Lodaing complete
function handleComplete() {
	message.text = "Complete boy!";
	stage.update();
}


/****
*	
*	PRELOADER SHIZZLE
*
****/