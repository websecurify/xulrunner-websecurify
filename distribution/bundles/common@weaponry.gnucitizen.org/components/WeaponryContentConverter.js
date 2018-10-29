const CR = Components.results;
const CC = Components.classes;
const CI = Components.interfaces;

/* ------------------------------------------------------------------------ */

Components.utils.import('resource://gre/modules/XPCOMUtils.jsm');
Components.utils.import('resource://org.gnucitizen.weaponry.common/content/mod/weaponryCommon.jsm');

/* ------------------------------------------------------------------------ */

function WeaponryContentConverter() {
	this.uri = null;
}

WeaponryContentConverter.prototype = {
	classDescription: 'Weaponry Content Converter',
	classID: Components.ID('{b4eb018f-cd1c-4696-b67c-3d7db8af02c2}'),
	contractID: '@common.weaponry.gnucitizen.org/content-converter;1',
	QueryInterface: XPCOMUtils.generateQI([CI.IWeaponryContentConverter, CI.nsIRequestObserver, CI.nsIStreamListener, CI.nsIStreamConverter]),
	
	/* -------------------------------------------------------------------- */
	
	get wrappedJSObject () {
		return this;
	},
	
	/* -------------------------------------------------------------------- */
	
	initWithUri: function (uri) {
		this.uri = uri;
	},
	
	/* -------------------------------------------------------------------- */
	
	onStartRequest: function (request, context) {
		let channel = request.QueryInterface(CI.nsIChannel);
		let requestedURL = channel.URI.spec;
		let newChannel = weaponryCommon.ioService.newChannel(this.uri, null, null);
		
		newChannel.asyncOpen(this.streamListener, context);
	},
	
	onStopRequest: function (request, context, statusCode) {
		// pass
	},
	
	onDataAvailable: function (request, context, inputStream, offset, count) {
		// pass
	},
	
	/* -------------------------------------------------------------------- */
	
	asyncConvertData: function (fromType, toType, listener, context) {
		this.streamListener = listener;
	},
	
	convert: function (fromStream, fromType, toType, context) {
		return fromStream;
	}
};

/* ------------------------------------------------------------------------ */

var NSGetFactory = XPCOMUtils.generateNSGetFactory([WeaponryContentConverter]);
