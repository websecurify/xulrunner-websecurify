let EXPORTED_SYMBOLS = ['weaponryExtensions'];

/* ------------------------------------------------------------------------ */

const CR = Components.results;
const CC = Components.classes;
const CI = Components.interfaces;

/* ------------------------------------------------------------------------ */

Components.utils.import('resource://org.gnucitizen.weaponry.common/content/mod/weaponryCommon.jsm');

/* ------------------------------------------------------------------------ */

let weaponryExtensions = new function () {
	let weaponryExtensions = this;
	
	/* -------------------------------------------------------------------- */
	
	this.extensionsService = weaponryCommon.getService('@extensions.weaponry.gnucitizen.org/service;1', 'IWeaponryExtensionsService');
};
