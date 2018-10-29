const CR = Components.results;
const CC = Components.classes;
const CI = Components.interfaces;

/* ------------------------------------------------------------------------ */

Components.utils.import('resource://gre/modules/XPCOMUtils.jsm');
Components.utils.import('resource://org.gnucitizen.weaponry.common/content/mod/weaponryCommon.jsm');

/* ------------------------------------------------------------------------ */

function WeaponrySchemeViewer() {
	this.scheme = null;
	this.uri = null;
	this.wrap = null;
}

WeaponrySchemeViewer.prototype = {
	classDescription: 'Weaponry Scheme Viewer',
	classID: Components.ID('{a8c1cefe-5cf7-414d-b189-930c490fb421}'),
	contractID: '@common.weaponry.gnucitizen.org/scheme-viewer;1',
	QueryInterface: XPCOMUtils.generateQI([CI.IWeaponrySchemeViewer, CI.nsIProtocolHandler]),
	
	/* -------------------------------------------------------------------- */
	
	get wrappedJSObject () {
		return this;
	},
	
	/* -------------------------------------------------------------------- */
	
	init: function (scheme, uri, wrap) {
		this.scheme = scheme;
		this.uri = uri;
		this.wrap = wrap;
	},
	
	/* -------------------------------------------------------------------- */
	
	defaultPort: -1,
	protocolFlags: CI.nsIProtocolHandler.URI_NORELATIVE | CI.nsIProtocolHandler.URI_DANGEROUS_TO_LOAD | CI.nsIProtocolHandler.URI_NON_PERSISTABLE | CI.URI_INHERITS_SECURITY_CONTEXT,
	
	allowPort: function(port, scheme) {
		return false;
	},
	
	newURI: function(spec, originCharset, baseURI) {
		let uri = weaponryCommon.createInstance('@mozilla.org/network/simple-uri;1', 'nsIURI');
		
		uri.spec = spec;
		
		return uri;
	},
	
	newChannel: function(uri) {
		let channelUri;
		
		if (this.wrap) {
			channelUri = 'chrome://org.gnucitizen.weaponry.common/content/xul/schemeView.xul?uri=' + this.uri;
		} else {
			channelUri = this.uri.replace(/\{uri\}/g, this.uri);
		}
		
		let channel = weaponryCommon.ioService.newChannel(channelUri, null, null);
		
		channel.originalURI = uri;
		
		return channel;
	}
};

/* ------------------------------------------------------------------------ */

var NSGetFactory = XPCOMUtils.generateNSGetFactory([WeaponrySchemeViewer]);
