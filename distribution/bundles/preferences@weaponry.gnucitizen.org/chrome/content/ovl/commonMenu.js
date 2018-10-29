ensureModule('resource://org.gnucitizen.weaponry.preferences/content/mod/weaponryPreferences.jsm', 'weaponryPreferences');

/* ------------------------------------------------------------------------ */

installHandler('org.gnucitizen.weaponry.preferences.commonMenu', {
	openPreferencesWindow: function () {
		weaponryPreferences.openPreferencesWindow();
	},
	
	onDOMContentLoaded: function (event) {
		if (event.target != document) {
			return;
		}
		
		if (document.getElementById('weaponry-preferences-tools-menu-open-preferences-command')) {
			let self = org.gnucitizen.weaponry.preferences.commonMenu;
			
			bindHandler('weaponry-preferences-tools-menu-open-preferences-command', 'command', self.openPreferencesWindow);
		}
	}
});
