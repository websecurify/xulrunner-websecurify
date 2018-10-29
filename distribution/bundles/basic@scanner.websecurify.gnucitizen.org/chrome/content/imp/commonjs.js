(function () {
	// pass
})();

function getFileContents(path) {
	var xhr = new XMLHttpRequest();
	
	xhr.open('GET', path, false);
	xhr.overrideMimeType('plain/text');
	xhr.send(null);
	
	return xhr.responseText;
}

function getModuleContents(path) {
	return getFileContents(path);
}

function evalInScope(/*exports, expression*/) {
	eval('(function (exports) {' + arguments[1] + '})(arguments[0]);');
}

function require(module) {
	if (!('__modules__' in arguments.callee)) {
		arguments.callee.__modules__ = {};
	}
	
	if (!(module in arguments.callee.__modules__)) {
		var exports = {};
		
		evalInScope(exports, getModuleContents(module));
		
		arguments.callee.__modules__[module] = exports;
	}
	
	return arguments.callee.__modules__[module];
}