installHandler('org.gnucitizen.weaponry.common.commonMenu', {
	quit: function () {
		weaponryCommon.quitForcefully();
	},
	
	about: function () {
		weaponryCommon.openAboutBrandWindow();
	},
	
	onDOMContentLoaded: function (event) {
		if (event.target != document) {
			return;
		}
		
		let self = org.gnucitizen.weaponry.common.commonMenu;
		
		if (document.getElementById('common-commandset')) {
			bindHandler('file-menu-quit-command', 'command', self.quit);
			bindHandler('help-menu-about-command', 'command', self.about);
		}
		
		let $stringbundle = document.getElementById('mac-menu-stringbundle');
		let name = weaponryCommon.xulAppInfo.name;
		
		if (document.getElementById('file-menupopup')) {
			document.getElementById('file-menu-quit-menuitem').setAttribute('label', $stringbundle.getFormattedString('quit-label', [name]));
		}
		
		if (document.getElementById('help-menupopup')) {
			document.getElementById('help-menu-about-menuitem').setAttribute('label', $stringbundle.getFormattedString('about-label', [name]));
		}
	}
});
