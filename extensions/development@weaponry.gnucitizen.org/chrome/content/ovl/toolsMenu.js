installHandler('org.gnucitizen.weaponry.development.toolsMenu', {
	reloadUi: function () {
		weaponryCommon.reloadAllWindows();
	},
	
	clearCookies: function () {
		weaponryCommon.clearCookies();
	},
	
	dumpHeap: function () {
		QueryInterface(CI.nsIInterfaceRequestor).getInterface(CI.nsIDOMWindowUtils).garbageCollect(CC['@mozilla.org/cycle-collector-logger;1'].createInstance(CI.nsICycleCollectorListener));
	},
	
	exitNormally: function () {
		weaponryCommon.quitNormally();
	},
	
	exitForcefully: function () {
		weaponryCommon.quitForcefully();
	},
	
	openMemoryWindow: function () {
		weaponryCommon.openWindow(null, 'chrome://org.gnucitizen.weaponry.development/content/htm/memory.htm', '', 'all,chrome,resizable,centerscreen,width=600,height=400');
	},
	
	openColorsWindow: function () {
		weaponryCommon.openWindow(null, 'chrome://org.gnucitizen.weaponry.development/content/htm/colors.htm', '', 'all,chrome,resizable,centerscreen,width=400,height=600');
	},
	
	openRequestsWindow: function () {
		weaponryCommon.openWindow(null, 'chrome://org.gnucitizen.weaponry.development/content/htm/requests.htm', '', 'all,chrome,resizable,centerscreen,width=600,height=400');
	},
	
	openInspectorWindow: function () {
		weaponryCommon.openWindow(null, 'chrome://inspector/content/inspector.xul', '', 'all,chrome,resizable,centerscreen');
	},
	
	openJsshellWindow: function () {
		weaponryCommon.openWindow(null, 'chrome://jsshell/content/jsshell.xul', '', 'all,chrome,resizable,centerscreen,width=500,height=400,scrollbars=yes');
	},
	
	onDOMContentLoaded: function (event) {
		if (event.target != document) {
			return;
		}
		
		if (document.getElementById('tools-menupopup')) {
			let self = org.gnucitizen.weaponry.development.toolsMenu;
			
			bindHandler('weaponry-development-tools-menu-reload-ui-command', 'command', self.reloadUi);
			bindHandler('weaponry-development-tools-menu-memory-menuitem', 'command', self.openMemoryWindow);
			bindHandler('weaponry-development-tools-menu-colors-menuitem', 'command', self.openColorsWindow);
			bindHandler('weaponry-development-tools-menu-requests-menuitem', 'command', self.openRequestsWindow);
			bindHandler('weaponry-development-tools-menu-inspector-menuitem', 'command', self.openInspectorWindow);
			bindHandler('weaponry-development-tools-menu-jsshell-menuitem', 'command', self.openJsshellWindow);
			bindHandler('weaponry-development-tools-menu-clear-cookies-menuitem', 'command', self.clearCookies);
			bindHandler('weaponry-development-tools-menu-dump-heap-menuitem', 'command', self.dumpHeap);
			bindHandler('weaponry-development-tools-menu-exit-normally-menuitem', 'command', self.exitNormally);
			bindHandler('weaponry-development-tools-menu-exit-forcefully-menuitem', 'command', self.exitForcefully);
		}
	}
});
