installHandler('org.gnucitizen.weaponry.common.helpMenu', {
	checkForUpdates: function () {
		weaponryCommon.checkForUpdates();
	},
	
	onDOMContentLoaded: function (event) {
		if (event.target != document) {
			return;
		}
		
		if (document.getElementById('common-commandset')) {
			let self = org.gnucitizen.weaponry.common.helpMenu;
			
			bindHandler('help-menu-check-for-updates-command', 'command', self.checkForUpdates);
		}
	}
});
