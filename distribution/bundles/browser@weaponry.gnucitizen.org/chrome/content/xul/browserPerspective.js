Components.utils.import('resource://gre/modules/XPCOMUtils.jsm');

/* ------------------------------------------------------------------------ */

function switchBrowserPerspective(perspective) {
	let browserPerspectiveUri = '';
	
	if (perspective == '_default') {
		browserPerspectiveUri = 'chrome://org.gnucitizen.weaponry.browser/content/xul/browserPerspective.xul';
	} else {
		browserPerspectiveUri = 'chrome://org.gnucitizen.weaponry.browser/content/xul/browserPerspective.xul?perspective=' + perspective;
	}
	
	document.location = browserPerspectiveUri;
}

/* ------------------------------------------------------------------------ */

function BrowserDOMWindow() {
	this.handlers = [];
}

BrowserDOMWindow.prototype = {
	QueryInterface: XPCOMUtils.generateQI([Components.interfaces.nsIBrowserDOMWindow]),
	
	get wrappedJSObject () {
		return this;
	},
	
	openURI: function(uri, opener, where, context) {
		let handlers = this.handlers;
		let handlersLength = handlers.length;
		
		for (let i = 0; i < handlersLength; i += 1) {
			try {
				let windowOpener = handlers[i](uri, opener, where, context);
				
				if (windowOpener) {
					return windowOpener;
				}
			} catch (e) {
				weaponryCommon.reportError(e);
			}
		}
		
		return null;
	},
	
	isTabContentWindow: function (window) {
		return false;
	},
	
	registerOpenURIHandler: function (handler) {
		this.handlers.push(handler);
	},
	
	unregisterOpenURIHandler: function (handler) {
		let handlers = this.handlers;
		let index = handlers.indexOf(handler);
		
		if (index >= 0) {
			handlers.splice(index, 1);
		}
	}
};

/* ------------------------------------------------------------------------ */

function loadBrowserUrl(url) {
	let $browserTab = ensureBrowserTab();
	
	$browserTab.$iframe.contentWindow.loadBrowserUrl(url);
}

/* ------------------------------------------------------------------------ */

function getBrowserViewUrl() {
	return 'chrome://org.gnucitizen.weaponry.browser/content/xul/browserView.xul' + (location.search ? location.search.replace('perspective=', 'view=') : '');
}

/* ------------------------------------------------------------------------ */

function getBrowserTab() {
	let $richtabpanels = document.getElementById('browser-perspective-tabs-richtabpanels');
	let $selectedPanel = $richtabpanels.selectedPanel;
	
	if ($selectedPanel && $selectedPanel.hasAttribute('browser') && $selectedPanel.getAttribute('browser') == 'true') {
		return $selectedPanel;
	} else {
		let foundNodes = [];
		let nodes = $richtabpanels.childNodes;
		let nodesLength = nodes.length;
		
		for (let i = 0; i < nodesLength; i += 1) {
			let $node = nodes[i];
			
			if ($node.hasAttribute('browser') && $node.getAttribute('browser') == 'true') {
				foundNodes.push($node);
			}
		}
		
		if (foundNodes.length == 1) {
			return null;
		} else {
			// TODO: might want to check which element is the hidden browser tab and ignore it
			return foundNodes[0];
			//
		}
	}
}

function makeBrowserTab() {
	let $stringbundle = document.getElementById('browser-perspective-stringbundle');
	let $richtabpanel = document.createElement('richtabpanel');
	
	$richtabpanel.setAttribute('src', getBrowserViewUrl());
	$richtabpanel.setAttribute('class', 'browser-perspective-tabs-richtabpanels-richtabpanel');
	$richtabpanel.setAttribute('label', $stringbundle.getString('browser-tab-label'));
	$richtabpanel.setAttribute('closable', 'true');
	$richtabpanel.setAttribute('browser', 'true');
	
	let $richtabpanels = document.getElementById('browser-perspective-tabs-richtabpanels');
	
	$richtabpanels.appendChild($richtabpanel);
	
	$richtabpanel.$toolbarbutton.hidden = true;
	$richtabpanel.$menuitem.hidden = true;
	
	$richtabpanel.$iframe.addEventListener('DOMTitleChanged', function (event) {
		if (event.target != $richtabpanel.$iframe.contentDocument) {
			return;
		}
		
		if (event.target.title) {
			$richtabpanel.setAttribute('label', event.target.title);
		} else {
			$richtabpanel.setAttribute('label', $stringbundle.getString('browser-tab-label'));
		}
	}, false);
	
	$richtabpanel.$toolbarbutton.addEventListener('DOMAttrModified', function (event) {
		if (event.attrName == 'checked') {
			if (event.newValue == 'true') {
				$richtabpanel.$iframe.contentDocument.getElementById('browser-view-content-browser').setAttribute('type', 'content-primary');
			} else {
				$richtabpanel.$iframe.contentDocument.getElementById('browser-view-content-browser').setAttribute('type', 'content-targetable');
			}
		}
	}, false);
	
	return $richtabpanel;
}

