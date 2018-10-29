const CR = Components.results;
const CC = Components.classes;
const CI = Components.interfaces;

/* ------------------------------------------------------------------------ */

Components.utils.import('resource://gre/modules/XPCOMUtils.jsm');
Components.utils.import('resource://org.gnucitizen.weaponry.common/content/mod/weaponryCommon.jsm');

/* ------------------------------------------------------------------------ */

function WebsecurifyScannerBasicService() {
	// pass
}

WebsecurifyScannerBasicService.prototype = {
	classDescription: 'Websecurify Scanner Basic Service',
	classID: Components.ID('{5783e120-3274-11df-9aae-0800200c9a66}'),
	contractID: '@basic.scanner.websecurify.gnucitizen.org/service;1',
	QueryInterface: XPCOMUtils.generateQI([CI.IWebsecurifyScannerBasicService, CI.nsIObserver]),
	
	/* -------------------------------------------------------------------- */
	
	get wrappedJSObject () {
		return this;
	},
	
	/* -------------------------------------------------------------------- */
	
	observe: function (subject, topic, data) {
		if (topic == 'profile-after-change') {
			this.initializeComponent(subject, topic, data);
		} else
		if (topic == 'profile-before-change') {
			this.deinitializeComponent(subject, topic, data);
		} else
		if (topic == 'http-on-examine-response' || topic == 'http-on-examine-cached-response') {
			this.observeResponse(subject, topic, data);
		}
	},
	
	/* -------------------------------------------------------------------- */
	
	initializeComponent: function (subject, topic, data) {
		weaponryCommon.observerService.addObserver(this, 'http-on-examine-response', false);
		weaponryCommon.observerService.addObserver(this, 'http-on-examine-cached-response', false);
	},
	
	deinitializeComponent: function (subject, topic, data) {
		weaponryCommon.observerService.removeObserver(this, 'http-on-examine-response');
		weaponryCommon.observerService.removeObserver(this, 'http-on-examine-cached-response');
	},
	
	/* -------------------------------------------------------------------- */
	
	observeResponse: function (subject, topic, data) {
		let httpChannel = null;
		
		try {
			httpChannel = subject.QueryInterface(CI.nsIHttpChannel);
		} catch (e) {
			return;
		}
		
		let xWebsecurifyRequest = 'false';
		
		try {
			xWebsecurifyRequest = httpChannel.getRequestHeader('X-Websecurify-Request');
		} catch (e) {
			// pass
		}
		
		if (xWebsecurifyRequest != 'true') {
			return;
		}
		
		try {
			let location = httpChannel.getResponseHeader('Location');
			
			if (location) {
				httpChannel.setResponseHeader('Location', null, false);
				
				location = location.trim();
				
				if (location.match(/^https?:\/\//i)) {
					httpChannel.setResponseHeader('X-Location-Override-Header', location, false);
				} else {
					httpChannel.setResponseHeader('X-Location-Override-Header', httpChannel.URI.resolve(location), false);
				}
			} else {
				httpChannel.setResponseHeader('X-Location-Override-Header', null, false);
			}
		} catch (e) {
			// pass
		}
		
		try {
			let wwwAuthentication = httpChannel.getResponseHeader('WWW-Authenticate');
			
			if (wwwAuthentication) {
				httpChannel.setResponseHeader('WWW-Authenticate', null, false);
				httpChannel.setResponseHeader('X-WWW-Authenticate-Override-Header', wwwAuthentication, false);
			} else {
				httpChannel.setResponseHeader('X-WWW-Authenticate-Override-Header', null, false);
			}
		} catch (e) {
			// pass
		}
	}
};

/* ------------------------------------------------------------------------ */

var NSGetFactory = XPCOMUtils.generateNSGetFactory([WebsecurifyScannerBasicService]);
