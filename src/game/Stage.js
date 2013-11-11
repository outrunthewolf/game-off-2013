/**
*
*	Some kind of class for handling stages?
*
**/
var Stage = new BaseClass({

	container: null,
	
	// Create a new stage
	create: function(id) {

		// Create a new canvas with an id
		var canvas = document.createElement("canvas");
		canvas.setAttribute("id", id);

		// Append to the canvas, and perhaps store it
		Main.holder.appendChild(canvas);

		// Return a new stage thingy
		return new createjs.Stage(canvas);
	},

	// Clear a stage
	clear: function() {

	}
});
