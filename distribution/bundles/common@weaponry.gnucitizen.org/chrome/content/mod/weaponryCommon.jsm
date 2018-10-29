let EXPORTED_SYMBOLS = ['weaponryCommon'];

/* ------------------------------------------------------------------------ */

const CR = Components.results;
const CC = Components.classes;
const CI = Components.interfaces;

/* ------------------------------------------------------------------------ */

Components.utils.import('resource://gre/modules/XPCOMUtils.jsm');

/* ------------------------------------------------------------------------ */

let weaponryCommon = new function () {
	let weaponryCommon = this;
	
	/* -------------------------------------------------------------------- */
	
	this.isObject = function (value) {
		return value !== null && typeof(value) == 'object';
	};
	
	this.isHash = function (value) {
		return value !== null && (typeof(value) == 'object' && value.constructor && (/^function\sObject/).test(value.constructor.toString()));
	};
	
	this.isArray = function (value) {
		return value !== null && (typeof(value) == 'object' && value.constructor && (/^function\sArray/).test(value.constructor.toString()));
	};
	
	this.isString = function (value) {
		return value !== null && (typeof(value) == 'string' || (typeof(value) == 'object' && value.constructor && (/^function\sString/).test(value.constructor.toString())));
	};
	
	this.isNumber = function (value) {
		return value !== null && (typeof(value) == 'number' || (typeof(value) == 'object' && value.constructor && (/^function\sNumber/).test(value.constructor.toString())));
	};
	
	this.isBoolean = function (value) {
		return value !== null && (typeof(value) == 'boolean' || (typeof(value) == 'object' && value.constructor && (/^function\sBoolean/).test(value.constructor.toString())));
	};
	
	this.isArguments = function (value) {
		return value !== null && (typeof(value) == 'object' && value.length != undefined && value.callee != undefined);
	};
	
	this.isFunction = function (value) {
		return value !== null && (typeof(value) == 'function' && value.constructor && (/^function\sFunction/).test(value.constructor.toString()));
	};
	
	/* -------------------------------------------------------------------- */
	
	this.isNone = function (value) {
		return value == undefined || value == null;
	};
	
	this.isEmpty = function (value) {
		if (this.isNone(value)) {
			return true;
		} else
		if (this.isString(value) || this.isArray(value)) {
			return value.length < 1;
		} else
		if (this.isNumber(value)) {
			return false;
		} else
		if (this.isObject(value)) {
			for (let property in value) {
				if (value.hasOwnProperty(property)) {
					return false;
				}
			}
			
			return true;
		} else {
			return false;
		}
	};
	
	/* -------------------------------------------------------------------- */
	
	this.getIface = function (iface) {
		if (this.isString(iface)) {
			return CI[iface];
		} else {
			return iface;
		}
	};
	
	this.getService = function (className, iface) {
		let componentClass = CC[className];
		
		try {
			if (!iface) {
				return componentClass.getService().wrappedJSObject;
			} else {
				return componentClass.getService(this.getIface(iface));
			}
		} catch (e) {
			Components.utils.reportError(e);
			Components.utils.reportError('cannot get service for ' + className + ' with ' + (iface ? 'interface ' + iface : 'with wrappedJSObject'));
			
			return null;
		}
	};
	
	this.createInstance = function (className, iface) {
		let componentClass = CC[className];
		
		try {
			if (!iface) {
				return componentClass.createInstance().wrappedJSObject;
			} else {
				return componentClass.createInstance(this.getIface(iface));
			}
		} catch (e) {
			Components.utils.reportError(e);
			Components.utils.reportError('cannot create instance for ' + className + ' with ' + (iface ? 'interface ' + iface : 'with wrappedJSObject'));
			
			return null;
		}
	};
	
	/* -------------------------------------------------------------------- */
	
	this.createServiceGetter = function (name, className, iface) {
		XPCOMUtils.defineLazyServiceGetter(this, name, className, iface);
	};
	
	/* -------------------------------------------------------------------- */
	
	this.componentManager = Components.manager.QueryInterface(CI.nsIComponentRegistrar);
	
	/* -------------------------------------------------------------------- */
	
	this.createServiceGetter('weaponryCommonService', '@common.weaponry.gnucitizen.org/service;1', 'IWeaponryCommonService');
	this.createServiceGetter('categoryManager', '@mozilla.org/categorymanager;1', 'nsICategoryManager');
	this.createServiceGetter('appStartup', '@mozilla.org/toolkit/app-startup;1', 'nsIAppStartup');
	this.createServiceGetter('xulRuntime', '@mozilla.org/xre/app-info;1', 'nsIXULRuntime');
	this.createServiceGetter('xulAppInfo', '@mozilla.org/xre/app-info;1', 'nsIXULAppInfo');
	this.createServiceGetter('appShellService', '@mozilla.org/appshell/appShellService;1', 'nsIAppShellService');
	this.createServiceGetter('systemInfo', '@mozilla.org/system-info;1', 'nsIPropertyBag2');
	this.createServiceGetter('ioService', '@mozilla.org/network/io-service;1', 'nsIIOService');
	this.createServiceGetter('protocolProxyService', '@mozilla.org/network/protocol-proxy-service;1', 'nsIProtocolProxyService');
	this.createServiceGetter('socketTransportService', '@mozilla.org/network/socket-transport-service;1', 'nsISocketTransportService');
	this.createServiceGetter('windowWatcher', '@mozilla.org/embedcomp/window-watcher;1', 'nsIWindowWatcher');
	this.createServiceGetter('windowMediator', '@mozilla.org/appshell/window-mediator;1', 'nsIWindowMediator');
	this.createServiceGetter('stringBundleService', '@mozilla.org/intl/stringbundle;1', 'nsIStringBundleService');
	this.createServiceGetter('promptService', '@mozilla.org/embedcomp/prompt-service;1', 'nsIPromptService');
	this.createServiceGetter('consoleService', '@mozilla.org/consoleservice;1', 'nsIConsoleService');
	this.createServiceGetter('preferencesService', '@mozilla.org/preferences-service;1', 'nsIPrefBranch');
	this.createServiceGetter('updateManager', '@mozilla.org/updates/update-manager;1', 'nsIUpdateManager');
	this.createServiceGetter('updatePrompt', '@mozilla.org/updates/update-prompt;1', 'nsIUpdatePrompt');
	this.createServiceGetter('certOverrideService', '@mozilla.org/security/certoverride;1', 'nsICertOverrideService');
	this.createServiceGetter('observerService', '@mozilla.org/observer-service;1', 'nsIObserverService');
	this.createServiceGetter('threadManager', '@mozilla.org/thread-manager;1', 'nsIThreadManager');
	this.createServiceGetter('clipboardHelper', '@mozilla.org/widget/clipboardhelper;1', 'nsIClipboardHelper');
	this.createServiceGetter('subscriptLoader', '@mozilla.org/moz/jssubscript-loader;1', 'mozIJSSubScriptLoader');
	this.createServiceGetter('chromeRegistry', '@mozilla.org/chrome/chrome-registry;1', 'nsIChromeRegistry');
	this.createServiceGetter('uriLoader', '@mozilla.org/uriloader;1', 'nsIURILoader');
	this.createServiceGetter('externalProtocolService', '@mozilla.org/uriloader/external-protocol-service;1', 'nsIExternalProtocolService');
	this.createServiceGetter('proxyManager', '@mozilla.org/xpcomproxy;1', 'nsIProxyObjectManager');
	this.createServiceGetter('directoryService', '@mozilla.org/file/directory_service;1', 'nsIDirectoryService');
	this.createServiceGetter('mozstorageService', '@mozilla.org/storage/service;1', 'mozIStorageService');
	this.createServiceGetter('atomService', '@mozilla.org/atom-service;1', 'nsIAtomService');
	this.createServiceGetter('cookieService', '@mozilla.org/cookieService;1', 'nsICookieService');
	this.createServiceGetter('navHistoryService', '@mozilla.org/browser/nav-history-service;1', 'nsINavHistoryService');
	this.createServiceGetter('faviconService', '@mozilla.org/browser/favicon-service;1', 'nsIFaviconService');
	this.createServiceGetter('cookieManager', '@mozilla.org/cookiemanager;1', 'nsICookieManager');
	
	/* -------------------------------------------------------------------- */
	
	this.commonBundle = this.stringBundleService.createBundle('chrome://org.gnucitizen.weaponry.common/locale/mod/weaponryCommon.properties');
	this.brandBundle = this.stringBundleService.createBundle('chrome://branding/locale/brand.properties');
	
	/* -------------------------------------------------------------------- */
	
	this.enumerateQueryIfaces = function (subject) {
		let queryInterfaces = [];
		
		for (let queryInterface in CI) {
			try {
				subject.QueryInterface(CI[queryInterface]);
				
				queryInterfaces.push(queryInterface);
			} catch (e) {
				// pass
			}
		}
		
		return queryInterfaces;
	};
	
	this.enumerateGetIfaces = function (subject) {
		try {
			subject.QueryInterface(CI.nsIInterfaceRequestor);
		} catch (e) {
			return [];
		}
		
		let getInterfaces = [];
		
		for (let getInterface in CI) {
			try {
				subject.getInterface(CI[getInterface]);
				
				getInterfaces.push(getInterface);
			} catch (e) {
				// pass
			}
		}
		
		return getInterfaces;
	};
	
	/* -------------------------------------------------------------------- */
	
	this.enumerateComponents = function (category) {
		let components = [];
		let enumerator = this.categoryManager.enumerateCategory(category);
		
		while (enumerator.hasMoreElements()) {
			let entry = enumerator.getNext().QueryInterface(CI.nsISupportsCString);
			let value = this.categoryManager.getCategoryEntry(category, entry);
			let type = value.split(',')[0];
			let contractID = value.split(',')[1];
			
			if (!contractID) {
				type = 'instance';
				contractID = value;
			}
			
			components.push({category:category, entry:entry, type:type, contractID:contractID});
		}
		
		return components;
	};
	
	this.retrieveComponents = function (category, iface) {
		let components = [];
		let componentsInfo = this.enumerateComponents(category);
		let componentsInfoLength = componentsInfo.length;
		
		let i;
		let componentInfo;
		
		for (i = 0; i < componentsInfoLength; i += 1) {
			componentInfo = componentsInfo[i];
			
			if (componentInfo.type == 'service') {
				components.push(this.getService(componentInfo.contractID, iface));
			} else {
				components.push(this.createInstance(componentInfo.contractID, iface));
			}
		}
		
		return components;
	};
	
	/* -------------------------------------------------------------------- */
	
	this.quitNormally = function () {
		this.appStartup.quit(Components.interfaces.nsIAppStartup.eAttemptQuit);
	};
	
	this.quitForcefully = function () {
		this.appStartup.quit(Components.interfaces.nsIAppStartup.eForceQuit);
	};
	
	this.quitDefinitely = function () {
		this.appStartup.quit(Components.interfaces.nsIAppStartup.eForceQuit);
	};
	
	this.quit = function () {
		return this.quitNormally();
	};
	
	/* -------------------------------------------------------------------- */
	
	this.checkForUpdates = function () {
		if (!this.updateManager) {
			this.brandedAlert(null, this.commonBundle.GetStringFromName('update-manager-not-available-failure-message'));
			
			return;
		}
		
		if (this.updateManager.activeUpdate && this.updateManager.activeUpdate.state == 'pending') {
			this.updatePrompt.showUpdateDownloaded(this.updateManager.activeUpdate);
		} else {
			this.updatePrompt.checkForUpdates();
		}
	};
	
	/* -------------------------------------------------------------------- */
	
	this.getWindowByUrl = function (url) {
		let window = null;
		let enumerator = this.windowMediator.getEnumerator(null);
		
		while (enumerator.hasMoreElements()) {
			window = enumerator.getNext();
			
			if (window.location == url) {
				break;
			}
		}
		
		return window;
	};
	
	this.getWindowByName = function (name) {
		return this.windowWatcher.getWindowByName(name, null);
	};
	
	this.getWindowByType = function (type) {
		return this.windowMediator.getMostRecentWindow(type);
	};
	
	this.getWindowByDocShell = function (docShell) {
		if (!(docShell instanceof CI.nsIInterfaceRequestor)) {
			return null;
		}
		
	    return docShell.getInterface(CI.nsIDOMWindow);
	};
	
	/* -------------------------------------------------------------------- */
	
	this.getAllWindows = function () {
		let windows = [];
		let enumerator = this.windowMediator.getEnumerator(null);
		
		while (enumerator.hasMoreElements()) {
			windows.push(enumerator.getNext());
		}
		
		return windows;
	};
	
	this.getAllWindowsByType = function (type) {
		let windows = [];
		let enumerator = this.windowMediator.getEnumerator(type);
		
		while (enumerator.hasMoreElements()) {
			windows.push(enumerator.getNext());
		}
		
		return windows;
	};
	
	/* -------------------------------------------------------------------- */
	
	this.reloadAllWindows = function () {
		let windows = this.getAllWindows();
		let windowsLength = windows.length;
		
		for (let i = 0; i < windowsLength; i += 1) {
			windows[i].location.reload(true);
		}
	};
	
	/* -------------------------------------------------------------------- */
	
	this.getHiddenChromeWindow = function () {
		return this.appShellService.hiddenDOMWindow;
	};
	
	this.getDefaultChromeWindow = function () {
		return this.getWindowByUrl(this.getPref('toolkit.defaultChromeURI'));
	};
	
	this.getRootChromeWindow = function (window) {
		return window.QueryInterface(CI.nsIInterfaceRequestor).getInterface(CI.nsIWebNavigation).QueryInterface(CI.nsIDocShellTreeItem).rootTreeItem.QueryInterface(CI.nsIInterfaceRequestor).getInterface(CI.nsIDOMWindow);
	};
	
	this.getParentChromeWindow = function (window) {
		if (!(window instanceof CI.nsIDOMChromeWindow)) {
			window = window.top;
		}
		
		let parent = window.QueryInterface(CI.nsIInterfaceRequestor).getInterface(CI.nsIWebNavigation).QueryInterface(CI.nsIDocShellTreeItem).parent;
		
		if (parent) {
			parent = parent.QueryInterface(CI.nsIInterfaceRequestor).getInterface(CI.nsIDOMWindow);
		} else {
			parent = window.parent;
		}
		
		if (parent.wrappedJSObject) {
			return parent.wrappedJSObject;
		} else {
			return parent;
		}
	};
	
	this.getChannelWindow = function (subject) {
		let channel = subject.QueryInterface(CI.nsIChannel);
		let webProgress = null;
		let window = null;
		
		try {
			if (channel.notificationCallbacks) {
				webProgress = channel.notificationCallbacks.getInterface(CI.nsIWebProgress);
			}
		} catch (e) {
			// pass
		}
		
		try {
			if (!webProgress && channel.loadGroup && channel.loadGroup.groupObserver) {
				webProgress = channel.loadGroup.groupObserver.QueryInterface(CI.nsIWebProgress);
			}
		} catch (e) {
			// pass
		}
		
		try {
			if (webProgress) {
				window = webProgress.DOMWindow;
			}
		} catch (e) {
			// pass
		}
		
		return window;
	};
	
	/* -------------------------------------------------------------------- */
	
	this.lookupParentWindowByType = function (window, type) {
		let parentWindow;
		let documentElement;
		
		while (true) {
			parentWindow = this.getParentChromeWindow(window);
			documentElement = parentWindow.document.documentElement;
			
			if (documentElement.hasAttribute('windowtype') && documentElement.getAttribute('windowtype') == type) {
				return parentWindow;
			} else {
				window = parentWindow;
			}
			
			if (parentWindow == window) {
				return null;
			}
		}
	};
	
	/* -------------------------------------------------------------------- */
	
	this.openWindow = function (parentWindow, url, windowName, features) {
		let args = null;
		
		if (arguments.length > 4) {
			args = this.createInstance('@mozilla.org/array;1', 'nsIMutableArray');
			
			let argumentsLength = arguments.length;
			
			let i, variant;
			
			for (i = 4; i < argumentsLength; i += 1) {
				variant = this.createInstance('@mozilla.org/variant;1', 'nsIWritableVariant');
				
				variant.setFromVariant(arguments[i]);
				
				args.appendElement(variant, false);
			}
		}
		
		return this.windowWatcher.openWindow(parentWindow, url, windowName, features, args);
	};
	
	this.openWindowOnce = function (parentWindow, type, url, windowName, features) {
		let window = this.getWindowByType(type);
		
		if (!window) {
			let args = [parentWindow];
			let argumentsLength = arguments.length;
			
			let i;
			
			for (i = 2; i < argumentsLength; i += 1) {
				args.push(arguments[i]);
			}
			
			return this.openWindow.apply(this, args);
		} else {
			window.focus();
			
			return window;
		}
	};
	
	/* -------------------------------------------------------------------- */
	
	this.openAddOnsWindow = function () {
		return this.openWindowOnce(null, 'Addons:Manager', 'chrome://mozapps/content/extensions/extensions.xul', null, 'all,chrome,resizable,centerscreen,toolbar=yes');
	};
	
	this.openErrorConsoleWindow = function () {
		return this.openWindowOnce(null, 'global:console', 'chrome://global/content/console.xul', null, 'all,chrome,resizable,centerscreen,toolbar=yes');
	};
	
	/* -------------------------------------------------------------------- */
	
	this.openAboutBrandWindow = function () {
		let brandingAboutURI = this.getPref('org.gnucitizen.weaponry.common.brandingAboutURI');
		
		if (brandingAboutURI) {
			return this.openWindowOnce(null, 'branding:about', brandingAboutURI, null, 'all,chrome,resizable,centerscreen');
		} else {
			// TODO: show default about
		}
	};
	
	/* -------------------------------------------------------------------- */
	
	this.getWindowDocumentCoreURI = function (window) {
		let webNavigation = window.QueryInterface(CI.nsIInterfaceRequestor).getInterface(CI.nsIWebNavigation);
		let docShell = webNavigation.QueryInterface(CI.nsIDocShell);
		
		return docShell.currentDocumentChannel.URI.spec;
	};
	
	/* -------------------------------------------------------------------- */
	
	this.getBundle = function (bundleUrl) {
		return this.stringBundleService.createBundle(bundleUrl);
	};
	
	this.getBrandString = function (key) {
		return this.brandBundle.GetStringFromName(key);
	};
	
	/* -------------------------------------------------------------------- */
	
	this.brandFullName = this.getBrandString('brandFullName');
	this.brandShortName = this.getBrandString('brandShortName');
	this.vendorShortName = this.getBrandString('vendorShortName');
	
	/* -------------------------------------------------------------------- */
	
	this.brandedAlert = function (window, message) {
		return this.alert(window, this.brandShortName, message);
	};
	
	this.brandedAlertCheck = function (window, message, checkMessage) {
		return this.alertCheck(window, this.brandShortName, message, checkMessage);
	};
	
	this.alert = function (window, title, message) {
		if (arguments.length == 2) {
			return this.brandedAlert(window, title); // where title is actually message
		} else {
			return this.promptService.alert(window, title, message);
		}
	};
	
	this.alertCheck = function (window, title, message, checkMessage) {
		if (arguments.length == 3) {
			return this.brandedAlertCheck(window, title, message) // where title is actually message and message is checkMessage
		} else {
			let result = {value: false, successful: false};
			
			result.successful = this.promptService.alertCheck(window, title, message, checkMessage, result);
			
			return result;
		}
	};
	
	/* -------------------------------------------------------------------- */
	
	this.brandedConfirm = function (window, message) {
		return this.confirm(window, this.brandShortName, message);
	};
	
	this.brandedConfirmCheck = function (window, message, checkMessage) {
		return this.confirmCheck(window, this.brandShortName, message, checkMessage);
	};
	
	this.confirm = function (window, title, message) {
		if (arguments.length == 2) {
			return this.brandedConfirm(window, title); // where title is acutally message
		} else {
			return this.promptService.confirm(window, title, message);
		}
	};
	
	this.confirmCheck = function (window, title, message, checkMessage) {
		if (arguments.length == 3) {
			return this.brandedConfirmCheck(window, title, message);  // where title is actually message and message is checkMessage
		} else {
			let result = {value: false, successful: false};
			
			result.successful = this.promptService.confirmCheck(window, title, message, checkMessage, result);
			
			return result;
		}
	};
	
	/* -------------------------------------------------------------------- */
	
	this.brandedPrompt = function (window, message, value) {
		return this.prompt(window, this.brandShortName, message, value);
	};
	
	this.prompt = function (window, title, message, value) {
		if (arguments.length == 3) {
			return this.brandedPrompt(window, title, message); // where title is acutally message and message is acutally value
		} else {
			let result = {value: value, successful: false};
			
			result.successful = this.promptService.prompt(window, title, message, result, null, {});
			
			return result;
		}
	};
	
	/* -------------------------------------------------------------------- */
	
	this.logMessage = function(message) {
		let parts = [];
		let argumentsLength = arguments.length;
		
		let i;
		
		for (i = 0; i < argumentsLength; i += 1) {
			parts.push(arguments[i]);
		}
		
		let result = parts.join(' ');
		
		if (dump) {
			dump(result + '\n');
		}
		
		return this.consoleService.logStringMessage(result);
	};
	
	this.logError = function (error) {
		this.logMessage(error.toString());
	}
	
	this.logException = function (exception) {
		this.logMessage(exception.toString());
	};
	
	/* -------------------------------------------------------------------- */
	
	this.logString = function (string) {
		return this.logMessage.apply(this, arguments);
	};
	
	this.logObject = function (object) {
		let parts = [];
		let argumentsLength = arguments.length;
		
		let i;
		
		for (i = 0; i < argumentsLength; i += 1) {
			parts.push(JSON.stringify(arguments[i]));
		}
		
		return this.logMessage.apply(this, parts);
	};
	
	this.logElement = function ($element) {
		let parts = [];
		let argumentsLength = arguments.length;
		
		let i;
		
		for (i = 0; i < argumentsLength; i += 1) {
			parts.push((new $element.ownerDocument.defaultView.XMLSerializer()).serializeToString(arguments[i]));
		}
		
		return this.logMessage.apply(this, parts);
	};
	
	/* -------------------------------------------------------------------- */
	
	this.getPref = function (key, type) {
		// TODO: needs refactoring, the code needs to check of the key exists before performing this check here
		if (!type) {
			let prefType = this.preferencesService.getPrefType(key);
			
			if (prefType == CI.nsIPrefBranch.PREF_STRING) {
				type = 'Char';
			} else
			if (prefType == CI.nsIPrefBranch.PREF_INT) {
				type = 'Int';
			} else
			if (prefType == CI.nsIPrefBranch.PREF_BOOL) {
				type = 'Bool';
			} else
			if (prefType == CI.nsIPrefBranch.PREF_INVALID) {
				return null;
			} else {
				type = 'Char';
			}
		}
		//
		
		try {
			return this.preferencesService['get' + type + 'Pref'](key);
		} catch (e) {
			Components.utils.reportError(e);
			
			return null;
		}
	};
	
	this.setPref = function (key, value, type) {
		if (!type) {
			type = typeof(value);
		}
		
		// TODO: use the is functions (at the top) to detect the type properly
		if (type == 'string') {
			return this.preferencesService.setCharPref(key, value);
		} else
		if (type == 'number') {
			return this.preferencesService.setIntPref(key, value);
		} else
		if (type == 'boolean') {
			return this.preferencesService.setBoolPref(key, value);
		} else {
			throw new Error('unknown type: ' + type);
		}
		//
	};
	
	this.lockPref = function (key) {
		this.preferencesService.lockPref(key);
	};
	
	/* -------------------------------------------------------------------- */
	
	this.allowCertificate = function (host, port, certificate, status, isTemporary) {
		let flags = 0;
		
		if (status.isUntrusted) {
			flags |= this.certOverrideService.ERROR_UNTRUSTED;
		}
		
		if (status.isDomainMismatch) {
			flags |= this.certOverrideService.ERROR_MISMATCH;
		}
		
		if (status.isNotValidAtThisTime) {
			flags |= this.certOverrideService.ERROR_TIME;
		}
		
		this.certOverrideService.rememberValidityOverride(host, port, certificate, flags, isTemporary);
	};
	
	this.allowChannelCertificate = function (channel, isTemporary) {
		let uri = channel.URI.QueryInterface(Components.interfaces.nsIURI);
		let host = uri.host;
		let port = uri.port;
		
		if (port == -1) {
			let scheme = uri.scheme.toUpperCase();
			
			if (scheme == 'HTTP') {
				port = 80;
			} else
			if (scheme == 'HTTPS') {
				port = 443;
			} else
			if (scheme == 'FTP') {
				port = 21;
			}
		}
		
		if (channel.securityInfo) {
			let securityInfo = channel.securityInfo.QueryInterface(Components.interfaces.nsISSLStatusProvider);
			let sslStatus = securityInfo.SSLStatus.QueryInterface(Components.interfaces.nsISSLStatus);
			
			this.allowCertificate(host, port, sslStatus.serverCert, sslStatus, isTemporary);
		}
	};
	
	/* -------------------------------------------------------------------- */
	
	this.notifyObservers = function (subject, topic, data) {
		if (this.isArray(topic)) {
			let topics = topic;
			let topicsLength = topics.length;
			
			let i;
			
			for (i = 0; i < topicsLength; i += 1) {
				this.observerService.notifyObservers(subject, topics[i], data);
			}
		} else {
			this.observerService.notifyObservers(subject, topic, data);
		}
	};
	
	this.createObserver = function (topics, handler) {
		function Observer(topics, handler) {
			this.topics = topics;
			this.handler = handler;
		}
		
		Observer.prototype = {
			QueryInterface: XPCOMUtils.generateQI([CI.nsIObserver]),
			
			observe: function (subject, topic, data) {
				return this._handle(subject, topic, data);
			},
			
			register: function () {
				let topics = this.topics;
				let topicsLength = topics.length;
				
				let i;
				
				for (i = 0; i < topicsLength; i += 1) {
					weaponryCommon.observerService.addObserver(this, topics[i], false);
				}
			},
			
			unregister: function () {
				let topics = this.topics;
				let topicsLength = topics.length;
				
				let i;
				
				for (i = 0; i < topicsLength; i += 1) {
					weaponryCommon.observerService.removeObserver(this, topics[i], false);
				}
			},
			
			install: function (window) {
				this.register();
				
				let self = this;
				
				window.addEventListener('unload', function (event) {
					if (event.target != window.document) {
						return;
					}
					
					try {
						self.unregister();
					} catch (e) {
						// pass
					}
				}, false);
				
				window.addEventListener('close', function (event) {
					if (event.target != window) {
						return;
					}
					
					try {
						self.unregister();
					} catch (e) {
						// pass
					}
				}, false);
			}
		};
		
		if (this.isFunction(handler)) {
			Observer.prototype._handle = function (subject, topic, data) {
				this.handler(subject, topic, data);
			};
		} else {
			Observer.prototype._handle = function (subject, topic, data) {
				this.handler.handle(subject, topic, data);
			};
		}
		
		return new Observer(topics, handler);
	}
	
	/* -------------------------------------------------------------------- */
	
	this.createProgressListener = function (browser, notifications, handler) {
		function Listener(browser, notifications, handler) {
			this.browser = browser;
			this.notifications = notifications;
			this.handler = handler;
		}
		
		Listener.prototype = {
			QueryInterface: XPCOMUtils.generateQI([CI.nsIWebProgressListener, CI.nsISupportsWeakReference]),
			
			onStateChange: function () {
				if ('onStateChange' in this.handler) {
					this.handler.onStateChange.apply(this.handler.onStateChange, arguments);
				}
			},
			
			onProgressChange: function () {
				if ('onProgressChange' in this.handler) {
					this.handler.onProgressChange.apply(this.handler.onStateChange, arguments);
				}
			},
			
			onLocationChange: function () {
				if ('onLocationChange' in this.handler) {
					this.handler.onLocationChange.apply(this.handler.onStateChange, arguments);
				}
			},
			
			onStatusChange: function () {
				if ('onStatusChange' in this.handler) {
					this.handler.onStatusChange.apply(this.handler.onStateChange, arguments);
				}
			},
			
			onSecurityChange: function () {
				if ('onSecurityChange' in this.handler) {
					this.handler.onSecurityChange.apply(this.handler.onStateChange, arguments);
				}
			},
			
			register: function () {
				this.browser.addProgressListener(this, this.notifications);
			},
			
			unregister: function () {
				this.browser.removeProgressListener(this);
			},
			
			install: function (window) {
				this.register();
				
				let self = this;
				
				window.addEventListener('unload', function (event) {
					if (event.target != window.document) {
						return;
					}
					
					try {
						self.unregister();
					} catch (e) {
						// pass
					}
				}, false);
				
				window.addEventListener('close', function (event) {
					if (event.target != window) {
						return;
					}
					
					try {
						self.unregister();
					} catch (e) {
						// pass
					}
				}, false);
			}
		};
		
		return new Listener(browser, notifications, handler);
	};
	
	/* -------------------------------------------------------------------- */
	
	this.createTimer = function (interval, handler) {
		function Timer(interval, handler) {
			this.interval = interval;
			this.handler = handler;
			this.timer = weaponryCommon.createInstance('@mozilla.org/timer;1', 'nsITimer');
		}
		
		Timer.prototype = {
			QueryInterface: XPCOMUtils.generateQI([CI.nsITimerCallback]),
			
			notify: function (timer) {
				return this._handle(timer);
			},
			
			fire: function () {
				this.timer.initWithCallback(this, this.interval, CI.nsITimer.TYPE_ONE_SHOT);
			},
			
			cancel: function () {
				this.timer.cancel();
			},
			
			register: function () {
				this.timer.initWithCallback(this, this.interval, CI.nsITimer.TYPE_REPEATING_SLACK);
			},
			
			unregister: function () {
				this.cancel();
			},
			
			start: function () {
				this.register();
			},
			
			stop: function () {
				this.unregister();
			}
		};
		
		if (this.isFunction(handler)) {
			Timer.prototype._handle = function (timer) {
				this.handler(timer);
			};
		} else {
			Timer.prototype._handle = function (timer) {
				this.handler.handle(timer);
			};
		}
		
		return new Timer(interval, handler);
	};
	
	/* -------------------------------------------------------------------- */
	
	this.dispatchToThread = function (thread, handler) {
		function Thread(thread, handler) {
			this.thread = thread;
			this.handler = handler;
		}
		
		Thread.prototype = {
			QueryInterface: XPCOMUtils.generateQI([CI.nsIRunnable]),
			
			run: function () {
				return this._handle(this.thread);
			}
		};
		
		if (this.isFunction(handler)) {
			Thread.prototype._handle = function (thread) {
				this.handler(thread);
			};
		} else {
			Thread.prototype._handle = function (thread) {
				this.handler.handle(thread);
			};
		}
		
		return thread.dispatch(new Thread(thread, handler), CI.nsIThread.DISPATCH_NORMAL);
	};
	
	this.dispatchToMainThread = function (handler) {
		return this.dispatchToThread(this.threadManager.mainThread, handler);
	};
	
	/* -------------------------------------------------------------------- */
	
	this.getHttpChannelRequestData = function (httpChannel, callback) {
		let self = this;
		
		if (httpChannel.URI.scheme.toLowerCase() in {'http':1, 'https':1}) {
			if (httpChannel instanceof CI.nsIUploadChannel) {
				let uploadChannel = httpChannel.QueryInterface(CI.nsIUploadChannel);
				let skipHeaders = false;
				
				if (uploadChannel.uploadStream instanceof CI.nsIMIMEInputStream) {
					skipHeaders = true;
				}
				
				if (uploadChannel.uploadStream instanceof CI.nsISeekableStream) {
					let seekableStream = uploadChannel.uploadStream.QueryInterface(CI.nsISeekableStream);
					
					seekableStream.seek(0, 0);
					
					let binaryInputStream = self.createInstance('@mozilla.org/binaryinputstream;1', 'nsIBinaryInputStream');
					
					binaryInputStream.setInputStream(seekableStream);
					
					let requestData = binaryInputStream.readBytes(binaryInputStream.available());
					
					if (skipHeaders) {
						requestData = requestData.substring(requestData.indexOf('\r\n\r\n') + 4);
					}
					
					callback(requestData, httpChannel);
				} else {
					callback('', httpChannel);
				}
			} else {
				callback('', httpChannel);
			}
		}
	};
	
	this.getHttpChannelResponseData = function (httpChannel, callback) {
		let self = this;
		
		if (httpChannel.URI.scheme.toLowerCase() in {'http':1, 'https':1}) {
			if (httpChannel instanceof CI.nsITraceableChannel) {
				let traceableChannel = httpChannel.QueryInterface(CI.nsITraceableChannel);
				
				let TraceableListener = function () {
					this.receivedDataChunks = [];
				};
				
				TraceableListener.prototype = {
					QueryInterface: XPCOMUtils.generateQI([CI.nsIStreamListener]),
					
					onDataAvailable: function(request, context, inputStream, offset, count) {
						let binaryInputStream = self.createInstance('@mozilla.org/binaryinputstream;1', 'nsIBinaryInputStream');
						let storageStream = self.createInstance('@mozilla.org/storagestream;1', 'nsIStorageStream');
						let binaryOutputStream = self.createInstance('@mozilla.org/binaryoutputstream;1', 'nsIBinaryOutputStream');
						
						binaryInputStream.setInputStream(inputStream);
						
						storageStream.init(8192, count, null);
						
						binaryOutputStream.setOutputStream(storageStream.getOutputStream(0));
						
						let data = binaryInputStream.readBytes(count);
						
						this.receivedDataChunks.push(data);
						
						binaryOutputStream.writeBytes(data, count);
						
						try {
							if (this.originalListener) {
								this.originalListener.onDataAvailable(request, context, storageStream.newInputStream(0), offset, count);
							}
						} catch (e) {
							Components.utils.reportError(e);
							
							request.cancel(e.result);
						}
					},
					
					onStartRequest: function(request, context) {
						try {
							if (this.originalListener) {
								this.originalListener.onStartRequest(request, context);
							}
						} catch (e) {
							Components.utils.reportError(e);
							
							request.cancel(e.result);
						}
					},
					
					onStopRequest: function(request, context, code) {
						try {
							if (this.originalListener) {
								this.originalListener.onStopRequest(request, context, code);
							}
						} catch (e) {
							Components.utils.reportError(e);
							
							request.cancel(e.result);
						}
						
						callback(this.receivedDataChunks.join(), httpChannel);
					}
				};
				
				let newTracableListener = new TraceableListener();
				
				try {
					newTracableListener.originalListener = traceableChannel.setNewListener(newTracableListener);
				} catch (e) {
					Components.utils.reportError(e);
				}
			}
		}
	};
	
	this.getHttpChannelRequestParts = function (channel) {
		let httpChannel = channel.QueryInterface(CI.nsIHttpChannel);
		let headers = {};
		let headersBlock = '';
		
		httpChannel.visitRequestHeaders({visitHeader: function (name, value) {
			headers[name] = value;
			headersBlock += name + ': ' + value + '\r\n';
		}});
		
		headersBlock = headersBlock.substring(0, headersBlock.length - 2);
		
		if (httpChannel instanceof CI.nsIUploadChannel) {
			let uploadChannel = httpChannel.QueryInterface(CI.nsIUploadChannel);
			
			if (uploadChannel.uploadStream instanceof CI.nsIMIMEInputStream) {
				let mimeInputStream = uploadChannel.uploadStream.QueryInterface(CI.nsIMIMEInputStream);
				let seekableStream = uploadChannel.uploadStream.QueryInterface(CI.nsISeekableStream);
				
				seekableStream.seek(0, 0);
				
				let binaryInputStream = this.createInstance('@mozilla.org/binaryinputstream;1', 'nsIBinaryInputStream');
				
				binaryInputStream.setInputStream(seekableStream);
				
				let requestData = binaryInputStream.readBytes(binaryInputStream.available());
				let headersData = requestData.substring(0, requestData.indexOf('\r\n\r\n') + 2);
				
				headersBlock += headersData;
				
				let lines = headersData.split('\r\n').slice(0, -1);
				let linesLength = lines.length;
				
				let i, line, columnPossition, key, value;
				
				for (i = 0; i < linesLength; i += 1) {
					line = lines[i];
					columnPossition = line.indexOf(':');
					key = line.substring(0, columnPossition).trim();
					value = line.substring(columnPossition + 1, line.length).trim();
					
					headers[key] = value;
				}
			}
		}
		
		let port = channel.URI.port;
		
		if (channel.URI.port == -1) {
			let scheme = channel.URI.scheme.toLowerCase();
			
			if (scheme == 'ftp') {
				port = 21;
			} else
			if (scheme == 'http') {
				port = 80;
			} else
			if (scheme == 'https') {
				port = 443;
			}
		}
		
		return {
			method: httpChannel.requestMethod,
			url: channel.URI.spec,
			scheme: channel.URI.scheme,
			credentials: channel.URI.userPass,
			username: channel.URI.userPass.split(':')[0],
			password: channel.URI.userPass.split(':').slice(1).join(':'),
			host: channel.URI.host,
			port: port,
			path: channel.URI.path.split('?')[0],
			query: channel.URI.path.split('?').slice(1).join('?'),
			version: 'HTTP/1.1',
			headers: headers,
			headersBlock: headersBlock,
		};
	};
	
	this.getHttpChannelResponseParts = function (channel) {
		let httpChannel = channel.QueryInterface(CI.nsIHttpChannel);
		let headers = {};
		let headersBlock = '';
		
		httpChannel.visitResponseHeaders({visitHeader: function (name, value) {
			headers[name] = value;
			headersBlock += name + ': ' + value + '\r\n';
		}});
		
		headersBlock = headersBlock.substring(0, headersBlock.length - 2);
		
		return {
			code: httpChannel.responseStatus,
			message: httpChannel.responseStatusText,
			version: 'HTTP/1.1',
			headers: headers,
			headersBlock: headersBlock,
			contentType: httpChannel.contentType,
		};
	};
	
	this.getHttpChannelTransactionDetails = function (httpChannel, callback) {
		let self = this;
		
		self.getHttpChannelRequestData(httpChannel, function (requestData, httpChannel) {
			self.getHttpChannelResponseData(httpChannel, function (responseData, httpChannel) {
				let requestParts = '';
				let responseParts = '';
				
				try {
					requestParts = self.getHttpChannelRequestParts(httpChannel);
					responseParts = self.getHttpChannelResponseParts(httpChannel);
				} catch (e) {
					Components.utils.reportError(e);
					
					return;
				}
				
				requestParts.data = requestData;
				responseParts.data = responseData;
				
				// ISSUE: #14
				if (responseParts.code >= 300 && responseParts.code <= 399) {
					responseParts.data = '';
				}
				//
				
				callback(requestParts, responseParts, httpChannel);
			});
		});
	};
	
	/* -------------------------------------------------------------------- */
	
	this.consolidateHttpParts = function (requestParts, responseParts, requestData, responseData) {
		let replacer = function ($0) {
			return $0.toUpperCase();
		};
		
		let parts = {requestData: requestData, responseData: responseData};
		
		for (let fieldName in requestParts) {
			parts['request' + fieldName.replace(/^\w/, replacer)] = requestParts[fieldName];
		}
		
		for (let fieldName in responseParts) {
			parts['response' + fieldName.replace(/^\w/, replacer)] = responseParts[fieldName];
		}
		
		return parts;
	};
	
	/* -------------------------------------------------------------------- */
	
	this.closeHttpChannel = function (httpChannel) {
		httpChannel.cancel(CR.NS_OK);
	};
	
	this.abortHttpChannel = function (httpChannel) {
		httpChannel.cancel(CR.NS_BINDING_ABORTED);
	};
	
	/* -------------------------------------------------------------------- */
	
	this.createHttpObserver = function (observeRequests, observerResponses, handler) {
		let topics = [];
		
		if (observeRequests) {
			topics.push('http-on-modify-request');
		}
		
		if (observerResponses) {
			topics.push('http-on-examine-response');
			topics.push('http-on-examine-cached-response');
		}
		
		return this.createObserver(topics, function (subject, topic, data) {
			let httpChannel;
			
			try {
				httpChannel = subject.QueryInterface(CI.nsIHttpChannel);
			} catch (e) {
				return;
			}
			
			let channelWindow = weaponryCommon.getChannelWindow(httpChannel);
			
			if (!channelWindow) {
				return;
			}
			
			if (channelWindow.location.protocol in {'http:':1, 'https:':1} || channelWindow.location == 'about:blank') {
				handler(httpChannel, channelWindow, weaponryCommon.getParentChromeWindow(channelWindow.top));
			} else {
				handler(httpChannel, channelWindow, channelWindow);
			}
		});
	};
	
	/* -------------------------------------------------------------------- */
	
	this.copyToClipboard = function (string) {
		this.clipboardHelper.copyString(string);
	};
	
	/* -------------------------------------------------------------------- */
	
	this.createStringOutputStream = function () {
		let stringOutputStream = {
			data: '',
			
			close: function () {
				// pass
			},
			
			flush: function () {
				// pass
			},
			
			write: function (string) {
				this.data += string;
			}
		};
		
		return stringOutputStream;
	};
	
	this.createStringInputStream = function (data) {
		data = data.toString();
		
		let stringInputStream = this.createInstance('@mozilla.org/io/string-input-stream;1', 'nsIStringInputStream');
		
		stringInputStream.setData(data, data.length);
		
		return stringInputStream;
	};
	
	/* -------------------------------------------------------------------- */
	
	this.convertStringCharset = function (string, fromCharset, toCharset) {
		let stringOutputStream = this.createStringOutputStream();
		let converterOutputStream = this.createInstance('@mozilla.org/intl/converter-output-stream;1', 'nsIConverterOutputStream');
		
		converterOutputStream.init(stringOutputStream, fromCharset, 1024, CI.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER);
		converterOutputStream.writeString(string);
		
		let stringInputStream = this.createStringInputStream(stringOutputStream.data);
		let converterInputStream = this.createInstance('@mozilla.org/intl/converter-input-stream;1', 'nsIConverterInputStream');
		
		converterInputStream.init(stringInputStream, toCharset, 1024, CI.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER);
		
		let data = '';
		let chunk = {};
		
		while (converterInputStream.readString(1024, chunk) != 0) {
			data += chunk.value;
		}
		
		return data;
	};
	
	/* -------------------------------------------------------------------- */
	
	this.loadSubscript = function (url, scope) {
		this.subscriptLoader.loadSubScript(url, scope);
	};
	
	/* -------------------------------------------------------------------- */
	
	this.createFile = function (file) {
		if (file instanceof CI.nsIFile) {
			return file;
		} else {
			let path = file;
			
			file = this.createInstance('@mozilla.org/file/local;1', 'nsILocalFile');
			
			file.initWithPath(path);
			
			return file;
		}
	}
	
	/* -------------------------------------------------------------------- */
	
	this.getFileUri = function (file) {
		return this.ioService.newFileURI(this.createFile(file));
	};
	
	/* -------------------------------------------------------------------- */
	
	this.getChromeUriFile = function (chromeURI) {
		let uri = this.ioService.newURI(chromeURI, 'UTF-8', null);
		let fileUri = this.chromeRegistry.convertChromeURL(uri);
		
		return this.createFile(fileUri.path);
	};
	
	this.getChromeUriFilePath = function (chromeURI) {
		return this.getChromeUriFile(chromeURI).path;
	};
	
	/* -------------------------------------------------------------------- */
	
	this.executeFile = function (file) {
		let executableFile = null;
		
		if (file instanceof CI.nsIFile || file instanceof CI.nsILocalFile) {
			executableFile = file;
		} else
		if ((/^chrome:\/\//i).test(file)) {
			executableFile = this.getChromeUriFile(file);
		} else
		if ((/^file:\/\//i).test(file)) {
			let uri = this.ioService.newURI(file, 'UTF-8', null);
			
			executableFile = this.createInstance('@mozilla.org/file/local;1', 'nsILocalFile');
			
			executableFile.initWithPath(uri.path);
		} else {
			executableFile = this.createInstance('@mozilla.org/file/local;1', 'nsILocalFile');
			
			executableFile.initWithPath(file);
		}
		
		let args = Array.prototype.slice.call(arguments, 1);
		let process = this.createInstance('@mozilla.org/process/util;1', 'nsIProcess');
		
		process.init(executableFile);
		process.run(false, args, args.length);
	};
	
	this.launchFile = function (file) {
		// TODO: add code here
	};
	
	/* -------------------------------------------------------------------- */
	
	this.openUriExternally = function (uri) {
		let newUri = this.ioService.newURI(uri, null, null);
		
		this.externalProtocolService.loadURI(newUri, null);
	};
	
	this.openUri = function (uri) {
		this.openUriExternally(uri); // TODO: find the best way to open the uri, externally or via the built-in browser
	};
	
	/* -------------------------------------------------------------------- */
	
	this.getProxyOnUiThread = function (object, iface, type) {
		let flags = CI.nsIProxyObjectManager.NS_PROXY_ALWAYS;
		
		if (type != 'async') {
			flags |= CI.nsIProxyObjectManager.NS_PROXY_ASYNC;
		} else {
			flags |= CI.nsIProxyObjectManager.NS_PROXY_SYNC;
		}
		
		return this.proxyManager.getProxyForObject(this.threadManager.mainThread, this.getIface(iface), object, flags);
	};

	/* -------------------------------------------------------------------- */
	
	this.getProfileDirectory = function () {
		return this.directroyService.QueryInterface(CI.nsIProperties).get('ProfD', CI.nsIFile);
	};
	
	/* -------------------------------------------------------------------- */
	
	this.openMozstorageConnection = function (file) {
		if (file instanceof CI.nsIFile) {
			return this.mozstorageService.openDatabase(file);
		} else
		if (file instanceof CI.mozIStorageConnection) {
			return this.mozstorageService.openDataBase(file.databaseFile);
		} else {
			localFile = this.createInstance('@mozilla.org/file/local;1', 'nsILocalFile');
			
			localFile.initWithPath(file);
			
			return this.mozstorageService.openDatabase(localFile);
		}
	};
	
	this.executeMozstorageStatement = function (connection, expression, parameters) {
		if (!connection.connectionReady) {
			return [];
		}
		
		let items = [];
		let statement = null;
		
		try {
			statement = connection.createStatement(expression);
		} catch (e) {
			Components.utils.reportError('error when creating statement: ' + expression);
			
			throw e;
		}
		
		try {
			if (!parameters) {
				parameters = {};
			}
			
			if (parameters) {
				for (let parameter in parameters) {
					statement.params[parameter] = parameters[parameter];
				}
			}
			
			if ((/^\s*(create|insert|update|delete)\s+/i).test(expression)) {
				statement.executeStep();
			} else {
				let columns = [];
				
				let i;
				
				for (i = 0; i < statement.columnCount; i += 1) {
					columns.push(statement.getColumnName(i));
				}
				
				let columnsLength = columns.length;
				
				let item, columnName, columnValue;
				
				while (statement.executeStep()) {
					item = {};
					
					for (i = 0; i < columnsLength; i += 1) {
						columnName = columns[i];
						columnValue = statement.row[columnName];
						
						item[columnName] = columnValue;
					}
					
					items.push(item);
				}
			}
		} catch (e) {
			Components.utils.reportError(e);
			
			throw e;
		} finally {
			statement.finalize();
		}
		
		return items;
	};
	
	this.executeMozstorageStatementAsynchronously = function (connection, expression, parameters, resultHandler, completionHandler, errorHandler) {
		if (!connection.connectionReady) {
			return;
		}
		
		let statement = null;
		
		try {
			statement = connection.createStatement(expression);
		} catch (e) {
			Components.utils.reportError('error when creating statement: ' + expression);
			
			throw e;
		}
		
		if (!parameters) {
			parameters = {};
		}
		
		if (parameters) {
			for (let parameter in parameters) {
				statement.params[parameter] = parameters[parameter];
			}
		}
		
		let columns = [];
		
		let i;
		
		for (i = 0; i < statement.columnCount; i += 1) {
			columns.push(statement.getColumnName(i));
		}
		
		let columnsLength = columns.length;
		
		let self = this;
		
		statement.executeAsync({
			handleResult: function (result) {
				let row, i, item, columnName, columnValue;
				
				for (row = result.getNextRow(); row; row = result.getNextRow()) {
					if (resultHandler) {
						item = {};
						
						for (i = 0; i < columnsLength; i += 1) {
							columnName = columns[i];
							columnValue = row.getResultByIndex(i);
							
							item[columnName] = columnValue;
						}
						
						resultHandler(item);
					}
				}
			},
			
			handleError: function (error) {
				if (errorHandler) {
					errorHandler(error);
				}
			},
			
			handleCompletion: function (reason) {
				if (completionHandler) {
					completionHandler(reason);
				}
			}
		});
	};
	
	/* -------------------------------------------------------------------- */
	
	this.saveDataToFile = function (file, data) {
		let localFile = null;
		
		if (!(file instanceof CI.nsILocalFile)) {
			localFile = this.createInterface('@mozilla.org/file/local;1', 'nsILocalFile');
			
			localFile.initWithPath(file);
		} else {
			localFile = file;
		}
		
		if (!localFile.exists()) {
			localFile.createUnique(CI.nsIFile.NORMAL_FILE_TYPE, 600);
		}
		
		let safeFileOutputStream = this.createInstance('@mozilla.org/network/safe-file-output-stream;1', 'nsIFileOutputStream');
		
		safeFileOutputStream.init(localFile, 0x04 | 0x08 | 0x20, 0600, 0);
		safeFileOutputStream.write(data, data.length);
		
		if (safeFileOutputStream instanceof CI.nsISafeOutputStream) {
		    safeFileOutputStream.finish();
		} else {
		    safeFileOutputStream.close();
		}
	};
	
	this.readDataFromFile = function () {
		// TODO: add code here
	};
	
	/* -------------------------------------------------------------------- */
	
	this.getCookieStringForUrl = function (url) {
		if (!(url instanceof CI.nsIURI)) {
			url = this.ioService.newURI(url, null, null);
		}
		
		return this.cookieServices.getCookieString(url, null);
	};
	
	/* -------------------------------------------------------------------- */
	
	this.readUrl = function (url, handler) {
		if (!(url instanceof CI.nsIURI)) {
			url = this.ioService.newURI(url, null, null);
		}
		
		let channel = this.ioService.newChannelFromURI(url);
		let inputStream = channel.open();
		let binaryInputStream = weaponryCommon.createInstance('@mozilla.org/binaryinputstream;1', 'nsIBinaryInputStream');
		
		binaryInputStream.setInputStream(inputStream);
		
		let available = inputStream.available();
		let data = '';
		
		while (available > 0) {
			data += binaryInputStream.readBytes(available);
			
			available = inputStream.available();
		}
		
		handler = handler ? (this.isFunction(handler) ? handler : handler.handle) : null; // TODO: should be handling completion events too
		
		if (handler) {
			handler(data);
		}
		
		return data;
	};
	
	this.readUrlAsynchronously = function (url, handler) {
		if (!(url instanceof CI.nsIURI)) {
			url = this.ioService.newURI(url, null, null);
		}
		
		let observer = {
			handler: this.isFunction(handler) ? handler : handler.handle, // TODO: should be handling completion events too
			
			onStartRequest: function (request, context) {
				// pass
			},
			
			onStopRequest: function (request, context, statusCode) {
				// pass
			},
			
			onDataAvailable: function (request, context, inputStream, offset, count) {
				let binaryInputStream = weaponryCommon.createInstance('@mozilla.org/binaryinputstream;1', 'nsIBinaryInputStream');
				
				binaryInputStream.setInputStream(inputStream);
				
				let data = binaryInputStream.readBytes(count);
				
				this.handler(data);
			},
		};
		
		let channel = this.ioService.newChannelFromURI(url);
		
		channel.asyncOpen(observer, channel);
	};
	
	/* -------------------------------------------------------------------- */
	
	this.readFile = function (file, handler) {
		// TODO: add code here
	};
	
	this.readFileAsynchronously = function (file, handler) {
		// TODO: add code here
	};
	
	/* -------------------------------------------------------------------- */
	
	this.getPathSeparator = function () {
		let os = this.xulRuntime.OS;
		
		if (os == 'Darwin') {
			return ':';
		} else
		if (os == 'Linux') {
			return ':';
		} else
		if (os == 'WINNT') {
			return ';';
		} else {
			throw new Error('unsupported os');
		}
	};
	
	/* -------------------------------------------------------------------- */
	
	this.recordHistroyForUrl = function (url) {
		if (!(url instanceof CI.nsIURI)) {
			url = this.ioService.newURI(url, null, null);
		}
		
		this.navHistoryService.addURI(url, false, true, null);
	};
	
	/* -------------------------------------------------------------------- */
	
	this.recordFaviconForUrl = function (url) {
		if (!(url instanceof CI.nsIURI)) {
			url = this.ioService.newURI(url, null, null);
		}
		
		this.faviconService.setAndLoadFaviconForPage(url, this.ioService.newURI(url.prePath + '/favicon.ico', null, null), false);
	};
	
	this.obtainFaviconForUrl = function (url) {
		if (!(url instanceof CI.nsIURI)) {
			url = this.ioService.newURI(url, null, null);
		}
		
		// TODO: add code here
	};
	
	/* -------------------------------------------------------------------- */
	
	this.clearCookies = function () {
		this.cookieManager.removeAll();
	}
};
