const CR = Components.results;
const CC = Components.classes;
const CI = Components.interfaces;

/* ------------------------------------------------------------------------ */

Components.utils.import('resource://gre/modules/XPCOMUtils.jsm');

/* ------------------------------------------------------------------------ */

function WeaponryRawHttpRequest() {
	// pass
}

WeaponryRawHttpRequest.prototype = {
	classDescription: 'Weaponry Raw HTTP Request',
	classID: Components.ID('{59d45ec0-4947-11df-9879-0800200c9a66}'),
	contractID: '@common.weaponry.gnucitizen.org/raw-http-request;1',
	QueryInterface: XPCOMUtils.generateQI([CI.IWeaponryRawHttpRequest, CI.nsIStreamListener]),
	
	/* -------------------------------------------------------------------- */
	
	get wrappedJSObject () {
		return this;
	},
	
	/* -------------------------------------------------------------------- */
	
	init: function (scheme, host, port, request, redirectionLimit, autoDecode) {
		this.scheme = scheme.toLowerCase();
		this.host = host;
		this.port = port;
		this.request = request;
		this.redirectionLimit = redirectionLimit;
		this.autoDecode = autoDecode;
		
		if (!(this.scheme in {'http':1, 'https':1})) {
			throw new Error('unrecognized scheme: ' + this.scheme);
		}
		
		if (this.redirectionLimit == undefined) {
			this.redirectionLimit = 0;
		}
		
		if (this.autoDecode == undefined) {
			this.autoDecode = false;
		}
		
		this.actualRequest = request;
		
		this.head = '';
		this.body = '';
		this.headers = '';
		
		this.usesProxy = false;
		
		this.processAction = this.lookupResponseHead;
	},
	
	/* -------------------------------------------------------------------- */
	
	onStartRequest: function (request, context) {
		this.dataParts = [];
	},
	
	onStopRequest: function (request, context, statusCode) {
		this.body = this.dataParts.join('');
		
		if (this.handler) {
			this.handler.handle(this.head + '\r\n' + this.body);
		}
	},
	
	onDataAvailable: function (request, context, inputStream, offset, count) {
		let binaryInputStream = CC['@mozilla.org/binaryinputstream;1'].createInstance(CI.nsIBinaryInputStream);
		
		binaryInputStream.setInputStream(this.inputStream);
		
		let data = binaryInputStream.readBytes(count);
		
		this.dataParts.push(data);
		
		this.processAction();
	},
	
	/* -------------------------------------------------------------------- */
	
	prepareSocketTransport: function () {
		let ioService = CC['@mozilla.org/network/io-service;1'].getService(CI.nsIIOService);
		let protocolProxyService = CC['@mozilla.org/network/protocol-proxy-service;1'].getService(CI.nsIProtocolProxyService);
		let socketTransportService = CC['@mozilla.org/network/socket-transport-service;1'].getService(CI.nsISocketTransportService);
		let url = ioService.newURI(this.scheme + '://' + this.host + ':' + this.port, null, null);
		let proxyInfo = protocolProxyService.resolve(url, 0);
		
		if (proxyInfo) {
			this.usesProxy = true;
		}
		
		let socketTypes = [];
		
		if (this.scheme == 'https') {
			socketTypes.push('ssl');
		}
		
		this.socketTransport = socketTransportService.createTransport(socketTypes, socketTypes.length, this.host, this.port, proxyInfo);
	},
	
	prepareTransportStreams: function (inputStream, outputStream) {
		if (this.usesProxy && this.scheme == 'https') {
			let connectLine = 'CONNECT ' + this.host + ':' + this.port + ' HTTP/1.1\r\n\r\n';
			
			this.outputStream.write(connectLine, connectLine.length);
			
			this.originalOnDataAvailable = this.onDataAvailable;
			this.originalSubmitRequest = this.submitRequest;
			
			this.onDataAvailable = function (request, context, inputStream, offset, count) {
				let binaryInputStream = CC['@mozilla.org/binaryinputstream;1'].createInstance(CI.nsIBinaryInputStream);
				
				binaryInputStream.setInputStream(this.inputStream);
				
				let data = binaryInputStream.readBytes(count);
				
				this.dataParts.push(data);
				
				let dataBlock = this.dataParts.join('');
				let crlfPossition = dataBlock.indexOf('\r\n\r\n');
				
				if (crlfPossition > 0) {
					let headLine = dataBlock.substring(0, dataBlock.indexOf('\r\n'));
					let headLineParts = headLine.split(' ');
					
					if (headLineParts.length < 3) {
						throw new Error('malformed proxy response: ' + headLine);
					}
					
					let protocol = headLineParts[0];
					let code = headLineParts[1];
					let message = headLineParts.splice(2).join(' ');
					
					if (code != '200') {
						throw new Error('error message received: ' + message);
					}
					
					let sslSocketControl = this.socketTransport.securityInfo.QueryInterface(CI.nsISSLSocketControl);
					
					sslSocketControl.proxyStartSSL();
					
					this.dataParts = [];
					
					this.onDataAvailable = this.originalOnDataAvailable;
					this.submitRequest = this.originalSubmitRequest;
					
					delete this.originalOnDataAvailable;
					delete this.originalSubmitRequest;
					
					this.submitRequest();
				}
			};
			
			this.submitRequest = function () {
				// pass
			};
		}
	},
	
	prepareActualRequest: function () {
		let requestLine = this.request.split(/\r\n/)[0];
		let requestLineParts = requestLine.split(/\s+/g);
		
		if (requestLineParts.length != 3) {
			throw new Error('malformed request: ' + requestLine);
		}
		
		let method = requestLineParts[0];
		let url = requestLineParts[1];
		let protocol = requestLineParts[2];		
		
		if (this.usesProxy && this.scheme == 'http') {
				if (!(/^\w+:(\/\/)?/).test(url)) {
					url = this.scheme + '://' + this.host + ':' + this.port + ((/^\//).test(uri) ? url : '/' + url);
					requestLine = method + ' ' + url + ' ' + protocol;
					
					this.actualRequest = this.request.replace(/^.*?\r\n/, requestLine + '\r\n');
				} else {
					this.actualRequest = this.request;
				}
		} else {
			let urlResource = url.trim().replace(/^\w+:(\/\/)?[^\/]+/i, '').trim();
			
			urlResource = urlResource ? urlResource : '/';
			requestLine = method + ' ' + urlResource + ' ' + protocol;
			
			this.actualRequest = this.request.replace(/^.*?\r\n/, requestLine + '\r\n');
		}
	},
	
	/* -------------------------------------------------------------------- */
	
	lookupResponseHead: function () {
		let dataBlock = this.dataParts.join('');
		let crlfPossition = dataBlock.indexOf('\r\n\r\n');
		
		if (crlfPossition > 0) {
			this.head = dataBlock.substring(0, crlfPossition + 2);
			this.headers = this.head.substring(this.head.indexOf('\r\n'), this.head.length);
			
			let contentLengthMatch = this.headers.match(/\r\nContent-Length:\s*(\d+)\r\n/i);
			
			if (contentLengthMatch) {
				this.contentLength = parseInt(contentLengthMatch[1], 10);
				this.dataParts = [dataBlock.substring(crlfPossition + 4, dataBlock.length)];
				this.processAction = this.lookupContentLengthData;
				
				this.processAction();
				
				return;
			}
			
			let transferEncodingMatch = this.headers.match(/\r\nTransfer-Encoding:\s*chunked\r\n/i);
			
			if (transferEncodingMatch) {
				this.dataParts = [dataBlock.substring(crlfPossition + 4, dataBlock.length)];
				this.processAction = this.lookupChunkedData;
				
				this.processAction();
				
				return;
			}
			
			this.dataParts = [dataBlock.substring(crlfPossition + 4, dataBlock.length)];
			this.processAction = this.lookupUndeterminedData;
			
			this.processAction();
		}
	},
	
	lookupContentLengthData: function () {
		let dataBlock = this.dataParts.join('');
		
		if (dataBlock.length >= this.contentLength) {
			this.inputStream.close();
		}
	},
	
	lookupChunkedData: function () {
		let dataBlock = this.dataParts.join('');
		
		while (true) {
			let crlfPossition = dataBlock.indexOf('\r\n');
			
			if (crlfPossition > 0) {
				let chunk = dataBlock.substring(0, crlfPossition);
				let match = chunk.match(/^([0-9a-f]+)\s*(?:;.*?)?$/i);
				
				if (match) {
					let chunkSize = parseInt(match[1].toString(), 16);
					
					if (chunkSize == 0) {
						this.inputStream.close();
						
						break;
					}
					
					dataBlock = dataBlock.substring(crlfPossition + 4 + chunkSize, dataBlock.length);
				} else {
					break;
				}
			} else {
				break;
			}
		}
	},
	
	lookupUndeterminedData: function () {
		// pass
	},
	
	/* -------------------------------------------------------------------- */
	
	submitRequest: function () {
		this.outputStream.write(this.actualRequest, this.actualRequest.length);
	},
	
	/* -------------------------------------------------------------------- */
	
	send: function (handler) {
		this.handler = handler;
		
		this.prepareSocketTransport();
		
		let transport = this.socketTransport.QueryInterface(CI.nsITransport);
		
		this.inputStream = transport.openInputStream(CI.nsITransport.OPEN_BLOCKING, 0, 0);
		this.outputStream = transport.openOutputStream(CI.nsITransport.OPEN_BLOCKING, 0, 0);
		
		this.prepareTransportStreams(this.inputStream, this.outputStream);
		
		this.prepareActualRequest();
		
		this.submitRequest();
		
		this.onStartRequest(null, null);
		
		while (true) {
			try {
				if (this.inputStream.available()) {
					this.onDataAvailable(null, null, this.inputStream, 0, this.inputStream.available());
				}
			} catch (e) {
				if (e.result == CR.NS_BASE_STREAM_CLOSED || e.result == CR.NS_ERROR_NET_TIMEOUT) {
					break;
				}
			}
		}
		
		this.onStopRequest(null, null, null);
		
		return this.head + '\r\n' + this.body;
	},
	
	sendAsynchronously: function (handler) {
		this.handler = handler;
		
		this.prepareSocketTransport();
		
		let transport = this.socketTransport.QueryInterface(CI.nsITransport);
		
		this.inputStream = transport.openInputStream(0, 0, 0);
		this.outputStream = transport.openOutputStream(0, 0, 0);
		
		this.prepareTransportStreams(this.inputStream, this.outputStream);
		
		this.prepareActualRequest();
		
		this.submitRequest();
		
		this.inputStreamPump = CC['@mozilla.org/network/input-stream-pump;1'].createInstance(CI.nsIInputStreamPump);
		
		this.inputStreamPump.init(this.inputStream, -1, -1, 0, 0, true);
		this.inputStreamPump.asyncRead(this, null);
	},
	
	/* -------------------------------------------------------------------- */
	
	abort: function () {
		if (this.inputStream) {
			delete this.handler;
			
			this.inputStream.close();
		} else {
			throw new Error('no request was sent');
		}
	}
};

/* ------------------------------------------------------------------------ */

var NSGetFactory = XPCOMUtils.generateNSGetFactory([WeaponryRawHttpRequest]);
