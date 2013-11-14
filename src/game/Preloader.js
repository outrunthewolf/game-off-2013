/**
*
* 	Preloader
*
**/
var Preloader = new BaseClass({

	height: 10,
	padding: 10, // percentage?
	xpos: null,
	ypos: null,
	barLimit: null,
	main: null,

	init: function(main) {
		
		this.main = main;

		// Create new preloader
		this.stage = main.createStage("preloader");

		// Add a preloader to the stage
		this.loadBar = new createjs.Shape();
		this.loadBar.graphics.beginFill("#ff0000").drawRect(0, 0, 0, this.height);

		// Calculate some dimensions, we always want the preloader just off the bottom
		this.xpos = 10;//main.width - (this.padding / 100) * main.width;
		this.ypos = 20;//(main.height - (this.padding / 100) * main.height) - this.height;
		this.barLimit = (main.width - (this.padding * 2));

		this.loadBar.x = this.xpos;
		this.loadBar.y = this.ypos;
		console.log(this.ypos);
		console.log(this.xpos);

		// Add to stage
		this.stage.addChild(this.loadBar);
		this.stage.update();

		// Preloader
		var self = this;
		this.preloader = new createjs.LoadQueue(true);
		this.preloader.installPlugin(createjs.Sound);

		// Handle progress
		this.preloader.addEventListener("progress", function()
		{
			self.handleProgress();
		});

		// Handle complete
		this.preloader.addEventListener("complete", function()
		{
			self.handleComplete();
		});
		
		// Load the manifest for any assets
		this.preloader.loadManifest(main.manifest);

		// Begin the preloader
		this.preloader.load();
	},

	// Handle a file load
	handleProgress: function() {
		this.loadBar.graphics.clear();
		var pc = (this.preloader.progress * this.barLimit) ;
		
		this.loadBar.graphics.beginFill("#ff0000").drawRect(this.padding, 0, pc, 10);
		this.loadBar.width = pc;
		
		this.stage.update();
	},

	// Lodaing complete
	handleComplete: function() {
		this.main.clearStage('preloader');
		this.main.stage.dispatchEvent("preloaderComplete");
	}

});
