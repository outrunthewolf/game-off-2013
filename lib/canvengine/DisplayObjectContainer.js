var DisplayObjectContainer = new BaseClass({
	
	Implements: DisplayObject,
	init: function() {
		this.addEvent('addedToStage', this.onAddedToStage.bind(this));
		this.addEvent('removedFromStage', this.onRemovedFromStage.bind(this));
	},
	class: 'DisplayObjectContainer',
	
	// Events
	onAddedToStage: function() {
//		console.log('[DisplayObject]', 'Added To Stage');
		for (var i = 0, l = this.children.length; i < l;i++) {
			var child = this.children[i];
			child.stage = this.stage;
			child.fireEvent('addedToStage');
		}
	},
	onRemovedFromStage: function() {
		this.active = false;
	},
	
	// eek, really?
	addChild: function(obj) {
		obj.parent = this;
		this.children.push(obj);
	},
	destroy: function() {
		this.alive = false;
		this.stage.removeChild(this);
	},
	
	// Internal Rendering
	source: null,
	context: null,
	render: function() {
		if (!this.source) {
			this.source = document.createElement('canvas');
			this.context = this.source.getContext('2d');
		}
	},
	
});