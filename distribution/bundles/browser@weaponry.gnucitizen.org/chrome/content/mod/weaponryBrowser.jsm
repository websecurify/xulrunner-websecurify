let EXPORTED_SYMBOLS = ['weaponryBrowser'];

/* ------------------------------------------------------------------------ */

const CR = Components.results;
const CC = Components.classes;
const CI = Components.interfaces;

/* ------------------------------------------------------------------------ */

Components.utils.import('resource://org.gnucitizen.weaponry.common/content/mod/weaponryCommon.jsm');

/* ------------------------------------------------------------------------ */

let weaponryBrowser = new function () {
	let weaponryBrowser = this;
	
	/* -------------------------------------------------------------------- */
	
	this.browserService = weaponryCommon.getService('@browser.weaponry.gnucitizen.org/service;1', 'IWeaponryBrowserService');
	
	/* -------------------------------------------------------------------- */
	
	this.openBrowserView = function () {
		return this.browserService.openBrowserView(url);
	};
	
	this.openBrowserPerspective = function () {
		return this.browserService.openBrowserPerspective(url);
	};
};
