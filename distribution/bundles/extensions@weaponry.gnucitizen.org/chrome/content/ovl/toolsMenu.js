// TODO: open and check addons window specific to the current configuration, i.e org.gnucitizen.weaponry.extensions.eanbled
installHandler('org.gnucitizen.weaponry.extensions.toolsMenu', {
	openAddOns: function () {
		weaponryCommon.openAddOnsWindow();
	},
	
	onDOMContentLoaded: function (event) {
		if (event.target != document) {
			return;
		}
		
		if (document.getElementById('tools-menupopup')) {
			bindHandler('weaponry-extensions-tools-menu-open-add-ons-command', 'command', 'return org.gnucitizen.weaponry.extensions.toolsMenu.openAddOns(event);');
		}
	}
});
//
