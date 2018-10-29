(function (exports) {
	
	var org_basic_http = require("./org_basic_http.js");
	var org_basic_core = require("./org_basic_core.js");
	var org_basic_html = require("./org_basic_html.js");
	var org_basic_common = require("./org_basic_common.js");
	
	var Response = org_basic_http.Response;
	var RegularExpression = org_basic_core.RegularExpression;
	var HtmlUtils = org_basic_core.HtmlUtils;
	var Form = org_basic_html.Form;
	var SimpleContent = org_basic_html.SimpleContent;
	var SimpleField = org_basic_html.SimpleField;
	var SimpleForm = org_basic_html.SimpleForm;
	var UrlFactory = org_basic_http.UrlFactory;
	var ListContainer = org_basic_core.ListContainer;
	var Headers = org_basic_http.Headers;
	var CompositeStringSearch = org_basic_common.CompositeStringSearch;
	var Url = org_basic_http.Url;
	var RegularMatch = org_basic_core.RegularMatch;
	var StringUtils = org_basic_common.StringUtils;
	var Request = org_basic_http.Request;
	var EnclosedRegularExpression = org_basic_common.EnclosedRegularExpression;
	var Method = org_basic_http.Method;
	var Path = org_basic_http.Path;
	var SourceData = org_basic_http.SourceData;
	var Version = org_basic_http.Version;
	var PathFactory = org_basic_http.PathFactory;
	var Header = org_basic_http.Header;
	var Query = org_basic_http.Query;
	var CompoundIterator = org_basic_common.CompoundIterator;
	var Data = org_basic_http.Data;
	var FieldData = org_basic_http.FieldData;
	var MixTrippleContainer = org_basic_common.MixTrippleContainer;
	var MixTrippleIterator = org_basic_common.MixTrippleIterator;
	var LogUtils = org_basic_core.LogUtils;
	var FieldDataFactory = org_basic_http.FieldDataFactory;
	var RequestFactory = org_basic_http.RequestFactory;
	var HeadersFactory = org_basic_http.HeadersFactory;
	var Leaf = org_basic_http.Leaf;
	var Queries = org_basic_http.Queries;
	var QueriesFactory = org_basic_http.QueriesFactory;
	var NumberUtils = org_basic_core.NumberUtils;
	var HashUtils = org_basic_core.HashUtils;
	var CartesianProduct = org_basic_common.CartesianProduct;
	var Forms = org_basic_html.Forms;
	var Link = org_basic_html.Link;
	var Links = org_basic_html.Links;
	var Page = org_basic_html.Page;
	var SimpleFile = org_basic_html.SimpleFile;
	var SimplePair = org_basic_html.SimplePair;
	var ContinuesIterator = org_basic_common.ContinuesIterator;
	var MathUtils = org_basic_core.MathUtils;
	
	/* -------------------------------------------------------------------- */
	
	function Workspace() {
	}
	
	/* -------------------------------------------------------------------- */
	/* -------------------------------------------------------------------- */
	/* -------------------------------------------------------------------- */
	
	Workspace.prototype.recordMessage = function (message) {
		LogUtils.recordMessage(message);
	}
	
	Workspace.prototype.recordWarning = function (warning) {
		LogUtils.recordWarning(warning);
	}
	
	Workspace.prototype.recordError = function (error) {
		LogUtils.recordError(error);
	}
	
	Workspace.prototype.recordException = function (message, exception) {
		LogUtils.recordException(message, exception);
	}
	
	/* -------------------------------------------------------------------- */
	
	function TransactionKind(value) {
		this.value = value;
	}
	
	TransactionKind.prototype.name = function () {
		return this.value;
	}
	
	TransactionKind.valueOf = function (value) {
		for (var i in TransactionKind) {
			if (TransactionKind[i] instanceof TransactionKind && TransactionKind[i].value == value) return TransactionKind[i];
		}
		
		throw new Error('cannot find a TransactionKind with value ' + value);
	}
	
	TransactionKind.GENERIC = new TransactionKind("GENERIC");
	TransactionKind.TRACK = new TransactionKind("TRACK");
	TransactionKind.FUZZ = new TransactionKind("FUZZ");
	TransactionKind.ENUM = new TransactionKind("ENUM");
	TransactionKind.PROXY = new TransactionKind("PROXY");
	
	/* -------------------------------------------------------------------- */
	
	function Transaction(kind, request) {
		this.kind = kind;
		this.request = request;
		this.response = null;
		this.baseResponse = null;
		this.exception = null;
		this.clientObserver = null;
		this.responseMimeType = null;
		this.simpleContent = null;
		this.specialPayload = null;
		this.specialPath = null;
		this.specialQuery = null;
		this.specialHeader = null;
		this.authenticated = false;
	}
	
	/* -------------------------------------------------------------------- */
	
	Transaction.prototype.getKind = function () {
		return this.kind;
	}
	
	/* -------------------------------------------------------------------- */
	
	Transaction.prototype.getRequest = function () {
		return this.request;
	}
	
	Transaction.prototype.setRequest = function (request) {
		this.request = request;
	}
	
	/* -------------------------------------------------------------------- */
	
	Transaction.prototype.getResponse = function () {
		return this.response;
	}
	
	Transaction.prototype.setResponse = function (response) {
		this.response = response;
	}
	
	Transaction.prototype.getBaseResponse = function () {
		return this.baseResponse;
	}
	
	Transaction.prototype.setBaseResponse = function (baseResponse) {
		this.baseResponse = baseResponse;
	}
	
	Transaction.prototype.getException = function () {
		return this.exception;
	}
	
	Transaction.prototype.setException = function (exception) {
		this.exception = exception;
	}
	
	Transaction.prototype.getClientObserver = function () {
		return this.clientObserver;
	}
	
	Transaction.prototype.setClientObserver = function (observer) {
		this.clientObserver = observer;
	}
	
	Transaction.prototype.getResponseMimeType = function () {
		return this.responseMimeType;
	}
	
	Transaction.prototype.setResponseMimeType = function (responseMimeType) {
		this.responseMimeType = responseMimeType;
	}
	
	Transaction.prototype.getSimpleContent = function () {
		return this.simpleContent;
	}
	
	Transaction.prototype.setSimpleContent = function (simpleContent) {
		this.simpleContent = simpleContent;
	}
	
	Transaction.prototype.getSpecialPayload = function () {
		return this.specialPayload;
	}
	
	Transaction.prototype.setSpecialPayload = function (specialPayload) {
		this.specialPayload = specialPayload;
	}
	
	Transaction.prototype.getSpecialPath = function () {
		return this.specialPath;
	}
	
	Transaction.prototype.setSpecialPath = function (specialPath) {
		this.specialPath = specialPath;
	}
	
	Transaction.prototype.getSpecialQuery = function () {
		return this.specialQuery;
	}
	
	Transaction.prototype.setSpecialQuery = function (query) {
		this.specialQuery = query;
	}
	
	Transaction.prototype.getSpecialHeader = function () {
		return this.specialHeader;
	}
	
	Transaction.prototype.setSpecialHeader = function (header) {
		this.specialHeader = header;
	}
	
	/* -------------------------------------------------------------------- */
	
	Transaction.prototype.isAuthenticated = function () {
		return this.authenticated;
	}
	
	Transaction.prototype.setAuthenticated = function (authenticated) {
		this.authenticated = authenticated;
	}
	
	/* -------------------------------------------------------------------- */
	
	function TrackerObservers() {
		this.observers = new ListContainer();
	}
	
	/* -------------------------------------------------------------------- */
	
	TrackerObservers.prototype.registerObserver = function (observer) {
		this.observers.add(observer);
	}
	
	TrackerObservers.prototype.unregisterObserver = function (observer) {
		this.observers.remove(observer);
	}
	
	/* -------------------------------------------------------------------- */
	
	TrackerObservers.prototype.doTrackedTransaction = function (transaction) {
		for (var observerIterator = this.observers.iterator(), observer = null; observerIterator.hasNext();) {
			observer = observerIterator.next();
			observer.handleTrackedTransaction(transaction);
		}
	}
	
	/* -------------------------------------------------------------------- */
	
	function Tracker(workspace, scope, scheduler, crawler, maxSampleSize, populateFields) {
		this.observers = new TrackerObservers();
		this.workspace = workspace;
		this.scope = scope;
		this.scheduler = scheduler;
		this.crawler = crawler;
		this.maxSampleSize = maxSampleSize;
		this.populateFields = populateFields;
		
		this.crawler.registerObserver(this);
	}
	
	/* -------------------------------------------------------------------- */
	
	Tracker.prototype.handleTransactionCrawledRequest = function (transaction, request) {
		if (!this.scope.isRequestRecursive(request) && !this.workspace.isRequestRecorded(request) && this.scope.isRequestInScope(request)) {
			var templateRequest;
			
			try {
				templateRequest = RequestFactory.create(request).template().build();
			} catch (e) {
				this.workspace.recordException("cannot create template request", e);
				
				return;
			}
			
			if (this.workspace.getRequestRecordCount(templateRequest) <= this.maxSampleSize) {
				this.workspace.recordRequest(templateRequest);
				
				this.scheduleRequest(request);
			}
		}
	}
	
	/* -------------------------------------------------------------------- */
	
	Tracker.prototype.handleQueriedClientTransaction = function (transaction) {
		if (!this.scope.isResponseInScope(transaction.getResponse())) {
			this.scheduler.abortTransaction(transaction);
		}
	}
	
	Tracker.prototype.handleAbortedClientTransaction = function (transaction) {
	}
	
	Tracker.prototype.handleFailedClientTransaction = function (transaction) {
	}
	
	Tracker.prototype.handleLoadedClientTransaction = function (transaction) {
		if (this.scope.isResponseInScope(transaction.getResponse())) {
			this.crawler.crawlTransaction(transaction);
			this.observers.doTrackedTransaction(transaction);
		}
	}
	
	Tracker.prototype.handleCompletedClientTransaction = function (transaction) {
		var request = transaction.getRequest();
		
		for (var additionalRequestIterator = this.deriveAdditonalRequests(request).iterator(), additionalRequest = null; additionalRequestIterator.hasNext();) {
			additionalRequest = additionalRequestIterator.next();
			if (!this.workspace.isRequestRecorded(additionalRequest) && this.scope.isRequestInScope(additionalRequest)) {
				this.scheduleRequest(additionalRequest);
			}
		}
	}
	
	/* -------------------------------------------------------------------- */
	
	Tracker.prototype.registerObserver = function (observer) {
		this.observers.registerObserver(observer);
	}
	
	Tracker.prototype.unregisterObserver = function (observer) {
		this.observers.unregisterObserver(observer);
	}
	
	/* -------------------------------------------------------------------- */
	
	Tracker.prototype.getPopulatedValue = function (name) {
		return "Abc123";
	}
	
	Tracker.prototype.deriveAdditonalRequests = function (request) {
		var additionalRequests = new ListContainer();
		var requestUrl = request.getUrl();
		
		try {
			var newPath = PathFactory.create(requestUrl.getPath()).resetLeaf().build();
			var newUrl = UrlFactory.create(requestUrl).setPath(newPath).resetQueries().resetFragment().build();
			var newRequest = Request.create(Method.GET, newUrl, Version.HTTP11, Headers.BLANK, SourceData.BLANK);
			
			additionalRequests.add(newRequest);
		} catch (e) {
			this.workspace.recordException("cannot create additional request from base url", e);
		}
		
		
		if (request.getMethod().isPost()) {
			try {
				var newRequestUrl = UrlFactory.create(requestUrl).resetQueries().resetFragment().build();
				var newRequest = Request.create(Method.GET, newRequestUrl, Version.HTTP11, Headers.BLANK, SourceData.BLANK);
				
				additionalRequests.add(newRequest);
			} catch (e) {
				this.workspace.recordException("cannot create additional request from interchangeable post request", e);
			}
		}
		
		if (this.populateFields) {
			if (request.getMethod().isPost()) {
				var data = request.getData();
				
				if (data instanceof FieldData) {
					var fieldData = data;
					var fieldDataFactory = FieldDataFactory.create(fieldData);
					
					for (var queryIterator = fieldData.iterator(), query = null; queryIterator.hasNext();) {
						query = queryIterator.next();
						var queryName = query.getName();
						
						try {
							var newQuery = Query.create(queryName, this.getPopulatedValue(queryName));
							
							fieldDataFactory.replaceQuery(newQuery);
						} catch (e) {
							this.workspace.recordException("cannot create new query for populated post data", e);
						}
					}
					
					try {
						var newFieldData = fieldDataFactory.build();
						var newRequest = RequestFactory.create(request).setData(newFieldData).build();
						
						additionalRequests.add(newRequest);
					} catch (e) {
						this.workspace.recordException("cannot create additional request for populated post data", e);
					}
				}
			} else {
				var queries = request.getUrl().getQueries();
				var queriesFactory = QueriesFactory.create(queries);
				
				for (var queryIterator = queries.iterator(), query = null; queryIterator.hasNext();) {
					query = queryIterator.next();
					var queryName = query.getName();
					
					try {
						var newQuery = Query.create(queryName, this.getPopulatedValue(queryName));
						
						queriesFactory.replaceQuery(newQuery);
					} catch (e) {
						this.workspace.recordException("cannot create new query for populated get data", e);
					}
				}
				
				try {
					var newQueries = queriesFactory.build();
					var newUrl = UrlFactory.create(requestUrl).setQueries(newQueries).build();
					var newRequest = RequestFactory.create(request).setUrl(newUrl).build();
					
					additionalRequests.add(newRequest);
				} catch (e) {
					this.workspace.recordException("cannot create additional request for populated get data", e);
				}
			}
		}
		
		return additionalRequests;
	}
	
	/* -------------------------------------------------------------------- */
	
	Tracker.prototype.scheduleRequest = function (request) {
		this.workspace.recordRequest(request);
		
		var transaction = new Transaction(TransactionKind.TRACK, request);
		
		transaction.setClientObserver(this);
		
		this.scheduler.scheduleTransaction(transaction);
	}
	
	/* -------------------------------------------------------------------- */
	
	Tracker.prototype.trackRequest = function (request) {
		if (!this.workspace.isRequestRecorded(request) && this.scope.isRequestInScope(request)) {
			this.scheduleRequest(request);
		}
	}
	
	/* -------------------------------------------------------------------- */
	
	function SchedulerObservers() {
		this.observers = new ListContainer();
	}
	
	/* -------------------------------------------------------------------- */
		
	SchedulerObservers.prototype.registerObserver = function (observer) {
		this.observers.add(observer);
	}
	
	SchedulerObservers.prototype.unregisterObserver = function (observer) {
		this.observers.remove(observer);
	}
	
	/* -------------------------------------------------------------------- */
	
	SchedulerObservers.prototype.doQueriedSchedulerTransaction = function (transaction) {
		for (var observerIterator = this.observers.iterator(), observer = null; observerIterator.hasNext();) {
			observer = observerIterator.next();
			observer.handleQueriedSchedulerTransaction(transaction);
		}
	}
	
	SchedulerObservers.prototype.doAbortedSchedulerTransaction = function (transaction) {
		for (var observerIterator = this.observers.iterator(), observer = null; observerIterator.hasNext();) {
			observer = observerIterator.next();
			observer.handleAbortedSchedulerTransaction(transaction);
		}
	}
	
	SchedulerObservers.prototype.doFailedSchedulerTransaction = function (transaction) {
		for (var observerIterator = this.observers.iterator(), observer = null; observerIterator.hasNext();) {
			observer = observerIterator.next();
			observer.handleFailedSchedulerTransaction(transaction);
		}
	}
	
	SchedulerObservers.prototype.doLoadedSchedulerTransaction = function (transaction) {
		for (var observerIterator = this.observers.iterator(), observer = null; observerIterator.hasNext();) {
			observer = observerIterator.next();
			observer.handleLoadedSchedulerTransaction(transaction);
		}
	}
	
	SchedulerObservers.prototype.doCompletedSchedulerTransaction = function (transaction) {
		for (var observerIterator = this.observers.iterator(), observer = null; observerIterator.hasNext();) {
			observer = observerIterator.next();
			observer.handleCompletedSchedulerTransaction(transaction);
		}
	}
	
	SchedulerObservers.prototype.doSlotNotification = function () {
		for (var observerIterator = this.observers.iterator(), observer = null; observerIterator.hasNext();) {
			observer = observerIterator.next();
			observer.handleSchedulerSlotNotification();
		}
	}
	
	SchedulerObservers.prototype.doSendingSchedulerTransaction = function (transaction) {
		for (var observerIterator = this.observers.iterator(), observer = null; observerIterator.hasNext();) {
			observer = observerIterator.next();
			observer.handleSendingSchedulerTransaction(transaction);
		}
	}
	
	SchedulerObservers.prototype.doAbortingSchedulerTransaction = function (transaction) {
		for (var observerIterator = this.observers.iterator(), observer = null; observerIterator.hasNext();) {
			observer = observerIterator.next();
			observer.handleAbortingSchedulerTransaction(transaction);
		}
	}
	
	SchedulerObservers.prototype.doSchedulingSchedulerTransaction = function (transaction) {
		for (var observerIterator = this.observers.iterator(), observer = null; observerIterator.hasNext();) {
			observer = observerIterator.next();
			observer.handleSchedulingSchedulerTransaction(transaction);
		}
	}
	
	/* -------------------------------------------------------------------- */
	
	function Scheduler(workspace, client, maximumParallelRequests) {
		this.observers = new SchedulerObservers();
		this.workspace = workspace;
		this.client = client;
		this.maximumParallelRequests = maximumParallelRequests;
		this.requestsCount = 0;
		this.resting = false;
		
		this.client.registerObserver(this);
	}
	
	/* -------------------------------------------------------------------- */
	
	Scheduler.prototype.handleQueriedClientTransaction = function (transaction) {
		this.observers.doQueriedSchedulerTransaction(transaction);
	}
	
	Scheduler.prototype.handleAbortedClientTransaction = function (transaction) {
		this.observers.doAbortedSchedulerTransaction(transaction);
	}
	
	Scheduler.prototype.handleFailedClientTransaction = function (transaction) {
		this.observers.doFailedSchedulerTransaction(transaction);
	}
	
	Scheduler.prototype.handleLoadedClientTransaction = function (transaction) {
		this.observers.doLoadedSchedulerTransaction(transaction);
	}
	
	Scheduler.prototype.handleCompletedClientTransaction = function (transaction) {
		this.requestsCount -= 1;
		
		this.observers.doCompletedSchedulerTransaction(transaction);
		
		this.ignite();
	}
	
	/* -------------------------------------------------------------------- */
	
	Scheduler.prototype.registerObserver = function (observer) {
		this.observers.registerObserver(observer);
	}
	
	Scheduler.prototype.unregisterObserver = function (observer) {
		this.observers.unregisterObserver(observer);
	}
	
	/* -------------------------------------------------------------------- */
	
	Scheduler.prototype.hasPendingRequests = function () {
		return this.requestsCount > 0;
	}
	
	/* -------------------------------------------------------------------- */
	
	Scheduler.prototype.ignite = function () {
		while (!this.resting && this.requestsCount < this.maximumParallelRequests && this.workspace.hasMoreScheduledTransactions()) {
			this.sendTransaction(this.workspace.retrieveNextScheduledTransaction());
		}
		
		for (var i = 0; i < this.workspace.getSlotSpace(); i++) {
			this.observers.doSlotNotification();
		}
	}
	
	/* -------------------------------------------------------------------- */
	
	Scheduler.prototype.pause = function () {
		this.resting = true;
	}
	
	Scheduler.prototype.resume = function () {
		this.resting = false;
		
		this.ignite();
	}
	
	/* -------------------------------------------------------------------- */
	
	Scheduler.prototype.sendTransaction = function (transaction) {
		this.requestsCount += 1;
		
		this.observers.doSendingSchedulerTransaction(transaction);
		this.client.sendTransaction(transaction);
	}
	
	Scheduler.prototype.abortTransaction = function (transaction) {
		this.observers.doAbortingSchedulerTransaction(transaction);
		this.client.abortTransaction(transaction);
	}
	
	/* -------------------------------------------------------------------- */
	
	Scheduler.prototype.scheduleTransaction = function (transaction) {
		if (this.resting == false && this.requestsCount <= this.maximumParallelRequests) {
			this.sendTransaction(transaction);
		} else {
			this.observers.doSchedulingSchedulerTransaction(transaction);
			this.workspace.saveScheduledTransaction(transaction);
		}
	}
	
	/* -------------------------------------------------------------------- */
	
	function ReporterObservers() {
		this.observers = new ListContainer();
	}
	
	/* -------------------------------------------------------------------- */
	
	ReporterObservers.prototype.registerObserver = function (observer) {
		this.observers.add(observer);
	}
	
	ReporterObservers.prototype.unregisterObserver = function (observer) {
		this.observers.remove(observer);
	}
	
	/* -------------------------------------------------------------------- */
	
	ReporterObservers.prototype.doReportedStatement = function (statement) {
		for (var observerIterator = this.observers.iterator(), observer = null; observerIterator.hasNext();) {
			observer = observerIterator.next();
			observer.handleReportedStatement(statement);
		}
	}
	
	/* -------------------------------------------------------------------- */
	
	function Reporter(workspace) {
		this.observers = new ReporterObservers();
		this.workspace = workspace;
		this.requestRegularExpression = new RegularExpression("#request#", "g");
		this.responseRegularExpression = new RegularExpression("#response#", "g");
		this.urlRegularExpression = new RegularExpression("#url#", "g");
		this.headerRegularExpression = new RegularExpression("#header#", "g");
		this.ipRegularExpression = new RegularExpression("#ip#", "g");
		this.emailRegularExpression = new RegularExpression("#email#", "g");
		this.formRegularExpression = new RegularExpression("#form#", "g");
		this.pathRegularExpression = new RegularExpression("#path#", "g");
		this.userRegularExpression = new RegularExpression("#user#", "g");
		this.errorRegularExpression = new RegularExpression("#error#", "g");
		this.databaseRegularExpression = new RegularExpression("#database#", "g");
		this.messageRegularExpression = new RegularExpression("#message#", "g");
		this.sourceRegularExpression = new RegularExpression("#source#", "g");
		this.payloadRegularExpression = new RegularExpression("#payload#", "g");
	}
	
	/* -------------------------------------------------------------------- */
	
	Reporter.prototype.registerObserver = function (observer) {
		this.observers.registerObserver(observer);
	}
	
	Reporter.prototype.unregisterObserver = function (observer) {
		this.observers.unregisterObserver(observer);
	}
	
	/* -------------------------------------------------------------------- */
	
	Reporter.prototype.normalizeReplacement = function (input, isSafe) {
		if (isSafe) {
			return RegularExpression.makeLiteral(input);
		} else {
			return RegularExpression.makeLiteral(HtmlUtils.escapeHtmlComponent(input));
		}
	}
	
	/* -------------------------------------------------------------------- */
	
	Reporter.prototype.processFields = function (text, issue, isSafe) {
		var transaction = issue.getTransaction();
		var request = transaction.getRequest();
		var newText = text;
		
		newText = this.requestRegularExpression.replace(newText, this.normalizeReplacement(request.make(), isSafe));
		
		if (transaction.getResponse() != null) {
			newText = this.responseRegularExpression.replace(newText, this.normalizeReplacement(transaction.getResponse().make(), isSafe));
		}
		
		if (issue.getUrl() != null) {
			newText = this.urlRegularExpression.replace(newText, this.normalizeReplacement(issue.getUrl(), isSafe));
		} else {
			newText = this.urlRegularExpression.replace(newText, this.normalizeReplacement(request.getUrl().make(), isSafe));
		}
		
		if (issue.getHeader() != null) {
			newText = this.headerRegularExpression.replace(newText, this.normalizeReplacement(issue.getHeader(), isSafe));
		}
		
		if (issue.getIp() != null) {
			newText = this.ipRegularExpression.replace(newText, this.normalizeReplacement(issue.getIp(), isSafe));
		}
		
		if (issue.getEmail() != null) {
			newText = this.emailRegularExpression.replace(newText, this.normalizeReplacement(issue.getEmail(), isSafe));
		}
		
		if (issue.getForm() != null) {
			newText = this.formRegularExpression.replace(newText, this.normalizeReplacement(issue.getForm(), isSafe));
		}
		
		if (issue.getPath() != null) {
			newText = this.pathRegularExpression.replace(newText, this.normalizeReplacement(issue.getPath(), isSafe));
		}
		
		if (issue.getUser() != null) {
			newText = this.userRegularExpression.replace(newText, this.normalizeReplacement(issue.getUser(), isSafe));
		}
		
		if (issue.getError() != null) {
			newText = this.errorRegularExpression.replace(newText, this.normalizeReplacement(issue.getError(), isSafe));
		}
		
		if (issue.getDatabase() != null) {
			newText = this.databaseRegularExpression.replace(newText, this.normalizeReplacement(issue.getDatabase(), isSafe));
		}
		
		if (issue.getMessage() != null) {
			newText = this.messageRegularExpression.replace(newText, this.normalizeReplacement(issue.getMessage(), isSafe));
		}
		
		if (issue.getSource() != null) {
			newText = this.sourceRegularExpression.replace(newText, this.normalizeReplacement(issue.getSource(), isSafe));
		}
		
		if (transaction.getSpecialPayload() != null) {
			newText = this.payloadRegularExpression.replace(newText, this.normalizeReplacement(transaction.getSpecialPayload(), isSafe));
		}
		
		return newText;
	}
	
	/* -------------------------------------------------------------------- */
	
	Reporter.prototype.reportIssue = function (issue) {
		if (!this.workspace.isIssueRecorded(issue)) {
			this.workspace.recordIssue(issue);
			
			var statementType = issue.getType().name();
			var level = StringUtils.makeLiteral(this.retrieveLevelForStatementType(statementType));
			var title = StringUtils.makeLiteral(this.processFields(this.retrieveTitleForStatementType(statementType), issue, true));
			var summary = StringUtils.makeLiteral(this.processFields(this.retrieveSummaryForStatementType(statementType), issue, true));
			var exact = this.processFields(this.retrieveExactForStatementType(statementType), issue, true);
			var description = this.processFields(this.retreiveDescriptionForStatementType(statementType), issue, false);
			var details = this.processFields(this.retreiveDetailsForStatementType(statementType), issue, false);
			var statementLevel = StatementLevel.valueOf(level);
			var statement = new Statement(statementLevel, title, summary, exact, description, details, issue);
			
			this.observers.doReportedStatement(statement);
		}
	}
	
	/* -------------------------------------------------------------------- */
	
	function ProgressorObservers() {
		this.observers = new ListContainer();
	}
	
	/* -------------------------------------------------------------------- */
	
	ProgressorObservers.prototype.registerObserver = function (observer) {
		this.observers.add(observer);
	}
	
	ProgressorObservers.prototype.unregisterObserver = function (observer) {
		this.observers.remove(observer);
	}
	
	/* -------------------------------------------------------------------- */
	
	ProgressorObservers.prototype.doProgressorTrackedTransaction = function (percentage, step, steps, status) {
		for (var observerIterator = this.observers.iterator(), observer = null; observerIterator.hasNext();) {
			observer = observerIterator.next();
			observer.handleProgressNotification(percentage, step, steps, status);
		}
	}
	
	/* -------------------------------------------------------------------- */
	
	function Progressor(scheduler, granularity) {
		this.observers = new ProgressorObservers();
		this.scheduler = scheduler;
		this.granularity = granularity;
		this.step = 0;
		this.steps = 0;
		this.futureSteps = 0;
		this.status = "";
		this.lastStep = 0;
		
		this.scheduler.registerObserver(this);
	}
	
	/* -------------------------------------------------------------------- */
	
	Progressor.prototype.handleQueriedSchedulerTransaction = function (transaction) {
	}
	
	Progressor.prototype.handleAbortedSchedulerTransaction = function (transaction) {
	}
	
	Progressor.prototype.handleFailedSchedulerTransaction = function (transaction) {
	}
	
	Progressor.prototype.handleLoadedSchedulerTransaction = function (transaction) {
	}
	
	Progressor.prototype.handleCompletedSchedulerTransaction = function (transaction) {
		this.step += 1;
		
		this.updateProgress();
	}
	
	Progressor.prototype.handleSchedulerSlotNotification = function () {
	}
	
	Progressor.prototype.handleSendingSchedulerTransaction = function (transaction) {
		this.steps += 1;
		
		if (this.futureSteps > 0) {
			this.futureSteps -= 1;
		}
		
		this.updateProgress();
	}
	
	Progressor.prototype.handleAbortingSchedulerTransaction = function (transaction) {
	}
	
	Progressor.prototype.handleSchedulingSchedulerTransaction = function (transaction) {
		this.futureSteps += 1;
		
		this.updateProgress();
	}
	
	/* -------------------------------------------------------------------- */
	
	Progressor.prototype.updateProgress = function () {
		if (((this.step % this.granularity) == 0 || this.step == this.steps) && (this.step != this.lastStep && this.step != 0)) {
			this.lastStep = this.step;
			
			var totalSteps = this.steps + this.futureSteps;
			var percentage = (this.step * 100) / totalSteps;
			
			if (StringUtils.isHollow(this.status)) {
				this.status = this.step + "/" + totalSteps + " " + MathUtils.round(percentage) + "%";
			}
			
			this.observers.doProgressorTrackedTransaction(percentage, this.step, totalSteps, this.status);
			
			this.status = "";
		}
	}
	
	/* -------------------------------------------------------------------- */
	
	Progressor.prototype.registerObserver = function (observer) {
		this.observers.registerObserver(observer);
	}
	
	Progressor.prototype.unregisterObserver = function (observer) {
		this.observers.unregisterObserver(observer);
	}
	
	/* -------------------------------------------------------------------- */
	
	function FuzzerObservers() {
		this.observers = new ListContainer();
	}
	
	/* -------------------------------------------------------------------- */
	
	FuzzerObservers.prototype.registerObserver = function (observer) {
		this.observers.add(observer);
	}
	
	FuzzerObservers.prototype.unregisterObserver = function (observer) {
		this.observers.remove(observer);
	}
	
	/* -------------------------------------------------------------------- */
	
	FuzzerObservers.prototype.doFuzzedTransaction = function (transaction) {
		for (var observerIterator = this.observers.iterator(), observer = null; observerIterator.hasNext();) {
			observer = observerIterator.next();
			observer.handleFuzzedTransaction(transaction);
		}
	}
	
	FuzzerObservers.prototype.doFuzzedIssue = function (issue) {
		for (var observerIterator = this.observers.iterator(), observer = null; observerIterator.hasNext();) {
			observer = observerIterator.next();
			observer.handleFuzzedIssue(issue);
		}
	}
	
	/* -------------------------------------------------------------------- */
	
	function Fuzzer(workspace, scheduler, identifier, useBack, useFront, usePollution) {
		this.observers = new FuzzerObservers();
		this.workspace = workspace;
		this.scheduler = scheduler;
		this.identifier = identifier;
		this.useBack = useBack;
		this.useFront = useFront;
		this.usePollution = usePollution;
		this.iterators = new ContinuesIterator();
		this.genericPayloads = new ListContainer();
		this.queryPayloads = new ListContainer();
		this.pathPayloads = new ListContainer();
		this.headerPayloads = new ListContainer();
		this.sqlSignatureDetector = new SqlSignatureDetector();
		this.xssSignatureTester = new CompositeStringSearch();
		this.lfiSignatureTester = new CompositeStringSearch();
		this.redirectSignatureTester = new CompositeStringSearch();
		
		this.genericPayloads.add("'`\"" + this.identifier);
		this.genericPayloads.add("\"'<" + this.identifier + ">");
		this.genericPayloads.add("javascript:f(" + this.identifier + ")");
		this.genericPayloads.add("\" onerror=\"f(" + this.identifier + ")");
		this.genericPayloads.add("' onerror='f(" + this.identifier + ")");
		this.genericPayloads.add("\"'" + this.identifier + ";");
		this.genericPayloads.add("http://" + this.identifier);
		
		this.queryPayloads.add("\r\nH:" + this.identifier);
		this.queryPayloads.add("../../../../../" + this.identifier + "/../../../../../boot.ini\0.htm"); // TODO: might want to brute force the file extension
		
		this.xssSignatureTester.addString("\"'<" + this.identifier + ">");
		this.xssSignatureTester.addRegularExpression(new RegularExpression("src=\"javascript:f(" + this.identifier + ")\"", "i"));
		this.xssSignatureTester.addRegularExpression(new RegularExpression("src='javascript:f(" + this.identifier + ")'", "i"));
		this.xssSignatureTester.addRegularExpression(new RegularExpression("<[^>]*?\".*?\" onerror=\"f\\(" + this.identifier + "\\)\"", ""));
		this.xssSignatureTester.addRegularExpression(new RegularExpression("<[^>]*?'.*?' onerror='f\\(" + this.identifier + "\\)'", ""));
		this.xssSignatureTester.addRegularExpression(new RegularExpression("<script.*?>.*?\"'" + this.identifier + ";.*?</script\\s*>", "i"));
		
		this.lfiSignatureTester.addString("[boot loader]");
		this.lfiSignatureTester.addString("[operating systems]");
		
		this.redirectSignatureTester.addString("http://" + this.identifier);
		
		this.scheduler.registerObserver(this);
	}
	
	/* -------------------------------------------------------------------- */
	
	Fuzzer.prototype.handleQueriedSchedulerTransaction = function (transaction) {
	}
	
	Fuzzer.prototype.handleAbortedSchedulerTransaction = function (transaction) {
	}
	
	Fuzzer.prototype.handleFailedSchedulerTransaction = function (transaction) {
	}
	
	Fuzzer.prototype.handleLoadedSchedulerTransaction = function (transaction) {
	}
	
	Fuzzer.prototype.handleCompletedSchedulerTransaction = function (transaction) {
	}
	
	Fuzzer.prototype.handleSchedulerSlotNotification = function () {
		this.ignite();
	}
	
	Fuzzer.prototype.handleSendingSchedulerTransaction = function (transaction) {
	}
	
	Fuzzer.prototype.handleAbortingSchedulerTransaction = function (transaction) {
	}
	
	Fuzzer.prototype.handleSchedulingSchedulerTransaction = function (transaction) {
	}
	
	/* -------------------------------------------------------------------- */
	
	Fuzzer.prototype.handleQueriedClientTransaction = function (transaction) {
	}
	
	Fuzzer.prototype.handleAbortedClientTransaction = function (transaction) {
	}
	
	Fuzzer.prototype.handleFailedClientTransaction = function (transaction) {
	}
	
	Fuzzer.prototype.handleLoadedClientTransaction = function (transaction) {
		this.detectFuzzedTransactionVulnerabilities(transaction);
		
		this.observers.doFuzzedTransaction(transaction);
	}
	
	Fuzzer.prototype.handleCompletedClientTransaction = function (transaction) {
		this.ignite();
	}
	
	/* -------------------------------------------------------------------- */
	
	Fuzzer.prototype.registerObserver = function (observer) {
		this.observers.registerObserver(observer);
	}
	
	Fuzzer.prototype.unregisterObserver = function (observer) {
		this.observers.unregisterObserver(observer);
	}
	
	/* -------------------------------------------------------------------- */
	
	Fuzzer.prototype.createCommonIssue = function (issueType, transaction) {
		var signature = UrlFactory.create(transaction.getRequest().getUrl()).resetQueries().resetFragment().build().make();
		
		if (transaction.getSpecialPath() != null) {
			signature += transaction.getSpecialPath().getBase().make();
		} else
		if (transaction.getSpecialQuery() != null) {
			signature += transaction.getSpecialQuery().getName();
		} else
		if (transaction.getSpecialHeader() != null) {
			signature += transaction.getSpecialHeader().getName();
		}
		
		return Issue.createWithIndicatedSignature(issueType, transaction, signature);
	}
	
	/* -------------------------------------------------------------------- */
	
	Fuzzer.prototype.detectFuzzedTransactionSqlVulnerabilities = function (transaction) {
		var baseResponse = transaction.getBaseResponse();
		
		if (baseResponse != null) {
			if (!this.sqlSignatureDetector.detect(baseResponse.getData().make()).isEmpty()) {
				return false;
			}
		}
		
		var data = transaction.getResponse().getData().make();
		var database = this.sqlSignatureDetector.detect(data);
		
		if (database != null) {
			var issue;
			
			try {
				issue = this.createCommonIssue(IssueType.SQLINJECTION, transaction);
			} catch (e) {
				this.workspace.recordException("cannot create common issue", e);
				
				return false;
			}
			
			issue.setDatabase(database);
			
			this.observers.doFuzzedIssue(issue);
			
			return true;
		}
		
		return false;
	}
	
	Fuzzer.prototype.detectFuzzedTransactionXssVulnerabilities = function (transaction) {
		var data = transaction.getResponse().getData().make();
		
		if (this.xssSignatureTester.any(data)) {
			var issue;
			
			try {
				issue = this.createCommonIssue(IssueType.XSSINJECTION, transaction);
			} catch (e) {
				this.workspace.recordException("cannot create common issue", e);
				
				return false;
			}
			
			this.observers.doFuzzedIssue(issue);
			
			return true;
		}
		
		return false;
	}
	
	Fuzzer.prototype.detectFuzzedTransactionCliVulnerabilities = function (transaction) {
		var header = transaction.getResponse().getHeaders().getHeaderValueByName("H");
		
		if (header != null && header.indexOf(this.identifier) >= 0) {
			var issue;
			
			try {
				issue = this.createCommonIssue(IssueType.CRLFINJECTION, transaction);
			} catch (e) {
				this.workspace.recordException("cannot create common issue", e);
				
				return false;
			}
			
			this.observers.doFuzzedIssue(issue);
			
			return true;
		}
		
		return false;
	}
	
	Fuzzer.prototype.detectFuzzedTransactionLfiVulnerabilities = function (transaction) {
		var data = transaction.getResponse().getData().make();
		
		if (this.lfiSignatureTester.any(data)) {
			var issue;
			
			try {
				issue = this.createCommonIssue(IssueType.LFINJECTION, transaction);
			} catch (e) {
				this.workspace.recordException("cannot create common issue", e);
				
				return false;
			}
			
			this.observers.doFuzzedIssue(issue);
			
			return true;
		}
		
		return false;
	}
	
	Fuzzer.prototype.detectFuzzedTransactionRedirectVulnerabilities = function (transaction) {
		var location = transaction.getResponse().getHeaders().getHeaderValueByName("Location");
		
		if (location != null && this.redirectSignatureTester.any(location)) {
			var issue;
			
			try {
				issue = this.createCommonIssue(IssueType.REDIRECT, transaction);
			} catch (e) {
				this.workspace.recordException("cannot create common issue", e);
				
				return false;
			}
			
			this.observers.doFuzzedIssue(issue);
			
			return true;
		}
		
		return false;
	}
	
	Fuzzer.prototype.detectFuzzedTransactionVulnerabilities = function (transaction) {
		if (!this.detectFuzzedTransactionSqlVulnerabilities(transaction)) {
			if (!this.detectFuzzedTransactionXssVulnerabilities(transaction)) {
				if (!this.detectFuzzedTransactionCliVulnerabilities(transaction)) {
					if (!this.detectFuzzedTransactionLfiVulnerabilities(transaction)) {
						this.detectFuzzedTransactionRedirectVulnerabilities(transaction);
					}
				}
			}
		}
	}
	
	/* -------------------------------------------------------------------- */
	
	Fuzzer.prototype.fuzzTransaction = function (transaction) {
		this.iterators.add(new OptimizedCompoundComplexPayloadTransactionIterator(transaction, this.genericPayloads, this.queryPayloads, this.pathPayloads, this.headerPayloads, this.useBack, this.useFront, this.usePollution));
		
		this.ignite();
	}
	
	/* -------------------------------------------------------------------- */
	
	Fuzzer.prototype.ignite = function () {
		var transaction;
		
		while (true) {
			if (!this.iterators.hasNext()) {
				return;
			}
			
			transaction = this.iterators.next();
			var request = transaction.getRequest();
			
			if (!this.workspace.isRequestRecorded(request)) {
				this.workspace.recordRequest(request);
				
				break;
			}
		}
		
		transaction.setClientObserver(this);
		
		this.scheduler.scheduleTransaction(transaction);
	}
	
	/* -------------------------------------------------------------------- */
	
	function CrawlerObservers() {
		this.observers = new ListContainer();
	}
	
	/* -------------------------------------------------------------------- */
	
	CrawlerObservers.prototype.registerObserver = function (observer) {
		this.observers.add(observer);
	}
	
	CrawlerObservers.prototype.unregisterObserver = function (observer) {
		this.observers.remove(observer);
	}
	
	/* -------------------------------------------------------------------- */
	
	CrawlerObservers.prototype.doCrawledRequest = function (transaction, request) {
		for (var observerIterator = this.observers.iterator(), observer = null; observerIterator.hasNext();) {
			observer = observerIterator.next();
			observer.handleTransactionCrawledRequest(transaction, request);
		}
	}
	
	/* -------------------------------------------------------------------- */
	
	function Crawler(workspace, maxSampleSize, randomize) {
		this.observers = new CrawlerObservers();
		this.workspace = workspace;
		this.maxSampleSize = maxSampleSize;
		this.randomize = randomize;
	}
	
	/* -------------------------------------------------------------------- */
	
	Crawler.prototype.registerObserver = function (observer) {
		this.observers.registerObserver(observer);
	}
	
	Crawler.prototype.unregisterObserver = function (observer) {
		this.observers.unregisterObserver(observer);
	}
	
	/* -------------------------------------------------------------------- */
	
	Crawler.prototype.crawlTransactionPage = function (transaction) {
		var page = transaction.getSimpleContent();
		
		for (var linkIterator = page.getLinks().iterator(), link = null; linkIterator.hasNext();) {
			link = linkIterator.next();
			try {
				var newUrl = UrlFactory.create(link.getUrl()).resetFragment().build();
				
				this.observers.doCrawledRequest(transaction, Request.create(Method.GET, newUrl, Version.HTTP11, Headers.BLANK, SourceData.BLANK));
			} catch (e) {
				this.workspace.recordException("cannot create request from link: " + link.make(), e);
				
				continue;
			}
		}
		
		for (var formIterator = page.getForms().iterator(), form = null; formIterator.hasNext();) {
			form = formIterator.next();
			var queries = new ListContainer();
			
			for (var fieldIterator = form.getFields().iterator(), field = null; fieldIterator.hasNext();) {
				field = fieldIterator.next();
				try {
					queries.add(Query.create(field.getName(), field.getValue()));
				} catch (e) {
					LogUtils.recordException("cannot create query", e);
					
					continue;
				}
			}
			
			for (var fileIterator = form.getFiles().iterator(), file = null; fileIterator.hasNext();) {
				file = fileIterator.next();
				try {
					queries.add(Query.create(file.getField(), ""));
				} catch (e) {
					LogUtils.recordException("cannot create query", e);
					
					continue;
				}
			}
			
			var cartesianLists = new ListContainer();
			
			for (var optionalIterator = form.getOptionals().iterator(), optional = null; optionalIterator.hasNext();) {
				optional = optionalIterator.next();
				var optionalList = new ListContainer();
				
				optionalList.add(optional);
				optionalList.add(new SimplePair(optional.getName(), "")); // NOTE: this one is used to imitate checked vs. unchecked but it is not optimal 
			}
			
			for (var selectableListIterator = form.getSelectables().iterator(), selectableList = null; selectableListIterator.hasNext();) {
				selectableList = selectableListIterator.next();
				if (this.randomize) {
					selectableList.shuffle();
				}
				
				cartesianLists.add(selectableList);
			}
			
			var submitList = new ListContainer();
			
			for (var submitIterator = form.getSubmits().iterator(), submit = null; submitIterator.hasNext();) {
				submit = submitIterator.next();
				submitList.add(new SimplePair(submit.getName(), submit.getValue()));
			}
			
			if (this.randomize) {
				submitList.shuffle();
			}
			
			cartesianLists.add(submitList);
			
			var cartesianProduct = new CartesianProduct(cartesianLists);
			
			if (form.getMethod().isGet()) {
				if (cartesianProduct.size() > 0) {
					var possition = 1;
					
					for (var parametersIterator = cartesianProduct.iterator(), parameters = null; parametersIterator.hasNext();) {
						parameters = parametersIterator.next();
						var newQueries = queries.reflect();
						
						for (var parameterIterator = parameters.iterator(), parameter = null; parameterIterator.hasNext();) {
							parameter = parameterIterator.next();
							try {
								newQueries.add(Query.create(parameter.getName(), parameter.getValue()));
							} catch (e) {
								this.workspace.recordException("cannot create parameter", e);
								
								continue;
							}
						}
						
						var newUrl;
						
						try {
							newUrl = UrlFactory.create(form.getUrl()).setQueries(Queries.create(newQueries)).resetFragment().build();
						} catch (e) {
							this.workspace.recordException("cannot create url", e);
							
							continue;
						}
						
						try {
							this.observers.doCrawledRequest(transaction, Request.create(form.getMethod(), newUrl, Version.HTTP11, Headers.BLANK, SourceData.BLANK));
						} catch (e) {
							this.workspace.recordException("cannot create request", e);
							
							continue;
						}
						
						if (possition == this.maxSampleSize) {
							break;
						} else {
							possition += 1;
						}
					}
				} else {
					var newUrl;
					
					try {
						newUrl = UrlFactory.create(form.getUrl()).setQueries(Queries.create(queries)).resetFragment().build();
					} catch (e) {
						this.workspace.recordException("cannot create url", e);
						
						continue;
					}
					
					try {
						this.observers.doCrawledRequest(transaction, Request.create(form.getMethod(), newUrl, Version.HTTP11, Headers.BLANK, SourceData.BLANK));
					} catch (e) {
						this.workspace.recordException("cannot create request", e);
						
						continue;
					}
				}
			} else {
				var headers = new ListContainer();
				
				try {
					headers.add(Header.create("Content-Type", form.getEnctype().make()));
				} catch (e) {
					this.workspace.recordException("cannot create content-type header", e);
				}
				
				var newHeaders;
				
				try {
					newHeaders = Headers.create(headers);
				} catch (e) {
					this.workspace.recordException("cannot create headers", e);
					
					return;
				}
				
				if (cartesianProduct.size() > 0) {
					var possition = 1;
					
					for (var parametersIterator = cartesianProduct.iterator(), parameters = null; parametersIterator.hasNext();) {
						parameters = parametersIterator.next();
						var newQueries = queries.reflect();
						
						for (var parameterIterator = parameters.iterator(), parameter = null; parameterIterator.hasNext();) {
							parameter = parameterIterator.next();
							try {
								newQueries.add(Query.create(parameter.getName(), parameter.getValue()));
							} catch (e) {
								this.workspace.recordException("cannot create parameter", e);
								
								continue;
							}
						}
						
						var newData;
						
						try {
							newData = FieldData.create(newQueries);
						} catch (e) {
							this.workspace.recordException("cannot create data", e);
							
							continue;
						}
						
						var newUrl;
						
						try {
							newUrl = UrlFactory.create(form.getUrl()).resetFragment().build();
						} catch (e) {
							this.workspace.recordException("cannot create url", e);
							
							continue;
						}
						
						try {
							this.observers.doCrawledRequest(transaction, Request.create(form.getMethod(), newUrl, Version.HTTP11, newHeaders, newData));
						} catch (e) {
							this.workspace.recordException("cannot create request", e);
							
							continue;
						}
						
						if (possition == this.maxSampleSize) {
							break;
						} else {
							possition += 1;
						}
					}
				} else {
					var newData;
					
					try {
						newData = FieldData.create(queries);
					} catch (e) {
						this.workspace.recordException("cannot create data", e);
						
						continue;
					}
					
					var newUrl;
					
					try {
						newUrl = UrlFactory.create(form.getUrl()).resetFragment().build();
					} catch (e) {
						this.workspace.recordException("cannot create url", e);
						
						continue;
					}
					
					try {
						this.observers.doCrawledRequest(transaction, Request.create(form.getMethod(), newUrl, Version.HTTP11, newHeaders, newData));
					} catch (e) {
						this.workspace.recordException("cannot create request", e);
						
						continue;
					}
				}
			}
		}
	}
	
	/* -------------------------------------------------------------------- */
	
	Crawler.prototype.ensureTransactionResponseMimeType = function (transaction) {
		Mime.ensureTransactionResponseMimeType(transaction);
	}
	
	/* -------------------------------------------------------------------- */
	
	Crawler.prototype.crawlTransaction = function (transaction) {
		var request = transaction.getRequest();
		var response = transaction.getResponse();
		
		if (response == null) {
			this.workspace.recordWarning("transaction does not contain response");
			
			return;
		}
		
		var location = response.getHeaders().getHeaderValueByName("Location");
		
		if (!StringUtils.isHollow(location)) {
			var url;
			
			try {
				url = Link.parse(request.getUrl(), location).getUrl();
			} catch (e) {
				this.workspace.recordException("cannot parse link from location due to link normalization problems", e);
				
				url = null;
			}
			
			if (url != null) {
				try {
					this.observers.doCrawledRequest(transaction, Request.create(Method.GET, url, Version.HTTP11, Headers.BLANK, SourceData.BLANK));
				} catch (e) {
					this.workspace.recordException("cannot create request from location due to request normalization problems", e);
				}
			}
		}
		
		var contentLocation = response.getHeaders().getHeaderValueByName("Content-Location");
		
		if (!StringUtils.isHollow(contentLocation)) {
			var url;
			
			try {
				url = Link.parse(request.getUrl(), contentLocation).getUrl();
			} catch (e) {
				this.workspace.recordException("cannot parse link from contentLocation due to link normalization problems", e);
				
				url = null;
			}
			
			if (url != null) {
				try {
					this.observers.doCrawledRequest(transaction, Request.create(Method.GET, url, Version.HTTP11, Headers.BLANK, SourceData.BLANK));
				} catch (e) {
					this.workspace.recordException("cannot create request from contentLocation due to request normalization problems", e);
				}
			}
		}
		
		this.ensureTransactionResponseMimeType(transaction);
		
		var simpleContent = null;
		
		if (transaction.getResponseMimeType() == MimeType.HTML) {
			try {
				simpleContent = new SimpleContent(Page.parse(request.getUrl(), response.getData().make()));
			} catch (e) {
				this.workspace.recordException("cannot parse page", e);
			}
		} else {
			try {
				simpleContent = new SimpleContent(Page.create(Links.parse(request.getUrl(), response.getData().make()), Forms.BLANK));
			} catch (e) {
				this.workspace.recordException("cannot parse page", e);
			}
		}
		
		if (simpleContent != null) {
			transaction.setSimpleContent(simpleContent);
			
			this.crawlTransactionPage(transaction);
		}
	}
	
	/* -------------------------------------------------------------------- */
	
	function ClientObservers() {
		this.observers = new ListContainer();
	}
	/* -------------------------------------------------------------------- */
	
	ClientObservers.prototype.registerObserver = function (observer) {
		this.observers.add(observer);
	}
	
	ClientObservers.prototype.unregisterObserver = function (observer) {
		this.observers.remove(observer);
	}
	
	/* -------------------------------------------------------------------- */
	
	ClientObservers.prototype.doQueriedClientTransaction = function (transaction) {
		var clientObserver = transaction.getClientObserver();
		
		if (clientObserver != null) {
			clientObserver.handleQueriedClientTransaction(transaction);
		}
		
		for (var observerIterator = this.observers.iterator(), observer = null; observerIterator.hasNext();) {
			observer = observerIterator.next();
			observer.handleQueriedClientTransaction(transaction);
		}
	}
	
	ClientObservers.prototype.doAbortedClientTransaction = function (transaction) {
		var clientObserver = transaction.getClientObserver();
		
		if (clientObserver != null) {
			clientObserver.handleAbortedClientTransaction(transaction);
		}
		
		for (var observerIterator = this.observers.iterator(), observer = null; observerIterator.hasNext();) {
			observer = observerIterator.next();
			observer.handleAbortedClientTransaction(transaction);
		}
	}
	
	ClientObservers.prototype.doFailedClientTransaction = function (transaction) {
		var clientObserver = transaction.getClientObserver();
		
		if (clientObserver != null) {
			clientObserver.handleFailedClientTransaction(transaction);
		}
		
		for (var observerIterator = this.observers.iterator(), observer = null; observerIterator.hasNext();) {
			observer = observerIterator.next();
			observer.handleFailedClientTransaction(transaction);
		}
	}
	
	ClientObservers.prototype.doLoadedClientTransaction = function (transaction) {
		var clientObserver = transaction.getClientObserver();
		
		if (clientObserver != null) {
			clientObserver.handleLoadedClientTransaction(transaction);
		}
		
		for (var observerIterator = this.observers.iterator(), observer = null; observerIterator.hasNext();) {
			observer = observerIterator.next();
			observer.handleLoadedClientTransaction(transaction);
		}
	}
	
	ClientObservers.prototype.doCompletedClientTransaction = function (transaction) {
		var clientObserver = transaction.getClientObserver();
		
		if (clientObserver != null) {
			clientObserver.handleCompletedClientTransaction(transaction);
		}
		
		for (var observerIterator = this.observers.iterator(), observer = null; observerIterator.hasNext();) {
			observer = observerIterator.next();
			observer.handleCompletedClientTransaction(transaction);
		}
	}
	
	/* -------------------------------------------------------------------- */
	
	function Client() {
		this.observers = new ClientObservers();
	}
	
	/* -------------------------------------------------------------------- */
	
	Client.prototype.registerObserver = function (observer) {
		this.observers.registerObserver(observer);
	}
	
	Client.prototype.unregisterObserver = function (observer) {
		this.observers.unregisterObserver(observer);
	}
	
	/* -------------------------------------------------------------------- */
	
	Client.completeAbortedTransactionEventCycle = function (clientObservers, transaction) {
		clientObservers.doAbortedClientTransaction(transaction);
		clientObservers.doCompletedClientTransaction(transaction);
	}
	
	Client.completeFailedTransactionEventCycle = function (clientObservers, transaction) {
		clientObservers.doFailedClientTransaction(transaction);
		clientObservers.doCompletedClientTransaction(transaction);
	}
	
	Client.completeLoadedTransactionEventCycle = function (clientObservers, transaction) {
		clientObservers.doLoadedClientTransaction(transaction);
		clientObservers.doCompletedClientTransaction(transaction);
	}
	
	/* -------------------------------------------------------------------- */
	
	function AnalyzerObservers() {
		this.observers = new ListContainer();
	}
	
	/* -------------------------------------------------------------------- */
	
	AnalyzerObservers.prototype.registerObserver = function (observer) {
		this.observers.add(observer);
	}
	
	AnalyzerObservers.prototype.unregisterObserver = function (observer) {
		this.observers.remove(observer);
	}
	
	/* -------------------------------------------------------------------- */
	
	AnalyzerObservers.prototype.doAnalyzedIssue = function (issue) {
		for (var observerIterator = this.observers.iterator(), observer = null; observerIterator.hasNext();) {
			observer = observerIterator.next();
			observer.handleAnalyzedIssue(issue);
		}
	}
	
	/* -------------------------------------------------------------------- */
	
	function Analyzer(workspace) {
		this.observers = new AnalyzerObservers();
		this.workspace = workspace;
		this.internalIpAnalyzer = new InternalIpAnalyzer();
		this.sourceLeakAnalyzer = new SourceLeakAnalyzer();
		this.csrfableFormAnalyzer = new CsrfableFormAnalyzer();
		this.uploadFormAnalyzer = new UploadFormAnalyzer();
		this.autocompleteFormAnalyzer = new AutocompleteFormAnalyzer();
		this.pathDisclosureAnalyzer = new PathDisclosureAnalyzer();
		this.genericErrorDisclosureAnalyzer = new GenericErrorDisclosureAnalyzer();
		this.emailDisclosureAnalyzer = new EmailDisclosureAnalyzer();
		this.directoryListingAnalyzer = new DirectoryListingAnalyzer();
		this.httponlyCookieAnalyzer = new HttponlyCookieAnalyzer();
		this.secureCookieAnalyzer = new SecureCookieAnalyzer();
		this.soapUrlAnalyzer = new SoapUrlAnalyzer();
		this.bannerHeaderAnalyzer = new BannerHeaderAnalyzer();
		this.authenticationHeaderAnalyzer = new AuthenticationHeaderAnalyzer();
		this.sqlErrorDisclosureAnalyzer = new SqlErrorDisclosureAnalyzer();
	}
	
	/* -------------------------------------------------------------------- */
	
	Analyzer.prototype.handleException = function (message, exception) {
		this.workspace.recordException(message, exception);
	}
	
	Analyzer.prototype.handleIssue = function (issue) {
		this.observers.doAnalyzedIssue(issue);
	}
	
	/* -------------------------------------------------------------------- */
	
	Analyzer.prototype.registerObserver = function (observer) {
		this.observers.registerObserver(observer);
	}
	
	Analyzer.prototype.unregisterObserver = function (observer) {
		this.observers.unregisterObserver(observer);
	}
	
	/* -------------------------------------------------------------------- */
	
	Analyzer.prototype.doMimeTypeAnalyzis = function (transaction) {
		Mime.ensureTransactionResponseMimeType(transaction);
	}
	
	Analyzer.prototype.doInternalIpAnalyzis = function (transaction) {
		this.internalIpAnalyzer.analyze(transaction, this);
	}
	
	Analyzer.prototype.doSourceLeakAnalyzis = function (transaction) {
		this.sourceLeakAnalyzer.analyze(transaction, this);
	}
	
	Analyzer.prototype.doCsrfableFormAnalyzis = function (transaction) {
		this.csrfableFormAnalyzer.analyze(transaction, this);
	}
	
	Analyzer.prototype.doUploadFormAnalyzis = function (transaction) {
		this.uploadFormAnalyzer.analyzer(transaction, this);
	}
	
	Analyzer.prototype.doAutocompleteFormAnalyzis = function (transaction) {
		this.autocompleteFormAnalyzer.analyze(transaction, this);
	}
	
	Analyzer.prototype.doPathDisclosureAnalyzis = function (transaction) {
		this.pathDisclosureAnalyzer.analyze(transaction, this);
	}
	
	Analyzer.prototype.doGenericErrorDisclosureAnalyzis = function (transaction) {
		this.genericErrorDisclosureAnalyzer.analyze(transaction, this);
	}
	
	Analyzer.prototype.doEmailDisclosureAnalyzis = function (transaction) {
		this.emailDisclosureAnalyzer.analyze(transaction, this);
	}
	
	Analyzer.prototype.doDirectoryListingAnalyzis = function (transaction) {
		this.directoryListingAnalyzer.analyze(transaction, this);
	}
	
	Analyzer.prototype.doHttponlyCookieAnalyzis = function (transaction) {
		this.httponlyCookieAnalyzer.analyze(transaction, this);
	}
	
	Analyzer.prototype.doSecureCookieAnalyzis = function (transaction) {
		this.secureCookieAnalyzer.analyze(transaction, this);
	}
	
	Analyzer.prototype.doBannerHeaderAnalyzis = function (transaction) {
		this.bannerHeaderAnalyzer.analyze(transaction, this);
	}
	
	Analyzer.prototype.doAuthenticationHeaderAnalyzis = function (transaction) {
		this.authenticationHeaderAnalyzer.analyze(transaction, this);
	}
	
	Analyzer.prototype.doSoapUrlAnalyzis = function (transaction) {
		this.soapUrlAnalyzer.analyze(transaction, this);
	}
	
	Analyzer.prototype.doSqlErrorDisclosureAnalyzis = function (transaction) {
		this.sqlErrorDisclosureAnalyzer.analyze(transaction, this);
	}
	
	/* -------------------------------------------------------------------- */
	
	Analyzer.prototype.analyzeTransaction = function (transaction) {
		this.doMimeTypeAnalyzis(transaction);
		this.doInternalIpAnalyzis(transaction);
		this.doSourceLeakAnalyzis(transaction);
		this.doCsrfableFormAnalyzis(transaction);
		this.doUploadFormAnalyzis(transaction);
		this.doAutocompleteFormAnalyzis(transaction);
		this.doPathDisclosureAnalyzis(transaction);
		this.doGenericErrorDisclosureAnalyzis(transaction);
		this.doEmailDisclosureAnalyzis(transaction);
		this.doDirectoryListingAnalyzis(transaction);
		this.doHttponlyCookieAnalyzis(transaction);
		this.doSecureCookieAnalyzis(transaction);
		this.doBannerHeaderAnalyzis(transaction);
		this.doAuthenticationHeaderAnalyzis(transaction);
		this.doSoapUrlAnalyzis(transaction);
		this.doSqlErrorDisclosureAnalyzis(transaction);
	}
	
	/* -------------------------------------------------------------------- */
	
	function StatementLevel(value) {
		this.value = value;
	}
	
	StatementLevel.prototype.name = function () {
		return this.value;
	}
	
	StatementLevel.valueOf = function (value) {
		for (var i in StatementLevel) {
			if (StatementLevel[i] instanceof StatementLevel && StatementLevel[i].value == value) return StatementLevel[i];
		}
		
		throw new Error('cannot find a StatementLevel with value ' + value);
	}
	
	StatementLevel.LEVEL00 = new StatementLevel("LEVEL00");
	StatementLevel.LEVEL01 = new StatementLevel("LEVEL01");
	StatementLevel.LEVEL02 = new StatementLevel("LEVEL02");
	StatementLevel.LEVEL03 = new StatementLevel("LEVEL03");
	StatementLevel.LEVEL04 = new StatementLevel("LEVEL04");
	StatementLevel.LEVEL05 = new StatementLevel("LEVEL05");
	StatementLevel.LEVEL06 = new StatementLevel("LEVEL06");
	StatementLevel.LEVEL07 = new StatementLevel("LEVEL07");
	StatementLevel.LEVEL08 = new StatementLevel("LEVEL08");
	StatementLevel.LEVEL09 = new StatementLevel("LEVEL09");
	StatementLevel.LEVEL10 = new StatementLevel("LEVEL10");
	
	/* -------------------------------------------------------------------- */
	
	function Statement(level, title, summary, exact, description, details, issue) {
		this.level = level;
		this.title = title;
		this.summary = summary;
		this.exact = exact;
		this.description = description;
		this.details = details;
		this.issue = issue;
	}
	
	/* -------------------------------------------------------------------- */
	
	Statement.prototype.getLevel = function () {
		return this.level;
	}
	
	Statement.prototype.getTitle = function () {
		return this.title;
	}
	
	Statement.prototype.getSummary = function () {
		return this.summary;
	}
	
	Statement.prototype.getExact = function () {
		return this.exact;
	}
	
	Statement.prototype.getDescription = function () {
		return this.description;
	}
	
	Statement.prototype.getDetails = function () {
		return this.details;
	}
	
	Statement.prototype.getIssue = function () {
		return this.issue;
	}
	
	/* -------------------------------------------------------------------- */
	
	function Signature(value) {
		this.value = value;
	}
	
	/* -------------------------------------------------------------------- */
	
	Signature.prototype.getValue = function () {
		return this.value;
	}
	
	/* -------------------------------------------------------------------- */
	
	Signature.sha1 = function (string) {
		return new Signature(HashUtils.sha1(string));
	}
	
	/* -------------------------------------------------------------------- */
	
	function Scope() {
		this.maximumContentSize = 0;
		this.includeUrlPatterns = new ListContainer();
		this.excludeUrlPatterns = new ListContainer();
		this.includeContentTypePatterns = new ListContainer();
		this.excludeContentTypePatterns = new ListContainer();
		this.recursionRegularExpression = new RegularExpression("(.+?\\/)(?=\\1+)", "");
	}
	
	/* -------------------------------------------------------------------- */
	
	Scope.prototype.setMaximumContentSize = function (contentLength) {
		this.maximumContentSize = contentLength;
	}
	
	/* -------------------------------------------------------------------- */
	
	Scope.prototype.includeUrlPattern = function (pattern) {
		this.includeUrlPatterns.add(new RegularExpression(pattern, "i"));
	}
	
	Scope.prototype.excludeUrlPattern = function (pattern) {
		this.excludeUrlPatterns.add(new RegularExpression(pattern, "i"));
	}
	
	/* -------------------------------------------------------------------- */
	
	Scope.prototype.includeContentTypePattern = function (pattern) {
		this.includeContentTypePatterns.add(new RegularExpression(pattern, "i"));
	}
	
	Scope.prototype.excludeContentTypePattern = function (pattern) {
		this.excludeContentTypePatterns.add(new RegularExpression(pattern, "i"));
	}
	
	/* -------------------------------------------------------------------- */
	
	Scope.prototype.includeUrl = function (url) {
		this.includeUrlPattern("^" + RegularExpression.escape(url.make()) + ".*");
	}
	
	Scope.prototype.excludeUrl = function (url) {
		this.excludeUrlPattern("^" + RegularExpression.escape(url.make()) + ".*");
	}
	
	/* -------------------------------------------------------------------- */
	
	Scope.prototype.includeContentType = function (contentType) {
		this.includeContentTypePattern("^" + RegularExpression.escape(contentType) + ".*");
	}
	
	Scope.prototype.excludeContentType = function (contentType) {
		this.excludeContentTypePattern("^" + RegularExpression.escape(contentType) + ".*");
	}
	
	/* -------------------------------------------------------------------- */
	
	Scope.prototype.checkInScope = function (input, includePatterns, excludePatterns) {
		for (var includePatternIterator = includePatterns.iterator(), includePattern = null; includePatternIterator.hasNext();) {
			includePattern = includePatternIterator.next();
			if (includePattern.test(input)) {
				for (var excludePatternIterator = excludePatterns.iterator(), excludePattern = null; excludePatternIterator.hasNext();) {
					excludePattern = excludePatternIterator.next();
					if (excludePattern.test(input)) {
						
						return false;
					}
				}
				
				return true;
			}
		}
		
		return false;
	}
	
	/* -------------------------------------------------------------------- */
	
	Scope.prototype.isUrlInScope = function (url) {
		var urlString;
		
		if (url == null) {
			urlString = "";
		} else {
			urlString = url.make();
		}
		
		return this.checkInScope(urlString, this.includeUrlPatterns, this.excludeUrlPatterns);
	}
	
	Scope.prototype.isContentSizeInScope = function (size) {
		if (this.maximumContentSize <= 0) {
			return true;
		} else
		if (this.maximumContentSize >= size) {
			return true;
		} else {
			return false;
		}
	}
	
	Scope.prototype.isContentLengthInScope = function (contentLength) {
		if (contentLength == null) {
			return true;
		} else {
			var contentLengthInt;
			
			try {
				contentLengthInt = NumberUtils.parseInteger(contentLength);
			} catch (e) {
				return false;
			}
			
			return this.isContentSizeInScope(contentLengthInt);
		}
	}
	
	Scope.prototype.isContentTypeInScope = function (contentType) {
		if (contentType == null) {
			return true;
		} else {
			return this.checkInScope(contentType, this.includeContentTypePatterns, this.excludeContentTypePatterns);
		}
	}
	
	/* -------------------------------------------------------------------- */
	
	Scope.prototype.isRequestInScope = function (request) {
		return this.isUrlInScope(request.getUrl());
	}
	
	Scope.prototype.isResponseInScope = function (response) {
		var headers = response.getHeaders();
		
		return this.isContentLengthInScope(headers.getHeaderValueByName("Content-Length")) && this.isContentTypeInScope(headers.getHeaderValueByName("Content-Type"));
	}
	
	/* -------------------------------------------------------------------- */
	
	Scope.prototype.isUrlRecursive = function (url) {
		return this.recursionRegularExpression.test(url.getPath().make());
	}
	
	Scope.prototype.isRequestRecursive = function (request) {
		return this.isUrlRecursive(request.getUrl());
	}
	
	/* -------------------------------------------------------------------- */
	
	Scope.createBasicScope = function () {
		var scope = new Scope();
		
		scope.setMaximumContentSize(128 * 1024);
		scope.excludeUrlPattern("\\?C=[NMSD];O=[AD]");
		scope.excludeUrlPattern("\\?C=[NMSD]&O=[AD]");
		scope.excludeUrlPattern("\\.(?:7z|a3c|ace|aif|aifc|aiff|arj|asf|asx|au|avi|bin|bmp|cab|css|divx|djv|djvu|doc|dot|dwg|eps|es|esl|exe|fif|fla|flv|fvi|gif|gz|hqx|ice|ico|ief|ifs|iw4|iw44|jar|jpe|jpeg|jpg|js|kar|mid|midi|mov|movie|mp|mp2|mp3|mp4|mpeg|mpeg2|mpga|mpp|mpt|msi|msi|pac|pae|pbm|pcx|pdf|pgm|png|pnm|ppm|ppt|ps|psd|qt|ra|ram|rar|ras|rgb|rmf|rpm|rtf|sit|smi|snd|svf|swf|tar|tgz|tif|tiff|uff|vis|viv|vivo|vox|wav|wbmp|wi|wma|wmv|xbm|xls|xml|xpm|xwd|zip)(?:\\?.+?)?$");
		scope.includeContentTypePattern("(?:html)");
		
		return scope;
	}
	
	/* -------------------------------------------------------------------- */
	
	function MimeType(value) {
		this.value = value;
	}
	
	MimeType.prototype.name = function () {
		return this.value;
	}
	
	MimeType.valueOf = function (value) {
		for (var i in MimeType) {
			if (MimeType[i] instanceof MimeType && MimeType[i].value == value) return MimeType[i];
		}
		
		throw new Error('cannot find a MimeType with value ' + value);
	}
	
	MimeType.HTML = new MimeType("HTML");
	MimeType.CSS = new MimeType("CSS");
	MimeType.JAVASCRIPT = new MimeType("JAVASCRIPT");
	MimeType.JSON = new MimeType("JSON");
	MimeType.XML = new MimeType("XML");
	MimeType.FEED = new MimeType("FEED");
	MimeType.IMAGE = new MimeType("IMAGE");
	MimeType.AUDIO = new MimeType("AUDIO");
	MimeType.VIDEO = new MimeType("VIDEO");
	MimeType.TEXT = new MimeType("TEXT");
	MimeType.UNKNOWN = new MimeType("UNKNOWN");
	
	/* -------------------------------------------------------------------- */
	
	function MimeKind(value) {
		this.value = value;
	}
	
	MimeKind.prototype.name = function () {
		return this.value;
	}
	
	MimeKind.valueOf = function (value) {
		for (var i in MimeKind) {
			if (MimeKind[i] instanceof MimeKind && MimeKind[i].value == value) return MimeKind[i];
		}
		
		throw new Error('cannot find a MimeKind with value ' + value);
	}
	
	MimeKind.TEXT = new MimeKind("TEXT");
	MimeKind.BINARY = new MimeKind("BINARY");
	
	/* -------------------------------------------------------------------- */
	
	function Mime() {
	}
	
	/* -------------------------------------------------------------------- */
	
	Mime.ensureTransactionResponseMimeType = function (transaction) {
		if (transaction.getResponseMimeType() == null) {
			var response = transaction.getResponse();
			
			if (response == null) {
				LogUtils.recordWarning("transaction does not contain response");
				
				return;
			}
			
			var contentType = response.getHeaders().getHeaderValueByName("Content-Type");
			
			if (contentType == null) {
				var data = response.getData().make();
				var sniff = data.substring(0, 256);
				
				if (sniff.indexOf("<html") >=0 || sniff.indexOf("<HTML") >= 0) {
					transaction.setResponseMimeType(MimeType.HTML);
				} else {
					transaction.setResponseMimeType(MimeType.UNKNOWN);
				}
			} else {
				if (contentType.indexOf("html") > 0) {
					transaction.setResponseMimeType(MimeType.HTML);
				} else
				if (contentType.indexOf("css") > 0) {
					transaction.setResponseMimeType(MimeType.CSS);
				} else
				if (contentType.indexOf("javascript") > 0) {
					transaction.setResponseMimeType(MimeType.JAVASCRIPT);
				} else
				if (contentType.indexOf("xml") > 0) {
					if (contentType.indexOf("rss") > 0) {
						transaction.setResponseMimeType(MimeType.FEED);
					} else
					if (contentType.indexOf("atom") > 0) {
						transaction.setResponseMimeType(MimeType.FEED);
					} else {
						transaction.setResponseMimeType(MimeType.XML);
					}
				} else
				if (contentType.indexOf("image") > 0) {
					transaction.setResponseMimeType(MimeType.IMAGE);
				} else
				if (contentType.indexOf("audio") > 0) {
					transaction.setResponseMimeType(MimeType.AUDIO);
				} else
				if (contentType.indexOf("video") > 0) {
					transaction.setResponseMimeType(MimeType.VIDEO);
				} else
				if (contentType.indexOf("text") > 0) {
					transaction.setResponseMimeType(MimeType.TEXT);
				} else {
					transaction.setResponseMimeType(MimeType.UNKNOWN);
				}
			}
		}
	}
	
	/* -------------------------------------------------------------------- */
	
	function IssueType(value) {
		this.value = value;
	}
	
	IssueType.prototype.name = function () {
		return this.value;
	}
	
	IssueType.valueOf = function (value) {
		for (var i in IssueType) {
			if (IssueType[i] instanceof IssueType && IssueType[i].value == value) return IssueType[i];
		}
		
		throw new Error('cannot find a IssueType with value ' + value);
	}
	
	IssueType.AUTOCOMPLETE = new IssueType("AUTOCOMPLETE");
	IssueType.CSRF = new IssueType("CSRF");
	IssueType.DIRECTORYLISTINGDENIED = new IssueType("DIRECTORYLISTINGDENIED");
	IssueType.DIRECTORYLISTINGENABLED = new IssueType("DIRECTORYLISTINGENABLED");
	IssueType.EMAIL = new IssueType("EMAIL");
	IssueType.FILEUPLOAD = new IssueType("FILEUPLOAD");
	IssueType.WWWAUTHENTICATION = new IssueType("WWWAUTHENTICATION");
	IssueType.BANNER = new IssueType("BANNER");
	IssueType.HTTPONLYSESSIONCOOKIE = new IssueType("HTTPONLYSESSIONCOOKIE");
	IssueType.IP = new IssueType("IP");
	IssueType.SECURESESSIONCOOKIE = new IssueType("SECURESESSIONCOOKIE");
	IssueType.SOAP = new IssueType("SOAP");
	IssueType.PATH = new IssueType("PATH");
	IssueType.USER = new IssueType("USER");
	IssueType.ERROR = new IssueType("ERROR");
	IssueType.LFINJECTION = new IssueType("LFINJECTION");
	IssueType.XSSINJECTION = new IssueType("XSSINJECTION");
	IssueType.SQLERROR = new IssueType("SQLERROR");
	IssueType.SQLINJECTION = new IssueType("SQLINJECTION");
	IssueType.CRLFINJECTION = new IssueType("CRLFINJECTION");
	IssueType.REDIRECT = new IssueType("REDIRECT");
	IssueType.GENERIC = new IssueType("GENERIC");
	IssueType.SOURCELEAK = new IssueType("SOURCELEAK");
	
	/* -------------------------------------------------------------------- */
	
	exports.issue = {
	'issue.SOAP.title': 'Discovered SOAP Service',
	'issue.SOURCELEAK.summary': 'source leak: #source#',
	'issue.LFINJECTION.details': '<p><strong>request:</strong></p><pre><code>#request#</code></pre>',
	'issue.HTTPONLYSESSIONCOOKIE.level': 'LEVEL02',
	'issue.IP.exact': '#ip#',
	'issue.SECURESESSIONCOOKIE.title': 'Session Cookie not Flagged as Secure',
	'issue.EMAIL.level': 'LEVEL01',
	'issue.IP.summary': 'found IP #ip#',
	'issue.CRLFINJECTION.exact': '#request#',
	'issue.SOAP.summary': 'a soap url found at #url#',
	'issue.PATH.summary': 'path #path# found',
	'issue.CSRF.summary': 'discovered csrf-able form #form#',
	'issue.SQLERROR.summary': 'an sql error was found for request #request#',
	'issue.BANNER.title': 'Banner Disclosure',
	'issue.ERROR.exact': '#request#',
	'issue.CSRF.title': 'Cross-site Request Forgery',
	'issue.WWWAUTHENTICATION.level': 'LEVEL04',
	'issue.DIRECTORYLISTINGENABLED.level': 'LEVEL02',
	'issue.SOAP.description': '<p>SOAP (Simple Object Access Protocol) is a protocol specification for exchanging structured information in the implementation of Web Services. SOAP Services might provide alternative, and sometimes low-level, ways to access the application and therefore need to be fully inspected for vulnerabilities.</p><p><strong>solution:</strong> If the soap services are not in use ensure that they are removed or only available to authorized personnel.</p>',
	'issue.ERROR.description': '<p>Various web errors were disclosed within the application source code or other files. This information could be used by attackers to make an educated guess about the application environment type, version and current configuration. In some situations these errors may indicate a weakness which could be exploited.</p><p><strong>solution:</strong> It is strongly recommended to ensure that any unhandled application errors are trapped and never displayed to the user. The user should only see a generic message which contains enough information to track the error within the application logs.</p>',
	'issue.SQLERROR.exact': '#request#',
	'issue.USER.summary': 'user #user# found',
	'issue.AUTOCOMPLETE.level': 'LEVEL02',
	'issue.BANNER.summary': 'found banner #header#',
	'issue.PATH.title': 'Path Disclosure',
	'issue.SQLINJECTION.summary': 'a sql injection was found for request #request#',
	'issue.SQLERROR.description': '<p>Various SQL errors were disclosed within the application source code or other files. This information could be used by attackers to make an educated guess about the application environment type, version and current configuration. In some situations these errors may indicate a weakness which could be exploited via a SQL Injection attack.</p><p><strong>solution:</strong> It is strongly recommended to ensure that any unhandled SQL errors are trapped and never displayed to the user. The user should only see a generic message which contains enough information to track the error within the application logs.</p>',
	'issue.AUTOCOMPLETE.details': '<p><strong>url:</strong> <code>#url#</code></p><p><strong>form:</strong> <code>#form# ... &lt;/form&gt;</code></p>',
	'issue.SOAP.exact': '#url#',
	'issue.XSSINJECTION.level': 'LEVEL06',
	'issue.LFINJECTION.title': 'Local File Include',
	'issue.SECURESESSIONCOOKIE.exact': '#header#',
	'issue.FILEUPLOAD.details': '<p><strong>url:</strong> <code>#url#</code></p><p><strong>form:</strong> <code>#form# ... &lt;/form&gt;</code></p>',
	'issue.REDIRECT.level': 'LEVEL05',
	'issue.IP.level': 'LEVEL02',
	'issue.DIRECTORYLISTINGDENIED.title': 'Directory Listing Denied',
	'issue.GENERIC.summary': 'generic finding: #message#',
	'issue.BANNER.exact': '#header#',
	'issue.CRLFINJECTION.level': 'LEVEL06',
	'issue.XSSINJECTION.description': '<p>Cross-site Scripting (XSS) is a type of web application security vulnerability which allows code injection by malicious web users into the web pages viewed by other users. An exploited XSS vulnerability could be used by attackers to bypass access controls, steal data, craft phishing attacks and launch targeted attacks using browser exploits.</p><p><strong>solution:</strong> Sanitize all user-supplied data before using it as part of dynamically generated pages and data.</p>',
	'issue.CSRF.exact': '#form#',
	'issue.IP.details': '<p><strong>ip:</strong> <code>#ip#</code></p><p><strong>request:</strong></p><pre><code>#request#</code></pre>',
	'issue.ERROR.level': 'LEVEL02',
	'issue.SOAP.details': '<p><strong>url:</strong> <code>#url#</code></p>',
	'issue.WWWAUTHENTICATION.summary': 'wwwauthentication enabled for resource with url #url#',
	'issue.PATH.exact': '#path#',
	'issue.DIRECTORYLISTINGDENIED.summary': 'directory listing denied for resource with url #url#',
	'issue.FILEUPLOAD.title': 'File Upload',
	'issue.SOURCELEAK.details': '<p><strong>source: </strong> <code>#source#</code></p>',
	'issue.USER.title': 'User Disclosure',
	'issue.SQLERROR.level': 'LEVEL04',
	'issue.FILEUPLOAD.description': '<p>File upload facilities are usually considered dangerous as if mishandled, the could lead to persistent Cross-site Scripting (XSS) attacks or remote code execution.</p><p><strong>solution:</strong> Ensure that the file upload form has the appropriate access controls and is resilient to common attacks.</p>',
	'issue.SECURESESSIONCOOKIE.description': '<p>"Secure" is an additional flag included in a Set-Cookie HTTP response header which specifies that the cookie could not be sent by the browser over insecure channel such as HTTP. As a result, even if an attacker is eavesdropping the network, the browser will not reveal a session cookie, for example, to a third party and therefore the users\'s session will be protected from being hijacked.</p><p><strong>solution:</strong> It is recommended to enforce the "Secure" flag.</p>',
	'issue.CRLFINJECTION.description': '<p>CRLF stands for Carriage Return Linefeed, which is a special sequence of characters (0x0D 0x0A in hex) used by the HTTP protocol as a line separator. A CRLF Injection attack occurs when an attacker manages to force the application to return the CRLF sequence plus attacker\'s supplied data as part of the response headers. CRLFI vulnerabilities could be used as XSS (Cross-site Scripting) or HTTP Response Splitting attack vectors.</p><p><strong>solution:</strong> Inspect all user input for the CRLF character sequence and remove it if the data shall be included in the application response headers.</p>',
	'issue.LFINJECTION.exact': '#request#',
	'issue.SOURCELEAK.description': '// TODO: add text here',
	'issue.BANNER.details': '<p><strong>banner:</strong> <code>#header#</code></p><p><strong>request:</strong></p><pre><code>#request#</code></pre>',
	'issue.SOAP.level': 'LEVEL02',
	'issue.SOURCELEAK.title': 'Source Leakage',
	'issue.SQLINJECTION.title': 'SQL Injection',
	'issue.PATH.details': '<p><strong>path:</strong> <code>#path# ...</code></p><p><strong>request:</strong></p><pre><code>#request#</code></pre>',
	'issue.SQLINJECTION.details': '<p><strong>database:</strong> <code>#database#</code></p><p><strong>request:</strong></p><pre><code>#request#</code></pre>',
	'issue.CSRF.details': '<p><strong>url:</strong> <code>#url#</code></p><p><strong>form:</strong> <code>#form# ... &lt;/form&gt;</code></p>',
	'issue.SQLERROR.details': '<p><strong>database:</strong> <code>#database#</code></p><p><strong>request:</strong></p><pre><code>#request#</code></pre>',
	'issue.SECURESESSIONCOOKIE.level': 'LEVEL02',
	'issue.ERROR.summary': 'an error found for request #request#',
	'issue.GENERIC.description': '// TODO: add text here',
	'issue.DIRECTORYLISTINGDENIED.exact': '#url#',
	'issue.IP.description': '<p>The server or application disclosed internal network information. This information could be used by attackers to make an educated guess about the internal or external network topology. Leaked IP addresses could be used as a stepping-stone to more complex attacks.</p><p><strong>solution:</strong> Ensure that sensitive information such as internal or external IP addresses is safely guarded. Unless there is a good, prevent the disclosure of network information.</p>',
	'issue.HTTPONLYSESSIONCOOKIE.summary': 'found insecure http only cookie #header#',
	'issue.BANNER.level': 'LEVEL01',
	'issue.USER.details': '<p><strong>user:</strong> <code>#user# ...</code></p><p><strong>request:</strong></p><pre><code>#request#</code></pre>',
	'issue.GENERIC.details': '<p><strong>message: </strong></p><pre><code>#message#</code></pre>',
	'issue.GENERIC.title': 'Generic Finding',
	'issue.CSRF.level': 'LEVEL05',
	'issue.WWWAUTHENTICATION.description': '<p>The application used WWW Authentication. This type of authentication is often considered insecure and vulnerable to a range of attacks.</p><p><strong>solution:</strong> Consider moving from WWW Authentication to form-based authentication.</p>',
	'issue.FILEUPLOAD.exact': '#form#',
	'issue.HTTPONLYSESSIONCOOKIE.title': 'Session Cookie not Flagged as HTTPOnly',
	'issue.USER.exact': '#user#',
	'issue.CRLFINJECTION.summary': 'a crlfi was found for request #request#',
	'issue.BANNER.description': '<p>The server or application disclosed its type and version. This information could be used by attackers to make an educated guess about the application environment and any inherited weaknesses that may come with it.</p><p><strong>solution:</strong> It is recommended to prevent the application from disclosing its type and version.</p>',
	'issue.DIRECTORYLISTINGENABLED.description': '<p>Directory listings allow attackers to get better understandings about the server and the application structure. In some situations directory listings may reveal resources which are not supposed to be known.</p><p><strong>solution:</strong> Disable directory listings.</p>',
	'issue.EMAIL.title': 'Email Disclosure',
	'issue.PATH.level': 'LEVEL02',
	'issue.DIRECTORYLISTINGDENIED.details': '<p><strong>url:</strong> <code>#url#</code></p>',
	'issue.EMAIL.summary': 'found email #email#',
	'issue.SECURESESSIONCOOKIE.summary': 'found insecure session cookie #header#',
	'issue.DIRECTORYLISTINGENABLED.summary': 'directory listing enabled for resource with url #url#',
	'issue.SQLINJECTION.exact': '#request#',
	'issue.SOURCELEAK.exact': '#source#',
	'issue.LFINJECTION.level': 'LEVEL08',
	'issue.HTTPONLYSESSIONCOOKIE.description': '<p>"HTTPOnly" is an additional flag included in a Set-Cookie HTTP response header which specifies that the cookie could not be accessed by client-side code such as JavaScript, Flash, etc. As a result, even if a Cross-site Scripting (XSS) flaw exists, and a user accidentally accesses a resource that exploits this flaw, the browser will not reveal a session cookie, for example, to a third party and therefore the users\'s session will be protected from being hijacked.</p><p><strong>solution:</strong> If the application doesn\'t need to access the cookie by some client-side functionality, it is recommended to enforce the "HTTPOnly" flag.</p>',
	'issue.WWWAUTHENTICATION.title': 'WWW Authentication',
	'issue.DIRECTORYLISTINGENABLED.title': 'Directory Listing Enabled',
	'issue.CSRF.description': '<p>Cross-site Request Forgery (CSRF) is a type of attack whereby unauthorized commands are transmitted from a user that the application trusts. Unlike Cross-site Scripting (XSS), which exploits the trust a user has for a particular site, CSRF exploits the trust that a site has in a user\'s browser.</p><p><strong>solution:</strong> Url and Forms that perform important operations must be protected by random tokens (hidden nonce values). These tokens must be checked for validity at the server before the request is processed.</p>',
	'issue.REDIRECT.summary': 'an open reidrect was found for request #request#',
	'issue.XSSINJECTION.summary': 'a xss was found for request #request#',
	'issue.DIRECTORYLISTINGDENIED.description': '<p>A Directory Listing Denied error is generated when there is no Index file in the requested directory and the server or application is not configured to reveal the directory contents. This, however, could indicate that the directory exists. A brute force strategy could be used to find files within the folder.</p><p><strong>solution:</strong> Instead of returning the standard Directory Listing Denied error page, present the user with a generic error message indicating that the request could not be completed.</p>',
	'issue.AUTOCOMPLETE.title': 'Autocomplete Enabled',
	'issue.DIRECTORYLISTINGDENIED.level': 'LEVEL01',
	'issue.WWWAUTHENTICATION.details': '<p><strong>request:</strong></p><pre><code>#request#</code></pre>',
	'issue.REDIRECT.description': '<p>An Open Redirect is a type of a vulnerability where a parameter taken from the user is used as the target of a HTTP redirect without any validation. This vulnerability is commonly used in phishing attacks. The purpose of the attack is to get the user to visit a malicious site without realizing it.</p><p><strong>solution:</strong> Ensure that the application can only redirect to a whitelist of approved applications.</p>',
	'issue.GENERIC.exact': '#message#',
	'issue.LFINJECTION.summary': 'a lfi was found for request #request#',
	'issue.SQLINJECTION.description': '<p>SQL Injection (SQLI) is a code injection technique that exploits a security vulnerability occurring in the database layer of a web application. The vulnerability was present when user input was either incorrectly filtered for string literal escape characters embedded in SQL statements or user input was not strongly typed and thereby unexpectedly executed.</p><p><strong>solution:</strong> Sanitize all user-supplied data before using it as part of database queries.</p>',
	'issue.LFINJECTION.description': '<p>Local File Include (LFI) is a vulnerability that may allow attackers to retrieve or execute server-side files. The vulnerability arises by allowing unsanitized user-supplied input, which usually contains special character sequences, to be passed into functions that process paths.</p><p><strong>solution:</strong> Sanitize all user-supplied data for special character sequences.</p>',
	'issue.XSSINJECTION.title': 'Cross-site Scripting',
	'issue.HTTPONLYSESSIONCOOKIE.exact': '#header#',
	'issue.REDIRECT.title': 'Open Redirect',
	'issue.EMAIL.exact': '#email#',
	'issue.FILEUPLOAD.level': 'LEVEL00',
	'issue.AUTOCOMPLETE.summary': 'discovered autocomplete form #form#',
	'issue.IP.title': 'IP Disclosure',
	'issue.USER.level': 'LEVEL02',
	'issue.ERROR.details': '<p><strong>error:</strong> <code>#error#</code></p><p><strong>request:</strong></p><pre><code>#request#</code></pre>',
	'issue.FILEUPLOAD.summary': 'discovered file upload form #form#',
	'issue.CRLFINJECTION.details': '<p><strong>request:</strong></p><pre><code>#request#</code></pre>',
	'issue.AUTOCOMPLETE.description': '<p>Autocomplete should be disabled (<code>autocomplete="off"</code>), especially in forms which process sensitive data, such as forms with password fields, since an attacker, if able to access the browser cache, could easily obtain the cached information in cleartext.</p><p><strong>solution:</strong> Disable the autocomplete feature (<code>autocomplete="off"</code>) on forms which may hold sensitive data.</p>',
	'issue.PATH.description': '<p>Various system paths were disclosed within the application client source code or other files. This information could be used by attackers to make an educated guess about the application environment and any inherited weaknesses that may come with it.</p><p><strong>solution:</strong> It is recommended to re-examine the system path disclosures and remove their reference from the application\'s source code.</p>',
	'issue.CRLFINJECTION.title': 'Carriage Return Linefeed Injection',
	'issue.WWWAUTHENTICATION.exact': '#url#',
	'issue.DIRECTORYLISTINGENABLED.exact': '#url#',
	'issue.HTTPONLYSESSIONCOOKIE.details': '<p><strong>cookie:</strong> <code>#header#</code></p><p><strong>request:</strong></p><pre><code>#request#</code></pre>',
	'issue.SQLINJECTION.level': 'LEVEL08',
	'issue.SOURCELEAK.level': 'LEVEL02',
	'issue.EMAIL.details': '<p><strong>email:</strong> <code>#email#</code></p><p><strong>request:</strong></p><pre><code>#request#</code></pre>',
	'issue.ERROR.title': 'Error Disclosure',
	'issue.DIRECTORYLISTINGENABLED.details': '<p><strong>url:</strong> <code>#url#</code></p>',
	'issue.SECURESESSIONCOOKIE.details': '<p><strong>cookie:</strong> <code>#header#</code></p><p><strong>request:</strong></p><pre><code>#request#</code></pre>',
	'issue.AUTOCOMPLETE.exact': '#form#',
	'issue.EMAIL.description': '<p>The server or application disclosed emails. This information could be used by attackers to make an educated guess about who developed the application, what contact entry points are available or what the internal email format looks like, which could also correspond to the format of the application usernames.</p><p><strong>solution:</strong> Ensure that contact emails do not disclose any information and are adequately protected against external attacks.</p>',
	'issue.SQLERROR.title': 'SQL Error',
	'issue.REDIRECT.details': '<p><strong>request:</strong></p><pre><code>#request#</code></pre>',
	'issue.XSSINJECTION.exact': '#request#',
	'issue.XSSINJECTION.details': '<p><strong>request:</strong></p><pre><code>#request#</code></pre>',
	'issue.USER.description': '<p>Various usernames were disclosed within the application client source code or other files. This information could be used by attackers to attack the login mechanism on the application and supporting infrastructure.</p><p><strong>solution:</strong> It is recommended to re-examine the username disclosures and remove their reference from the application\'s source code.</p>',
	'issue.GENERIC.level': 'LEVEL00',
	'issue.REDIRECT.exact': '#request#'
	}
	
	/* -------------------------------------------------------------------- */
	
	function Issue(type, signature, transaction) {
		this.type = type;
		this.signature = signature;
		this.transaction = transaction;
		this.url = null;
		this.header = null;
		this.ip = null;
		this.email = null;
		this.form = null;
		this.path = null;
		this.user = null;
		this.error = null;
		this.database = null;
		this.message = null;
		this.source = null;
	}
	
	/* -------------------------------------------------------------------- */
	
	Issue.prototype.getType = function () {
		return this.type;
	}
	
	Issue.prototype.getSignature = function () {
		return this.signature;
	}
	
	Issue.prototype.getTransaction = function () {
		return this.transaction;
	}
	
	/* -------------------------------------------------------------------- */
	
	Issue.prototype.getUrl = function () {
		return this.url;
	}
	
	Issue.prototype.setUrl = function (url) {
		this.url = url;
	}
	
	Issue.prototype.getHeader = function () {
		return this.header;
	}
	
	Issue.prototype.setHeader = function (header) {
		this.header = header;
	}
	
	Issue.prototype.getIp = function () {
		return this.ip;
	}
	
	Issue.prototype.setIp = function (ip) {
		this.ip = ip;
	}
	
	Issue.prototype.getEmail = function () {
		return this.email;
	}
	
	Issue.prototype.setEmail = function (email) {
		this.email = email;
	}
	
	Issue.prototype.getForm = function () {
		return this.form;
	}
	
	Issue.prototype.setForm = function (form) {
		this.form = form;
	}
	
	Issue.prototype.getPath = function () {
		return this.path;
	}
	
	Issue.prototype.setPath = function (path) {
		this.path = path;
	}
	
	Issue.prototype.getUser = function () {
		return this.user;
	}
	
	Issue.prototype.setUser = function (user) {
		this.user = user;
	}
	
	Issue.prototype.getError = function () {
		return this.error;
	}
	
	Issue.prototype.setError = function (error) {
		this.error = error;
	}
	
	Issue.prototype.getDatabase = function () {
		return this.database;
	}
	
	Issue.prototype.setDatabase = function (database) {
		this.database = database;
	}
	
	Issue.prototype.getMessage = function () {
		return this.message;
	}
	
	Issue.prototype.setMessage = function (message) {
		this.message = message;
	}
	
	Issue.prototype.getSource = function () {
		return this.source;
	}
	
	Issue.prototype.setSource = function (source) {
		this.source = source;
	}
	
	/* -------------------------------------------------------------------- */
	
	Issue.createWithIndicatedSignature = function (type, transaction, indicatedSignature) {
		return new Issue(type, Signature.sha1(type.name() + indicatedSignature), transaction);
	}
	
	/* -------------------------------------------------------------------- */
	
	function SimpleQueryPayloadTransactionIterator(transaction, payloads, useBack, useFront, usePollution) {
		this.transaction = transaction;
		this.request = this.transaction.getRequest();
		this.queries = this.request.getUrl().getQueries();
		
		var stages = new ListContainer();
		
		stages.add("replace");
		
		if (useBack) {
			stages.add("back");
		}
		
		if (useFront) {
			stages.add("front");
		}
		
		if (usePollution) {
			stages.add("pollution");
		}
		
		this.payloadIterator = new MixTrippleIterator(stages.iterator(), new CommonQueryFilter(this.queries), payloads);
	}
	
	/* -------------------------------------------------------------------- */
	
	SimpleQueryPayloadTransactionIterator.prototype.hasNext = function () {
		return this.payloadIterator.hasNext();
	}
	
	SimpleQueryPayloadTransactionIterator.prototype.next = function () {
		var nextValue = this.payloadIterator.next();
		var stage = nextValue.getValueA();
		var query = nextValue.getValueB();
		var payload = nextValue.getValueC();
		var failure = false;
		var newQuery = null;
		
		try {
			if (stage.equals("replace")) {
				newQuery = Query.create(query.getName(), payload);
			} else
			if (stage.equals("back")) {
				newQuery = Query.create(query.getName(), query.getValue() + payload);
			} else
			if (stage.equals("front")) {
				newQuery = Query.create(query.getName(), payload + query.getValue());
			} else
			if (stage.equals("pollution")) {
				newQuery = Query.create("{TODO}", "{TODO}");
			} else {
				LogUtils.recordError("reached impossible stage " + stage);
				
				failure = true;
			}
		} catch (e) {
			LogUtils.recordException("cannot create new query", e);
			
			failure = true;
		}
		
		if (failure) {
			if (this.payloadIterator.hasNext()) {
				return this.next();
			} else {
				LogUtils.recordError("cannot recover from massive failure when creating new query");
				
				
				return null;
			}
		} else {
			var newQueries;
			
			try {
				newQueries = QueriesFactory.create(this.queries).replaceQuery(newQuery).build();
			} catch (e) {
				LogUtils.recordException("cannot create new queries", e);
				
				if (this.payloadIterator.hasNext()) {
					return this.next();
				} else {
					LogUtils.recordError("cannot recover from massive failure when creating new queries");
					
					
					return null;
				}
			}
			
			var newUrl;
			
			try {
				newUrl = UrlFactory.create(this.request.getUrl()).setQueries(newQueries).build();
			} catch (e) {
				LogUtils.recordException("cannot create new url", e);
				
				if (this.payloadIterator.hasNext()) {
					return this.next();
				} else {
					LogUtils.recordError("cannot recover from massive failure when creating new url");
					
					
					return null;
				}
			}
			
			var newRequest;
			
			try {
				newRequest = RequestFactory.create(this.request).setUrl(newUrl).build();
			} catch (e) {
				LogUtils.recordException("cannot create new request", e);
				
				if (this.payloadIterator.hasNext()) {
					return this.next();
				} else {
					LogUtils.recordError("cannot recover from massive failure when creating new request");
					
					
					return null;
				}
			}
			
			var newTransaction = new Transaction(TransactionKind.FUZZ, newRequest);
			
			newTransaction.setBaseResponse(this.transaction.getBaseResponse());
			newTransaction.setSpecialPayload(payload);
			newTransaction.setSpecialQuery(newQuery);
			
			return newTransaction;
		}
	}
	
	SimpleQueryPayloadTransactionIterator.prototype.remove = function () {
		this.payloadIterator.remove();
	}
	
	/* -------------------------------------------------------------------- */
	
	function SimplePathPayloadTransactionIterator(transaction, payloads, useBack, useFront, usePollution) {
		this.transaction = transaction;
		this.request = transaction.getRequest();
		
		var stages = new ListContainer();
		
		stages.add("replace");
		
		if (useBack) {
			stages.add("back");
		}
		
		if (useFront) {
			stages.add("front");
		}
		
		if (usePollution) {
			stages.add("pollution");
		}
		
		this.payloadIterator = new MixTrippleIterator(stages.iterator(), new ListContainer(this.request.getUrl().getPath().getLeaf()), payloads);
	}
	
	/* -------------------------------------------------------------------- */
	
	SimplePathPayloadTransactionIterator.prototype.hasNext = function () {
		return this.payloadIterator.hasNext();
	}
	
	SimplePathPayloadTransactionIterator.prototype.next = function () {
		var nextValue = this.payloadIterator.next();
		var stage = nextValue.getValueA();
		var leaf = nextValue.getValueB();
		var payload = nextValue.getValueC();
		var failure = false;
		var newLeaf = null;
		
		try {
			if (stage.equals("replace")) {
				newLeaf = Leaf.create(payload);
			} else
			if (stage.equals("back")) {
				newLeaf = Leaf.create(leaf.getValue() + payload);
			} else
			if (stage.equals("front")) {
				newLeaf = Leaf.create(payload + leaf.getValue());
			} else
			if (stage.equals("pollution")) {
				newLeaf = Leaf.create("{TODO}");
			} else {
				LogUtils.recordError("reached impossible stage " + stage);
				
				failure = true;
			}
		} catch (e) {
			LogUtils.recordException("cannot create new leaf", e);
			
			failure = true;
		}
		
		if (failure) {
			if (this.payloadIterator.hasNext()) {
				return this.next();
			} else {
				LogUtils.recordError("cannot recover from massive failure when creating new leaf");
				
				
				return null;
			}
		} else {
			var newPath;
			
			try {
				newPath = PathFactory.create(this.request.getUrl().getPath()).setLeaf(newLeaf).build();
			} catch (e) {
				LogUtils.recordException("cannot create new path", e);
				
				if (this.payloadIterator.hasNext()) {
					return this.next();
				} else {
					LogUtils.recordError("cannot recover from massive failure when creating new path");
					
					
					return null;
				}
			}
			
			var newUrl;
			
			try {
				newUrl = UrlFactory.create(this.request.getUrl()).setPath(newPath).build();
			} catch (e) {
				LogUtils.recordException("cannot create new url", e);
				
				if (this.payloadIterator.hasNext()) {
					return this.next();
				} else {
					LogUtils.recordError("cannot recover from massive failure when creating new url");
					
					
					return null;
				}
			}
			
			var newRequest;
			
			try {
				newRequest = RequestFactory.create(this.request).setUrl(newUrl).build();
			} catch (e) {
				LogUtils.recordException("cannot create new request", e);
				
				if (this.payloadIterator.hasNext()) {
					return this.next();
				} else {
					LogUtils.recordError("cannot recover from massive failure when creating new request");
					
					
					return null;
				}
			}
			
			var newTransaction = new Transaction(TransactionKind.FUZZ, newRequest);
			
			newTransaction.setBaseResponse(this.transaction.getBaseResponse());
			newTransaction.setSpecialPayload(payload);
			newTransaction.setSpecialPath(newPath);
			
			return newTransaction;
		}
	}
	
	SimplePathPayloadTransactionIterator.prototype.remove = function () {
		this.payloadIterator.remove();
	}
	
	/* -------------------------------------------------------------------- */
	
	function SimpleNullPayloadTransactionIterator() {
	}
	
	/* -------------------------------------------------------------------- */
	
	SimpleNullPayloadTransactionIterator.prototype.hasNext = function () {
		return false;
	}
	
	SimpleNullPayloadTransactionIterator.prototype.next = function () {
		throw new Error("no such element");
	}
	
	SimpleNullPayloadTransactionIterator.prototype.remove = function () {
		throw new Error("cannot remove element");
	}
	
	/* -------------------------------------------------------------------- */
	
	function SimpleHeaderPayloadTransactionIterator(transaction, payloads, useBack, useFront, usePollution) {
		this.transaction = transaction;
		this.request = this.transaction.getRequest();
		this.headers = this.request.getHeaders();
		
		var stages = new ListContainer();
		
		stages.add("replace");
		
		if (useBack) {
			stages.add("back");
		}
		
		if (useFront) {
			stages.add("front");
		}
		
		if (usePollution) {
			stages.add("pollution");
		}
		
		this.payloadIterator = new MixTrippleIterator(stages.iterator(), new CommonHeaderFilter(this.headers), payloads);
	}
	
	/* -------------------------------------------------------------------- */
	
	SimpleHeaderPayloadTransactionIterator.prototype.hasNext = function () {
		return this.payloadIterator.hasNext();
	}
	
	SimpleHeaderPayloadTransactionIterator.prototype.next = function () {
		var nextValue = this.payloadIterator.next();
		var stage = nextValue.getValueA();
		var header = nextValue.getValueB();
		var payload = nextValue.getValueC();
		var failure = false;
		var newHeader = null;
		
		try {
			if (stage.equals("replace")) {
				newHeader = Header.create(header.getName(), payload);
			} else
			if (stage.equals("back")) {
				newHeader = Header.create(header.getName(), header.getValue() + payload);
			} else
			if (stage.equals("front")) {
				newHeader = Header.create(header.getName(), payload + header.getValue());
			} else
			if (stage.equals("pollution")) {
				newHeader = Header.create("{TODO}", "{TODO}");
			} else {
				LogUtils.recordError("reached impossible stage " + stage);
				
				failure = true;
			}
		} catch (e) {
			LogUtils.recordException("cannot create new header", e);
			
			failure = true;
		}
		
		if (failure) {
			if (this.payloadIterator.hasNext()) {
				return this.next();
			} else {
				LogUtils.recordError("cannot recover from massive failure when creating new header");
				
				
				return null;
			}
		} else {
			var newHeaders;
			
			try {
				newHeaders = HeadersFactory.create(this.headers).replaceHeader(newHeader).build();
			} catch (e) {
				LogUtils.recordException("cannot create new headers", e);
				
				if (this.payloadIterator.hasNext()) {
					return this.next();
				} else {
					LogUtils.recordError("cannot recover from massive failure when creating new headers");
					
					
					return null;
				}
			}
			
			var newRequest;
			
			try {
				newRequest = RequestFactory.create(this.request).setHeaders(newHeaders).build();
			} catch (e) {
				LogUtils.recordException("cannot create new request", e);
				
				if (this.payloadIterator.hasNext()) {
					return this.next();
				} else {
					LogUtils.recordError("cannot recover from massive failure when creating new request");
					
					
					return null;
				}
			}
			
			var newTransaction = new Transaction(TransactionKind.FUZZ, newRequest);
			
			newTransaction.setBaseResponse(this.transaction.getBaseResponse());
			newTransaction.setSpecialPayload(payload);
			newTransaction.setSpecialHeader(newHeader);
			
			return newTransaction;
		}
	}
	
	SimpleHeaderPayloadTransactionIterator.prototype.remove = function () {
		this.payloadIterator.remove();
	}
	
	/* -------------------------------------------------------------------- */
	
	function SimpleFieldDataPayloadTransactionIterator(transaction, payloads, useBack, useFront, usePollution) {
		this.transaction = transaction;
		this.request = this.transaction.getRequest();
		this.data = this.request.getData();
		
		var stages = new ListContainer();
		
		stages.add("replace");
		
		if (useBack) {
			stages.add("back");
		}
		
		if (useFront) {
			stages.add("front");
		}
		
		if (usePollution) {
			stages.add("pollution");
		}
		
		this.payloadIterator = new MixTrippleIterator(stages.iterator(), new CommonQueryFilter(this.data), payloads);
	}
	
	/* -------------------------------------------------------------------- */
	
	SimpleFieldDataPayloadTransactionIterator.prototype.hasNext = function () {
		return this.payloadIterator.hasNext();
	}
	
	SimpleFieldDataPayloadTransactionIterator.prototype.next = function () {
		var nextValue = this.payloadIterator.next();
		var stage = nextValue.getValueA();
		var query = nextValue.getValueB();
		var payload = nextValue.getValueC();
		var failure = false;
		var newQuery = null;
		
		try {
			if (stage.equals("replace")) {
				newQuery = Query.create(query.getName(), payload);
			} else
			if (stage.equals("back")) {
				newQuery = Query.create(query.getName(), query.getValue() + payload);
			} else
			if (stage.equals("front")) {
				newQuery = Query.create(query.getName(), payload + query.getValue());
			} else
			if (stage.equals("pollution")) {
				newQuery = Query.create("{TODO}", "{TODO}");
			} else {
				LogUtils.recordError("reached impossible stage " + stage);
				
				failure = true;
			}
		} catch (e) {
			LogUtils.recordException("cannot create new query", e);
			
			failure = true;
		}
		
		if (failure) {
			if (this.payloadIterator.hasNext()) {
				return this.next();
			} else {
				LogUtils.recordError("cannot recover from massive failure when creating new query");
				
				
				return null;
			}
		} else {
			var newFieldData;
			
			try {
				newFieldData = FieldDataFactory.create(this.data).replaceQuery(newQuery).build();
			} catch (e) {
				LogUtils.recordException("cannot create new queries", e);
				
				if (this.payloadIterator.hasNext()) {
					return this.next();
				} else {
					LogUtils.recordError("cannot recover from massive failure when creating new field data");
					
					
					return null;
				}
			}
			
			var newRequest;
			
			try {
				newRequest = RequestFactory.create(this.request).setData(newFieldData).build();
			} catch (e) {
				LogUtils.recordException("cannot create new request", e);
				
				if (this.payloadIterator.hasNext()) {
					return this.next();
				} else {
					LogUtils.recordError("cannot recover from massive failure when creating new request");
					
					
					return null;
				}
			}
			
			var newTransaction = new Transaction(TransactionKind.FUZZ, newRequest);
			
			newTransaction.setBaseResponse(this.transaction.getBaseResponse());
			newTransaction.setSpecialPayload(payload);
			newTransaction.setSpecialQuery(newQuery);
			
			return newTransaction;
		}
	}
	
	SimpleFieldDataPayloadTransactionIterator.prototype.remove = function () {
		this.payloadIterator.remove();
	}
	
	/* -------------------------------------------------------------------- */
	
	function SimpleDataPayloadTransactionIterator(transaction, payloads, useBack, useFront, usePollution) {
		var request = transaction.getRequest();
		var data = request.getData();
		
		if (data instanceof FieldData) {
			this.iterator = new SimpleFieldDataPayloadTransactionIterator(transaction, payloads, useBack, useFront, usePollution);
		} else { // TODO: handle FileData
			this.iterator = new SimpleNullPayloadTransactionIterator();
		}
	}
	
	/* -------------------------------------------------------------------- */
	
	SimpleDataPayloadTransactionIterator.prototype.hasNext = function () {
		return this.iterator.hasNext();
	}
	
	SimpleDataPayloadTransactionIterator.prototype.next = function () {
		return this.iterator.next();
	}
	
	SimpleDataPayloadTransactionIterator.prototype.remove = function () {
		this.iterator.remove();
	}
	
	/* -------------------------------------------------------------------- */
	
	function OptimizedCompoundSimplePayloadTransactionIterator(transaction, payloads, useBack, useFront, usePollution) {
		var iterators = new ListContainer();
		
		iterators.add(new SimpleQueryPayloadTransactionIterator(transaction, payloads, useBack, useFront, usePollution));
		iterators.add(new SimpleDataPayloadTransactionIterator(transaction, payloads, useBack, useFront, usePollution));
		iterators.add(new SimpleHeaderPayloadTransactionIterator(transaction, payloads, useBack, useFront, usePollution));
		
		this.iterator = new CompoundIterator(iterators);
	}
	
	/* -------------------------------------------------------------------- */
	
	OptimizedCompoundSimplePayloadTransactionIterator.prototype.hasNext = function () {
		return this.iterator.hasNext();
	}
	
	OptimizedCompoundSimplePayloadTransactionIterator.prototype.next = function () {
		return this.iterator.next();
	}
	
	OptimizedCompoundSimplePayloadTransactionIterator.prototype.remove = function () {
		this.iterator.remove();
	}
	
	/* -------------------------------------------------------------------- */
	
	function OptimizedCompoundComplexPayloadTransactionIterator(transaction, genericPayloads, queryPayloads, pathPayloads, headerPayloads, useBack, useFront, usePollution) {
		var iterators = new ListContainer();
		
		iterators.add(new SimpleQueryPayloadTransactionIterator(transaction, genericPayloads, useBack, useFront, usePollution));
		iterators.add(new SimpleDataPayloadTransactionIterator(transaction, genericPayloads, useBack, useFront, usePollution));
		iterators.add(new SimpleHeaderPayloadTransactionIterator(transaction, genericPayloads, useBack, useFront, usePollution));
		iterators.add(new SimpleQueryPayloadTransactionIterator(transaction, queryPayloads, useBack, useFront, usePollution));
		iterators.add(new SimpleDataPayloadTransactionIterator(transaction, queryPayloads, useBack, useFront, usePollution));
		iterators.add(new SimpleHeaderPayloadTransactionIterator(transaction, headerPayloads, useBack, useFront, usePollution));
		
		this.iterator = new CompoundIterator(iterators);
	}
	
	/* -------------------------------------------------------------------- */
	
	OptimizedCompoundComplexPayloadTransactionIterator.prototype.hasNext = function () {
		return this.iterator.hasNext();
	}
	
	OptimizedCompoundComplexPayloadTransactionIterator.prototype.next = function () {
		return this.iterator.next();
	}
	
	OptimizedCompoundComplexPayloadTransactionIterator.prototype.remove = function () {
		this.iterator.remove();
	}
	
	/* -------------------------------------------------------------------- */
	
	function CompoundSimplePayloadTransactionIterator(transaction, payloads, useBack, useFront, usePollution) {
		var iterators = new ListContainer();
		
		iterators.add(new SimpleQueryPayloadTransactionIterator(transaction, payloads, useBack, useFront, usePollution));
		iterators.add(new SimpleDataPayloadTransactionIterator(transaction, payloads, useBack, useFront, usePollution));
		iterators.add(new SimplePathPayloadTransactionIterator(transaction, payloads, useBack, useFront, usePollution));
		iterators.add(new SimpleHeaderPayloadTransactionIterator(transaction, payloads, useBack, useFront, usePollution));
		
		this.iterator = new CompoundIterator(iterators);
	}
	
	/* -------------------------------------------------------------------- */
	
	CompoundSimplePayloadTransactionIterator.prototype.hasNext = function () {
		return this.iterator.hasNext();
	}
	
	CompoundSimplePayloadTransactionIterator.prototype.next = function () {
		return this.iterator.next();
	}
	
	CompoundSimplePayloadTransactionIterator.prototype.remove = function () {
		this.iterator.remove();
	}
	
	/* -------------------------------------------------------------------- */
	
	function CompoundComplexPayloadTransactionIterator(transaction, genericPayloads, queryPayloads, pathPayloads, headerPayloads, useBack, useFront, usePollution) {
		var iterators = new ListContainer();
		
		iterators.add(new SimpleQueryPayloadTransactionIterator(transaction, genericPayloads, useBack, useFront, usePollution));
		iterators.add(new SimpleDataPayloadTransactionIterator(transaction, genericPayloads, useBack, useFront, usePollution));
		iterators.add(new SimplePathPayloadTransactionIterator(transaction, genericPayloads, useBack, useFront, usePollution));
		iterators.add(new SimpleHeaderPayloadTransactionIterator(transaction, genericPayloads, useBack, useFront, usePollution));
		iterators.add(new SimpleQueryPayloadTransactionIterator(transaction, queryPayloads, useBack, useFront, usePollution));
		iterators.add(new SimpleDataPayloadTransactionIterator(transaction, queryPayloads, useBack, useFront, usePollution));
		iterators.add(new SimplePathPayloadTransactionIterator(transaction, pathPayloads, useBack, useFront, usePollution));
		iterators.add(new SimpleHeaderPayloadTransactionIterator(transaction, headerPayloads, useBack, useFront, usePollution));
		
		this.iterator = new CompoundIterator(iterators);
	}
	
	/* -------------------------------------------------------------------- */
	
	CompoundComplexPayloadTransactionIterator.prototype.hasNext = function () {
		return this.iterator.hasNext();
	}
	
	CompoundComplexPayloadTransactionIterator.prototype.next = function () {
		return this.iterator.next();
	}
	
	CompoundComplexPayloadTransactionIterator.prototype.remove = function () {
		this.iterator.remove();
	}
	
	/* -------------------------------------------------------------------- */
	
	function CommonQueryFilterIterator(iterator) {
		this.iterator = iterator;
		this.empty = false;
		this.nextQuery = null;
		this.nextException = null;
		
		this.prepareNext();
	}
	
	/* -------------------------------------------------------------------- */
	
	CommonQueryFilterIterator.prototype.hasNext = function () {
		return !this.empty;
	}
	
	CommonQueryFilterIterator.prototype.next = function () {
		if (this.nextException != null) {
			throw this.nextException;
		}
		
		var thisQuery = this.nextQuery;
		
		this.prepareNext();
		
		return thisQuery;
	}
	
	CommonQueryFilterIterator.prototype.remove = function () {
		throw new Error("cannot remove element");
	}
	
	/* -------------------------------------------------------------------- */
	
	CommonQueryFilterIterator.prototype.prepareNext = function () {
		this.empty = !this.iterator.hasNext();
		
		if (this.empty) {
			this.nextException = new Error("no such element");
			this.nextQuery = null;
		} else {
			this.nextException = null;
			this.nextQuery = this.iterator.next();
			
			if (this.nextQuery.matchesName("__VIEWSTATE") || this.nextQuery.matchesName("__EVENTVALIDATION")) {
				this.prepareNext();
			}
		}
	}
	
	/* -------------------------------------------------------------------- */
	
	function CommonQueryFilter(iterable) {
		this.iterable = iterable;
	}
	
	/* -------------------------------------------------------------------- */
	
	CommonQueryFilter.prototype.iterator = function () {
		return new CommonQueryFilterIterator(this.iterable.iterator());
	}
	
	/* -------------------------------------------------------------------- */
	
	function CommonHeaderFilterIterator(iterator) {
		this.iterator = iterator;
		this.empty = false;
		this.nextHeader = null;
		this.nextException = null;
		
		this.prepareNext();
	}
	
	/* -------------------------------------------------------------------- */
	
	CommonHeaderFilterIterator.prototype.hasNext = function () {
		return !this.empty;
	}
	
	CommonHeaderFilterIterator.prototype.next = function () {
		if (this.nextException != null) {
			throw this.nextException;
		}
		
		var thisHeader = this.nextHeader;
		
		this.prepareNext();
		
		return thisHeader;
	}
	
	CommonHeaderFilterIterator.prototype.remove = function () {
		throw new Error("cannot remove element");
	}
	
	/* -------------------------------------------------------------------- */
	
	CommonHeaderFilterIterator.prototype.prepareNext = function () {
		this.empty = !this.iterator.hasNext();
		
		if (this.empty) {
			this.nextException = new Error("no such element");
			this.nextHeader = null;
		} else {
			this.nextException = null;
			this.nextHeader = this.iterator.next();
			
			if (this.nextHeader.matchesName("Host") || this.nextHeader.matchesName("Content-Type") || this.nextHeader.matchesName("Content-Length")) {
				this.prepareNext();
			}
		}
	}
	
	/* -------------------------------------------------------------------- */
	
	function CommonHeaderFilter(iterable) {
		this.iterable = iterable;
	}
	
	/* -------------------------------------------------------------------- */
	
	CommonHeaderFilter.prototype.iterator = function () {
		return new CommonHeaderFilterIterator(this.iterable.iterator());
	}
	
	/* -------------------------------------------------------------------- */
	
	function BasicEngine(workspace, scheduler, reporter, progressor) {
		this.workspace = workspace;
		this.scheduler = scheduler;
		this.reporter = reporter;
		this.progressor = progressor;
		this.crawler = new Crawler(this.workspace, 50, true);
		this.scope = Scope.createBasicScope();
		this.tracker = new Tracker(this.workspace, this.scope, this.scheduler, this.crawler, 50, true);
		this.identifier = StringUtils.generateRandomString("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", 5);
		this.fuzzer = new Fuzzer(this.workspace, this.scheduler, this.identifier, false, false, false);
		this.fuzzerCrawler = new Crawler(this.workspace, 50, true);
		this.analyzer = new Analyzer(this.workspace);
		
		this.tracker.registerObserver(this);
		this.fuzzer.registerObserver(this);
		this.fuzzerCrawler.registerObserver(this);
		this.analyzer.registerObserver(this);
	}
	
	/* -------------------------------------------------------------------- */
	
	BasicEngine.prototype.handleTrackedTransaction = function (transaction) {
		this.fuzzer.fuzzTransaction(transaction);
		this.analyzer.analyzeTransaction(transaction);
	}
	
	/* -------------------------------------------------------------------- */
	
	BasicEngine.prototype.handleFuzzedTransaction = function (transaction) {
		this.analyzer.analyzeTransaction(transaction);
		this.fuzzerCrawler.crawlTransaction(transaction);
	}
	
	BasicEngine.prototype.handleFuzzedIssue = function (issue) {
		this.reporter.reportIssue(issue);
	}
	
	/* -------------------------------------------------------------------- */
	
	BasicEngine.prototype.handleTransactionCrawledRequest = function (transaction, request) {
		var transactionRequest = transaction.getRequest();
		
		if (transactionRequest.make().indexOf(this.identifier) > 0) {
			this.tracker.trackRequest(transactionRequest);
		}
	}
	
	/* -------------------------------------------------------------------- */
	
	BasicEngine.prototype.handleAnalyzedIssue = function (issue) {
		this.reporter.reportIssue(issue);
	}
	
	/* -------------------------------------------------------------------- */
	
	BasicEngine.prototype.getWorkspace = function () {
		return this.workspace;
	}
	
	BasicEngine.prototype.getScheduler = function () {
		return this.scheduler;
	}
	
	BasicEngine.prototype.getReporter = function () {
		return this.reporter;
	}
	
	BasicEngine.prototype.getProgressor = function () {
		return this.progressor;
	}
	
	BasicEngine.prototype.getCrawler = function () {
		return this.crawler;
	}
	
	BasicEngine.prototype.getScope = function () {
		return this.scope;
	}
	
	BasicEngine.prototype.getTracker = function () {
		return this.tracker;
	}
	
	BasicEngine.prototype.getFuzzer = function () {
		return this.fuzzer;
	}
	
	BasicEngine.prototype.getAnalyzer = function () {
		return this.analyzer;
	}
	
	/* -------------------------------------------------------------------- */
	
	BasicEngine.prototype.includeBaseUrl = function (url) {
		this.scope.includeUrl(url);
		
		var basePath = PathFactory.create(url.getPath()).resetLeaf().build();
		var baseUrl = UrlFactory.create(url).setPath(basePath).build();
		
		this.scope.includeUrl(baseUrl);
	}
	
	/* -------------------------------------------------------------------- */
	
	BasicEngine.prototype.launchUrl = function (url) {
		this.includeBaseUrl(url);
		this.tracker.trackRequest(Request.create(Method.GET, url, Version.HTTP11, Headers.BLANK, SourceData.BLANK));
	}
	
	BasicEngine.prototype.launchRequest = function (request) {
		this.includeBaseUrl(request.getUrl());
		this.tracker.trackRequest(request);
	}
	
	/* -------------------------------------------------------------------- */
	
	BasicEngine.prototype.analyzeTransaction = function (transaction) {
		this.analyzer.analyzeTransaction(transaction);
	}
	
	/* -------------------------------------------------------------------- */
	
	BasicEngine.prototype.pause = function () {
		this.scheduler.pause();
	}
	
	BasicEngine.prototype.resume = function () {
		this.scheduler.resume();
	}
	
	/* -------------------------------------------------------------------- */
	
	function AnalyticalEngine(workspace, reporter) {
		this.reporter = reporter;
		this.analyzer = new Analyzer(workspace);
		
		this.analyzer.registerObserver(this);
	}
	
	/* -------------------------------------------------------------------- */
	
	AnalyticalEngine.prototype.handleAnalyzedIssue = function (issue) {
		this.reporter.reportIssue(issue);
	}
	
	/* -------------------------------------------------------------------- */
	
	AnalyticalEngine.prototype.analyzeTransactions = function (transaction) {
		this.analyzer.analyzeTransaction(transaction);
	}
	
	/* -------------------------------------------------------------------- */
	
	function UploadFormAnalyzer() {
	}
	
	/* -------------------------------------------------------------------- */
	
	UploadFormAnalyzer.prototype.serializeForm = function (form) {
		return "<form method=\"" + HtmlUtils.escapeHtmlComponent(form.getMethod().make()) + "\" action=\"" + HtmlUtils.escapeHtmlComponent(form.getAction().make()) + "\" enctype=\"" + HtmlUtils.escapeHtmlComponent(form.getEnctype().make()) + "\" autocomplete=\"" + (form.isAutocomplete() ? "on" : "off") + "\">";
	}
	
	/* -------------------------------------------------------------------- */
	
	UploadFormAnalyzer.prototype.analyzer = function (transaction, analyzerHandler) {
		var page = transaction.getSimpleContent();
		
		if (page == null) {
			return;
		}
		
		for (var simpleFormIterator = page.getForms().iterator(), simpleForm = null; simpleFormIterator.hasNext();) {
			simpleForm = simpleFormIterator.next();
			if (simpleForm.getFiles().iterator().hasNext()) {
				var form = simpleForm.getForm();
				var formSignature = this.serializeForm(form);
				
				var issueSignature;
				
				try {
					issueSignature = UrlFactory.create(form.getAction()).resetQueries().resetFragment().build().make();
				} catch (e) {
					analyzerHandler.handleException("cannot create issue signature for FILEUPLOAD from url", e);
					
					continue;
				}
				
				var issue = Issue.createWithIndicatedSignature(IssueType.FILEUPLOAD, transaction, issueSignature);
				
				issue.setForm(formSignature);
				
				analyzerHandler.handleIssue(issue);
			}
		}
	}
	
	/* -------------------------------------------------------------------- */
	
	function SqlSignatureDetector() {
		this.signatures = new EnclosedRegularExpression();
		
		this.signatures.add(new RegularExpression("System\\.Data\\.OleDb\\.OleDbException", ""), "MSSQL");
		this.signatures.add(new RegularExpression("\\[SQL Server\\]", ""), "MSSQL");
		this.signatures.add(new RegularExpression("\\[Microsoft\\]\\[ODBC SQL Server Driver\\]", ""), "MSSQL");
		this.signatures.add(new RegularExpression("\\[SQLServer JDBC Driver\\]", ""), "MSSQL");
		this.signatures.add(new RegularExpression("\\[SqlException", ""), "MSSQL");
		this.signatures.add(new RegularExpression("System.Data.SqlClient.SqlException", ""), "MSSQL");
		this.signatures.add(new RegularExpression("Unclosed quotation mark after the character string", ""), "MSSQL");
		this.signatures.add(new RegularExpression("'80040e14'", ""), "MSSQL");
		this.signatures.add(new RegularExpression("mssql_query\\(\\)", ""), "MSSQL");
		this.signatures.add(new RegularExpression("odbc_exec\\(\\)", ""), "MSSQL");
		this.signatures.add(new RegularExpression("Microsoft OLE DB Provider for ODBC Drivers", ""), "MSSQL");
		this.signatures.add(new RegularExpression("Microsoft OLE DB Provider for SQL Server", ""), "MSSQL");
		this.signatures.add(new RegularExpression("Incorrect syntax near", ""), "MSSQL");
		this.signatures.add(new RegularExpression("Syntax error in string in query expression", ""), "MSSQL");
		this.signatures.add(new RegularExpression("ADODB\\.Field \\(0x800A0BCD\\)", ""), "MSSQL");
		this.signatures.add(new RegularExpression("Procedure '[^']+' requires parameter '[^']+'", ""), "MSSQL");
		this.signatures.add(new RegularExpression("ADODB\\.Recordset'", ""), "MSSQL");
		this.signatures.add(new RegularExpression("supplied argument is not a valid MySQL", ""), "MySQL");
		this.signatures.add(new RegularExpression("mysql_fetch_array\\(\\)", ""), "MySQL");
		this.signatures.add(new RegularExpression("on MySQL result index", ""), "MySQL");
		this.signatures.add(new RegularExpression("You have an error in your SQL syntax;", ""), "MySQL");
		this.signatures.add(new RegularExpression("You have an error in your SQL syntax near", ""), "MySQL");
		this.signatures.add(new RegularExpression("MySQL server version for the right syntax to use", ""), "MySQL");
		this.signatures.add(new RegularExpression("\\[MySQL\\]\\[ODBC", ""), "MySQL");
		this.signatures.add(new RegularExpression("Column count doesn't match", ""), "MySQL");
		this.signatures.add(new RegularExpression("the used select statements have different number of columns", ""), "MySQL");
		this.signatures.add(new RegularExpression("Table '[^']+' doesn't exist", ""), "MySQL");
		this.signatures.add(new RegularExpression("DB Error: unknown error", ""), "MySQL");
		this.signatures.add(new RegularExpression("(PLS|ORA)-[0-9][0-9][0-9][0-9]", ""), "ORACLE");
		this.signatures.add(new RegularExpression("PostgreSQL query failed:", ""), "PostgreSQL");
		this.signatures.add(new RegularExpression("supplied argument is not a valid PostgreSQL result", ""), "PostgreSQL");
		this.signatures.add(new RegularExpression("pg_query\\(\\) \\[:", ""), "PostgreSQL");
		this.signatures.add(new RegularExpression("pg_exec\\(\\) \\[:", ""), "PostgreSQL");
		this.signatures.add(new RegularExpression("java\\.sql\\.SQLException", ""), "Java");
		this.signatures.add(new RegularExpression("\\[Macromedia\\]\\[SQLServer JDBC Driver\\]", ""), "Coldfusion");
		this.signatures.add(new RegularExpression("Sybase message:", ""), "Sybase");
		this.signatures.add(new RegularExpression("com\\.informix\\.jdbc", ""), "Informix");
		this.signatures.add(new RegularExpression("Dynamic Page Generation Error:", ""), "Informix");
		this.signatures.add(new RegularExpression("Warning</b>:  ibase_", ""), "Informix");
		this.signatures.add(new RegularExpression("Dynamic SQL Error", ""), "Informix");
		this.signatures.add(new RegularExpression("Syntax error in query expression", ""), "Access");
		this.signatures.add(new RegularExpression("Data type mismatch in criteria expression.", ""), "Access");
		this.signatures.add(new RegularExpression("Microsoft JET Database Engine", ""), "Access");
		this.signatures.add(new RegularExpression("\\[Microsoft\\]\\[ODBC Microsoft Access Driver\\]", ""), "Access");
		this.signatures.add(new RegularExpression("SQLCODE", ""), "DB2");
		this.signatures.add(new RegularExpression("DB2 SQL error:", ""), "DB2");
		this.signatures.add(new RegularExpression("SQLSTATE", ""), "DB2");
		this.signatures.add(new RegularExpression("\\[DM_QUERY_E_SYNTAX\\]", ""), "DML");
		this.signatures.add(new RegularExpression("has occurred in the vicinity of:", ""), "DML");
		this.signatures.add(new RegularExpression("A Parser Error \\(syntax error\\)", ""), "DML");
	}
	
	/* -------------------------------------------------------------------- */
	
	SqlSignatureDetector.prototype.detect = function (input) {
		return this.signatures.test(input);
	}
	
	/* -------------------------------------------------------------------- */
	
	function SqlErrorDisclosureAnalyzer() {
		this.sqlSignatureDetector = new SqlSignatureDetector();
	}
	
	/* -------------------------------------------------------------------- */
	
	SqlErrorDisclosureAnalyzer.prototype.analyze = function (transaction, analyzerHandler) {
		if (transaction.getKind() != TransactionKind.FUZZ) {
			var data = transaction.getResponse().getData().make();
			var database = this.sqlSignatureDetector.detect(data);
			
			if (database != null) {
				var signature;
				
				try {
					signature = UrlFactory.create(transaction.getRequest().getUrl()).resetQueries().resetFragment().build().make();
				} catch (e) {
					analyzerHandler.handleException("cannot create signature from url", e);
					
					return;
				}
				
				if (transaction.getSpecialPath() != null) {
					signature += transaction.getSpecialPath().getBase().make();
				} else
				if (transaction.getSpecialQuery() != null) {
					signature += transaction.getSpecialQuery().getName();
				} else
				if (transaction.getSpecialHeader() != null) {
					signature += transaction.getSpecialHeader().getName();
				}
				
				var issue = Issue.createWithIndicatedSignature(IssueType.SQLERROR, transaction, signature);
				
				issue.setDatabase(database);
				
				analyzerHandler.handleIssue(issue);
			}
		}
	}
	
	/* -------------------------------------------------------------------- */
	
	function SourceLeakAnalyzer() {
	}
	
	/* -------------------------------------------------------------------- */
	
	SourceLeakAnalyzer.prototype.analyze = function (transaction, analyzerHandler) {
		var response = transaction.getResponse();
		
		if (response == null) {
			return;
		}
		
		for (var matchIterator = SourceLeakAnalyzer.sourceLeakRegularExpression.find(response.getData().make()).iterator(), match = null; matchIterator.hasNext();) {
			match = matchIterator.next();
			var source = match.match();
			var issue = Issue.createWithIndicatedSignature(IssueType.SOURCELEAK, transaction, source);
			
			issue.setSource(source);
			
			analyzerHandler.handleIssue(issue);
		}
	}
	
	/* -------------------------------------------------------------------- */
	
	SourceLeakAnalyzer.sourceLeakRegularExpression = new RegularExpression("(<%=\\s*[\\w.]+\\s*%>)", "g");
	
	/* -------------------------------------------------------------------- */
	
	function SoapUrlAnalyzer() {
	}
	
	/* -------------------------------------------------------------------- */
	
	SoapUrlAnalyzer.prototype.analyze = function (transaction, analyzerHandler) {
		if (transaction.getResponseMimeType() != MimeType.HTML) {
			return;
		}
		
		var request = transaction.getRequest();
		var url = request.getUrl();
		
		if (url.getPath().getLeaf().make().endsWith(".asmx")) {
			var data = transaction.getResponse().getData().make();
			
			if (data.indexOf("?WSDL\">Service Description</a>") > 0) {
				var newUrl;
				
				try {
					newUrl = UrlFactory.create(url).resetQueries().resetFragment().build();
				} catch (e) {
					analyzerHandler.handleException("cannot create url", e);
					
					return;
				}
				
				var urlString = newUrl.make();
				var issue = Issue.createWithIndicatedSignature(IssueType.SOAP, transaction, urlString);
				
				issue.setUrl(urlString);
				
				analyzerHandler.handleIssue(issue);
			}
		}
	}
	
	/* -------------------------------------------------------------------- */
	
	function SecureCookieAnalyzer() {
	}
	
	/* -------------------------------------------------------------------- */
	
	SecureCookieAnalyzer.prototype.analyze = function (transaction, analyzerHandler) {
		var response = transaction.getResponse();
		
		if (response == null || !transaction.getRequest().getUrl().getScheme().isHttps()) {
			return;
		}
		
		var headers = response.getHeaders();
		
		for (var headerIterator = headers.getHeaderValuesByName("Set-Cookie").iterator(), header = null; headerIterator.hasNext();) {
			header = headerIterator.next();
			var smallHeader = header.toLowerCase();
			
			if (smallHeader.indexOf("session") > 0 && smallHeader.indexOf("secure") < 0) {
				var completeHeader = "Set-Cookie: " + header;
				var signature = transaction.getRequest().getUrl().getAddress().make() + '|' + SecureCookieAnalyzer.cookieValueRegularExpression.replace(header, "");
				var issue = Issue.createWithIndicatedSignature(IssueType.SECURESESSIONCOOKIE, transaction, signature);
				
				issue.setHeader(completeHeader);
				
				analyzerHandler.handleIssue(issue);
			}
		}
	}
	
	/* -------------------------------------------------------------------- */
	
	SecureCookieAnalyzer.cookieValueRegularExpression = new RegularExpression("=(.*?);", "");
	
	/* -------------------------------------------------------------------- */
	
	function PathDisclosureAnalyzer() {
		this.unixPathRegularExpression = new RegularExpression("(\\/+(?:bin|etc|home|sbin|tmp|usr|var|vol|srv|mnt|opt|root|htdocs|sys)(?:\\/+[\\w\\s.-]{3,})+)", "gi");
		this.windowsPathRegularExpression = new RegularExpression("([c-e]:(?:\\\\+[\\w\\s.-]{3,})+)", "gi");
		this.filePathRegularExpression = new RegularExpression("(file:\\/\\/(?:(?:\\\\|\\/|)+[\\w\\s.-:%]{2,})+)", "gi");
		this.twoSpaceChopRegularExpression = new RegularExpression("\\s\\s+.*$", "");
		this.unixPathUserRegularExpression = new RegularExpression("(home\\/[^\\/]+)", "gi");
		this.windowsPathUserRegularExpression = new RegularExpression("(?:Users|My\\sDocuments|Documents\\sand\\sSettings)\\\\([^\\\\]+)", "gi");
		this.filePathUserRegularExpression = new RegularExpression("(?:Users|My(?:\\s|%20)Documents|Documents(?:\\s|%20)and(?:\\s|%20)Settings)(?:\\\\|/)([^\\\\/]+)", "gi");
	}
	
	/* -------------------------------------------------------------------- */
	
	PathDisclosureAnalyzer.prototype.analyze = function (transaction, analyzerHandler) {
		
		var transactionMimeType = transaction.getResponseMimeType();
		
		if (transactionMimeType != MimeType.HTML && transactionMimeType != MimeType.CSS && transactionMimeType != MimeType.JSON && transactionMimeType != MimeType.JAVASCRIPT && transactionMimeType != MimeType.TEXT) {
			return;
		}
		
		var response = transaction.getResponse();
		
		if (response == null) {
			return;
		}
		
		var paths = new ListContainer();
		var users = new ListContainer();
		var data = response.getData().make();
		
		for (var matchIterator = this.unixPathRegularExpression.find(data).iterator(), match = null; matchIterator.hasNext();) {
			match = matchIterator.next();
			var path = match.group(1);
			
			var userMatch = this.unixPathUserRegularExpression.match(path);
			
			if (userMatch != null) {
				var user = userMatch.group(1);
				
				users.add(user);
			}
			
			paths.add(path);
		}
		
		for (var matchIterator = this.windowsPathRegularExpression.find(data).iterator(), match = null; matchIterator.hasNext();) {
			match = matchIterator.next();
			var path = match.group(1);
			
			paths.add(path);
			
			var userMatch = this.windowsPathUserRegularExpression.match(path);
			
			if (userMatch != null) {
				var user = userMatch.group(1);
				
				users.add(user);
			}
		}
		
		for (var matchIterator = this.filePathRegularExpression.find(data).iterator(), match = null; matchIterator.hasNext();) {
			match = matchIterator.next();
			var path = match.group(1);
			
			paths.add(path);
			
			var userMatch = this.filePathUserRegularExpression.match(path);
			
			if (userMatch != null) {
				var user = userMatch.group(1);
				
				users.add(user);
			}
		}
		
		for (var pathIterator = paths.iterator(), path = null; pathIterator.hasNext();) {
			path = pathIterator.next();
			path = StringUtils.rtrim(this.twoSpaceChopRegularExpression.replace(path, "  "));
			
			var issue = Issue.createWithIndicatedSignature(IssueType.PATH, transaction, path);
			
			issue.setPath(path);
			
			analyzerHandler.handleIssue(issue);
		}
		
		for (var userIterator = users.iterator(), user = null; userIterator.hasNext();) {
			user = userIterator.next();
			var issue = Issue.createWithIndicatedSignature(IssueType.USER, transaction, user);
			
			issue.setUser(user);
			
			analyzerHandler.handleIssue(issue);
		}
	}
	
	/* -------------------------------------------------------------------- */
	
	function InternalIpAnalyzer() {
	}
	
	/* -------------------------------------------------------------------- */
	
	InternalIpAnalyzer.prototype.analyze = function (transaction, analyzerHandler) {
		var response = transaction.getResponse();
		
		if (response == null) {
			return;
		}
		
		for (var matchIterator = InternalIpAnalyzer.ipRegularExpression.find(response.getData().make()).iterator(), match = null; matchIterator.hasNext();) {
			match = matchIterator.next();
			var ip = match.match();
			var issue = Issue.createWithIndicatedSignature(IssueType.IP, transaction, ip);
			
			issue.setIp(ip);
			
			analyzerHandler.handleIssue(issue);
		}
	}
	
	/* -------------------------------------------------------------------- */
	
	InternalIpAnalyzer.ipRegularExpression = new RegularExpression("(10\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}|172\\.16\\.\\d{1,3}\\.\\d{1,3}|192\\.168\\.\\d{1,3}\\.\\d{1,3})", "");
	
	/* -------------------------------------------------------------------- */
	
	function HttponlyCookieAnalyzer() {
	}
	
	/* -------------------------------------------------------------------- */
	
	HttponlyCookieAnalyzer.prototype.analyze = function (transaction, analyzerHandler) {
		var response = transaction.getResponse();
		
		if (response == null) {
			return;
		}
		
		var headers = response.getHeaders();
		
		for (var headerIterator = headers.getHeaderValuesByName("Set-Cookie").iterator(), header = null; headerIterator.hasNext();) {
			header = headerIterator.next();
			var smallHeader = header.toLowerCase();
			
			if (smallHeader.indexOf("session") > 0 && smallHeader.indexOf("httponly") < 0) {
				var completeHeader = "Set-Cookie: " + header;
				var signature = transaction.getRequest().getUrl().getAddress().make() + '|' + HttponlyCookieAnalyzer.cookieValueRegularExpression.replace(header, "");
				var issue = Issue.createWithIndicatedSignature(IssueType.HTTPONLYSESSIONCOOKIE, transaction, signature);
				
				issue.setHeader(completeHeader);
				
				analyzerHandler.handleIssue(issue);
			}
		}
	}
	
	/* -------------------------------------------------------------------- */
	
	HttponlyCookieAnalyzer.cookieValueRegularExpression = new RegularExpression("=(.*?);", "");
	
	/* -------------------------------------------------------------------- */
	
	function GenericErrorDisclosureAnalyzer() {
		this.errorDisclosureSignatureTester = new CompositeStringSearch();
		
		this.errorDisclosureSignatureTester.addRegularExpression(new RegularExpression("Warning<\\/b>:\\s\\s.*?\\son\\sline\\s\\d+<\\/b><br\\s\\/>", "i"));
		this.errorDisclosureSignatureTester.addRegularExpression(new RegularExpression("\\sDescription:\\s<\\/b>An\\sunhandled\\sexception\\soccurred\\sduring\\sthe\\sexecution\\sof\\sthe\\scurrent\\sweb\\srequest\\.", "i"));
		this.errorDisclosureSignatureTester.addString("   at System.Web.Util.CalliEventHandlerDelegateProxy.Callback(Object sender, EventArgs e)\r\n   at System.Web.UI.Control.OnLoad(EventArgs e)\r\n   at System.Web.UI.Control.LoadRecursive()");
	}
	
	/* -------------------------------------------------------------------- */
	
	GenericErrorDisclosureAnalyzer.prototype.analyze = function (transaction, analyzerHandler) {
		if (transaction.getKind() == TransactionKind.FUZZ) {
			return;
		}
		
		var response = transaction.getResponse();
		
		if (response == null) {
			return;
		}
		
		var data = response.getData().make();
		var occurrence = this.errorDisclosureSignatureTester.first(data);
		
		if (occurrence != null) {
			var issue = Issue.createWithIndicatedSignature(IssueType.ERROR, transaction, transaction.getRequest().make());
			
			issue.setError(occurrence);
			
			analyzerHandler.handleIssue(issue);
		} else
		if (response.getCode().is5xx()) {
			var issue = Issue.createWithIndicatedSignature(IssueType.ERROR, transaction, transaction.getRequest().make());
			
			issue.setError(response.getMessage().make());
			
			analyzerHandler.handleIssue(issue);
		}
	}
	
	/* -------------------------------------------------------------------- */
	
	function EmailDisclosureAnalyzer() {
		this.emailRegularExpression = new RegularExpression("\\b[A-Z0-9._%-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}\\b", "gi");
	}
	
	/* -------------------------------------------------------------------- */
	
	EmailDisclosureAnalyzer.prototype.analyze = function (transaction, analyzerHandler) {
		var response = transaction.getResponse();
		
		if (response == null) {
			return;
		}
		
		for (var matchIterator = this.emailRegularExpression.find(response.getData().make()).iterator(), match = null; matchIterator.hasNext();) {
			match = matchIterator.next();
			var email = match.match();
			var issue = Issue.createWithIndicatedSignature(IssueType.EMAIL, transaction, email);
			
			issue.setEmail(email);
			
			analyzerHandler.handleIssue(issue);
		}
	}
	
	/* -------------------------------------------------------------------- */
	
	function DirectoryListingAnalyzer() {
		this.directoryListingSignatureTester = new CompositeStringSearch();
		this.directoryForbiddenSignatureTester = new CompositeStringSearch();
		
		this.directoryListingSignatureTester.addString(">[To Parent Directory]<");
		this.directoryListingSignatureTester.addString(">Parent Directory<");
		this.directoryListingSignatureTester.addString("Index of /");
		this.directoryListingSignatureTester.addString("Index of /");
		
		this.directoryForbiddenSignatureTester.addString("Directory Listing Denied");
		this.directoryForbiddenSignatureTester.addString("403 - Forbidden: Access is denied.</title>");
	}
	
	/* -------------------------------------------------------------------- */
	
	DirectoryListingAnalyzer.prototype.analyze = function (transaction, analyzerHandler) {
		if (transaction.getResponseMimeType() != MimeType.HTML) {
			return;
		}
		
		var response = transaction.getResponse();
		
		if (response == null) {
			return;
		}
		
		var data = response.getData().make();
		
		if (this.directoryListingSignatureTester.any(data)) {
			var url = transaction.getRequest().getUrl();
			
			var newUrl;
			
			try {
				newUrl = UrlFactory.create(url).resetQueries().resetFragment().build();
			} catch (e) {
				analyzerHandler.handleException("cannot create url", e);
				
				return;
			}
			
			var urlString = newUrl.make();
			var issue = Issue.createWithIndicatedSignature(IssueType.DIRECTORYLISTINGENABLED, transaction, urlString);
			
			issue.setUrl(urlString);
			
			analyzerHandler.handleIssue(issue);
		} else
		if (this.directoryForbiddenSignatureTester.any(data)) {
			var url = transaction.getRequest().getUrl();
			
			var newUrl;
			
			try {
				newUrl = UrlFactory.create(url).resetQueries().resetFragment().build();
			} catch (e) {
				analyzerHandler.handleException("cannot create url", e);
				
				return;
			}
			
			var urlString = newUrl.make();
			var issue = Issue.createWithIndicatedSignature(IssueType.DIRECTORYLISTINGDENIED, transaction, urlString);
			
			issue.setUrl(urlString);
			
			analyzerHandler.handleIssue(issue);
		}
	}
	
	/* -------------------------------------------------------------------- */
	
	function CsrfableFormAnalyzer() {
		this.csrfRegularExpression = new RegularExpression("(?:\\d|\\w)+", "gi");
		this.uncsrfableUrlRegularExpression = new RegularExpression("login|signup|register|forgot|registration", "i"); // TODO: add more of these
	}
	
	/* -------------------------------------------------------------------- */
	
	CsrfableFormAnalyzer.prototype.serializeForm = function (form) {
		return "<form method=\"" + HtmlUtils.escapeHtmlComponent(form.getMethod().make()) + "\" action=\"" + HtmlUtils.escapeHtmlComponent(form.getAction().make()) + "\" enctype=\"" + HtmlUtils.escapeHtmlComponent(form.getEnctype().make()) + "\" autocomplete=\"" + (form.isAutocomplete() ? "on" : "off") + "\">";
	}
	
	/* -------------------------------------------------------------------- */
	
	CsrfableFormAnalyzer.prototype.analyze = function (transaction, analyzerHandler) {
		
		var page = transaction.getSimpleContent();
		
		if (page == null) {
			return;
		}
		
		for (var simpleFormIterator = page.getForms().iterator(), simpleForm = null; simpleFormIterator.hasNext();) {
			simpleForm = simpleFormIterator.next();
			if (simpleForm.getFields().size() == 0 || simpleForm.getFiles().iterator().hasNext()) {
				continue;
			}
			
			if (this.uncsrfableUrlRegularExpression.test(simpleForm.getUrl().getInfo().make())) {
				continue;
			}
			
			var value = null;
			
			for (var simpleFieldIterator = simpleForm.getFields().iterator(), simpleField = null; simpleFieldIterator.hasNext();) {
				simpleField = simpleFieldIterator.next();
				if (simpleField.isHidden()) {
					value = simpleField.getValue();
					
					if (value.length > 6 && this.csrfRegularExpression.test(value)) {
						break;
					} else {
						value = null;
					}
				}
			}
			
			if (value != null) {
				var form = simpleForm.getForm();
				var formSignature = this.serializeForm(form);
				
				var issueSignature;
				
				try {
					issueSignature = UrlFactory.create(form.getAction()).resetQueries().resetFragment().build().make();
				} catch (e) {
					analyzerHandler.handleException("cannot create issue signature for CSRF from url", e);
					
					continue;
				}
				
				var issue = Issue.createWithIndicatedSignature(IssueType.CSRF, transaction, issueSignature);
				
				issue.setForm(formSignature);
				
				analyzerHandler.handleIssue(issue);
			}
		}
	}
	
	/* -------------------------------------------------------------------- */
	
	function BannerHeaderAnalyzer() {
		this.banners = new ListContainer("Server", "X-Powered-By", "X-AspNet-Version", "MicrosoftOfficeWebServer", "MS-Author-Via");
	}
	
	/* -------------------------------------------------------------------- */
	
	BannerHeaderAnalyzer.prototype.analyze = function (transaction, analyzerHandler) {
		var response = transaction.getResponse();
		
		if (response == null) {
			return;
		}
		
		var headers = response.getHeaders();
		
		for (var bannerIterator = this.banners.iterator(), banner = null; bannerIterator.hasNext();) {
			banner = bannerIterator.next();
			var header = headers.getHeaderValueByName(banner);
			
			if (header != null) {
				var completeHeader = banner + ": " + header;
				var issue = Issue.createWithIndicatedSignature(IssueType.BANNER, transaction, completeHeader);
				
				issue.setHeader(completeHeader);
				
				analyzerHandler.handleIssue(issue);
			}
		}
	}
	
	/* -------------------------------------------------------------------- */
	
	function AutocompleteFormAnalyzer() {
		this.sensitiveFieldNameRegularExpression = new RegularExpression("password|passwd|user|login", "i"); // TODO: add more types of names here
	}
	
	/* -------------------------------------------------------------------- */
	
	AutocompleteFormAnalyzer.prototype.serializeForm = function (form) {
		return "<form method=\"" + HtmlUtils.escapeHtmlComponent(form.getMethod().make()) + "\" action=\"" + HtmlUtils.escapeHtmlComponent(form.getAction().make()) + "\" enctype=\"" + HtmlUtils.escapeHtmlComponent(form.getEnctype().make()) + "\" autocomplete=\"" + (form.isAutocomplete() ? "on" : "off") + "\">";
	}
	
	/* -------------------------------------------------------------------- */
	
	AutocompleteFormAnalyzer.prototype.analyze = function (transaction, analyzerHandler) {
		var page = transaction.getSimpleContent();
		
		if (page == null) {
			return;
		}
		
		for (var simpleFormIterator = page.getForms().iterator(), simpleForm = null; simpleFormIterator.hasNext();) {
			simpleForm = simpleFormIterator.next();
			var form = simpleForm.getForm();
			
			if (!simpleForm.isAutocomplete() || form.getInputs().size() == 0) {
				continue;
			}
			
			for (var fieldIterator = simpleForm.getFields().iterator(), field = null; fieldIterator.hasNext();) {
				field = fieldIterator.next();
				if (field.isAutocomplete() && this.sensitiveFieldNameRegularExpression.test(field.getName())) {
					var formSignature = this.serializeForm(form);
					
					var issueSignature;
					
					try {
						issueSignature = UrlFactory.create(transaction.getRequest().getUrl()).resetQueries().resetFragment().build().make();
					} catch (e) {
						analyzerHandler.handleException("cannot create issue signature for AUTOCOMPLETE from url", e);
						
						continue;
					}
					
					var issue = Issue.createWithIndicatedSignature(IssueType.AUTOCOMPLETE, transaction, issueSignature);
					
					issue.setForm(formSignature);
					
					analyzerHandler.handleIssue(issue);
					
					break;
				}
			}
		}
	}
	
	/* -------------------------------------------------------------------- */
	
	function AuthenticationHeaderAnalyzer() {
	}
	
	/* -------------------------------------------------------------------- */
	
	AuthenticationHeaderAnalyzer.prototype.analyze = function (transaction, analyzerHandler) {
		var response = transaction.getResponse();
		
		if (response == null) {
			return;
		}
		
		var header = response.getHeaders().getHeaderValueByName("WWW-Authenticate");
		
		if (header != null) {
			var completeHeader = "WWW-Authenticate: " + header;
			var issue = Issue.createWithIndicatedSignature(IssueType.WWWAUTHENTICATION, transaction, completeHeader);
			
			issue.setHeader(completeHeader);
			
			analyzerHandler.handleIssue(issue);
		}
	}
	
	/* -------------------------------------------------------------------- */
	
	exports.Workspace = Workspace;
	exports.TransactionKind = TransactionKind;
	exports.Transaction = Transaction;
	exports.TrackerObservers = TrackerObservers;
	exports.Tracker = Tracker;
	exports.SchedulerObservers = SchedulerObservers;
	exports.Scheduler = Scheduler;
	exports.ReporterObservers = ReporterObservers;
	exports.Reporter = Reporter;
	exports.ProgressorObservers = ProgressorObservers;
	exports.Progressor = Progressor;
	exports.FuzzerObservers = FuzzerObservers;
	exports.Fuzzer = Fuzzer;
	exports.CrawlerObservers = CrawlerObservers;
	exports.Crawler = Crawler;
	exports.ClientObservers = ClientObservers;
	exports.Client = Client;
	exports.AnalyzerObservers = AnalyzerObservers;
	exports.Analyzer = Analyzer;
	exports.StatementLevel = StatementLevel;
	exports.Statement = Statement;
	exports.Signature = Signature;
	exports.Scope = Scope;
	exports.MimeType = MimeType;
	exports.MimeKind = MimeKind;
	exports.Mime = Mime;
	exports.IssueType = IssueType;
	exports.Issue = Issue;
	exports.SimpleQueryPayloadTransactionIterator = SimpleQueryPayloadTransactionIterator;
	exports.SimplePathPayloadTransactionIterator = SimplePathPayloadTransactionIterator;
	exports.SimpleNullPayloadTransactionIterator = SimpleNullPayloadTransactionIterator;
	exports.SimpleHeaderPayloadTransactionIterator = SimpleHeaderPayloadTransactionIterator;
	exports.SimpleFieldDataPayloadTransactionIterator = SimpleFieldDataPayloadTransactionIterator;
	exports.SimpleDataPayloadTransactionIterator = SimpleDataPayloadTransactionIterator;
	exports.OptimizedCompoundSimplePayloadTransactionIterator = OptimizedCompoundSimplePayloadTransactionIterator;
	exports.OptimizedCompoundComplexPayloadTransactionIterator = OptimizedCompoundComplexPayloadTransactionIterator;
	exports.CompoundSimplePayloadTransactionIterator = CompoundSimplePayloadTransactionIterator;
	exports.CompoundComplexPayloadTransactionIterator = CompoundComplexPayloadTransactionIterator;
	exports.CommonQueryFilterIterator = CommonQueryFilterIterator;
	exports.CommonQueryFilter = CommonQueryFilter;
	exports.CommonHeaderFilterIterator = CommonHeaderFilterIterator;
	exports.CommonHeaderFilter = CommonHeaderFilter;
	exports.BasicEngine = BasicEngine;
	exports.AnalyticalEngine = AnalyticalEngine;
	exports.UploadFormAnalyzer = UploadFormAnalyzer;
	exports.SqlSignatureDetector = SqlSignatureDetector;
	exports.SqlErrorDisclosureAnalyzer = SqlErrorDisclosureAnalyzer;
	exports.SourceLeakAnalyzer = SourceLeakAnalyzer;
	exports.SoapUrlAnalyzer = SoapUrlAnalyzer;
	exports.SecureCookieAnalyzer = SecureCookieAnalyzer;
	exports.PathDisclosureAnalyzer = PathDisclosureAnalyzer;
	exports.InternalIpAnalyzer = InternalIpAnalyzer;
	exports.HttponlyCookieAnalyzer = HttponlyCookieAnalyzer;
	exports.GenericErrorDisclosureAnalyzer = GenericErrorDisclosureAnalyzer;
	exports.EmailDisclosureAnalyzer = EmailDisclosureAnalyzer;
	exports.DirectoryListingAnalyzer = DirectoryListingAnalyzer;
	exports.CsrfableFormAnalyzer = CsrfableFormAnalyzer;
	exports.BannerHeaderAnalyzer = BannerHeaderAnalyzer;
	exports.AutocompleteFormAnalyzer = AutocompleteFormAnalyzer;
	exports.AuthenticationHeaderAnalyzer = AuthenticationHeaderAnalyzer;
	
})(exports);