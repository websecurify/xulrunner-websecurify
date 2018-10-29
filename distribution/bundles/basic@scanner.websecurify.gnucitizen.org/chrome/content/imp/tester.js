importScripts('commonjs.js');

/* ------------------------------------------------------------------------ */

var org_basic_concrete = require('./org_basic_concrete.js');
var org_basic_webacid = require('./org_basic_webacid.js');
var org_basic_core = require('./org_basic_core.js');
var org_basic_http = require('./org_basic_http.js');

/* ------------------------------------------------------------------------ */

var LogUtils = org_basic_core.LogUtils;
var workspace = new org_basic_concrete.TestWorkspace();
var client = new org_basic_concrete.TestClient();
var scheduler = new org_basic_webacid.Scheduler(workspace, client, 30);
var reporter = new org_basic_concrete.TestReporter(workspace);
var progressor = new org_basic_webacid.Progressor(scheduler, 50);
var engine = new org_basic_webacid.BasicEngine(workspace, scheduler, reporter, progressor);

reporter.registerObserver({
	handleReportedStatement: function (statement) {
		LogUtils.recordMessage('issue: ' + statement.getSummary());
		
		var issue = statement.getIssue();
		var transaction = issue.getTransaction();
		var url = issue.getUrl();
		
		if (!url) {
			url = transaction.getRequest().getUrl().make();
		}
		
		postMessage({report: {level: statement.getLevel().name(), title: statement.getTitle(), summary: statement.getSummary(), exact: statement.getExact(), description: statement.getDescription(), details: statement.getDetails(), type: issue.getType().name(), signature: issue.getSignature().getValue(), url: url, header: issue.getHeader(), ip: issue.getIp(), email: issue.getEmail(), form: issue.getForm(), path: issue.getPath(), error: issue.getError(), database: issue.getDatabase(), request: transaction.getRequest().make(), response: transaction.getResponse().make()}});
	}	
});

progressor.registerObserver({
	handleProgressNotification: function (percentage, step, steps, status) {
		LogUtils.recordMessage('progress: ' + status);
		
		postMessage({progress: {percentage: percentage, step: step, steps: steps, status: status}});
		
		if (percentage == 100 && step == step) {
			postMessage({stop: {}});
		}
	}
});

/* ------------------------------------------------------------------------ */

function launchUrl(data) {
	engine.launchUrl(org_basic_http.Url.parse(data.launchUrl.url));
}

/* ------------------------------------------------------------------------ */

this.onmessage = function (event) {
	if ('launchUrl' in event.data) {
		launchUrl(event.data);
	} else
	if ('pause' in event.data) {
		engine.pause();
	} else
	if ('resume' in event.data) {
		engine.resume();
	} else
	if ('stop' in event.data) {
		postMessage({stop: {}});
	} else
	if ('hookDebugRoutines' in event.data) {
		org_basic_core.hookDebugRoutines();
	}
}
