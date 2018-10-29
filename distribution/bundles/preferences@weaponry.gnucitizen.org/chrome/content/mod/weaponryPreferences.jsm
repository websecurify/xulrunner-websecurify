let EXPORTED_SYMBOLS = ['weaponryPreferences'];

/* ------------------------------------------------------------------------ */

const CR = Components.results;
const CC = Components.classes;
const CI = Components.interfaces;

/* ------------------------------------------------------------------------ */

Components.utils.import('resource://org.gnucitizen.weaponry.common/content/mod/weaponryCommon.jsm');

/* ------------------------------------------------------------------------ */

let weaponryPreferences = new function () {
	let weaponryPreferences = this;
	
	/* -------------------------------------------------------------------- */
	
	this.preferencesService = weaponryCommon.getService('@preferences.weaponry.gnucitizen.org/service;1', 'IWeaponryPreferencesService');
	
	/* -------------------------------------------------------------------- */
	
	this.openPreferencesWindow = function () {
		return this.preferencesService.openPreferencesWindow();
	};
};
