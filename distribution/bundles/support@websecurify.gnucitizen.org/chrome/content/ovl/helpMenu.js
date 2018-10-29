installHandler('org.gnucitizen.weaponry.support.helpMenu', {
	openHelp: function () {
		weaponryCommon.openUri('http://www.websecurify.com/wiki');
	},
	
	openSendFeedback: function () {
		weaponryCommon.openUri('http://www.websecurify.com/feedback');
	},
	
	openReportBugs: function () {
		weaponryCommon.openUri('http://www.websecurify.com/bugs');
	},
	
	openRequestFeatures: function () {
		weaponryCommon.openUri('http://www.websecurify.com/bugs');
	},
	
	gotoWeaponry: function () {
		weaponryCommon.openUri('http://www.websecurify.com');
	},
	
	gotoGnucitizen: function () {
		weaponryCommon.openUri('http://www.gnucitizen.com');
	},
	
	onDOMContentLoaded: function (event) {
		if (event.target != document) {
			return;
		}
		
		if (document.getElementById('help-menupopup')) {
			let self = org.gnucitizen.weaponry.support.helpMenu;
			
			bindHandler('websecurify-support-help-menu-help-menuitem', 'command', self.openHelp);
			bindHandler('websecurify-support-help-menu-send-feedback-menuitem', 'command', self.openSendFeedback);
			bindHandler('websecurify-support-help-menu-report-bugs-menuitem', 'command', self.openReportBugs);
			bindHandler('websecurify-support-help-menu-request-features-menuitem', 'command', self.openRequestFeatures);
			bindHandler('websecurify-support-help-menu-go-to-websecurify-menuitem', 'command', self.gotoWeaponry);
			bindHandler('websecurify-support-help-menu-go-to-gnucitizen-menuitem', 'command', self.gotoGnucitizen);
		}
	}
});
