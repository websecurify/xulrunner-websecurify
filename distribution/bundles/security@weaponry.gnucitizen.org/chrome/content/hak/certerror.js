function addSecurityCertificateException() {
	let params = {
		exceptionAdded: false,
		prefetchCert: true,
		location: hostport,
	};
	
	openDialog('chrome://pippki/content/exceptionDialog.xul', '', 'chrome,modal, centerscreen', params);
	
	if (params.exceptionAdded) {
		window.close();
	}
}
