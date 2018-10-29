const CR = Components.results;
const CC = Components.classes;
const CI = Components.interfaces;

/* ------------------------------------------------------------------------ */

Components.utils.import('resource://gre/modules/XPCOMUtils.jsm');

/* ------------------------------------------------------------------------ */

function WeaponryCertOverrideService() {
	this.originalListener = Components.classesByID['{67ba681d-5485-4fff-952c-2ee337ffdcd6}'].getService(CI.nsICertOverrideService);
	this.preferencesService = CC['@mozilla.org/preferences-service;1'].getService(CI.nsIPrefBranch);
}

WeaponryCertOverrideService.prototype = {
	classDescription: 'Weaponry Cert Override Service',
	classID: Components.ID('{6c367300-5a77-11df-a08a-0800200c9a66}'),
	contractID: '@mozilla.org/security/certoverride;1',
	QueryInterface: XPCOMUtils.generateQI([CI.IWeaponryCertOverrideService, CI.nsICertOverrideService]),
	
	/* -------------------------------------------------------------------- */
	
	get wrappedJSObject () {
		return this;
	},
	
	/* -------------------------------------------------------------------- */
	
	ERROR_UNTRUSTED: 1,
	ERROR_MISMATCH: 2,
	ERROR_TIME: 4,
	
	/* -------------------------------------------------------------------- */
	
	escapeRegexp: function (pattern) {
		return pattern.replace(/[.*+?|()\[\]{}\\]/g, '\\$&');
	},
	
	/* -------------------------------------------------------------------- */
	
	getCertificateUntrustedBit: function(cert, host, verificationResult) {
		if (((verificationResult & cert.ISSUER_UNKNOWN) != 0) ||
		    ((verificationResult & cert.ISSUER_NOT_TRUSTED) != 0) ||
		    ((verificationResult & cert.CERT_NOT_TRUSTED) != 0) ||
		    ((verificationResult & cert.INVALID_CA) != 0)) {
			return this.ERROR_UNTRUSTED;
		}
		
		return 0;
	},
	
	getCertificateMismatchBit: function(cert, host, verificationResult) {
		let commonNameRegExp = new RegExp('^' + this.escapeRegexp(cert.commonName).replace('\\*\\.', '.*?\\.') + '$', 'i');
		
		if (!commonNameRegExp.test(host)) {
			return this.ERROR_MISMATCH;
		}
		
		return 0;
	},
	
	getCertificateTimeBit: function(cert, host, verificationResult) {
		if ((verificationResult & cert.CERT_EXPIRED) != 0) {
			return this.ERROR_TIME;
		}
		
		return 0;
	},
	
	getOverrideBits: function(cert, host) {
		let verificationBits = cert.verifyForUsage(cert.CERT_USAGE_SSLClient);
		let overrideBits = 0;
		
		overrideBits = overrideBits | this.getCertificateTimeBit(cert, host, verificationBits);
		overrideBits = overrideBits | this.getCertificateMismatchBit(cert, host, verificationBits);
		
		if (overrideBits == 0) {
			overrideBits = overrideBits | this.getCertificateUntrustedBit(cert, host, verificationBits);
		}
		
		return overrideBits;
	},
	
	/* -------------------------------------------------------------------- */
	
	hasMatchingOverride: function(host, port, cert, overrideBits, isTemporary) {
		let isEnabled = false;
		
		try {
			isEnabled = this.preferencesService.getBoolPref('org.gnucitizen.weaponry.security.CertOverrideService.enabled');
		} catch (e) {
			// pass
		}
		
		if (isEnabled == true) {
			let address = (host + ':' + port).toLowerCase();
			
			try {
				let exceptions = this.preferencesService.getChildList('org.gnucitizen.weaponry.security.CertOverrideService.exceptions.add.', {});
				let exceptionsLength = exceptions.length;
				
				for (let i = 0; i < exceptionsLength; i += 1) {
					try {
						if (this.preferencesService.getCharPref(exceptions[i]).toLowerCase() == address) {
							return this.originalListener.hasMatchingOverride(host, port, cert, overrideBits, isTemporary);
						}
					} catch (e) {
						// pass
					}
				}
			} catch (e) {
				// pass
			}
			
			let originalOverrideBits = {};
			let originalIsTemporary = {};
			let originalResult = this.originalListener.hasMatchingOverride(host, port, cert, originalOverrideBits, originalIsTemporary);
			
			if (originalResult) {
				overrideBits.value = originalOverrideBits.value;
				isTemporary.value = originalIsTemporary.value;
			} else {
				overrideBits.value = this.getOverrideBits(cert, host);
				isTemporary.value = true;
			}
			
			return true;
		} else {
			return this.originalListener.hasMatchingOverride(host, port, cert, overrideBits, isTemporary);
		}
	},
	
	clearValidityOverride: function(host, port) {
		return this.originalListener.clearValidityOverride(host, port);
	},
	
	getAllOverrideHostsWithPorts: function(count, hostsWithPortsArray) {
		return this.originalListener.getAllOverrideHostsWithPorts(count, hostsWithPortsArray);
	},
	
	getValidityOverride: function(host, port, hashAlg, fingerprint, overrideBits, isTemporary) {
		return this.originalListener.getValidityOverride(host, port, hashAlg, fingerprint, overrideBits, isTemporary);
	},
	
	isCertUsedForOverrides: function(cert, checkTemporaries, checkPermanents) {
		return this.originalListener.isCertUsedForOverrides(cert, checkTemporaries, checkPermanents);
	},
	
	rememberValidityOverride: function(host, port, cert, overrideBits, isTemporary) {
		return this.originalListener.rememberValidityOverride(host, port, cert, overrideBits, isTemporary);
	}
};

/* ------------------------------------------------------------------------ */

var NSGetFactory = XPCOMUtils.generateNSGetFactory([WeaponryCertOverrideService]);
