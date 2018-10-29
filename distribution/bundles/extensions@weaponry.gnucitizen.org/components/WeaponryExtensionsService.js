const CR = Components.results;
const CC = Components.classes;
const CI = Components.interfaces;

/* ------------------------------------------------------------------------ */

Components.utils.import('resource://gre/modules/XPCOMUtils.jsm');

/* ------------------------------------------------------------------------ */

function WeaponryExtensionsService() {
	// pass
}

WeaponryExtensionsService.prototype = {
	classDescription: 'Weaponry Extensions Service',
	classID: Components.ID('{a1382300-84fc-11df-8395-0800200c9a66}'),
	contractID: '@extensions.weaponry.gnucitizen.org/service;1',
	QueryInterface: XPCOMUtils.generateQI([CI.IWeaponryExtensionsService]),
	
	/* -------------------------------------------------------------------- */
	
	get wrappedJSObject () {
		return this;
	}
};

/* ------------------------------------------------------------------------ */

var NSGetFactory = XPCOMUtils.generateNSGetFactory([WeaponryExtensionsService]);
