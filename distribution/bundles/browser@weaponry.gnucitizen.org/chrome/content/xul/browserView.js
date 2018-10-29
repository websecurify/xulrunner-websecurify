function switchBrowserView(view) {
	let browserViewUri = '';
	
	if (view == '_default') {
		browserViewUri = 'chrome://org.gnucitizen.weaponry.browser/content/xul/browserView.xul';
	} else {
		browserViewUri = 'chrome://org.gnucitizen.weaponry.browser/content/xul/browserView.xul?view=' + view;
	}
	
	document.location = browserViewUri;
}

/* ------------------------------------------------------------------------ */

function reloadBrowserUrl() {
	let $contentBrowser = document.getElementById('browser-view-content-browser');
	
	$contentBrowser.reload();
}

function loadBrowserUrl(url) {
	let $contentBrowser = document.getElementById('browser-view-content-browser');
	
	try {
		$contentBrowser.loadURI(url);
	} catch (e) {
		Components.utils.reportError('cannot load url ' + url);
		
		throw e;
	}
}

/* ------------------------------------------------------------------------ */

function handleNewWindowCommandEvent(event) {
	open(document.location, null, 'all,chrome,resizable,toolbar');
}

function handlePrintSetupCommandEvent(event) {
	PrintUtils.showPageSetup();
}

function handlePrintCommandEvent(event) {
	PrintUtils.print(document.getElementById('browser-view-content-browser').contentWindow);
}

function handleOpenFindbarCommandEvent(event) {
	let $contentFindbar = document.getElementById('browser-view-content-findbar');
	
	$contentFindbar.open();
	$contentFindbar.getElement('findbar-textbox').focus();
}

function handleViewSourceCommandEvent(event) {
	let $contentBrowser = document.getElementById('browser-view-content-browser');
	let selection = $contentBrowser.contentWindow.getSelection();
	
	let range;
	let contents;
	let source;
	
	try {
		range = selection.getRangeAt(0);
		contents = range.cloneContents();
		source = (new XMLSerializer()).serializeToString(contents);
	} catch (e) {
		// pass
	}
	
	let contentDocument = $contentBrowser.contentDocument;
	
	if (!source) {
		range = document.createRange();
		
		range.setStartBefore(contentDocument.documentElement);
		range.setEndAfter(contentDocument.documentElement);
		
		contents = range.cloneContents();
		source = (new XMLSerializer()).serializeToString(contents);
		
		range.detach();
	}
	
	let contentType = contentDocument.contentType;
	let characterSet = $contentBrowser.contentDocument.characterSet;
	
	// NOTE: by default we select UTF-8, this is not right but it works
	characterSet = 'UTF-8';
	//
	
	open('view-source:data:' + contentType + ';charset=' + characterSet + ',' + encodeURIComponent(source), '', 'all,resizable,centerscreen,toolbar=no,scrollbars=yes');
}

function handleBrowserBackCommandEvent(event) {
	let $contentBrowser = document.getElementById('browser-view-content-browser');
	
	$contentBrowser.stop();
	$contentBrowser.goBack();
}

function handleBrowserForwardCommandEvent(event) {
	let $contentBrowser = document.getElementById('browser-view-content-browser');
	
	$contentBrowser.stop();
	$contentBrowser.goForward();
}

function handleBrowserReloadCommandEvent(event) {
	let $contentBrowser = document.getElementById('browser-view-content-browser');
	
	$contentBrowser.stop();
	$contentBrowser.reload();
}

function handleBrowserStopCommandEvent(event) {
	let $contentBrowser = document.getElementById('browser-view-content-browser');
	
	$contentBrowser.stop();
}

function handleBrowserGoCommandEvent(event) {
	let $contentLocationbox = document.getElementById('browser-view-content-locationbox');
	let location = $contentLocationbox.value.trim();
	
	loadBrowserUrl(location);
}

function handleLocationChangeEvent(event) {
	handleBrowserGoCommandEvent();
}

/* ------------------------------------------------------------------------ */

function buildNeterrorUri(type, target, url, description) {
	let $stringbundle = document.getElementById('browser-view-stringbundle');
	
	return 'about:neterror?e=' + encodeURIComponent(type) + '&u=' + encodeURIComponent(url) + '&d=' + encodeURIComponent($stringbundle.getFormattedString(description, [target]));
}

