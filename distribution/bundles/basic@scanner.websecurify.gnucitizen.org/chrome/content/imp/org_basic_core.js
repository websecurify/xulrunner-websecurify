(function (exports) {
	
	var org_basic_specific = require('./org_basic_specific.js');
	var org_basic_support = require('./org_basic_support.js');
	
	var log = org_basic_specific.log;
	
	/* ------------------------------------------------------------------------ */
	
	String.prototype.startsWith = function (value) {
		return this.indexOf(value) == 0;
	}
	
	String.prototype.endsWith = function (value) {
		var index = this.indexOf(value);
		
		return (index >= 0) && (this.indexOf(value) + value.length == this.length);
	}
	
	String.prototype.equals = function (value) {
		return this == value;
	}
	
	String.prototype.isEmpty = function () {
		return this.length == 0;
	}
	
	/* ------------------------------------------------------------------------ */
	
	function ListContainerIterator(list) {
		this.list = list;
		this.listLength = list.length;
		this.index = 0;
	}
	
	ListContainerIterator.prototype.hasNext = function () {
		return this.index < this.listLength;
	}
	
	ListContainerIterator.prototype.next = function () {
		if (this.index >= this.listLength) {
			throw new Error('no such element');
		} else {
			return this.list[this.index++];
		}
	}
	
	ListContainerIterator.prototype.remove = function () {
		throw new Error('cannot remove element');
	}
	
	/* ------------------------------------------------------------------------ */
	
	function ListContainer() {
		this.list = [];
		
		if (arguments.length == 1 && arguments[0] instanceof Array) {
			for (var i = 0; i < arguments[0].length; i += 1) {
				this.list.push(arguments[0][i]);
			}
		} else {
			for (var i = 0; i < arguments.length; i += 1) {
				this.list.push(arguments[i]);
			}
		}
	}
	
	ListContainer.prototype.iterator = function () {
		return new ListContainerIterator(this.list);
	}
	
	ListContainer.prototype.size = function () {
		return this.list.length;
	}
	
	ListContainer.prototype.add = function (value) {
		this.list.push(value);
	}
	
	ListContainer.prototype.remove = function (value) {
		var i = this.list.indexOf(value);
		
		if (i >= 0) {
			this.list.splice(i, 1)
		} 
	}
	
	ListContainer.prototype.push = function (value) {
		this.list.push(value);
	}
	
	ListContainer.prototype.pop = function () {
		return this.list.pop();
	}
	
	ListContainer.prototype.retrieve = function (index) {
		return this.list[index];
	}
	
	ListContainer.prototype.insert = function (index, value) {
		return this.list.splice(index, 0, value);
	}
	
	ListContainer.prototype.replace = function (index, value) {
		this.list[index] = value;
	}
	
	ListContainer.prototype.erase = function (i) {
		return this.list.splice(i, 1);
	}
	
	ListContainer.prototype.clear = function () {
		this.list = [];
	}
	
	ListContainer.prototype.reverse = function () {
		this.list.reverse();
	}
	
	ListContainer.prototype.contains = function (value) {
		for (var i = 0; i < this.list.length; i += 1) {
			if (this.list[i] == value) {
				return true;
			}
		}
		
		return false;
	}
	
	ListContainer.prototype.shuffle = function () {
		var o = this.list;
		
		for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x) {
			// pass
		}
	}
	
	ListContainer.prototype.reflect = function () {
		var newList = [];
		
		for (var i = 0; i < this.list.length; i += 1) {
			newList.push(this.list[i]);
		}
		
		var newListContainer = new ListContainer();
		
		newListContainer.list = newList;
		
		return newListContainer;
	}
	
	/* ------------------------------------------------------------------------ */
	
	function MapContainerIterator(map) {
		this.keys = [];
		
		for (var key in map) {
			if (map.hasOwnProperty(key)) {
				this.keys.push(key);
			}
		}
		
		this.keysLength = this.keys.length;
		this.index = 0;
	}
	
	MapContainerIterator.prototype.hasNext = function () {
		return this.index < this.keysLength;
	}
	
	MapContainerIterator.prototype.next = function () {
		if (this.index >= this.keysLength) {
			throw new Error('no such element');
		} else {
			return this.keys[this.index++];
		}
	}
	
	MapContainerIterator.prototype.remove = function () {
		throw new Error('cannot remove element');
	}
	
	/* ------------------------------------------------------------------------ */
	
	function MapContainer() {
		this.map = {};
	}
	
	MapContainer.prototype.iterator = function () {
		return new MapContainerIterator(this.map);
	}
	
	MapContainer.prototype.get = function (key) {
		var value = this.map[key];
		
		return value != undefined ? value : null;
	}
	
	MapContainer.prototype.set = function (key, value) {
		this.map[key] = value;
	}
	
	/* ------------------------------------------------------------------------ */
	
	function SetContainer() {
		throw new Error('not implemented'); // TODO: add code here
	}
	
	/* ------------------------------------------------------------------------ */
	
	function RegularMatch(groups) {
		this.groups = groups;
	}
	
	RegularMatch.prototype.match = function () {
		return this.groups[0];
	}
	
	RegularMatch.prototype.group = function (index) {
		return this.groups[index];
	}
	
	RegularMatch.prototype.groupCount = function () {
		return this.groups.length;
	}
	
	RegularMatch.prototype.any = function () {
		for (var i = 1; i < this.groups.length; i += 1) {
			var result = this.groups[i];
			
			if (result != undefined) {
				return result;
			}
		}
		
		return null;
	}
	
	RegularMatch.prototype.some = function (some) {
		var any = this.any();
		
		if (any == null) {
			return some;
		} else {
			return any;
		}
	}
	
	/* ------------------------------------------------------------------------ */
	
	function RegularIterator(regexp, input) {
		this.regexp = regexp;
		this.input = input;
		this.match = this.regexp.exec(this.input);
	}
	
	RegularIterator.prototype.hasNext = function () {
		return this.match != null;
	}
	
	RegularIterator.prototype.next = function () {
		var oldMatch = this.match;
		
		this.match = this.regexp.exec(this.input);
		
		return new RegularMatch(oldMatch);
	}
	
	/* ------------------------------------------------------------------------ */
	
	function RegularIterable(regexp, input) {
		this.regexp = regexp;
		this.input = input;
	}
	
	RegularIterable.prototype.iterator = function () {
		return new RegularIterator(this.regexp, this.input);
	}
	
	/* ------------------------------------------------------------------------ */
	
	function RegularExpression(pattern, flags) {
		this.pattern = pattern;
		this.flags = flags;
		this.regexp = new RegExp(this.pattern, this.flags);
	}
	
	RegularExpression.prototype.test = function (input) {
		var newRegexp = eval('new RegExp(this.regexp)');
		var test = newRegexp.test(input);
		
		return test;
	}
	
	RegularExpression.prototype.match = function (input) {
		var newRegexp = eval('new RegExp(this.regexp)');
		var match = newRegexp.exec(input);
		
		if (match) {
			return new RegularMatch(match);
		} else {
			return null;
		}
	}
	
	RegularExpression.prototype.find = function (input) {
		var newFlags = this.flags ? this.flags : 'g';
		
		newFlags = newFlags.indexOf('g') >= 0 ? newFlags : 'g' + newFlags;
		
		var newRegexp = new RegExp(this.pattern, newFlags);
		
		return new RegularIterable(newRegexp, input);
	}
	
	RegularExpression.prototype.split = function (input) {
		return input.split(this.regexp);
	}
	
	RegularExpression.prototype.replace = function (input, replacement) {
		return input.replace(this.regexp, replacement);
	}
	
	RegularExpression.prototype.count = function (input) {
		throw new Error('not implemented'); // TODO: add code here
	}
	
	RegularExpression.escapeRegularExpression = new RegularExpression('([.*+?|()\\[\\]{}\\\\])', 'g');
	
	RegularExpression.escape = function (pattern) {
		return RegularExpression.escapeRegularExpression.replace(pattern, '\\$1');
	}
	
	RegularExpression.makeLiteral = function (input) {
		return input.replace(/\$/g, '\\$');
	}
	
	/* ------------------------------------------------------------------------ */
	
	function HashUtils() {
		// pass
	}
	
	if ('sha1' in org_basic_specific) {
		HashUtils.sha1 = org_basic_specific.sha1;
	} else {
		HashUtils.sha1 = org_basic_support.sha1;
	}
	
	/* ------------------------------------------------------------------------ */
	
	function HtmlUtils() {
		// pass
	}
	
	HtmlUtils.escapeHtmlComponent = function (component) {
		return component.split('&').join('&amp;').split('<').join('&lt;').split('>').join('&gt;');
	}
	
	HtmlUtils.unescapeHtmlComponent = function (component) {
		return component.split('&amp;').join('&').split('&lt;').join('<').split('&gt;').join('>');
	}
	
	/* ------------------------------------------------------------------------ */
	
	function XmlUtils() {
		// pass
	}
	
	XmlUtils.escapeHtmlComponent = function (component) {
		return component.split('&').join('&amp;').split('<').join('&lt;').split('>').join('&gt;');
	}
	
	XmlUtils.unescapeHtmlComponent = function (component) {
		return component.split('&amp;').join('&').split('&lt;').join('<').split('&gt;').join('>');
	}
	
	XmlUtils.escapeXmlComponentForAttribute = function () {
		return component.split('"').join('&quot;').split("'").join('&#x27;');
	}
	
	XmlUtils.unescapeXmlComponentForAttribute = function () {
		return component.split('&#x27;').join("'").split('&quot;').join('"');
	}
	
	/* ------------------------------------------------------------------------ */
	
	function LogUtils() {
		// pass
	}
	
	LogUtils.recordMessage = function (message) {
		log('[*] ' + message);
	}
	
	LogUtils.recordWarning = function (warning) {
		log('[-] ' + warning);
	}
	
	LogUtils.recordError = function (error) {
		log('[x] ' + error);
	}
	
	LogUtils.recordException = function (message, exception) {
		log('[x] ' + message + ': ' + exception);
	}
	
	/* ------------------------------------------------------------------------ */
	
	function MathUtils() {
		// pass
	}
	
	MathUtils.round = function (input) {
		return Math.round(input);
	}
	
	MathUtils.random = function (from, to) {
		return from + Math.floor(Math.random() * (to + 1));
	}
	
	/* ------------------------------------------------------------------------ */
	
	function NumberUtils() {
		// pass
	}
	
	NumberUtils.parseInteger = function (input) {
		var result = parseInt(input, 10);
		
		if (isNaN(result)) {
			throw new Error('cannot parse integer');
		} else {
			return result;
		}
	}
	
	/* ------------------------------------------------------------------------ */
	
	function UriUtils() {
		// pass
	}
	
	UriUtils.escapeUriComponent = function (component) {
		return encodeURIComponent(component);
	}
	
	UriUtils.unescapeUriComponent = function (component) {
		return decodeURIComponent(component);
	}
	
	/* ------------------------------------------------------------------------ */
	
	function hookDebugRoutines() {
		RegularExpression.prototype.test = hookDebugRoutines.wrapTimeFunction(RegularExpression.prototype.test, 'RegularExpression.prototype.test', '', 'arguments[0].substring(0, 20)');
		RegularExpression.prototype.match = hookDebugRoutines.wrapTimeFunction(RegularExpression.prototype.match, 'RegularExpression.prototype.match', '', 'arguments[0].substring(0, 20)');
		
		RegularExpression.prototype.find = (function (targetFunction) {
			return function () {
				var pattern = this.pattern;
				var result = targetFunction.apply(this, arguments);
				
				result.iterator = (function (targetFunction) {
					return function () {
						var result = targetFunction.apply(this, arguments);
						
						result.next = hookDebugRoutines.wrapTimeFunction(result.next, 'RegularExpression.prototype.find.iterator.next', pattern, 'this.input.substring(0, 20)');
						
						return result;
					}
				})(result.iterator);
				
				return result;
			}
		})(RegularExpression.prototype.find);
	}
	
	hookDebugRoutines.wrapTimeFunction = function (targetFunction, name, message, expression) {
		return function () {
			LogUtils.recordMessage(name + ': start' + (message ? ' ' + message : ''));
			
			var startTime = (new Date()).getTime();
			var result = targetFunction.apply(this, arguments)
			var endTime = (new Date()).getTime();
			var deltaTime = endTime - startTime;
			
			LogUtils.recordMessage(name + ': completed in ' + deltaTime + ' seconds');
			LogUtils.recordMessage(name + ': stop');
			
			if (expression) {
				LogUtils.recordMessage(name + ': expression ' + eval(expression));
			}
			
			return result;
		}
	}
	
	/* ------------------------------------------------------------------------ */
	
	exports.ListContainer = ListContainer;
	exports.MapContainer = MapContainer;
	exports.SetContainer = SetContainer;
	exports.RegularMatch = RegularMatch;
	exports.RegularExpression = RegularExpression;
	exports.HashUtils = HashUtils;
	exports.HtmlUtils = HtmlUtils;
	exports.XmlUtils = XmlUtils;
	exports.LogUtils = LogUtils;
	exports.MathUtils = MathUtils;
	exports.NumberUtils = NumberUtils;
	exports.UriUtils = UriUtils;
	exports.hookDebugRoutines = hookDebugRoutines;
	
})(exports);