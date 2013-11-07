/*
	
	Base Type

*/
var BaseType = function(name, obj) {
	return obj;
}

/*
	
	Base Class

*/
var BaseClass = new BaseType('Canvengine', function (params) {
	
	// Implementation Inheritance
	var imp = params.Implements || {};
	for (var key in imp.prototype) {
		if (key == 'overload') continue;
		params[key] = imp.prototype[key];
	}
	
	var func = function() {
		
		var construct = this.init;
		if (!construct) construct = function() { }
		var init = construct.apply(this, arguments);
		return init;
		
	}.implement(params);
	
	return func;
	
});