/* ------------------------------------------------------------------------ */

function buildAbsoluteUrl(base, url) {
	let baseURI = weaponryCommon.ioService.newURI(base, null, null);
	
	return weaponryCommon.ioService.newURI(baseURI.resolve(url), null, null).spec;
}

/* ------------------------------------------------------------------------ */

function showContentMenupopupEditGroup() {
	let $undoMenuitem = document.getElementById('browser-view-content-undo-menuitem');
	let $redoMenuitem = document.getElementById('browser-view-content-redo-menuitem');
	let $editSectionMenuseparator = document.getElementById('browser-view-content-edit-section-menuseparator');
	let $cutMenuitem = document.getElementById('browser-view-content-cut-menuitem');
	let $pasteMenuitem = document.getElementById('browser-view-content-paste-menuitem');
	let $deleteMenuitem = document.getElementById('browser-view-content-delete-menuitem');
	
	$undoMenuitem.hidden = false;
	$redoMenuitem.hidden = false;
	$editSectionMenuseparator.hidden = false;
	$cutMenuitem.hidden = false;
	$pasteMenuitem.hidden = false;
	$deleteMenuitem.hidden = false;
}

function hideContentMenupopupEditGroup() {
	let $undoMenuitem = document.getElementById('browser-view-content-undo-menuitem');
	let $redoMenuitem = document.getElementById('browser-view-content-redo-menuitem');
	let $editSectionMenuseparator = document.getElementById('browser-view-content-edit-section-menuseparator');
	let $cutMenuitem = document.getElementById('browser-view-content-cut-menuitem');
	let $pasteMenuitem = document.getElementById('browser-view-content-paste-menuitem');
	let $deleteMenuitem = document.getElementById('browser-view-content-delete-menuitem');
	
	$undoMenuitem.hidden = true;
	$redoMenuitem.hidden = true;
	$editSectionMenuseparator.hidden = true;
	$cutMenuitem.hidden = true;
	$pasteMenuitem.hidden = true;
	$deleteMenuitem.hidden = true;
}

/* ------------------------------------------------------------------------ */

function handleContentMenupopupPopupshowingEvent(event) {
	if (document.popupNode.tagName in {'INPUT': 1, 'TEXTAREA': 1}) {
		showContentMenupopupEditGroup();
	} else {
		hideContentMenupopupEditGroup();
	}
}

/* ------------------------------------------------------------------------ */

function handleContentBrowserDOMTitleChangedEvent(event) {
	let $contentBrowser = document.getElementById('browser-view-content-browser');
	
	if (event.target != $contentBrowser.contentDocument) {
		return;
	}
	
	let newDocumentTitle = '';
	
	if (event.target.title) {
		newDocumentTitle = event.target.title;
	} else {
		newDocumentTitle = document.originalTitle;
	}
	
	if (document.title != newDocumentTitle) {
		document.title = newDocumentTitle;
	}
}

function handleContentBrowserMouseoverEvent(event) {
	if (event.target.tagName != 'A') {
		return;
	}
	
	let $statusbox = document.getElementById('browser-view-statusbox');
	let url = buildAbsoluteUrl(event.target.baseURI, event.target.href);
	
	$statusbox.value = url;
}

function handleContentBrowserCertProblemEvent(event) {
	setTimeout(function () {
		let params = {
			exceptionAdded: false,
			prefetchCert: true,
			location: event.data.location,
		};
		
		openDialog('chrome://pippki/content/exceptionDialog.xul', '', 'chrome,modal,centerscreen', params);
		
		if (params.exceptionAdded) {
			reloadBrowserUrl();
		} else {
			loadBrowserUrl(buildNeterrorUri('nssBadCert', event.data.target, event.data.location, 'cert-problem-message'));
		}
	}, 100);
}

function handleContentBrowserSslErrorEvent(event) {
	setTimeout(function () {
		loadBrowserUrl(buildNeterrorUri('nssBadCert', event.data.target, event.data.location, 'ssl-error-message'));
	}, 100);
}

/* ------------------------------------------------------------------------ */

