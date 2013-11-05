var Ticker;

var Main = 
{
	zom_spawn_count: 10,
	stage: false,
	framerate: 30,

	init: function()
	{
		// Get a main stage or holder id
		Main.holder = document.getElementById('stage');
		
		// Create a new scene(canvas)
		if(!Main.stage)
			Main.stage = Stage.new_stage("Main");

		// Enable Mouse events
	    Main.stage.mouseEventsEnabled = true;

		// Create a new frameroute on stage for all items to attach to
		Main.ticker = createjs.Ticker;
		Main.ticker.setFPS = Main.framerate;

	    // Add some zombies
	    Scene.load_zombies();

	}
}


// Some kind of class for manipulating scenes(canvas)
var Stage =
{
	// New scene handler
	new_stage: function(id)
	{
		// Create a new canvas with an id
		var canvas = document.createElement("canvas");
		canvas.setAttribute("id", id);

		// Append to the canvas, and perhaps store it
		Main.holder.appendChild(canvas);

		// Return a new stage thingy
		return new createjs.Stage(canvas);
	},

	// Clear a scene
	clear_stage: function()
	{

	}
}

var Scene =
{
	// new zombie scene
	load_zombies: function()
	{
		for(var i = 0; i <= Main.zom_spawn_count; i++)
		{
			var zom = Zombie.spawn(i);
		}
	}
}

var Zombie = 
{
	stage: false,
	zombies: [],

	spawn: function(n)
	{
		if(!Zombie.stage)
			Zombie.stage = Stage.new_stage("Zombie");

		// Create a new Zombie
		var z = new createjs.Shape();
		z.graphics.beginFill("red").drawRect(0, 0, 4, 4);
		
		// Make some random positions
		var x = Math.floor((Math.random() * Main.stage.canvas.width) + 1);
		var y = Math.floor((Math.random() * Main.stage.canvas.height) + 1);

		// Set random position
		z.x = x;
		z.y = y;

		// Ad the zombie to the stage
		Zombie.stage.addChild(z);
		Zombie.stage.update();

		// Add on frame event listener
		Main.ticker.addEventListener("tick", function()
		{
			// calculate a position
			var posx = Zombie.stage.mouseX;
			var posy = Zombie.stage.mouseY;

			// Move zombie
			Zombie.move(z, posx, posy, 1);
		});

		// Mouse event for reset
		Zombie.stage.addEventListener("click", function()
		{
			Zombie.reset_spawn(z);
		});	
	},

	move: function(zombie, posx, posy, speed)
	{

		if(zombie.x > posx)
		{
			--zombie.x * speed;
		}

		if(zombie.y > posy)
		{
			--zombie.y * speed
		}

		if(zombie.y < posy)
		{
			++zombie.y * speed
		}

		if(zombie.x < posx)
		{
			++zombie.x * speed
		}

		Zombie.stage.update();
	},

	reset_spawn: function(zombie)
	{
		// Make some random positions
		zombie.x = Math.floor((Math.random() * Main.stage.canvas.width) + 1);
		zombie.y = Math.floor((Math.random() * Main.stage.canvas.height) + 1);

		console.log('reset');
	}
}
