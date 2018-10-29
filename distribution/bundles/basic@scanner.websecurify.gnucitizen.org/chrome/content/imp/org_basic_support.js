(function (exports) {
	
	function rotateLeft(n, s) {
		return (n << s) | (n >>> (32 - s));
	}
	
	function toLsbHex(val) {
		var str = '';
		
		var i;
		var vh;
		var vl;
		
		for (i = 0; i <= 6; i += 2) {
			vh = (val >>> (i * 4 + 4)) & 0x0f;
			vl = (val >>> (i * 4)) & 0x0f;
			
			str += vh.toString(16) + vl.toString(16);
		}
		
		return str;
	}
	
	function toCvtHex(val) {
		var str = '';
		
		var i;
		var v;
		
		for (i = 7; i >= 0; i--) {
			v = (val >>> (i * 4)) & 0x0f;
			
			str += v.toString(16);
		}
		
		return str;
	}
	
	function encodeUtf8(string) {
		string = string.replace(/\r\n/g, '\n');
		
		var utfText = '';
		var stringLength = string.length;
		
		var n;
		var c;
		
		for (n = 0; n < stringLength; n += 1) {
			c = string.charCodeAt(n);
			
			if (c < 128) {
				utfText += String.fromCharCode(c);
			} else
			if ((c > 127) && (c < 2048)) {
				utfText += String.fromCharCode((c >> 6) | 192);
				utfText += String.fromCharCode((c & 63) | 128);
			} else {
				utfText += String.fromCharCode((c >> 12) | 224);
				utfText += String.fromCharCode(((c >> 6) & 63) | 128);
				utfText += String.fromCharCode((c & 63) | 128);
			}
		}
		
		return utfText;
	}
	
	/* -------------------------------------------------------------------- */
	
	function sha1(input) {
		var blockstart;
		var i;
		var j;
		
		var W = new Array(80);
		var H0 = 0x67452301;
		var H1 = 0xEFCDAB89;
		var H2 = 0x98BADCFE;
		var H3 = 0x10325476;
		var H4 = 0xC3D2E1F0;
		
		var A;
		var B;
		var C;
		var D;
		var E;
		var temp;
		
		input = encodeUtf8(input);
		
		var inputLen = input.length;
		var words = [];
		
		for (i = 0; i < inputLen - 3; i += 4) {
			j = input.charCodeAt(i) << 24 | input.charCodeAt(i + 1) << 16 | input.charCodeAt(i + 2) << 8 | input.charCodeAt(i + 3);
			
			words.push(j);
		}
		
		switch (inputLen % 4) {
			case 0:
				i = 0x080000000;
				
				break;
			case 1:
				i = input.charCodeAt(inputLen - 1) << 24 | 0x0800000;
				
				break;
			case 2:
				i = input.charCodeAt(inputLen - 2) << 24 | input.charCodeAt(inputLen - 1) << 16 | 0x08000;
				
				break;
			case 3:
				i = input.charCodeAt(inputLen - 3) << 24 | input.charCodeAt(inputLen - 2) << 16 | input.charCodeAt(inputLen - 1) << 8 | 0x80;
				
				break;
		}
		
		words.push(i);
		
		while ((words.length % 16) != 14) {
			words.push(0);
		}
		
		words.push(inputLen >>> 29);
		words.push((inputLen << 3) & 0x0ffffffff);
		
		for (blockstart = 0; blockstart < words.length; blockstart += 16) {
			for (i = 0; i < 16; i += 1) {
				W[i] = words[blockstart + i];
			}
			
			for (i = 16; i <= 79; i += 1) {
				W[i] = rotateLeft(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);
			}
			
			A = H0;
			B = H1;
			C = H2;
			D = H3;
			E = H4;
			
			for (i = 0; i <= 19; i += 1) {
				temp = (rotateLeft(A, 5) + ((B & C) | (~ B & D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
				E = D;
				D = C;
				C = rotateLeft(B,30);
				B = A;
				A = temp;
			}
			
			for (i = 20; i <= 39; i += 1) {
				temp = (rotateLeft(A, 5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
				E = D;
				D = C;
				C = rotateLeft(B,30);
				B = A;
				A = temp;
			}
			
			for (i = 40; i <= 59; i += 1) {
				temp = (rotateLeft(A, 5) + ((B & C) | (B & D) | (C & D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
				E = D;
				D = C;
				C = rotateLeft(B,30);
				B = A;
				A = temp;
			}
			
			for (i = 60; i <= 79; i += 1) {
				temp = (rotateLeft(A, 5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
				E = D;
				D = C;
				C = rotateLeft(B,30);
				B = A;
				A = temp;
			}
			
			H0 = (H0 + A) & 0x0ffffffff;
			H1 = (H1 + B) & 0x0ffffffff;
			H2 = (H2 + C) & 0x0ffffffff;
			H3 = (H3 + D) & 0x0ffffffff;
			H4 = (H4 + E) & 0x0ffffffff;
		}
		
		return (toCvtHex(H0) + toCvtHex(H1) + toCvtHex(H2) + toCvtHex(H3) + toCvtHex(H4)).toLowerCase();
	}
	
	/* -------------------------------------------------------------------- */
	
	exports.sha1 = sha1;
	
})(exports);