function handleDOMContentLoadedEvent(event) {
	if (event.target != document) {
		return;
	}
	
	let $contentMenupopup = document.getElementById('browser-view-content-menupopup');
	let $backCommand = document.getElementById('browser-view-back-command');
	let $forwardCommand = document.getElementById('browser-view-forward-command');
	let $reloadCommand = document.getElementById('browser-view-reload-command');
	let $stopCommand = document.getElementById('browser-view-stop-command');
	let $reloadButton = document.getElementById('browser-view-reload-toolbarbutton');
	let $stopButton = document.getElementById('browser-view-stop-toolbarbutton');
	let $contentLocationbox = document.getElementById('browser-view-content-locationbox');
	let $macthrobImage = document.getElementById('browser-view-macthrob-image');
	let $contentBrowser = document.getElementById('browser-view-content-browser');
	let $statusbox = document.getElementById('browser-view-statusbox');
	
	$contentLocationbox.focus();
	
	document.originalTitle = document.title;
	
	let defaultTabURI = weaponryCommon.getPref('org.gnucitizen.weaponry.browser.defaultTabURI');
	
	if (defaultTabURI) {
		$contentBrowser.setAttribute('src', defaultTabURI);
	}
	
	$contentMenupopup.addEventListener('popupshowing', handleContentMenupopupPopupshowingEvent, false);
	$contentBrowser.addEventListener('DOMTitleChanged', handleContentBrowserDOMTitleChangedEvent, false);
	$contentBrowser.addEventListener('mouseover', handleContentBrowserMouseoverEvent, false);
	$contentBrowser.addEventListener('certProblem', handleContentBrowserCertProblemEvent, false);
	$contentBrowser.addEventListener('sslError', handleContentBrowserSslErrorEvent, false);
	
	window.webProgressListener = weaponryCommon.createProgressListener($contentBrowser, CI.nsIWebProgress.NOTIFY_ALL, {
		onStateChange: function (webProgress, request, stateFlags, status) {
			if (stateFlags & CI.nsIWebProgressListener.STATE_IS_NETWORK && stateFlags & CI.nsIWebProgressListener.STATE_START) {
				$reloadCommand.setAttribute('disabled', true);
				$stopCommand.setAttribute('disabled', false);
				
				$reloadButton.hidden = true;
				$stopButton.hidden = false;
			} else
			if (stateFlags & CI.nsIWebProgressListener.STATE_STOP) {
				$reloadCommand.setAttribute('disabled', false);
				$stopCommand.setAttribute('disabled', true);
				
				$reloadButton.hidden = false;
				$stopButton.hidden = true;
			}
			
			if (stateFlags & CI.nsIWebProgressListener.STATE_IS_WINDOW) {
				if (stateFlags & CI.nsIWebProgressListener.STATE_START) {
					$macthrobImage.collapsed = false;
				} else
				if (stateFlags & CI.nsIWebProgressListener.STATE_STOP) {
					$macthrobImage.collapsed = true;
				}
			}
		},
		
		onStatusChange: function (webProgress, request, status, message) {
			$statusbox.value = message;
		},
		
		onLocationChange: function (webProgress, request, location) {
			if (location.spec.toLowerCase().trim() == 'about:blank') {
				$contentLocationbox.value = '';
			} else
			if (!(/^about:neterror/i.test(location.spec))) {
				$contentLocationbox.value = location.spec;
			}
			
			$backCommand.setAttribute('disabled', !$contentBrowser.canGoBack);
			$forwardCommand.setAttribute('disabled', !$contentBrowser.canGoForward);
			
			if (location.schemeIs('http') || location.schemeIs('https')) {
				weaponryCommon.recordFaviconForUrl(location);
			}
		}
	});
	
	window.webProgressListener.install(window);
}

addEventListener('DOMContentLoaded', handleDOMContentLoadedEvent, false);

function handleLoadEvent(event) {
	if (event.target != document) {
		return;
	}
	
	if ('arguments' in window && window.arguments.length > 0) {
		loadBrowserUrl(window.arguments[0]);
	}
}

addEventListener('load', handleLoadEvent, false);

function handleMozSwipeGestureEvent(event) {
	if (event.direction == SimpleGestureEvent.DIRECTION_LEFT) {
		handleBrowserBackCommandEvent(event);
	} else
	if (event.direction == SimpleGestureEvent.DIRECTION_RIGHT) {
		handleBrowserForwardCommandEvent(event);
	}
}

addEventListener('MozSwipeGesture', handleMozSwipeGestureEvent, false);
