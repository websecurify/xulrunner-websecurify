let EXPORTED_SYMBOLS = ['websecurifyScannerBasic'];

/* ------------------------------------------------------------------------ */

const CR = Components.results;
const CC = Components.classes;
const CI = Components.interfaces;

/* ------------------------------------------------------------------------ */

Components.utils.import('resource://org.gnucitizen.weaponry.common/content/mod/weaponryCommon.jsm');

/* ------------------------------------------------------------------------ */

let websecurifyScannerBasic = new function () {
	let websecurifyScannerBasic = this;
	
	/* -------------------------------------------------------------------- */
	
	this.websecurifyScannerBasicService = weaponryCommon.getService('@basic.scanner.websecurify.gnucitizen.org/service;1', 'IWebsecurifyScannerBasicService');
	
	/* -------------------------------------------------------------------- */
	
	this.loadLibraryEx = function (base, library, scope) {
		if (scope == undefined) {
			scope = {};
		}
		
		if (!('exports' in scope)) {
			scope.exports = {};
		}
		
		scope.require = function (library) {
			let scope = {exports: {}, require: arguments.callee};
			
			weaponryCommon.loadSubscript(base + library, scope);
			
			return scope.exports;
		};
		
		return scope.require(library);
	};
	
	this.loadLibrary = function (library, scope) {
		return this.loadLibraryEx('resource://org.gnucitizen.websecurify.scanner.basic/content/imp/', library, scope);
	};
};
