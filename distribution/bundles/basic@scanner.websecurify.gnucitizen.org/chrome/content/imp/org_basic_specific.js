(function (exports) {
	
	var log = function (message) {
		dump(message + '\n');
	}
	
	/* ------------------------------------------------------------------------ */
	
	var getXMLHttpRequestObject = function () {
		var xhr = {
			xhr: new XMLHttpRequest(),
			
			open: function (method, url, async) {
				this.xhr.open(method, url, async);
			},
			
			send: function (data) {
				this.xhr.send(data);
			},
			
			abort: function () {
				this.xhr.abort();
			},
			
			overrideMimeType: function (mimeType) {
				this.xhr.overrideMimeType(mimeType);
			},
			
			setRequestHeader: function (name, value) {
				this.xhr.setRequestHeader(name, value);
			},
			
			getAllResponseHeaders: function () {
				return this.xhr.getAllResponseHeaders().replace(/X-Location-Override-Header:/g, 'Location:').replace(/X-WWW-Authenticate-Override-Header:/g, 'WWW-Authenticate:');
			},
			
			set onload(handler) {
				var self = this;
				
				this.xhr.onload = function (xhr) {
					handler.call(self, self);
				}
			},
			
			set onerror(handler) {
				var self = this;
				
				this.xhr.onerror = function (xhr) {
					handler.call(self, self);
				}
			},
			
			set onabort(handler) {
				var self = this;
				
				this.xhr.onabort = function (xhr) {
					handler.call(self, self);
				}
			},
			
			get status() {
				return this.xhr.status;
			},
			
			get statusText() {
				return this.xhr.statusText;
			},
			
			get responseText() {
				return this.xhr.responseText;
			}
		};
		
		return xhr;
	}
	
	/* ------------------------------------------------------------------------ */
	
	exports.log = log;
	exports.getXMLHttpRequestObject = getXMLHttpRequestObject;
	
})(exports);
