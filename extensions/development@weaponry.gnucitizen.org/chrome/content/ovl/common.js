function log() {
	if (arguments.length == 0) {
		throw new Error('no arguments provided');
	}
	
	if (arguments[0] instanceof HTMLElement || arguments[0] instanceof SVGElement || arguments[0] instanceof XULElement) {
		weaponryCommon.logElement.apply(weaponryCommon, arguments);
	} else
	if (weaponryCommon.isString(arguments[0])) {
		weaponryCommon.logString.apply(weaponryCommon, arguments);
	} else {
		weaponryCommon.logObject.apply(weaponryCommon, arguments);
	}
}

/* ------------------------------------------------------------------------ */

installHandler('org.gnucitizen.weaponry.development.common', {
	onLoad: function (event) {
		if (event.target != document) {
			return;
		}
		
		if (weaponryCommon.getPref('toolkit.defaultChromeURI') == document.location && weaponryCommon.getPref('org.gnucitizen.weaponry.development.warn') == true) {
			let $stringbundle = document.getElementById('weaponry-development-common-stringbundle');
			
			setTimeout(function () {
				let result = alertCheck($stringbundle.getString('development-extension-enabled-notification-message'), $stringbundle.getString('development-extension-enabled-do-not-warn-message'));
				
				if (result.value == true) {
					weaponryCommon.setPref('org.gnucitizen.weaponry.development.warn', false);
				}
			}, 1000);
		}
	}
});
