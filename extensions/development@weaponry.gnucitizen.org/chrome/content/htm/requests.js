Components.utils.import('resource://org.gnucitizen.weaponry.common/content/mod/weaponryCommon.jsm');

/* ------------------------------------------------------------------------ */

$(document).ready(function () {
	let bundle = weaponryCommon.getBundle('chrome://org.gnucitizen.weaponry.development/locale/htm/requests.properties');
	
	document.title = bundle.formatStringFromName('page-title', [weaponryCommon.xulAppInfo.name], 1);
	
	window.httpResponseObserver = weaponryCommon.createHttpObserver(false, true, function (httpChannel, channelWindow, originWindow) {
		let requestParts = weaponryCommon.getHttpChannelRequestParts(httpChannel);
		let responseParts = weaponryCommon.getHttpChannelResponseParts(httpChannel);
		
		let $item = $('<div class="item"><span class="code">...</span> <span class="method">...</span> <span class="url">...</span></div>');
		
		$item.children('.code').text(responseParts.code);
		$item.children('.method').text(requestParts.method);
		$item.children('.url').text(requestParts.url);
		
		$('body').append($item);
	});
	
	window.httpResponseObserver.install(window);
});
