const CR = Components.results;
const CC = Components.classes;
const CI = Components.interfaces;

/* ------------------------------------------------------------------------ */

Components.utils.import('resource://gre/modules/XPCOMUtils.jsm');
Components.utils.import('resource://org.gnucitizen.weaponry.common/content/mod/weaponryCommon.jsm');

/* ------------------------------------------------------------------------ */

function WeaponryDevelopmentCommandLineHandler() {
	// pass
}

WeaponryDevelopmentCommandLineHandler.prototype = {
	classDescription: 'Weaponry Development Command Line Handler',
	classID: Components.ID('{31a09f50-fab4-49e4-97d4-a994e8a6375f}'),
	contractID: '@development.weaponry.gnucitizen.org/command-line-handler;1',
	QueryInterface: XPCOMUtils.generateQI([CI.IWeaponryDevelopmentCommandLineHandler, CI.nsICommandLineHandler, CI.nsIObserver]),
	
	/* -------------------------------------------------------------------- */
	
	get wrappedJSObject () {
		return this;
	},
	
	/* -------------------------------------------------------------------- */
	
	helpInfo: '  -disabledevelopmentwarning     Start Weaponry development test\n',
	
	/* -------------------------------------------------------------------- */
	
	handle: function (commandLine) {
		let parameter = commandLine.handleFlag('disabledevelopmentwarning', false);
		
		if (!parameter) {
			return;
		}
		
		weaponryCommon.setPref('org.gnucitizen.weaponry.development.warn', false);
	}
};

/* ------------------------------------------------------------------------ */

var NSGetFactory = XPCOMUtils.generateNSGetFactory([WeaponryDevelopmentCommandLineHandler]);
