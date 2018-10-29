function handleDOMContentLoadedEvent(event) {
	if (event.target != document) {
		return;
	}
	
	let $stringbundle = document.getElementById('about-window-properties-stringbundle');
	
	document.title = $stringbundle.getFormattedString('about-window-title', [weaponryCommon.brandFullName]);
	
	let $versionLabel = document.getElementById('about-window-version-label');
	
	if (weaponryCommon.xulAppInfo.name.match(/Alpha|Beta|\d/i)) {
		$versionLabel.setAttribute('value', weaponryCommon.xulAppInfo.name);
	} else {
		$versionLabel.setAttribute('value', weaponryCommon.xulAppInfo.name + ' ' + weaponryCommon.xulAppInfo.version);
	}
}

addEventListener('DOMContentLoaded', handleDOMContentLoadedEvent, false);
