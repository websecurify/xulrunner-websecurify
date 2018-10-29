ensureModule('resource://org.gnucitizen.weaponry.preferences/content/mod/weaponryPreferences.jsm', 'weaponryPreferences');

/* ------------------------------------------------------------------------ */

installHandler('org.gnucitizen.weaponry.preferences.macMenu', {
	openPreferencesWindow: function () {
		weaponryPreferences.openPreferencesWindow();
	},
	
	onDOMContentLoaded: function (event) {
		if (event.target != document) {
			return;
		}
		
		if (document.getElementById('menu_preferences-command')) {
			let self = org.gnucitizen.weaponry.preferences.macMenu;
			
			bindHandler('menu_preferences-command', 'command', self.openPreferencesWindow);
		}
	}
});
