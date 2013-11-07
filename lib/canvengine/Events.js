var Event = new BaseClass({
	
	init: function(name) {
		this.type = name;
	},
	
	type: 'defaultEvent',
	
	stageX: 0,
	stageY: 0,
	
	keyCode: 0,
	key: ''

});

var GameEvents = new BaseClass({
	
	cache: {},
	
	addEvent: function(name, callback) {
		this.cache[name] = callback;
	},
	fireEvent: function(name) {
		if (this.cache[name]) this.cache[name].bind(this)();
	}

});