function openProxyDialog() {
	openDialog('chrome://org.gnucitizen.weaponry.preferences/content/xul/proxyPrefwindow.xul', null, 'chrome,modal,centerscreen');
}

function openSecurityCertificatesDialog() {
	openDialog('chrome://pippki/content/certManager.xul', null, 'chrome,modal,centerscreen');
}

function openSecurityDevicesDialog() {
	openDialog('chrome://pippki/content/device_manager.xul', null, 'chrome,modal,centerscreen');
}

function openRegistryDialog() {
	openDialog('chrome://org.gnucitizen.weaponry.preferences/content/xul/registryDialog.xul', null, 'chrome,modal,centerscreen');
}

/* ------------------------------------------------------------------------ */

function handleDOMContentLoadedEvent(event) {
	if (event.target != document) {
		return;
	}
	
	bindHandler('preferences-prefwindow-open-proxy-dialog-button', 'command', openProxyDialog);
	bindHandler('preferences-prefwindow-open-security-certificates-dialog-button', 'command', openSecurityCertificatesDialog);
	bindHandler('preferences-prefwindow-open-security-devices-dialog-button', 'command', openSecurityDevicesDialog);
	bindHandler('preferences-prefwindow-open-registry-dialog-button', 'command', openRegistryDialog);
}

addEventListener('DOMContentLoaded', handleDOMContentLoadedEvent, false);
