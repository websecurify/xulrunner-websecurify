(function (exports) {
	
	var org_basic_webacid = require('./org_basic_webacid.js');
	var org_basic_core = require('./org_basic_core.js');
	var org_basic_http = require('./org_basic_http.js');
	var org_basic_specific = require('./org_basic_specific.js');
	
	var Reporter = org_basic_webacid.Reporter;
	var Workspace = org_basic_webacid.Workspace;
	var issue = org_basic_webacid.issue;
	var Client = org_basic_webacid.Client;
	var ListContainer = org_basic_core.ListContainer;
	var Headers = org_basic_http.Headers;
	var SourceData = org_basic_http.SourceData;
	var Version = org_basic_http.Version;
	var Code = org_basic_http.Code;
	var Message = org_basic_http.Message;
	var Response = org_basic_http.Response;
	var LogUtils = org_basic_core.LogUtils;
	var HashUtils = org_basic_core.HashUtils;
	var getXMLHttpRequestObject = org_basic_specific.getXMLHttpRequestObject;
	
	/* ------------------------------------------------------------------------ */
	
	function SimpleKeyStorage() {
		this.values = {};
	}
	
	SimpleKeyStorage.prototype.set = function (key, value) {
		this.values[key] = value;
	}
	
	SimpleKeyStorage.prototype.get = function (key) {
		return this.values[key];
	}
	
	SimpleKeyStorage.prototype.has = function (key) {
		return key in this.values;
	}
	
	/* ------------------------------------------------------------------------ */
	
	function TestReporter() {
		Reporter.apply(this, arguments);
	}
	
	TestReporter.prototype = new Reporter();
	
	TestReporter.prototype.retrieveLevelForStatementType = function (type) {
		return issue['issue.' + type + '.level'];
	}
	
	TestReporter.prototype.retrieveTitleForStatementType = function (type) {
		return issue['issue.' + type + '.title'];
	}
	
	TestReporter.prototype.retrieveSummaryForStatementType = function (type) {
		return issue['issue.' + type + '.summary'];
	}
	
	TestReporter.prototype.retrieveExactForStatementType = function (type) {
		return issue['issue.' + type + '.exact'];
	}
	
	TestReporter.prototype.retreiveDescriptionForStatementType = function (type) {
		return issue['issue.' + type + '.description'];
	}
	
	TestReporter.prototype.retreiveDetailsForStatementType = function (type) {
		return issue['issue.' + type + '.details'];
	}
	
	/* ------------------------------------------------------------------------ */
	
	function TestWorkspace() {
		Workspace.apply(this, arguments);
		
		this.recordedRequests = new SimpleKeyStorage();
		this.recordedIssues = new SimpleKeyStorage();
		this.recordedSignatures = new SimpleKeyStorage();
		this.scheduledTransactions = [];
	}
	
	TestWorkspace.prototype = new Workspace();
	
	TestWorkspace.prototype.recordRequest = function (request) {
		var hash = HashUtils.sha1(request.make());
		
		if (this.recordedRequests.has(hash)) {
			this.recordedRequests.set(hash, this.recordedRequests.get(hash) + 1);
		} else {
			this.recordedRequests.set(hash, 1);
		}
	}
	
	TestWorkspace.prototype.isRequestRecorded = function (request) {
		return this.recordedRequests.has(HashUtils.sha1(request.make()));
	}
	
	TestWorkspace.prototype.getRequestRecordCount = function (request) {
		var hash = HashUtils.sha1(request.make());
		
		if (this.recordedRequests.has(hash)) {
			return this.recordedRequests.get(hash);
		} else {
			return 0;
		}
	}
	
	TestWorkspace.prototype.recordIssue = function (issue) {
		return this.recordedIssues.set(issue.getSignature().getValue(), true);
	}
	
	TestWorkspace.prototype.isIssueRecorded = function (issue) {
		return this.recordedIssues.has(issue.getSignature().getValue());
	}
	
	TestWorkspace.prototype.recordSignature = function (signature) {
		return this.recordedSignatures.set(signature.getValue(), true);
	}
	
	TestWorkspace.prototype.isSignatureRecorded = function (signature) {
		return this.recordedSignatures.has(signature.getValue());
	}
	
	TestWorkspace.prototype.retrieveNextScheduledTransaction = function () {
		return this.scheduledTransactions.shift();
	}
	
	TestWorkspace.prototype.hasMoreScheduledTransactions = function () {
		return this.scheduledTransactions.length > 0;
	}
	
	TestWorkspace.prototype.saveScheduledTransaction = function (transaction) {
		this.scheduledTransactions.push(transaction);
	}
	
	TestWorkspace.prototype.getSlotSpace = function () {
		var size = 1000 - this.scheduledTransactions.length; // TODO: get 100 from the top
		
		if (size > 0) {
			return size;
		} else {
			return 0;
		}
	}
	
	TestWorkspace.prototype.hasSlotSpace = function () {
		return this.scheduledTransactions.lendth < 1000; // TODO: get 100 from the top
	}
	
	/* ------------------------------------------------------------------------ */
	
	function TestClient() {
		Client.apply(this, arguments);
		
		this.xhrs = [];
	}
	
	TestClient.prototype = new Client();
	
	TestClient.prototype.persistXhr = function (xhr) {
		this.xhrs.push(xhr);
		
		LogUtils.recordMessage('persist xhr: list size: ' + this.xhrs.length);
	}
	
	TestClient.prototype.giveupXhr = function (xhr) {
		this.xhrs.splice(this.xhrs.indexOf(xhr), 1);
		
		LogUtils.recordMessage('giveup xhr: list size: ' + this.xhrs.length);
	}
	
	TestClient.prototype.setup = function (transaction, xhr) {
		transaction.__xhr__ = transaction;
	}
	
	TestClient.prototype.teardown = function (transaction, xhr) {
		transaction.__xhr__ = null;
	}
	
	TestClient.prototype.onLoad = function (event, transaction, xhr) {
		var headers;
		
		try {
			var headersBlock = xhr.getAllResponseHeaders();
			
			headersBlock = headersBlock.replace(/\n/g, '\r\n');
			
			headers = Headers.parse(headersBlock ? headersBlock : '');
		} catch (e) {
			LogUtils.recordException('cannot parse xhr headers', e);
			
			Client.completeFailedTransactionEventCycle(this.observers, transaction);
			
			this.giveupXhr(xhr);
			this.teardown(transaction, xhr);
			
			return;
		}
		
		var data;
		
		try {
			data = SourceData.parse(xhr.responseText);
		} catch (e) {
			LogUtils.recordException('cannot parse xhr data', e);
			
			Client.completeFailedTransactionEventCycle(this.observers, transaction);
			
			this.giveupXhr(xhr);
			this.teardown(transaction, xhr);
			
			return;
		}
		
		var response;
		
		try {
			var status = xhr.status;
			var statusText = xhr.statusText;
			
			response = Response.create(Version.HTTP11, Code.parse(status ? status.toString() : '0'), Message.parse(statusText ? statusText.toString() : 'UNDEFINED'), headers, data);
		} catch (e) {
			LogUtils.recordException('cannot create response', e);
			
			Client.completeFailedTransactionEventCycle(this.observers, transaction);
			
			this.giveupXhr(xhr);
			this.teardown(transaction, xhr);
			
			return;
		}
		
		transaction.setResponse(response);
		
		Client.completeLoadedTransactionEventCycle(this.observers, transaction);
		
		this.giveupXhr(xhr);
		this.teardown(transaction, xhr);
	}
	
	TestClient.prototype.onError = function (event, transaction, xhr) {
		LogUtils.recordError('transaction failed for request: ' + transaction.getRequest().make());
		
		Client.completeFailedTransactionEventCycle(this.observers, transaction);
		
		this.giveupXhr(xhr);
		this.teardown(transaction, xhr);
	}
	
	TestClient.prototype.onAbort = function (event, transaction, xhr) {
		LogUtils.recordError('transaction aborted for request: ' + transaction.getRequest().make());
		
		Client.completeFailedTransactionEventCycle(this.observers, transaction);
		
		this.giveupXhr(xhr);
		this.teardown(transaction, xhr);
	}
	
	TestClient.prototype.createLoadHandler = function (transaction) {
		var self = this;
		
		return function (event) {
			self.onLoad(event, transaction, this);
		}
	}
	
	TestClient.prototype.createErrorHandler = function (transaction) {
		var self = this;
		
		return function (event) {
			self.onError(event, transaction, this);
		}
	}
	
	TestClient.prototype.createAbortHandler = function (transaction) {
		var self = this;
		
		return function (event) {
			self.onAbort(event, transaction, this);
		}
	}
	
	TestClient.prototype.sendTransaction = function (transaction) {
		var request = transaction.getRequest();
		
		LogUtils.recordMessage('request ' + request.make().replace(/\r/g, '\\r').replace(/\n/g, '\\n'));
		
		var xhr = getXMLHttpRequestObject();
		
		xhr.onload = this.createLoadHandler(transaction);
		xhr.onerror = this.createErrorHandler(transaction);
		xhr.onabort = this.createAbortHandler(transaction);
		
		try {
			xhr.open(request.getMethod().make(), request.getUrl().make(), true);
		} catch (e) {
			LogUtils.recordException('cannot open xhr request', e);
			
			Client.completeFailedTransactionEventCycle(this.observers, transaction);
			
			return;
		}
		
		try {
			xhr.withCredentials = true;
		} catch (e) {
			LogUtils.recordException('cannot set withCredentials on xhr request', e);
		}
		
		try {
			xhr.overrideMimeType('plain/text');
		} catch (e) {
			LogUtils.recordException('cannot set override mime type', e);
		}
		
		xhr.setRequestHeader('X-Websecurify-Request', 'true');
		
		var headersIterator;
		var header;
		
		for(headersIterator=request.getHeaders().iterator(), header=null; headersIterator.hasNext();) {
			header = headersIterator.next();
			
			try {
				xhr.setRequestHeader(header.getName(), header.getValue());
			} catch (e) {
				LogUtils.recordException('cannot set header ' + header.getName(), e);
			}
		}
		
		var data = request.getData().make();
		
		try {
			xhr.send(data ? data : null);
		} catch (e) {
			LogUtils.recordException('cannot send xhr request', e);
			
			Client.completeFailedTransactionEventCycle(this.observers, transaction);
			
			return;
		}
		
		this.persistXhr(xhr);
		this.setup(transaction, xhr);
	}
	
	TestClient.prototype.abortTransaction = function (transaction) {
		LogUtils.recordError('aborting transaction for request: ' + transaction.getRequest().make());
		
		try {
			transaction.__xhr__.abort();
		} catch (e) {
			LogUtils.recordException('cannot abort transaction', e);
		}
	}
	
	/* ------------------------------------------------------------------------ */
	
	exports.TestReporter = TestReporter;
	exports.TestWorkspace = TestWorkspace;
	exports.TestClient = TestClient;
	
})(exports);