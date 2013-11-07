/*
	
	Base Function Modifiers
	Influenced by Mootools

*/

Function.prototype.overload = function() {
	var self = this;
	return function(a, b){
		if (a == null) return this;
		if (typeof a != 'string') {
			for (var k in a) self.call(this, k, a[k]);
		} else {
			self.call(this, a, b);
		}
		return this;
	};
};

Function.prototype.extend = function(key, value) {
	this[key] = value;
}.overload();
Function.prototype.implement = function(key, value) {
	this.prototype[key] = value;
}.overload();



Array.from = function(item){
	if (item == null) return [];
	return (Type.isEnumerable(item) && typeof item != 'string') ? (typeOf(item) == 'array') ? item : slice.call(item) : [item];
};

Function.implement({
	
	bind: function (that) {	
		var self = this,
			args = [],
			F = function(){};
		for (var i = 1; i < arguments.length; i++) {
			if (arguments[i]) args.push(arguments[i]);
		}
		if (args.length < 1) args = null;
		var bound = function() {
			var context = that, length = arguments.length;
			if (this instanceof bound){
				F.prototype = self.prototype;
				context = new F;
			}
			var result = (!args && !length)
				? self.call(context)
				: self.apply(context, args && length ? args.concat(Array.slice(arguments)) : args || arguments);
			return context == that ? result : context;
		}
		return bound;
	},

	delay: function(time, thisObj, args){
		return setTimeout(this.bind(thisObj, args), time);
	},
	
	loop: function(time, thisObj, args) {
		return setInterval(this.bind(thisObj, args), time);
	}

});