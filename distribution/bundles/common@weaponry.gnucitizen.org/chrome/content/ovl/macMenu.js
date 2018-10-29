installHandler('org.gnucitizen.weaponry.common.macMenu', {
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
		
		if (document.getElementById('common-commandset')) {
			let self = org.gnucitizen.weaponry.common.macMenu;
			
			bindHandler('menu_FileQuitItem-command', 'command', self.quit);
			bindHandler('aboutName-command', 'command', self.about);
			
			let $stringbundle = document.getElementById('mac-menu-stringbundle');
			let name = weaponryCommon.brandShortName;
			
			document.getElementById('menu_FileQuitItem').setAttribute('label', $stringbundle.getFormattedString('quit-label', [name]));
			document.getElementById('aboutName').setAttribute('label', $stringbundle.getFormattedString('about-label', [name]));
		}
	}
});
