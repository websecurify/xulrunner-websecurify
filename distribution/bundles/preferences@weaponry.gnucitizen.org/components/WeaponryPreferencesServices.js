const CR = Components.results;
const CC = Components.classes;
const CI = Components.interfaces;

/* ------------------------------------------------------------------------ */

Components.utils.import('resource://gre/modules/XPCOMUtils.jsm');
Components.utils.import('resource://org.gnucitizen.weaponry.common/content/mod/weaponryCommon.jsm');

/* ------------------------------------------------------------------------ */

function WeaponryPreferencesService() {
	// pass
}

WeaponryPreferencesService.prototype = {
	classDescription: 'Weaponry Preferences Service',
	classID: Components.ID('{2711ef90-08f9-11df-8a39-0800200c9a66}'),
	contractID: '@preferences.weaponry.gnucitizen.org/service;1',
	QueryInterface: XPCOMUtils.generateQI([CI.IWeaponryPreferencesService, CI.nsIObserver]),
	
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
		
		if (topic == 'final-ui-startup') {
			this.updatePreferences();
		}
	},
	
	/* -------------------------------------------------------------------- */
	
	initializeComponent: function (subject, topic, data) {
		weaponryCommon.observerService.addObserver(this, 'final-ui-startup', false);
	},
	
	deinitializeComponent: function (subject, topic, data) {
		weaponryCommon.observerService.removeObserver(this, 'final-ui-startup');
	},
	
	/* -------------------------------------------------------------------- */
	
	updatePreferences: function () {
		// pass
	},
	
	/* -------------------------------------------------------------------- */
	
	openPreferencesWindow: function () {
		return weaponryCommon.openWindowOnce(null, 'org.gnucitizen.weaponry.preferences:preferences-prefwindow', 'chrome://org.gnucitizen.weaponry.preferences/content/xul/preferencesPrefwindow.xul', null, 'all,chrome,centerscreen,dialog=yes,toolbar=yes');
	}
};

/* ------------------------------------------------------------------------ */

var NSGetFactory = XPCOMUtils.generateNSGetFactory([WeaponryPreferencesService]);