function openBrowserTab() {
	if (!('$lastBrowserTab' in window) || !window.$lastBrowserTab) {
		window.$lastBrowserTab = makeBrowserTab();
	}
	
	let $richtabpanel = window.$lastBrowserTab;
	
	$richtabpanel.$toolbarbutton.hidden = false;
	$richtabpanel.$menuitem.hidden = false;
	
	let $richtabpanels = document.getElementById('browser-perspective-tabs-richtabpanels');
	
	$richtabpanels.selectedPanel = $richtabpanel;
	
	let $contentLocationbox = $richtabpanel.$iframe.contentDocument.getElementById('browser-view-content-locationbox');
	
	if ($contentLocationbox) {
		$contentLocationbox.focus();
	}
	
	window.$lastBrowserTab = makeBrowserTab();
	
	return $richtabpanel;
}

function closeBrowserTab() {
	let $browserTab = getBrowserTab();
	
	if (!$browserTab) {
		return null;
	}
	
	$browserTab.close();
	
	return $browserTab;
}

function ensureBrowserTab() {
	let $browserTab = getBrowserTab();
	
	if ($browserTab) {
		return $browserTab;
	} else {
		return openBrowserTab();
	}
}

/* ------------------------------------------------------------------------ */

function handleNewWindowCommandEvent(event) {
	// TODO: open by using the currently loaded chrome url
	weaponryBrowser.openBrowserPerspective();
	//
}

function handleOpenTabCommandEvent(event) {
	openBrowserTab();
}

function handleCloseTabCommandEvent(event) {
	closeBrowserTab();
}

function handlePrintSetupCommandEvent(event) {
	let $browserTab = getBrowserTab();
	
	if ($browserTab) {
		let $command = $browserTab.$iframe.contentDocument.getElementById('browser-view-print-setup-command');
		
		$command.doCommand();
	} else {
		// TODO: report message back to user
	}
}

function handlePrintCommandEvent(event) {
	let $browserTab = getBrowserTab();
	
	if ($browserTab) {
		let $command = $browserTab.$iframe.contentDocument.getElementById('browser-view-print-command');
		
		$command.doCommand();
	} else {
		// TODO: report message back to user
	}
}

/* ------------------------------------------------------------------------ */

function handleOpenURI(uri, opener, where, context) {
	if (!opener) {
		return null;
	}
	
	if (weaponryCommon.getParentChromeWindow(weaponryCommon.getParentChromeWindow(opener.top)) != window) {
		return null;
	}
	
	let uri = uri ? uri.spec : 'about:blank';
	let referrer = opener ? opener.QueryInterface(CI.nsIInterfaceRequestor).getInterface(CI.nsIWebNavigation).currentURI : null;
	let $richtabpanel = openBrowserTab();
	let $browser = $richtabpanel.$iframe.contentDocument.getElementById('browser-view-content-browser');
	
	try {
		$browser.loadURI(uri, referrer, null);
	} catch (e) {
		Components.utils.reportError('cannot load uri ' + uri);
		
		throw e;
	}
	
	return $browser.contentWindow;
}

/* ------------------------------------------------------------------------ */

function handleTabsRichtabboxRichtabpanelCloseEvent(event) {
	let $richtabpanels = document.getElementById('browser-perspective-tabs-richtabpanels');
	
	if ($richtabpanels.childNodes.length == 2) {
		if (window.parent == window.top) {
			setTimeout(function () {
				window.parent.window.close();
			}, 100);
		} else {
			let closeEvent = document.createEvent('Event');
			
			closeEvent.initEvent('close', true, true);
			
			if (window.parent.window.dispatchEvent(closeEvent) == false) {
				event.preventDefault();
			}
		}
	}
}

/* ------------------------------------------------------------------------ */

function handleDOMContentLoadedEvent(event) {
	if (event.target != document) {
		return;
	}
	
	openBrowserTab();
	
	let rootWindow = weaponryCommon.getRootChromeWindow(window);
	
	if (!rootWindow.browserDOMWindow) {
		rootWindow.browserDOMWindow = new BrowserDOMWindow();
	}
	
	if (rootWindow.browserDOMWindow && rootWindow.browserDOMWindow.wrappedJSObject.registerOpenURIHandler) {
		rootWindow.browserDOMWindow.wrappedJSObject.registerOpenURIHandler(handleOpenURI);
	}
	
	let $tabsRichtabbox = document.getElementById('browser-perspective-tabs-richtabbox');
	
	$tabsRichtabbox.addEventListener('richtabpanelClose', handleTabsRichtabboxRichtabpanelCloseEvent, false);
}

addEventListener('DOMContentLoaded', handleDOMContentLoadedEvent, false);

function handleLoadEvent(event) {
	if (event.target != document) {
		return;
	}
	
	let defaultBrowserURI = weaponryCommon.getPref('org.gnucitizen.weaponry.browser.defaultBrowserURI');
	
	if (defaultBrowserURI) {
		loadBrowserUrl(defaultBrowserURI);
	}
	
	// NOTE: browser scrollbar bug
	window.$lastBrowserTab.$iframe.contentWindow.location.reload();
	//
}

addEventListener('load', handleLoadEvent, false);

function handleUnloadEvent(event) {
	if (event.target != document) {
		return;
	}
	
	let rootWindow = weaponryCommon.getRootChromeWindow(window);
	
	if (rootWindow.browserDOMWindow && rootWindow.browserDOMWindow.wrappedJSObject.unregisterOpenURIHandler) {
		rootWindow.browserDOMWindow.wrappedJSObject.unregisterOpenURIHandler(handleOpenURI);
	}
}

addEventListener('unload', handleUnloadEvent, false);
