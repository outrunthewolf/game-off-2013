/**
*
*	Create a new game with the engine
*
**/
document.addEventListener('DOMContentLoaded',function()
{
	// Create a new game
	var Game = new Canvengine({
		container: "stage",
		manifest: [
			{src:"assets/images/grass.jpg", id:"grass"},
			{src:"assets/images/zombie.gif", id:"zombie"},
			{src:"assets/sound/tada.ogg", id:"music"},
		]
	});

});
