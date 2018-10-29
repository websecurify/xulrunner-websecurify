function handleContentIframeDOMTitleChangedEvent(event) {
	let $contentIframe = document.getElementById('scheme-view-content-iframe');
	
	if (event.target != $contentIframe.contentDocument) {
		return;
	}
	
	document.title = event.target.title;
}

function handleContentIframeLoadEvent(event) {
	let targetDocument = event.target.contentDocument;
	
	handleContentIframeDOMTitleChangedEvent({target:targetDocument});
	
	targetDocument.addEventListener('DOMTitleChanged', handleContentIframeDOMTitleChangedEvent, false);
}

/* ------------------------------------------------------------------------ */

function handleDOMContentLoadedEvent(event) {
	if (event.target != document) {
		return;
	}
	
	let $contentIframe = document.getElementById('scheme-view-content-iframe');
	
	$contentIframe.addEventListener('DOMTitleChanged', handleContentIframeDOMTitleChangedEvent, false);
	$contentIframe.addEventListener('load', handleContentIframeLoadEvent, false);
	
	let coreURI = weaponryCommon.getWindowDocumentCoreURI(window);
	let uriMatch = coreURI.match(/uri=([^&]+)/);
	
	if (uriMatch) {
		$contentIframe.setAttribute('src', uriMatch[1]);
	}
}

addEventListener('DOMContentLoaded', handleDOMContentLoadedEvent, false);
