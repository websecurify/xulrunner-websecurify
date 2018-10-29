const CR = Components.results;
const CC = Components.classes;
const CI = Components.interfaces;

/* ------------------------------------------------------------------------ */

Components.utils.import('resource://gre/modules/XPCOMUtils.jsm');

/* ------------------------------------------------------------------------ */

function WebsecurifyAboutModule() {
	// pass
}

WebsecurifyAboutModule.prototype = {
	classDescription: 'Websecurify About Module',
	classID: Components.ID('{56bb8ab8-366b-488c-8e6a-6db5c3166848}'),
	contractID: '@mozilla.org/network/protocol/about;1?what=websecurify',
	QueryInterface: XPCOMUtils.generateQI([CI.IWebsecurifyAboutModule, CI.nsIAboutModule]),
	
	/* -------------------------------------------------------------------- */
	
	get wrappedJSObject () {
		return this;
	},
	
	/* -------------------------------------------------------------------- */
	
	getURIFlags: function(uri) {
		return CI.nsIAboutModule.URI_SAFE_FOR_UNTRUSTED_CONTENT;
	},
	
	newChannel: function(uri) {
		let ioService = CC['@mozilla.org/network/io-service;1'].getService(CI.nsIIOService);
		let channel = ioService.newChannel('chrome://org.gnucitizen.websecurify.support/content/htm/about.htm', null, null);
		
		channel.originalURI = uri;
		
		return channel;
	}
}

/* ------------------------------------------------------------------------ */

var NSGetFactory = XPCOMUtils.generateNSGetFactory([WebsecurifyAboutModule]);
