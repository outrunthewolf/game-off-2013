var Sprite = new BaseClass({
	
	Implements: DisplayObject,
	
	source: null,
	
	setSourceFromUrl: function(url) {
		var img = new Image();
		img.onload = function() {
			this.source = img;
			this.width = img.width;
			this.height = img.height;
//			this.color = "rgba(255, 255, 255, 0)";
		}.bind(this);
		img.src = url;
	}

});