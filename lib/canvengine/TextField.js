var TextField = new BaseClass({
	
	Implements: DisplayObject,
	
	source: null,
	_context: null,
	text: '',
	color: '#000000',
	width: 300,
	height: 100,
	fontSize: 16,
	
	render: function() {
		
		if (!this.source) {
			this.source = document.createElement('canvas');
			this._context = this.source.getContext('2d');
		}
		var cx = this._context;
		var metrics = cx.measureText(this.text);
		this.source.width = metrics.width;
		this.source.height = this.height;
		cx.clearRect(0, 0, metrics.width, this.height);
		cx.font = this.fontSize + 'px Arial';
		cx.textBaseline = 'top';
		cx.strokeStyle = this.color;
		cx.lineWidth = 1;
		cx.strokeText(this.text, 0, 0);
		cx.stroke();
		
	}

});