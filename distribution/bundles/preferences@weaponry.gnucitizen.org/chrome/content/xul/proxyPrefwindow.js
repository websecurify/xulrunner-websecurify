function reloadPAC() {
	weaponryCommon.getService('@mozilla.org/network/protocol-proxy-service;1').reloadPAC();
}

/* ------------------------------------------------------------------------ */

function updateReloadButtonUi() {
	let typedUrl = document.getElementById('network-proxy-autoconfig-url').value;
	let proxyTypeCur = document.getElementById('network.proxy.type').value;
	let pacUrl = weaponryCommon.getPref('network.proxy.autoconfig_url');
	let proxyType = weaponryCommon.getPref('network.proxy.type');
	let $prefAdvancedProxiesDisableButtonReload = document.getElementById('pref.advanced.proxies.disable_button.reload');
	
	$prefAdvancedProxiesDisableButtonReload.disabled = (proxyTypeCur != 2 || proxyType != 2 || typedUrl != pacUrl);
}

/* ------------------------------------------------------------------------ */

function readHttpProxyServer() {
	let $networkProxyShareProxySettings = document.getElementById('network.proxy.share_proxy_settings');
	
	if ($networkProxyShareProxySettings.value) {
		updateProtocolUi();
	}
}

function readHttpProxyPort() {
	let $networkProxyShareProxySettings = document.getElementById('network.proxy.share_proxy_settings');
	
	if ($networkProxyShareProxySettings.value) {
		updateProtocolUi();
	}
}

function readProxyProtocol(protocol, isPort) {
	let $networkProxyShareProxySettings = document.getElementById('network.proxy.share_proxy_settings');
	
	if ($networkProxyShareProxySettings.value) {
		let $pref = document.getElementById('network.proxy.http' + (isPort ? '_port' : ''));  
		
		return $pref.value;
   }
	
	let $backupPref = document.getElementById('network.proxy.backup.' + protocol + (isPort ? '_port' : ''));
	
	return $backupPref.hasUserValue ? $backupPref.value : undefined;
}

/* ------------------------------------------------------------------------ */

function updateProtocolUi() {
	let $networkProxyShareProxySettings = document.getElementById('network.proxy.share_proxy_settings');
	let $networkProxyType = document.getElementById('network.proxy.type');
	let types = ['ssl', 'ftp', 'socks'];
	let typesLength = types.length;
	
	for (let i = 0; i < typesLength; i += 1) {
		let type = types[i];
		let $proxyServerPref = document.getElementById('network.proxy.' + type);
		let $proxyPortPref = document.getElementById('network.proxy.' + type + '_port');
		
		if (!$networkProxyShareProxySettings.value) {
			let $backupServerPref = document.getElementById('network.proxy.backup.' + type);
			let $backupPortPref = document.getElementById('network.proxy.backup.' + type + '_port');
			
			if ($backupServerPref.hasUserValue) {
				$proxyServerPref.value = $backupServerPref.value;
				
				$backupServerPref.reset();
			}
			
			if ($backupPortPref.hasUserValue) {
				$proxyPortPref.value = $backupPortPref.value;
				
				$backupPortPref.reset();
			}
		}
		
		$proxyServerPref.updateElements();
		$proxyPortPref.updateElements();
		
		$proxyServerPref.disabled = $networkProxyType.value != 1 || $networkProxyShareProxySettings.value;
		$proxyPortPref.disabled = $proxyServerPref.disabled;
	}
	
	let $networkProxySocksVersion = document.getElementById('network.proxy.socks_version');
	
	$networkProxySocksVersion.disabled = $networkProxyType.value != 1 || $networkProxyShareProxySettings.value;
}

function updateUI() {
	let $networkProxyType = document.getElementById('network.proxy.type');
	let $networkProxyHttp = document.getElementById('network.proxy.http');
	let $networkProxyHttpPort = document.getElementById('network.proxy.http_port');
	
	$networkProxyHttp.disabled = $networkProxyType.value != 1;
	$networkProxyHttpPort.disabled = $networkProxyType.value != 1;
	
	updateProtocolUi();
	
	document.getElementById('network.proxy.share_proxy_settings').disabled = $networkProxyType.value != 1;
	document.getElementById('network.proxy.no_proxies_on').disabled = $networkProxyType.value != 1;
	document.getElementById('network.proxy.autoconfig_url').disabled = $networkProxyType.value != 2;
	
	updateReloadButtonUi();
}

/* ------------------------------------------------------------------------ */

function handleBeforeacceptEvent(event) {
	let $networkProxyShareProxySettings = document.getElementById('network.proxy.share_proxy_settings');
	let $networkProxyHttp = document.getElementById('network.proxy.http');
	let $networkProxyHttpPort = document.getElementById('network.proxy.http_port');
	
	if ($networkProxyShareProxySettings.value) {
		let types = ['ssl', 'ftp', 'socks'];
		let typesLength = types.length;
		
		for (let i = 0; i < typesLength; i += 1) {
			let type = types[i];
			let $proxyServerPref = document.getElementById('network.proxy.' + type);
			let $proxyPortPref = document.getElementById('network.proxy.' + type + '_port');
			let $proxyBackupServerPref = document.getElementById('network.proxy.backup.' + type);
			let $proxyBackupPortPref = document.getElementById('network.proxy.backup.' + type + '_port');
			
			$proxyBackupServerPref.value = $proxyServerPref.value;
			$proxyBackupPortPref.value = $proxyPortPref.value;
			$proxyServerPref.value = $networkProxyHttp.value;
			$proxyPortPref.value = $networkProxyHttpPort.value;
		}
	}
}

addEventListener('beforeaccept', handleBeforeacceptEvent, false);

function handleLoadEvent(event) {
	if (event.target != document) {
		return;
	}
	
	document.getElementById('network.proxy.type').setAttribute('onchange', 'return updateUI();');
	document.getElementById('network-proxy-http').setAttribute('onsyncfrompreference', 'return readHttpProxyServer();');
	document.getElementById('network-proxy-http-port').setAttribute('onsyncfrompreference', 'return readHttpProxyPort();');
	document.getElementById('network-proxy-share-proxy-settings').setAttribute('onsyncfrompreference', 'return updateProtocolUi();');
	
	let types = ['ssl', 'ftp', 'socks'];
	let typesLength = types.length;
	
	for (let i = 0; i < typesLength; i += 1) {
		let type = types[i];
		
		document.getElementById('network-proxy-' + type).setAttribute('onsyncfrompreference', 'return readProxyProtocol("' + type + '", false);');
		document.getElementById('network-proxy-' + type + '-port').setAttribute('onsyncfrompreference', 'return readProxyProtocol("' + type + '", true);');
	}
	
	document.getElementById('network-proxy-autoconfig-url').setAttribute('oninput', 'return updateReloadButtonUi();');
	document.getElementById('network-proxy-autoconfig-reload-button').setAttribute('oncommand', 'return reloadPAC();');
	
	updateUI();
}

addEventListener('load', handleLoadEvent, false);
