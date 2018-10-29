const CR = Components.results;
const CC = Components.classes;
const CI = Components.interfaces;

/* ------------------------------------------------------------------------ */

Components.utils.import('resource://gre/modules/XPCOMUtils.jsm');
Components.utils.import('resource://org.gnucitizen.weaponry.common/content/mod/weaponryCommon.jsm');

/* ------------------------------------------------------------------------ */

function WeaponryTerminalLauncher() {
	// pass
}

WeaponryTerminalLauncher.prototype = {
	classDescription: 'Weaponry Terminal Launcher',
	classID: Components.ID('{484638d0-5e15-11df-a08a-0800200c9a66}'),
	contractID: '@common.weaponry.gnucitizen.org/terminal-launcher;1',
	QueryInterface: XPCOMUtils.generateQI([CI.IWeaponryTerminalLauncher]),
	
	/* -------------------------------------------------------------------- */
	
	get wrappedJSObject () {
		return this;
	},
	
	/* -------------------------------------------------------------------- */
	
	launchTerminal: function (command) {
		let os = weaponryCommon.xulRuntime.OS;
		
		if (os == 'Darwin') {
			if (command) {
				weaponryCommon.executeFile('/usr/bin/osascript', weaponryCommon.getChromeUriFilePath('chrome://org.gnucitizen.weaponry.common.sites/content/scripts/weaponryTerminalLauncher.scpt'), command);
			} else {
				weaponryCommon.executeFile('/usr/bin/osascript', weaponryCommon.getChromeUriFilePath('chrome://org.gnucitizen.weaponry.common.sites/content/scripts/weaponryTerminalLauncher.scpt'));
			}
		} else
		if (os == "Linux") {
			if (command) {
				weaponryCommon.executeFile('/bin/sh', weaponryCommon.getChromeUriFilePath('chrome://org.gnucitizen.weaponry.common.sites/content/scripts/weaponryTerminalLauncher.sh'), command);
			} else {
				weaponryCommon.executeFile('/bin/sh', weaponryCommon.getChromeUriFilePath('chrome://org.gnucitizen.weaponry.common.sites/content/scripts/weaponryTerminalLauncher.sh'));
			}
		} else
		if (os == 'WINNT') {
			if (command) {
				weaponryCommon.executeFile('cmd.exe', '/C', weaponryCommon.getChromeUriFilePath('chrome://org.gnucitizen.weaponry.common.sites/content/scripts/weaponryTerminalLauncher.cmd'), command);
			} else {
				weaponryCommon.executeFile('cmd.exe', '/K', weaponryCommon.getChromeUriFilePath('chrome://org.gnucitizen.weaponry.common.sites/content/scripts/weaponryTerminalLauncher.cmd'));
			}
		} else {
			throw new Error('unsupported os');
		}
	}
};

/* ------------------------------------------------------------------------ */

var NSGetFactory = XPCOMUtils.generateNSGetFactory([WeaponryTerminalLauncher]);
