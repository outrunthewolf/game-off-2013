Array.prototype.implement = function(obj) {
	obj.forEach(function(val, key) {
		this.prototype[key] = value;
	}.bind(this));
};

/*
Array.implment({
	
	each: function(fn, bind) {
		for (var i = 0, l = this.length; i < l; i++){
			if (i in this) fn.call(bind, this[i], i, this);
		}
	},
	
	erase: function(item) {
		for (var i = this.length; i--;){
			if (this[i] === item) this.splice(i, 1);
		}
		return this;
	}

});
*/
Array.prototype.erase =  function(item) {
	for (var i = this.length; i--;){
		if (this[i] === item) this.splice(i, 1);
	}
	return this;
};