/**
*
* 	Preloader
*
**/
var Preloader = new BaseClass({

	init: function(main) {
		
		// Create new preloader
		this.stage = main.createStage("preloader");

		// Add a preloader to the stage
		this.loadBar = new createjs.Shape();
		this.loadBar.graphics.beginFill("#ff0000").drawRect(0, 0, 10, 10);
		this.loadBar.x = 20;
		this.loadBar.y = 30;

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
		var w = (this.preloader.progress * 100 | 0);
		this.loadBar.graphics.beginFill("#ff0000").drawRect(0, 0, w, 10);
		this.stage.update();
	},

	// Lodaing complete
	handleComplete: function() {
		this.stage.update();
	}

});
