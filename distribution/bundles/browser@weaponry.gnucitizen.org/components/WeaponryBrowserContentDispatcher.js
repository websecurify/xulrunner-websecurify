const CR = Components.results;
const CC = Components.classes;
const CI = Components.interfaces;

/* ------------------------------------------------------------------------ */

Components.utils.import('resource://gre/modules/XPCOMUtils.jsm');
Components.utils.import('resource://org.gnucitizen.weaponry.common/content/mod/weaponryCommon.jsm');

/* ------------------------------------------------------------------------ */

function WeaponryBrowserContentDispatcher() {
	// pass
}

WeaponryBrowserContentDispatcher.prototype = {
	classDescription: 'Weaponry Browser Content Dispatcher',
	classID: Components.ID('{1ff99808-2fd4-4253-8511-e3cf03cd1477}'),
	contractID: '@browser.weaponry.gnucitizen.org/content-dispatcher;1',
	QueryInterface: XPCOMUtils.generateQI([CI.IWeaponryBrowserContentDispatcher, CI.nsISupportsWeakReference, CI.nsIURIContentListener, CI.nsIContentHandler]),
	
	/* -------------------------------------------------------------------- */
	
	get wrappedJSObject () {
		return this;
	},
	
	/* -------------------------------------------------------------------- */
	
	GetWeakReference: function () {
		return this;
	},
	
	/* -------------------------------------------------------------------- */
	
	realLoadCookie: null,
    realParentContentListener: null,
	
	/* -------------------------------------------------------------------- */
	
	get loadCookie () {
		return this.realLoadCookie;
	},
	
	set loadCookie (value) {
		this.realLoadCookie = value;
	},
	
	get parentContentListener () {
		return this.realParentContentListener;
	},
	
	set parentContentListener (value) {
		this.realParentContentListener = value;
	},
	
	onStartURIOpen: function (uri) {
		return false;
	},
	
	doContent: function (contentType, isContentPreferred, request, contentHandler) {
		// TODO: add code here
	},
	
	isPreferred: function (contentType) {
		// TODO: get contentTypes from the browser service
		return this.contentTypes.indexOf(contentType) < 0;
		//
	},
	
	canHandleContent: function (contentType, isContentPreferred) {
		return null;
	},
	
	/* -------------------------------------------------------------------- */
	
	handleContent: function (contentType, windowContext, request) {
		try {
			request.QueryInterface(CI.nsIChannel);
		} catch (e) {
			Components.utils.reportError('cannot handle request, passing to the next handler');
			
			throw CR.NS_ERROR_WONT_HANDLE_CONTENT;
		}
		
		weaponryCommon.getService('@browser.weaponry.gnucitizen.org/service;1', 'IWeaponryBrowserService').openBrowserView(request.URI.spec);
	}
};

/* ------------------------------------------------------------------------ */

var NSGetFactory = XPCOMUtils.generateNSGetFactory([WeaponryBrowserContentDispatcher]);
