installHandler('org.gnucitizen.weaponry.common.toolsMenu', {
	openErrorConsole: function () {
		weaponryCommon.openErrorConsoleWindow();
	},
	
	onDOMContentLoaded: function (event) {
		if (event.target != document) {
			return;
		}
		
		if (document.getElementById('tools-menupopup')) {
			bindHandler('tools-menu-open-error-console-command', 'command', 'return org.gnucitizen.weaponry.common.toolsMenu.openErrorConsole(event);');
		}
	}
});
