Components.utils.import('resource://org.gnucitizen.weaponry.common/content/mod/weaponryCommon.jsm');

/* ------------------------------------------------------------------------ */

$(document).ready(function () {
	let bundle = weaponryCommon.getBundle('chrome://org.gnucitizen.weaponry.development/locale/htm/memory.properties');
	
	document.title = bundle.formatStringFromName('page-title', [weaponryCommon.xulAppInfo.name], 1);
});
