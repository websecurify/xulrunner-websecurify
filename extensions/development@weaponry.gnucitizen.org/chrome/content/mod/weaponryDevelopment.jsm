let EXPORTED_SYMBOLS = ['weaponryDevelopment'];

/* ------------------------------------------------------------------------ */

const CR = Components.results;
const CC = Components.classes;
const CI = Components.interfaces;

/* ------------------------------------------------------------------------ */

Components.utils.import('resource://org.gnucitizen.weaponry.common/content/mod/weaponryCommon.jsm');

/* ------------------------------------------------------------------------ */

let weaponryDevelopment = new function () {
	let weaponryDevelopment = this;
	
	/* -------------------------------------------------------------------- */
	
	this.weaponryDevelopmentService = weaponryCommon.getService('@development.weaponry.gnucitizen.org/service;1', 'IWeaponryDevelopmentService');
};
