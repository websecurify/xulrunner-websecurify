(function (exports) {
	
	var org_basic_common = require("./org_basic_common.js");
	var org_basic_core = require("./org_basic_core.js");
	
	var StringUtils = org_basic_common.StringUtils;
	var ListContainer = org_basic_core.ListContainer;
	var ImmutableIterator = org_basic_common.ImmutableIterator;
	var LogUtils = org_basic_core.LogUtils;
	var UriUtils = org_basic_core.UriUtils;
	
	/* -------------------------------------------------------------------- */
	
	function Version(value) {
		this.value = value;
	}
	
	/* -------------------------------------------------------------------- */
	
	Version.prototype.normalize = function () {
		if (StringUtils.isHollow(this.value)) {
			this.value = "HTTP/1.1";
		} else {
			this.value = this.value.trim().toUpperCase();
			
			if (this.value.indexOf(" ") > 0) {
				throw new Error("version contains illegal characters");
			}
		}
	}
	
	Version.prototype.make = function () {
		return this.value;
	}
	
	/* -------------------------------------------------------------------- */
	
	Version.prototype.isSimilar = function (version) {
		return this.getValue().equals(version.getValue());
	}
	
	/* -------------------------------------------------------------------- */
	
	Version.prototype.getValue = function () {
		return this.value;
	}
	
	/* -------------------------------------------------------------------- */
	
	Version.prototype.isHttp11 = function () {
		return this.value.equals("HTTP/1.1");
	}
	
	/* -------------------------------------------------------------------- */
	
	Version.parse = function (version) {
		var newVersion = new Version(version);
		
		try {
			newVersion.normalize();
		} catch (e) {
			throw new Error("cannot parse version due to version normalization problems", e);
		}
		
		if (newVersion.isHttp11()) {
			return Version.HTTP11;
		} else {
			return newVersion;
		}
	}
	
	Version.create = function (version) {
		var newVersion = new Version(version);
		
		newVersion.normalize();
		
		if (newVersion.isHttp11()) {
			return Version.HTTP11;
		} else {
			return newVersion;
		}
	}
	
	/* -------------------------------------------------------------------- */
	
	Version.HTTP11 = new Version("HTTP/1.1");
	
	/* -------------------------------------------------------------------- */
	
	function Username(value) {
		this.value = value;
	}
	
	/* -------------------------------------------------------------------- */
	
	Username.prototype.normalize = function () {
		if (StringUtils.isNone(this.value)) {
			this.value = "";
		} else {
			this.value = this.value.trim();
		}
	}
	
	Username.prototype.make = function () {
		return this.value;
	}
	
	/* -------------------------------------------------------------------- */
	
	Username.prototype.isSimilar = function (username) {
		return this.getValue().equals(username.getValue());
	}
	
	/* -------------------------------------------------------------------- */
	
	Username.prototype.getValue = function () {
		return this.value;
	}
	
	/* -------------------------------------------------------------------- */
	
	Username.parse = function (username) {
		var newUsername = new Username(username);
		
		try {
			newUsername.normalize();
		} catch (e) {
			throw new Error("cannot parse username due to username normalization problems", e);
		}
		
		if (newUsername.getValue().length == 0) {
			return Username.BLANK;
		} else {
			return newUsername;
		}
	}
	
	Username.create = function (username) {
		var newUsername = new Username(username);
		
		newUsername.normalize();
		
		if (newUsername.getValue().length == 0) {
			return Username.BLANK;
		} else {
			return newUsername;
		}
	}
	
	/* -------------------------------------------------------------------- */
	
	Username.BLANK = new Username("");
	
	/* -------------------------------------------------------------------- */
	
	function Url(scheme, username, password, host, port, path, queries, fragment) {
		this.scheme = scheme;
		this.username = username;
		this.password = password;
		this.host = host;
		this.port = port;
		this.path = path;
		this.queries = queries;
		this.fragment = fragment;
	}
	
	/* -------------------------------------------------------------------- */
	
	Url.prototype.normalize = function () {
		if (this.scheme == null) {
			throw new Error("scheme is not set");
		} else
		if (this.username == null) {
			throw new Error("username is not set");
		} else
		if (this.password == null) {
			throw new Error("password is not set");
		} else
		if (this.host == null) {
			throw new Error("host is not set");
		} else
		if (this.port == null) {
			throw new Error("port is not set");
		} else
		if (this.path == null) {
			throw new Error("path is not set");
		} else
		if (this.queries == null) {
			throw new Error("queries is not set");
		} else
		if (this.fragment == null) {
			throw new Error("fragment is not set");
		}
	}
	
	Url.prototype.make = function () {
		var credentials = this.username.make() + ":" + this.password.make();
		var port = this.port.make();
		
		if (this.scheme.isHttp() && port.equals("80")) {
			port = "";
		} else
		if (this.scheme.isHttps() && port.equals("443")) {
			port = "";
		}
		
		var hostport = this.host.make();
		
		if (port.length > 0) {
			hostport += ":" + port;
		}
		
		var queries = "?" + this.queries.make();
		var fragment = "#" + this.fragment.make();
		
		return this.scheme.make() + "://" + (credentials.length > 1 ? credentials + "@" : "") + hostport + this.path.make() + (queries.length > 1 ? queries : "") + (fragment.length > 1 ? fragment : "");
	}
	
	/* -------------------------------------------------------------------- */
	
	Url.prototype.isSimilar = function (url) {
		return this.scheme.isSimilar(url.getScheme()) && this.username.isSimilar(url.getUsername()) && this.password.isSimilar(url.getPassword()) && this.host.isSimilar(url.getHost()) && this.port.isSimilar(url.getPort()) && this.path.isSimilar(url.getPath()) && this.queries.isSimilar(url.getQueries()) && this.fragment.isSimilar(url.getFragment());
	}
	
	/* -------------------------------------------------------------------- */
	
	Url.prototype.getScheme = function () {
		return this.scheme;
	}
	
	Url.prototype.getUsername = function () {
		return this.username;
	}
	
	Url.prototype.getPassword = function () {
		return this.password;
	}
	
	Url.prototype.getHost = function () {
		return this.host;
	}
	
	Url.prototype.getPort = function () {
		return this.port;
	}
	
	Url.prototype.getPath = function () {
		return this.path;
	}
	
	Url.prototype.getQueries = function () {
		return this.queries;
	}
	
	Url.prototype.getFragment = function () {
		return this.fragment;
	}
	
	Url.prototype.getCredentials = function () {
		return new Credentials(this.username, this.password);
	}
	
	Url.prototype.getAddress = function () {
		return new Address(this.host, this.port);
	}
	
	Url.prototype.getInfo = function () {
		return new Info(this.path, this.queries, this.fragment);
	}
	
	/* -------------------------------------------------------------------- */
	
	Url.parse = function (url) {
		var remaining = url;
		var partEnd = remaining.indexOf("://");
		
		if (partEnd < 0) {
			throw new Error("cannot parse url due to unable to find scheme");
		}
		
		var scheme;
		
		try {
			scheme = Scheme.parse(remaining.substring(0, partEnd));
		} catch (e) {
			throw new Error("cannot parse url due to scheme parsing problems", e);
		}
		
		remaining = url.substring(partEnd + 3, url.length);
		partEnd = remaining.indexOf('/');
		
		if (partEnd < 0) {
			partEnd = remaining.indexOf("?");
			
			if (partEnd < 0) {
				partEnd = remaining.indexOf("#");
			}
		}
		
		var locationSource;
		
		if (partEnd < 0) {
			locationSource = remaining;
			remaining = "";
		} else {		
			locationSource = remaining.substring(0, partEnd);
			remaining = remaining.substring(partEnd, remaining.length);
		}
		
		partEnd = locationSource.indexOf("@");
		
		var credentialsSource;
		var addressSource;
		
		if (partEnd < 0) {
			credentialsSource = null;
			addressSource = locationSource;
		} else {
			credentialsSource = locationSource.substring(0, partEnd);
			addressSource = locationSource.substring(partEnd + 1, locationSource.length);
		}
		
		var credentials;
		
		if (credentialsSource == null) {
			credentials = Credentials.BLANK;
		} else {
			try {
				credentials = Credentials.parse(credentialsSource);
			} catch (e) {
				throw new Error("cannot parse url due to credentials parsing problems", e);
			}
		}
		
		var host;
		var port;
		
		addressSource = addressSource.trim();
		
		if (addressSource.indexOf(":") == addressSource.length - 1) {
			addressSource = addressSource.substring(0, addressSource.length - 1);
		}
		
		if (addressSource.indexOf(":") >= 0) {
			try {
				var address = Address.parse(addressSource);
				
				host = address.getHost();
				port = address.getPort();
			} catch (e) {
				throw new Error("cannot parse url due to address parsing problems", e);
			}
		} else {
			try {
				host = Host.parse(addressSource);
			} catch (e) {
				throw new Error("cannot parse url due to host parsing problems", e);
			}
			
			if (scheme.isHttp()) {
				port = Port.HTTP;
			} else
			if (scheme.isHttps()) {
				port = Port.HTTPS;
			} else {
				throw new Error("cannot parse url due to scheme is not recognized");
			}
		}
		
		var info;
		
		try {
			info = Info.parse(remaining);
		} catch (e) {
			throw new Error("cannot parse url due to info parse problems", e);
		}
		
		var newUrl = new Url(scheme, credentials.getUsername(), credentials.getPassword(), host, port, info.getPath(), info.getQueries(), info.getFragment());
		
		try {			
			newUrl.normalize();
		} catch (e) {
			throw new Error("cannot parse url due to url normalize problems", e);
		}
		
		return newUrl;
	}
	
	Url.create = function (scheme, username, password, host, port, path, queries, fragment) {
		var newUrl = new Url(scheme, username, password, host, port, path, queries, fragment);
		
		newUrl.normalize();
		
		return newUrl;
	}
	
	/* -------------------------------------------------------------------- */
	
	function SourceData(value) {
		this.value = value;
	}
	
	/* -------------------------------------------------------------------- */
	
	SourceData.prototype.normalize = function () {
		if (StringUtils.isNone(this.value)) {
			this.value = "";
		}
	}
	
	SourceData.prototype.make = function () {
		return this.value;
	}
	
	/* -------------------------------------------------------------------- */
	
	SourceData.prototype.isSimilar = function (data) {
		if (data instanceof SourceData) {
			var sourceData = data;
			
			return this.getValue().equals(sourceData.getValue());
		} else {
			return false;
		}
	}
	
	/* -------------------------------------------------------------------- */
	
	SourceData.prototype.getValue = function () {
		return this.value;
	}
	
	/* -------------------------------------------------------------------- */
	
	SourceData.prototype.size = function () {
		return this.value.length;
	}
	
	/* -------------------------------------------------------------------- */
	
	SourceData.parse = function (data) {
		var newData = new SourceData(data);
		
		try {
			newData.normalize();
		} catch (e) {
			throw new Error("cannot parse source data due to source normalization problems", e);
		}
		
		if (newData.size() == 0) {
			return SourceData.BLANK;
		} else {
			return newData;
		}
	}
	
	SourceData.create = function (data) {
		var newData = new SourceData(data);
		
		newData.normalize();
		
		if (newData.getValue().length == 0) {
			return SourceData.BLANK;
		}
		
		return newData;
	}
	
	/* -------------------------------------------------------------------- */
	
	SourceData.BLANK = new SourceData("");
	
	/* -------------------------------------------------------------------- */
	
	function Scheme(value) {
		this.value = value;
	}
	
	/* -------------------------------------------------------------------- */
	
	Scheme.prototype.normalize = function () {
		if (StringUtils.isHollow(this.value)) {
			throw new Error("scheme is empty");
		} else {
			this.value = this.value.trim().toLowerCase();
			
			if (this.value.indexOf(" ") > 0) {
				throw new Error("scheme contains illegal characters");
			}
		}
	}
	
	Scheme.prototype.make = function () {
		return this.value;
	}
	
	/* -------------------------------------------------------------------- */
	
	Scheme.prototype.isSimilar = function (scheme) {
		return this.getValue().equals(scheme.getValue());
	}
	
	/* -------------------------------------------------------------------- */
	
	Scheme.prototype.getValue = function () {
		return this.value;
	}
	
	/* -------------------------------------------------------------------- */
	
	Scheme.prototype.isHttp = function () {
		return this.value.equals("http");
	}
	
	Scheme.prototype.isHttps = function () {
		return this.value.equals("https");
	}
	
	/* -------------------------------------------------------------------- */
	
	Scheme.parse = function (scheme) {
		var newScheme = new Scheme(scheme);
		
		try {
			newScheme.normalize();
		} catch (e) {
			throw new Error("cannot parse scheme due to scheme normalize problems", e);
		}
		
		if (newScheme.isHttp()) {
			return Scheme.HTTP;
		} else
		if (newScheme.isHttps()) {
			return Scheme.HTTPS;
		} else {
			return newScheme;
		}
	}
	
	Scheme.create = function (scheme) {
		var newScheme = new Scheme(scheme);
		
		newScheme.normalize();
		
		if (newScheme.isHttp()) {
			return Scheme.HTTP;
		} else
		if (newScheme.isHttps()) {
			return Scheme.HTTPS;
		} else {
			return newScheme;
		}
	}
	
	/* -------------------------------------------------------------------- */
	
	Scheme.HTTP = new Scheme("http");
	Scheme.HTTPS = new Scheme("https");
	
	/* -------------------------------------------------------------------- */
	
	function Response(version, code, message, headers, data) {
		this.version = version;
		this.code = code;
		this.message = message;
		this.headers = headers;
		this.data = data;
	}
	
	/* -------------------------------------------------------------------- */
	
	Response.prototype.normalize = function () {
		if (this.version == null) {
			throw new Error("version is not set");
		} else
		if (this.code == null) {
			throw new Error("code is not set");
		} else
		if (this.message == null) {
			throw new Error("message is not set");
		} else
		if (this.headers == null) {
			throw new Error("headers is not set");
		} else
		if (this.data == null) {
			throw new Error("data is not set");
		}
	}
	
	Response.prototype.make = function () {
		var headers = this.headers.make();
		
		if (headers.length > 0) {
			headers = headers + "\r\n\r\n";
		} else {
			headers = "\r\n";
		}
		
		return this.version.make() + " " + this.code.make() + " " + this.message.make() + "\r\n" + headers + this.data.make();
	}
	
	/* -------------------------------------------------------------------- */
	
	Response.prototype.isSimilar = function (response) {
		return this.version.isSimilar(response.getVersion()) && this.code.isSimilar(response.getCode()) && this.message.isSimilar(response.getMessage()) && this.headers.isSimilar(response.getHeaders()) && this.data.isSimilar(response.getData());
	}
	
	/* -------------------------------------------------------------------- */
	
	Response.prototype.getVersion = function () {
		return this.version;
	}
	
	Response.prototype.getCode = function () {
		return this.code;
	}
	
	Response.prototype.getMessage = function () {
		return this.message;
	}
	
	Response.prototype.getHeaders = function () {
		return this.headers;
	}
	
	Response.prototype.getData = function () {
		return this.data;
	}
	
	Response.prototype.getInitialResponseLine = function () {
		return new InitialResponseLine(this.version, this.code, this.message);
	}
	
	/* -------------------------------------------------------------------- */
	
	Response.parse = function (response) {
		var headEnd = response.indexOf("\r\n\r\n");
		
		if (headEnd < 0) {
			new ResponseParseException("cannot find head end");
		}
		
		var head = response.substring(0, headEnd + 2);
		var body = response.substring(headEnd + 4, response.length);
		var initialResponseLineEnd = head.indexOf("\r\n");
		
		if (initialResponseLineEnd < 0) {
			new ResponseParseException("cannot parse response due to unable to find initial response line");
		}
		
		var initialResponseLine;
		
		try {
			initialResponseLine = InitialResponseLine.parse(head.substring(0, initialResponseLineEnd));
		} catch (e) {
			throw new Error("cannot parse response due to initial response line parse problems", e);
		}
		
		var headers;
		
		try {
			headers = Headers.parse(head.substring(initialResponseLineEnd + 2, head.length));
		} catch (e) {
			throw new Error("cannot parse response due to headers parse problems", e);
		}
		
		var sourceData;
		
		try {
			sourceData = SourceData.parse(body);
		} catch (e) {
			throw new Error("cannot parse response due to source data parse problems", e);
		}
		
		var newResponse = new Response(initialResponseLine.getVersion(), initialResponseLine.getCode(), initialResponseLine.getMessage(), headers, sourceData);
		
		try {
			newResponse.normalize();
		} catch (e) {
			throw new Error("cannot parse response due to respone normalize problems", e);
		}
		
		return newResponse;
	}
	
	Response.create = function (version, code, message, headers, data) {
		var newResponse = new Response(version, code, message, headers, data);
		
		newResponse.normalize();
		
		return newResponse;
	}
	
	/* -------------------------------------------------------------------- */
	
	function Request(method, url, version, headers, data) {
		this.method = method;
		this.url = url;
		this.version = version;
		this.headers = headers;
		this.data = data;
	}
	
	/* -------------------------------------------------------------------- */
	
	Request.prototype.normalize = function () {
		
		if (this.method == null) {
			throw new Error("method is not set");
		} else
		if (this.url == null) {
			throw new Error("url is not set");
		} else
		if (this.version == null) {
			throw new Error("version is not set");
		} else
		if (this.headers == null) {
			throw new Error("headers is not set");
		} else
		if (this.data == null) {
			throw new Error("data is not set");
		}
	}
	
	Request.prototype.make = function () {
		var headers = this.headers.make();
		
		if (headers.length > 0) {
			headers = headers + "\r\n\r\n";
		} else {
			headers = "\r\n";
		}
		
		return this.method.make() + " " + this.url.make() + " " + this.version.make() + "\r\n" + headers + this.data.make();
	}
	
	/* -------------------------------------------------------------------- */
	
	Request.prototype.isSimilar = function (request) {
		return this.method.isSimilar(request.getMethod()) && this.url.isSimilar(request.getUrl()) && this.version.isSimilar(request.getVersion()) && this.headers.isSimilar(request.getHeaders()) && this.data.isSimilar(request.getData());
	}
	
	/* -------------------------------------------------------------------- */
	
	Request.prototype.getMethod = function () {
		return this.method;
	}
	
	Request.prototype.getUrl = function () {
		return this.url;
	}
	
	Request.prototype.getVersion = function () {
		return this.version;
	}
	
	Request.prototype.getHeaders = function () {
		return this.headers;
	}
	
	Request.prototype.getData = function () {
		return this.data;
	}
	
	Request.prototype.getInitialRequestLine = function () {
		return new InitialRequestLine(this.method, this.url, this.version);
	}
	
	/* -------------------------------------------------------------------- */
	
	Request.parse = function (request) {
		var headEnd = request.indexOf("\r\n\r\n");
		
		var head;
		var body;
		
		if (headEnd < 0) {
			headEnd = request.indexOf("\r\n");
			
			if (headEnd != request.length - 2) {
				throw new Error("cannot parse request due to unable to find head");
			}
			
			head = request;
			body = "";
		} else {
			head = request.substring(0, headEnd + 2);
			body = request.substring(headEnd + 4, request.length);
		}
		
		var initialRequestLineEnd = head.indexOf("\r\n");
		
		if (initialRequestLineEnd < 0) {
			throw new Error("cannot parse request due to unable to find initial request line");
		}
		
		var initialRequestLine;
		
		try {
			initialRequestLine = InitialRequestLine.parse(head.substring(0, initialRequestLineEnd));
		} catch (e) {
			throw new Error("cannot parse request due to initial request line parse problems", e);
		}
		
		var headers;
		
		try {
			headers = Headers.parse(head.substring(initialRequestLineEnd + 2, head.length));
		} catch (e) {
			throw new Error("cannot parse request due to headers parse problems", e);
		}
		
		if (body.lastIndexOf("\r\n\r\n") == body.length - 4) {
			body = body.substring(0, body.length - 4);
		} else
		if (body.lastIndexOf("\r\n") == body.length - 2) {
			body = body.substring(0, body.length - 2);
		}
		
		var contentType = headers.getHeaderValueByName("Content-Type");
		
		var data;
		
		if (contentType != null && contentType.equals("application/x-www-form-urlencoded")) {
			try {
				data = FieldData.parse(body.trim());
			} catch (e) {
				throw new Error("cannot parse request due to field data parse problems", e);
			}
		} else {
			try {
				data = SourceData.parse(body);
			} catch (e) {
				throw new Error("cannot parse request due to source data parse problems", e);
			}
		}
		
		var newRequest = new Request(initialRequestLine.getMethod(), initialRequestLine.getUrl(), initialRequestLine.getVersion(), headers, data);
		
		try {
			newRequest.normalize();
		} catch (e) {
			throw new Error("cannot parse request due to request normalize problems", e);
		}
		
		return newRequest;
	}
	
	Request.create = function (method, url, version, headers, data) {
		var newRequest = new Request(method, url, version, headers, data);
		
		newRequest.normalize();
		
		return newRequest;
	}
	
	/* -------------------------------------------------------------------- */
	
	function Query(name, value) {
		this.name = name;
		this.value = value;
	}
	
	/* -------------------------------------------------------------------- */
	
	Query.prototype.normalize = function () {
		if (StringUtils.isHollow(this.name)) {
			throw new Error("name is empty");
		} else {
			this.name = this.name.trim();
		}
		
		if (StringUtils.isNone(this.value)) {
			this.value = "";
		}
	}
	
	Query.prototype.make = function () {
		if (StringUtils.isEmpty(this.value)) {
			return UriUtils.escapeUriComponent(this.name);
		} else {
			return UriUtils.escapeUriComponent(this.name) + "=" + UriUtils.escapeUriComponent(this.value);
		}
	}
	
	/* -------------------------------------------------------------------- */
	
	Query.prototype.isSimilar = function (query) {
		return this.getName().toLowerCase().equals(query.getName().toLowerCase());
	}
	
	/* -------------------------------------------------------------------- */
	
	Query.prototype.getName = function () {
		return this.name;
	}
	
	Query.prototype.getValue = function () {
		return this.value;
	}
	
	/* -------------------------------------------------------------------- */
	
	Query.prototype.matchesName = function (name) {
		return this.name.toLowerCase().equals(name.toLowerCase());
	}
	
	/* -------------------------------------------------------------------- */
	
	Query.parse = function (query)  {
		var partEnd = query.indexOf("=");
		
		var name;
		var value;
		
		if (partEnd < 0) {
			name = query;
			value = "";
		} else {
			name = query.substring(0, partEnd);
			value = query.substring(partEnd + 1, query.length);
		}
		
		var newQuery = new Query(UriUtils.unescapeUriComponent(name), UriUtils.unescapeUriComponent(value));
		
		try {
			newQuery.normalize();
		} catch (e) {
			throw new Error("cannot parse query due to query normalization problems", e);
		}
		
		return newQuery;
	}
	
	Query.create = function (name, value) {
		var newQuery = new Query(name, value);
		
		newQuery.normalize();
		
		return newQuery;
	}
	
	/* -------------------------------------------------------------------- */
	
	function Queries(queries) {
		this.queries = queries;
	}
	
	/* -------------------------------------------------------------------- */
	
	Queries.prototype.normalize = function () {
		if (this.queries == null) {
			throw new Error("queries is not set");
		}
	}
	
	Queries.prototype.make = function () {
		var queries = "";
		
		for (var queryIterator = this.queries.iterator(), query = null; queryIterator.hasNext();) {
			query = queryIterator.next();
			queries += "&" + query.make();
		}
		
		if (queries.length > 0) {
			queries = queries.substring(1, queries.length);
		}
		
		return queries;
	}
	
	/* -------------------------------------------------------------------- */
	
	Queries.prototype.isSimilar = function (queries) {
		if (this.queries.size() == queries.size()) {
			for (var queryIterator = queries.iterator(), query = null; queryIterator.hasNext();) {
				query = queryIterator.next();
				if (!this.hasQueryName(query.getName())) {
					return false;
				}
			}
			
			return true;
		} else {
			return false;
		}
	}
	
	/* -------------------------------------------------------------------- */
	
	Queries.prototype.iterator = function () {
		return new ImmutableIterator(this.queries.iterator());
	}
	
	/* -------------------------------------------------------------------- */
	
	Queries.prototype.retrieve = function (i) {
		return this.queries.retrieve(i);
	}
	
	Queries.prototype.size = function () {
		return this.queries.size();
	}
	
	/* -------------------------------------------------------------------- */
	
	Queries.prototype.hasQueryName = function (name) {
		for (var queryIterator = this.queries.iterator(), query = null; queryIterator.hasNext();) {
			query = queryIterator.next();
			if (query.matchesName(name)) {
				return true;
			}
		}
		
		return false;
	}
	
	/* -------------------------------------------------------------------- */
	
	Queries.prototype.getQueryValueByName = function (name) {
		for (var queryIterator = this.queries.iterator(), query = null; queryIterator.hasNext();) {
			query = queryIterator.next();
			if (query.matchesName(name)) {
				return query.getValue();
			}
		}
		
		return null;
	}
	
	Queries.prototype.getQueryValuesByName = function (name) {
		var headers = new ListContainer();
		
		for (var queryIterator = this.queries.iterator(), query = null; queryIterator.hasNext();) {
			query = queryIterator.next();
			if (query.matchesName(name)) {
				headers.add(query.getValue());
			}
		}
		
		return headers;
	}
	
	/* -------------------------------------------------------------------- */
	
	Queries.splitQueries = function (queries) {
		var queriesList = new ListContainer();
		var remaining = queries;
		
		var partEnd;
		var z;
		
		while (true) {
			partEnd = remaining.indexOf("&");
			
			if (partEnd < 0) {
				partEnd = remaining.indexOf(";");
				
				if (partEnd < 0) {
					break;
				}
			} else {
				z = remaining.indexOf(";");
				
				if (z >= 0 && z < partEnd) {
					partEnd = z;
				}
			}
			
			var queryString = remaining.substring(0, partEnd);
			
			queryString = StringUtils.ltrim(queryString);
			remaining = remaining.substring(partEnd + 1, remaining.length);
			
			if (queryString.length > 0) {
				try {
					queriesList.add(Query.parse(queryString));
				} catch (e) {
					LogUtils.recordException("cannot parse query", e);
				}
			}
		}
		
		remaining = StringUtils.ltrim(remaining);
		
		if (remaining.length > 0) {
			try {
				queriesList.add(Query.parse(remaining));
			} catch (e) {
				LogUtils.recordException("cannot parse query", e);
			}
		}
		
		return queriesList;
	}
	
	/* -------------------------------------------------------------------- */
	
	Queries.parse = function (queries) {
		var newQueries = new Queries(Queries.splitQueries(queries));
		
		try {
			newQueries.normalize();
		} catch (e) {
			throw new Error("cannot parse queries due to queries normalization problem", e);
		}
		
		if (newQueries.size() == 0) {
			return Queries.BLANK;
		} else {
			return newQueries;
		}
	}
	
	Queries.create = function (queries) {
		var newQueries = new Queries(queries);
		
		newQueries.normalize();
		
		if (newQueries.size() == 0) {
			return Queries.BLANK;
		} else {
			return newQueries;
		}
	}
	
	/* -------------------------------------------------------------------- */
	
	Queries.BLANK = new Queries(new ListContainer());
	
	/* -------------------------------------------------------------------- */
	
	function Port(value) {
		this.value = value;
	}
	
	/* -------------------------------------------------------------------- */
	
	Port.prototype.normalize = function () {
		if (StringUtils.isHollow(this.value)) {
			throw new Error("cannot normalize port");
		} else {
			this.value = this.value.trim();
			
			if (this.value.indexOf(" ") > 0) {
				throw new Error("port contains illegal characters");
			}
		}
	}
	
	Port.prototype.make = function () {
		return this.value;
	}
	
	/* -------------------------------------------------------------------- */
	
	Port.prototype.isSimilar = function (port) {
		return this.getValue().equals(port.getValue());
	}
	
	/* -------------------------------------------------------------------- */
	
	Port.prototype.getValue = function () {
		return this.value;
	}
	
	/* -------------------------------------------------------------------- */
	
	Port.prototype.isHttp = function () {
		return this.value.equals("80");
	}
	
	Port.prototype.isHttps = function () {
		return this.value.equals("443");
	}
	
	/* -------------------------------------------------------------------- */
	
	Port.parse = function (port) {
		var newPort = new Port(port);
		
		try {
			newPort.normalize();
		} catch (e) {
			throw new Error("cannot parse port due to port normalization problems", e);
		}
		
		if (newPort.isHttp()) {
			return Port.HTTP;
		} else
		if (newPort.isHttps()) {
			return Port.HTTPS;
		} else {
			return newPort;
		}
	}
	
	Port.create = function (port) {
		var newPort = new Port(port);
		
		newPort.normalize();
		
		if (newPort.isHttp()) {
			return Port.HTTP;
		} else
		if (newPort.isHttps()) {
			return Port.HTTPS;
		} else {
			return newPort;
		}
	}
	
	/* -------------------------------------------------------------------- */
	
	Port.HTTP = new Port("80");
	Port.HTTPS = new Port("443");
	
	/* -------------------------------------------------------------------- */
	
	function Path(base, leaf) {
		this.base = base;
		this.leaf = leaf;
	}
	
	/* -------------------------------------------------------------------- */
	
	Path.prototype.normalize = function () {
		if (this.base == null) {
			throw new Error("path is not set");
		} else
		if (this.leaf == null) {
			throw new Error("leaf is not set");
		}
	}
	
	Path.prototype.make = function () {
		return this.base.make() + this.leaf.make();
	}
	
	/* -------------------------------------------------------------------- */
	
	Path.prototype.isSimilar = function (path) {
		return this.base.isSimilar(path.getBase()) && this.leaf.isSimilar(path.getLeaf());
	}
	
	/* -------------------------------------------------------------------- */
	
	Path.prototype.getBase = function () {
		return this.base;
	}
	
	Path.prototype.getLeaf = function () {
		return this.leaf;
	}
	
	/* -------------------------------------------------------------------- */
	
	Path.parse = function (path) {
		var partEnd = path.lastIndexOf("/");
		var base;
		var leaf;
		
		if (partEnd < 0) {
			base = "";
			leaf = path;
		} else {
			base = path.substring(0, partEnd + 1);
			leaf = path.substring(partEnd + 1, path.length);
		}
		
		if (leaf.equals(".") || leaf.equals("..")) {
			base = base + "/" + leaf;
			leaf = "";
		}
		
		var newBase;
		
		try {
			newBase = Base.parse(base);
		} catch (e) {
			throw new Error("cannot parse path due to base parse problems", e);
		}
		
		var newLeaf;
		
		try {
			newLeaf = Leaf.parse(leaf);
		} catch (e) {
			throw new Error("cannot parse path due to leaf parse problems", e);
		}
		
		var newPath = new Path(newBase, newLeaf);
		
		try {
			newPath.normalize();
		} catch (e) {
			throw new Error("cannot parse path due to path normalize problems", e);
		}
		
		return newPath;
	}
	
	Path.create = function (base, leaf) {
		var newPath = new Path(base, leaf);
		
		newPath.normalize();
		
		return newPath;
	}
	
	/* -------------------------------------------------------------------- */
	
	function Password(value) {
		this.value = value;
	}
	
	/* -------------------------------------------------------------------- */
	
	Password.prototype.normalize = function () {
		if (StringUtils.isNone(this.value)) {
			this.value = "";
		}
	}
	
	Password.prototype.make = function () {
		return this.value;
	}
	
	/* -------------------------------------------------------------------- */
	
	Password.prototype.getValue = function () {
		return this.value;
	}
	
	/* -------------------------------------------------------------------- */
	
	Password.prototype.isSimilar = function (password) {
		return this.getValue().equals(password.getValue());
	}
	
	/* -------------------------------------------------------------------- */
	
	Password.parse = function (password) {
		var newPassword = new Password(password);
		
		try {
			newPassword.normalize();
		} catch (e) {
			throw new Error("cannot parse password due to password normalization problem", e);
		}
		
		if (newPassword.getValue().length == 0) {
			return Password.BLANK;
		} else {
			return newPassword;
		}
	}
	
	Password.create = function (password) {
		var newPassword = new Password(password);
		
		newPassword.normalize();
		
		if (newPassword.getValue().length == 0) {
			return Password.BLANK;
		} else {
			return newPassword;
		}
	}
	
	/* -------------------------------------------------------------------- */
	
	Password.BLANK = new Password("");
	
	/* -------------------------------------------------------------------- */
	
	function Method(value) {
		this.value = value;
	}
	
	/* -------------------------------------------------------------------- */
	
	Method.prototype.normalize = function () {
		if (StringUtils.isHollow(this.value)) {
			throw new Error("value is not set");
		} else {
			this.value = this.value.trim().toUpperCase();
			
			if (this.value.indexOf(" ") > 0) {
				throw new Error("method contains illegal characters");
			}
		}
	}
	
	Method.prototype.make = function () {
		return this.value;
	}
	
	/* -------------------------------------------------------------------- */
	
	Method.prototype.isSimilar = function (method) {
		return this.getValue().equals(method.getValue());
	}
	
	/* -------------------------------------------------------------------- */
	
	Method.prototype.getValue = function () {
		return this.value;
	}
	
	/* -------------------------------------------------------------------- */
	
	Method.prototype.isGet = function () {
		return this.value.equals("GET");
	}
	
	Method.prototype.isPost = function () {
		return this.value.equals("POST");
	}
	
	/* -------------------------------------------------------------------- */
	
	Method.parse = function (method) {
		var newMethod = new Method(method);
		
		try {
			newMethod.normalize();
		} catch (e) {
			throw new Error("cannot parse method due to method normalization problems", e);
		}
		
		if (newMethod.isGet()) {
			return Method.GET;
		} else
		if (newMethod.isPost()) {
			return Method.POST;
		} else {
			return newMethod;
		}
	}
	
	Method.create = function (method) {
		var newMethod = new Method(method);
		
		newMethod.normalize();
		
		if (newMethod.isGet()) {
			return Method.GET;
		} else
		if (newMethod.isPost()) {
			return Method.POST;
		} else {
			return newMethod;
		}
	}
	
	/* -------------------------------------------------------------------- */
	
	Method.GET = new Method("GET");
	Method.POST = new Method("POST");
	
	/* -------------------------------------------------------------------- */
	
	function Message(value) {
		this.value = value;
	}
	
	/* -------------------------------------------------------------------- */
	
	Message.prototype.normalize = function () {
		if (StringUtils.isHollow(this.value)) {
			throw new Error("value is empty");
		} else {
			this.value = this.value.trim();
		}
	}
	
	Message.prototype.make = function () {
		return this.value;
	}
	
	/* -------------------------------------------------------------------- */
	
	Message.prototype.isSimilar = function (message) {
		return this.getValue().equals(message.getValue());
	}
	
	/* -------------------------------------------------------------------- */
	
	Message.prototype.getValue = function () {
		return this.value;
	}
	
	/* -------------------------------------------------------------------- */
	
	Message.parse = function (message) {
		var newMessage = new Message(message);
		
		try {
			newMessage.normalize();
		} catch (e) {
			throw new Error("cannot parse message due to message normalization problems", e);
		}
		
		return newMessage;
	}
	
	Message.create = function (message) {
		var newMessage = new Message(message);
		
		newMessage.normalize();
		
		return newMessage;
	}
	
	/* -------------------------------------------------------------------- */
	
	Message.BLANK = new Message("");
	
	/* -------------------------------------------------------------------- */
	
	function Leaf(value) {
		this.value = value;
	}
	
	/* -------------------------------------------------------------------- */
	
	Leaf.prototype.normalize = function () {
		if (StringUtils.isNone(this.value)) {
			this.value = "";
		} else {
			this.value = this.value.trim();
		}
	}
	
	Leaf.prototype.make = function () {
		return UriUtils.escapeUriComponent(this.value);
	}
	
	/* -------------------------------------------------------------------- */
	
	Leaf.prototype.isSimilar = function (leaf) {
		return this.getValue().equals(leaf.getValue());
	}
	
	/* -------------------------------------------------------------------- */
	
	Leaf.prototype.getValue = function () {
		return this.value;
	}
	
	/* -------------------------------------------------------------------- */
	
	Leaf.parse = function (leaf) {
		var newLeaf = new Leaf(UriUtils.unescapeUriComponent(leaf));
		
		try {
			newLeaf.normalize();
		} catch (e) {
			throw new Error("cannot parse leaf due to leaf normalization problems", e);
		}
		
		if (newLeaf.getValue().length == 0) {
			return Leaf.BLANK;
		} else {
			return newLeaf;
		}
	}
	
	Leaf.create = function (leaf) {
		var newLeaf = new Leaf(leaf);
		
		newLeaf.normalize();
		
		if (newLeaf.getValue().length == 0) {
			return Leaf.BLANK;
		} else {
			return newLeaf;
		}
	}
	
	/* -------------------------------------------------------------------- */
	
	Leaf.BLANK = new Leaf("");
	
	/* -------------------------------------------------------------------- */
	
	function InitialResponseLine(version, code, message) {
		this.version = version;
		this.code = code;
		this.message = message;
	}
	
	/* -------------------------------------------------------------------- */
	
	InitialResponseLine.prototype.normalize = function () {
		if (this.version == null) {
			throw new Error("version is not set");
		} else
		if (this.code == null) {
			throw new Error("code is not set");
		} else
		if (this.message == null) {
			throw new Error("message is not set");
		}
	}
	
	InitialResponseLine.prototype.make = function () {
		return this.version.make() + " " + this.code.make() + " " + this.message.make();
	}
	
	/* -------------------------------------------------------------------- */
	
	InitialResponseLine.prototype.isSimilar = function (initialResponseLine) {
		return this.version.isSimilar(initialResponseLine.getVersion()) && this.code.isSimilar(initialResponseLine.getCode()) && this.message.isSimilar(initialResponseLine.getMessage());
	}
	
	/* -------------------------------------------------------------------- */
	
	InitialResponseLine.prototype.getVersion = function () {
		return this.version;
	}
	
	InitialResponseLine.prototype.getCode = function () {
		return this.code;
	}
	
	InitialResponseLine.prototype.getMessage = function () {
		return this.message;
	}
	
	/* -------------------------------------------------------------------- */
	
	InitialResponseLine.parse = function (responseLine) {
		var remaining = responseLine;
		var partEnd = remaining.indexOf(" ");
		
		var version;
		
		if (partEnd < 0) {
			throw new Error("cannot parse initial respone line due to unable find version");
		} else {
			version = remaining.substring(0, partEnd);
			remaining = remaining.substring(partEnd + 1, remaining.length);
		}
		
		partEnd = remaining.indexOf(" ");
		
		var code;
		
		if (partEnd < 0) {
			throw new Error("cannot parse initial response line due to unable to find code");
		} else {
			code = remaining.substring(0, partEnd);
			remaining = remaining.substring(partEnd + 1, remaining.length);
		}
		
		var message = remaining;
		
		var newVersion;
		
		try {
			newVersion = Version.parse(version);
		} catch (e) {
			throw new Error("cannot parse initial respone line due to version parse problems", e);
		}
		
		var newCode;
		
		try {
			newCode = Code.parse(code);
		} catch (e) {
			throw new Error("cannot parse initial respone line due to code parse problems", e);
		}
		
		var newMessage;
		
		try {
			newMessage = Message.parse(message);
		} catch (e) {
			throw new Error("cannot parse initial respone line due to message parse problems", e);
		}
		
		var newInitialResponseLine = new InitialResponseLine(newVersion, newCode, newMessage);
		
		try {
			newInitialResponseLine.normalize();
		} catch (e) {
			throw new Error("cannot parse initial response line due to initial response line parse problems", e);
		}
		
		return newInitialResponseLine;
	}
	
	InitialResponseLine.create = function (version, code, message) {
		var newInitialResponseLine = new InitialResponseLine(version, code, message);
		
		newInitialResponseLine.normalize();
		
		return newInitialResponseLine;
	}
	
	/* -------------------------------------------------------------------- */
	
	function InitialRequestLine(method, url, version) {
		this.method = method;
		this.url = url;
		this.version = version;
	}
	
	/* -------------------------------------------------------------------- */
	
	InitialRequestLine.prototype.normalize = function () {
		if (this.method == null) {
			throw new Error("method is not set");
		} else
		if (this.url == null) {
			throw new Error("url is not set");
		} else
		if (this.version == null) {
			throw new Error("version is not set");
		}
	}
	
	InitialRequestLine.prototype.make = function () {
		return this.method.make() + " " + this.url.make() + " " + this.version.make();
	}
	
	/* -------------------------------------------------------------------- */
	
	InitialRequestLine.prototype.isSimilar = function (initialRequestLine) {
		return this.method.isSimilar(initialRequestLine.getMethod()) && this.url.isSimilar(initialRequestLine.getUrl()) && this.version.isSimilar(initialRequestLine.getVersion());
	}
	
	/* -------------------------------------------------------------------- */
	
	InitialRequestLine.prototype.getMethod = function () {
		return this.method;
	}
	
	InitialRequestLine.prototype.getUrl = function () {
		return this.url;
	}
	
	InitialRequestLine.prototype.getVersion = function () {
		return this.version;
	}
	
	/* -------------------------------------------------------------------- */
	
	InitialRequestLine.parse = function (requestLine) {
		var remaining = requestLine;
		var partEnd = remaining.indexOf(" ");
		
		var method;
		
		if (partEnd < 0) {
			throw new Error("cannot find method end");
		} else {
			method = remaining.substring(0, partEnd);
			remaining = remaining.substring(partEnd + 1, remaining.length);
		}
		
		partEnd = remaining.indexOf(" ");
		
		var url;
		
		if (partEnd < 0) {
			throw new Error("cannot find url end");
		} else {
			url = remaining.substring(0, partEnd);
			remaining = remaining.substring(partEnd + 1, remaining.length);
		}
		
		var version = remaining;
		
		var newMethod;
		
		try {
			newMethod = Method.parse(method);
		} catch (e) {
			throw new Error("cannot parse initial request line due to method parse problems", e);
		}
		
		var newUrl;
		
		try {
			newUrl = Url.parse(url);
		} catch (e) {
			throw new Error("cannot parse initial request line due to url parse problems", e);
		}
		
		var newVersion;
		
		try {
			newVersion = Version.parse(version);
		} catch (e) {
			throw new Error("cannot parse initial request line due to version parse problems", e);
		}
		
		var newInitialRequestLine = new InitialRequestLine(newMethod, newUrl, newVersion);
		
		try {
			newInitialRequestLine.normalize();
		} catch (e) {
			throw new Error("cannot parse initial request line due to initial request line normalize problems", e);
		}
		
		return newInitialRequestLine;
	}
	
	InitialRequestLine.create = function (method, url, version) {
		var newInitialRequestLine = new InitialRequestLine(method, url, version);
		
		newInitialRequestLine.normalize();
		
		return newInitialRequestLine;
	}
	
	/* -------------------------------------------------------------------- */
	
	function Info(path, queries, fragment) {
		this.path = path;
		this.queries = queries;
		this.fragment = fragment;
	}
	
	/* -------------------------------------------------------------------- */
	
	Info.prototype.normalize = function () {
		if (this.path == null) {
			throw new Error("path is not set");
		} else
		if (this.queries == null) {
			throw new Error("queries is not set");
		} else
		if (this.fragment == null) {
			throw new Error("fragment is not set");
		}
	}
	
	Info.prototype.make = function () {
		var queries = "?" + this.queries.make();
		var fragment = "#" + this.fragment.make();
		
		return this.path.make() + (queries.length > 1 ? queries : "") + (fragment.length > 1 ? fragment : "");
	}
	
	/* -------------------------------------------------------------------- */
	
	Info.prototype.isSimilar = function (info) {
		return this.path.isSimilar(info.getPath()) && this.queries.isSimilar(info.getQueries()) && this.fragment.isSimilar(info.getFragment());
	}
	
	/* -------------------------------------------------------------------- */
	
	Info.prototype.getPath = function () {
		return this.path;
	}
	
	Info.prototype.getQueries = function () {
		return this.queries;
	}
	
	Info.prototype.getFragment = function () {
		return this.fragment;
	}
	
	/* -------------------------------------------------------------------- */
	
	Info.parse = function (info) {
		var remaining = info;
		var partEnd = remaining.indexOf("?");
		
		if (partEnd < 0) {
			partEnd = remaining.indexOf("#");
		}
		
		var path;
		
		if (partEnd < 0) {
			path = remaining;
			remaining = "";
		} else {
			path = remaining.substring(0, partEnd);
			remaining = remaining.substring(partEnd, remaining.length);
		}
		
		partEnd = remaining.indexOf("#");
		
		var queries;
		
		if (partEnd < 0) {
			queries = remaining;
			remaining = "";
		} else {
			queries = remaining.substring(0, partEnd);
			remaining = remaining.substring(partEnd, remaining.length);
		}
		
		if (queries.length > 0) {
			queries = queries.substring(1, queries.length);
		}
		
		var fragment = remaining;
		
		if (fragment.length > 0) {
			fragment = fragment.substring(1, fragment.length);
		}
		
		var newPath;
		
		try {
			newPath = Path.parse(path);
		} catch (e) {
			throw new Error("cannot parse info due to path parse problems", e);
		}
		
		var newQueries;
		
		try {
			newQueries = Queries.parse(queries);
		} catch (e) {
			throw new Error("cannot parse info due to queries parse problems", e);
		}
		
		var newFragment;
		
		try {
			newFragment = Fragment.parse(fragment);
		} catch (e) {
			throw new Error("cannot parse info due to fragment parse problems", e);
		}
		
		var newInfo = new Info(newPath, newQueries, newFragment);
		
		try {
			newInfo.normalize();
		} catch (e) {
			throw new Error("cannot parse info due to info normalize problems", e);
		}
		
		return newInfo;
	}
	
	Info.create = function (path, queries, fragment) {
		var newInfo = new Info(path, queries, fragment);
		
		newInfo.normalize();
		
		return newInfo;
	}
	
	/* -------------------------------------------------------------------- */
	
	function Host(value) {
		this.value = value;
	}
	
	/* -------------------------------------------------------------------- */
	
	Host.prototype.normalize = function () {
		if (StringUtils.isHollow(this.value)) {
			throw new Error("host is not set");
		}
		
		this.value = this.value.toLowerCase().trim();
		
		if (this.value.charAt(this.value.length - 1) == '.') {
			this.value = this.value.substring(0, this.value.length - 1);
		}
		
		if (this.value.length == 0) {
			throw new Error("resulting host is empty");
		}
		
		if (this.value.indexOf(":") >= 0 || this.value.indexOf("@") >= 0) {
			throw new Error("host contains illegal characters");
		}
	}
	
	Host.prototype.make = function () {
		return this.value;
	}
	
	/* -------------------------------------------------------------------- */
	
	Host.prototype.isSimilar = function (host) {
		return this.getValue().equals(host.getValue());
	}
	
	/* -------------------------------------------------------------------- */
	
	Host.prototype.getValue = function () {
		return this.value;
	}
	
	/* -------------------------------------------------------------------- */
	
	Host.parse = function (host) {
		var newHost = new Host(host);
		
		try {
			newHost.normalize();
		} catch (e) {
			throw new Error("cannot parse host due to host normalization problems", e);
		}
		
		return newHost;
	}
	
	Host.create = function (host) {
		var newHost = new Host(host);
		
		newHost.normalize();
		
		return newHost;
	}
	
	/* -------------------------------------------------------------------- */
	
	function UrlFactory(url) {
		this.scheme = url.getScheme();
		this.username = url.getUsername();
		this.password = url.getPassword();
		this.host = url.getHost();
		this.port = url.getPort();
		this.path = url.getPath();
		this.queries = url.getQueries();
		this.fragment = url.getFragment();
	}
	
	/* -------------------------------------------------------------------- */
	
	UrlFactory.prototype.build = function () {
		return Url.create(this.scheme, this.username, this.password, this.host, this.port, this.path, this.queries, this.fragment);
	}
	
	/* -------------------------------------------------------------------- */
	
	UrlFactory.prototype.template = function () {
		this.queries = QueriesFactory.create(this.queries).template().build();
		
		return this;
	}
	
	/* -------------------------------------------------------------------- */
	
	UrlFactory.prototype.setScheme = function (scheme) {
		this.scheme = scheme;
		
		return this;
	}
	
	UrlFactory.prototype.setUsername = function (username) {
		this.username = username;
		
		return this;
	}
	
	UrlFactory.prototype.setPassword = function (password) {
		this.password = password;
		
		return this;
	}
	
	UrlFactory.prototype.setHost = function (host) {
		this.host = host;
		
		return this;
	}
	
	UrlFactory.prototype.setPort = function (port) {
		this.port = port;
		
		return this;
	}
	
	UrlFactory.prototype.setPath = function (path) {
		this.path = path;
		
		return this;
	}
	
	UrlFactory.prototype.setQueries = function (queries) {
		this.queries = queries;
		
		return this;
	}
	
	UrlFactory.prototype.setFragment = function (fragment) {
		this.fragment = fragment;
		
		return this;
	}
	
	UrlFactory.prototype.setInfo = function (newInfo) {
		this.path = newInfo.getPath();
		this.queries = newInfo.getQueries();
		this.fragment = newInfo.getFragment();
		
		return this;
	}
	
	/* -------------------------------------------------------------------- */
	
	UrlFactory.prototype.resetQueries = function () {
		this.queries = Queries.BLANK;
		
		return this;
	}
	
	UrlFactory.prototype.resetFragment = function () {
		this.fragment = Fragment.BLANK;
		
		return this;
	}
	
	/* -------------------------------------------------------------------- */
	
	UrlFactory.create = function (url) {
		return new UrlFactory(url);
	}
	
	/* -------------------------------------------------------------------- */
	
	function ResponseFactory(response) {
		this.version = response.getVersion();
		this.code = response.getCode();
		this.message = response.getMessage();
		this.headers = response.getHeaders();
		this.data = response.getData();
	}
	
	/* -------------------------------------------------------------------- */
	
	ResponseFactory.prototype.build = function () {
		return Response.create(this.version, this.code, this.message, this.headers, this.data);
	}
	
	/* -------------------------------------------------------------------- */
	
	ResponseFactory.prototype.setVersion = function (version) {
		this.version = version;
		
		return this;
	}
	
	ResponseFactory.prototype.setCode = function (code) {
		this.code = code;
		
		return this;
	}
	
	ResponseFactory.prototype.setMessage = function (message) {
		this.message = message;
		
		return this;
	}
	
	ResponseFactory.prototype.setHeaders = function (headers) {
		this.headers = headers;
		
		return this;
	}
	
	ResponseFactory.prototype.setData = function (data) {
		this.data = data;
		
		return this;
	}
	
	/* -------------------------------------------------------------------- */
	
	ResponseFactory.create = function (response) {
		return new ResponseFactory(response);
	}
	
	/* -------------------------------------------------------------------- */
	
	function RequestFactory(request) {
		this.method = request.getMethod();
		this.url = request.getUrl();
		this.version = request.getVersion();
		this.headers = request.getHeaders();
		this.data = request.getData();
	}
	
	/* -------------------------------------------------------------------- */
	
	RequestFactory.prototype.build = function () {
		return Request.create(this.method, this.url, this.version, this.headers, this.data);
	}
	
	/* -------------------------------------------------------------------- */
	
	RequestFactory.prototype.template = function () {
		this.url = UrlFactory.create(this.url).template().build();
		
		if (this.data instanceof FieldData) {
			var fieldData = this.data;
			
			this.data = FieldDataFactory.create(fieldData).template().build();
		}
		
		return this;
	}
	
	/* -------------------------------------------------------------------- */
	
	RequestFactory.prototype.setMethod = function (method) {
		this.method = method;
		
		return this;
	}
	
	RequestFactory.prototype.setUrl = function (url) {
		this.url = url;
		
		return this;
	}
	
	RequestFactory.prototype.setVersion = function (version) {
		this.version = version;
		
		return this;
	}
	
	RequestFactory.prototype.setHeaders = function (headers) {
		this.headers = headers;
		
		return this;
	}
	
	RequestFactory.prototype.setData = function (data) {
		this.data = data;
		
		return this;
	}
	
	/* -------------------------------------------------------------------- */
	
	RequestFactory.create = function (request) {
		return new RequestFactory(request);
	}
	
	/* -------------------------------------------------------------------- */
	
	function QueriesFactory(queries) {
		this.queries = new ListContainer();
		
		for (var queryIterator = queries.iterator(), query = null; queryIterator.hasNext();) {
			query = queryIterator.next();
			this.queries.add(query);
		}
	}
	
	/* -------------------------------------------------------------------- */
	
	QueriesFactory.prototype.build = function () {
		return Queries.create(this.queries);
	}
	
	/* -------------------------------------------------------------------- */
	
	QueriesFactory.prototype.template = function () {
		var newQueries = new ListContainer();
		
		for (var queryIterator = this.queries.iterator(), query = null; queryIterator.hasNext();) {
			query = queryIterator.next();
			newQueries.add(Query.create(query.getName(), ""));
		}
		
		this.queries = newQueries;
		
		return this;
	}
	
	/* -------------------------------------------------------------------- */
	
	QueriesFactory.prototype.addQuery = function (query) {
		this.queries.add(query);
		
		return this;
	}
	
	QueriesFactory.prototype.replaceQuery = function (query) {
		var queryName = query.getName();
		var newQueries = new ListContainer();
		
		for (var queryItemIterator = this.queries.iterator(), queryItem = null; queryItemIterator.hasNext();) {
			queryItem = queryItemIterator.next();
			if (!queryItem.getName().equals(queryName)) {
				newQueries.add(queryItem);
			}
		}
		
		newQueries.add(query);
		
		this.queries = newQueries;
		
		return this;
	}
	
	/* -------------------------------------------------------------------- */
	
	QueriesFactory.create = function (querys) {
		return new QueriesFactory(querys);
	}
	
	/* -------------------------------------------------------------------- */
	
	function PathFactory(path) {
		this.base = path.getBase();
		this.leaf = path.getLeaf();
	}
	
	/* -------------------------------------------------------------------- */
	
	PathFactory.prototype.build = function () {
		return Path.create(this.base, this.leaf);
	}
	
	/* -------------------------------------------------------------------- */
	
	PathFactory.prototype.setBase = function (base) {
		this.base = base;
		
		return this;
	}
	
	PathFactory.prototype.setLeaf = function (leaf) {
		this.leaf = leaf;
		
		return this;
	}
	
	/* -------------------------------------------------------------------- */
	
	PathFactory.prototype.resetLeaf = function () {
		this.leaf = Leaf.BLANK;
		
		return this;
	}
	
	/* -------------------------------------------------------------------- */
	
	PathFactory.create = function (path) {
		return new PathFactory(path);
	}
	
	/* -------------------------------------------------------------------- */
	
	function InitialResponseLineFactory(initialResponseLine) {
		this.version = initialResponseLine.getVersion();
		this.code = initialResponseLine.getCode();
		this.message = initialResponseLine.getMessage();
	}
	
	/* -------------------------------------------------------------------- */
	
	InitialResponseLineFactory.prototype.build = function () {
		return InitialResponseLine.create(this.version, this.code, this.message);
	}
	
	/* -------------------------------------------------------------------- */
	
	InitialResponseLineFactory.prototype.setVersion = function (version) {
		this.version = version;
		
		return this;
	}
	
	InitialResponseLineFactory.prototype.setCode = function (code) {
		this.code = code;
		
		return this;
	}
	
	InitialResponseLineFactory.prototype.setMessage = function (message) {
		this.message = message;
		
		return this;
	}
	
	/* -------------------------------------------------------------------- */
	
	InitialResponseLineFactory.create = function (initialResponseLine) {
		return new InitialResponseLineFactory(initialResponseLine);
	}
	
	/* -------------------------------------------------------------------- */
	
	function InitialRequestLineFactory(initialRequestLine) {
		this.method = initialRequestLine.getMethod();
		this.url = initialRequestLine.getUrl();
		this.version = initialRequestLine.getVersion();
	}
	
	/* -------------------------------------------------------------------- */
	
	InitialRequestLineFactory.prototype.build = function () {
		return InitialRequestLine.create(this.method, this.url, this.version);
	}
	
	/* -------------------------------------------------------------------- */
	
	InitialRequestLineFactory.prototype.setMethod = function (method) {
		this.method = method;
		
		return this;
	}
	
	InitialRequestLineFactory.prototype.setUrl = function (url) {
		this.url = url;
		
		return this;
	}
	
	InitialRequestLineFactory.prototype.setVersion = function (version) {
		this.version = version;
		
		return this;
	}
	
	/* -------------------------------------------------------------------- */
	
	InitialRequestLineFactory.create = function (initialRequestLine) {
		return new InitialRequestLineFactory(initialRequestLine);
	}
	
	/* -------------------------------------------------------------------- */
	
	function InfoFactory(info) {
		this.path = info.getPath();
		this.queries = info.getQueries();
		this.fragment = info.getFragment();
	}
	
	/* -------------------------------------------------------------------- */
	
	InfoFactory.prototype.build = function () {
		return Info.create(this.path, this.queries, this.fragment);
	}
	
	/* -------------------------------------------------------------------- */
	
	InfoFactory.prototype.setPath = function (path) {
		this.path = path;
		
		return this;
	}
	
	InfoFactory.prototype.setQueries = function (queries) {
		this.queries = queries;
		
		return this;
	}
	
	InfoFactory.prototype.setFragment = function (fragment) {
		this.fragment = fragment;
		
		return this;
	}
	
	/* -------------------------------------------------------------------- */
	
	InfoFactory.prototype.resetQueries = function () {
		this.queries = Queries.BLANK;
		
		return this;
	}
	
	InfoFactory.prototype.resetFragment = function () {
		this.fragment = Fragment.BLANK;
		
		return this;
	}
	
	/* -------------------------------------------------------------------- */
	
	InfoFactory.create = function (info) {
		return new InfoFactory(info);
	}
	
	/* -------------------------------------------------------------------- */
	
	function HeadersFactory(headers) {
		this.headers = new ListContainer();
		
		for (var headerIterator = headers.iterator(), header = null; headerIterator.hasNext();) {
			header = headerIterator.next();
			this.headers.add(header);
		}
	}
	
	/* -------------------------------------------------------------------- */
	
	HeadersFactory.prototype.build = function () {
		return Headers.create(this.headers);
	}
	
	/* -------------------------------------------------------------------- */
	
	HeadersFactory.prototype.addHeader = function (header) {
		this.headers.add(header);
		
		return this;
	}
	
	HeadersFactory.prototype.replaceHeader = function (query) {
		var queryName = query.getName();
		var newHeaders = new ListContainer();
		
		for (var queryItemIterator = this.headers.iterator(), queryItem = null; queryItemIterator.hasNext();) {
			queryItem = queryItemIterator.next();
			if (!queryItem.getName().equals(queryName)) {
				newHeaders.add(queryItem);
			}
		}
		
		newHeaders.add(query);
		
		this.headers = newHeaders;
		
		return this;
	}
	
	/* -------------------------------------------------------------------- */
	
	HeadersFactory.create = function (headers) {
		return new HeadersFactory(headers);
	}
	
	/* -------------------------------------------------------------------- */
	
	function FieldDataFactory(fieldData) {
		this.queries = new ListContainer();
		
		for (var queryIterator = fieldData.iterator(), query = null; queryIterator.hasNext();) {
			query = queryIterator.next();
			this.queries.add(query);
		}
	}
	
	/* -------------------------------------------------------------------- */
	
	FieldDataFactory.prototype.build = function () {
		return FieldData.create(this.queries);
	}
	
	/* -------------------------------------------------------------------- */
	
	FieldDataFactory.prototype.template = function () {
		var newQueries = new ListContainer();
		
		for (var queryIterator = this.queries.iterator(), query = null; queryIterator.hasNext();) {
			query = queryIterator.next();
			newQueries.add(Query.create(query.getName(), ""));
		}
		
		this.queries = newQueries;
		
		return this;
	}
	
	/* -------------------------------------------------------------------- */
	
	FieldDataFactory.prototype.addQuery = function (query) {
		this.queries.add(query);
		
		return this;
	}
	
	FieldDataFactory.prototype.replaceQuery = function (query) {
		var queryName = query.getName();
		var newFieldData = new ListContainer();
		
		for (var queryItemIterator = this.queries.iterator(), queryItem = null; queryItemIterator.hasNext();) {
			queryItem = queryItemIterator.next();
			if (!queryItem.getName().equals(queryName)) {
				newFieldData.add(queryItem);
			}
		}
		
		newFieldData.add(query);
		
		this.queries = newFieldData;
		
		return this;
	}
	
	/* -------------------------------------------------------------------- */
	
	FieldDataFactory.create = function (fieldData) {
		return new FieldDataFactory(fieldData);
	}
	
	/* -------------------------------------------------------------------- */
	
	function CredentialsFactory(credentials) {
		this.username = credentials.getUsername();
		this.password = credentials.getPassword();
	}
	
	/* -------------------------------------------------------------------- */
	
	CredentialsFactory.prototype.build = function () {
		return Credentials.create(this.username, this.password);
	}
	
	/* -------------------------------------------------------------------- */
	
	CredentialsFactory.prototype.setUsername = function (username) {
		this.username = username;
		
		return this;
	}
	
	CredentialsFactory.prototype.setPassword = function (password) {
		this.password = password;
		
		return this;
	}
	
	/* -------------------------------------------------------------------- */
	
	CredentialsFactory.create = function (credentials) {
		return new CredentialsFactory(credentials);
	}
	
	/* -------------------------------------------------------------------- */
	
	function BaseFactory(base) {
		this.base = base.getValue();
	}
	
	/* -------------------------------------------------------------------- */
	
	BaseFactory.prototype.build = function () {
		return Base.create(this.base);
	}
	
	/* -------------------------------------------------------------------- */
	
	BaseFactory.prototype.addDirectory = function (directory) {
		if (!StringUtils.isNone(directory)) {
			this.base += "/" + directory + "/";
		}
		
		return this;
	}
	
	/* -------------------------------------------------------------------- */
	
	BaseFactory.create = function (base) {
		return new BaseFactory(base);
	}
	
	/* -------------------------------------------------------------------- */
	
	function AddressFactory(address) {
		this.host = address.getHost();
		this.port = address.getPort();
	}
	
	/* -------------------------------------------------------------------- */
	
	AddressFactory.prototype.build = function () {
		return Address.create(this.host, this.port);
	}
	
	/* -------------------------------------------------------------------- */
	
	AddressFactory.prototype.setHost = function (host) {
		this.host = host;
		
		return this;
	}
	
	AddressFactory.prototype.setPort = function (port) {
		this.port = port;
		
		return this;
	}
	
	/* -------------------------------------------------------------------- */
	
	AddressFactory.create = function (address) {
		return new AddressFactory(address);
	}
	
	/* -------------------------------------------------------------------- */
	
	function Headers(headers) {
		this.headers = headers;
	}
	
	/* -------------------------------------------------------------------- */
	
	Headers.prototype.normalize = function () {
		if (this.headers == null) {
			throw new Error("headers is not set");
		}
	}
	
	Headers.prototype.make = function () {
		var headers = "";
		
		for (var headerIterator = this.headers.iterator(), header = null; headerIterator.hasNext();) {
			header = headerIterator.next();
			headers += header.make() + "\r\n";
		}
		
		if (headers.length > 0) {
			headers = headers.substring(0, headers.length - 2);
		}
		
		return headers;
	}
	
	/* -------------------------------------------------------------------- */
	
	Headers.prototype.isSimilar = function (headers) {
		if (this.headers.size() == headers.size()) {
			for (var headerIterator = headers.iterator(), header = null; headerIterator.hasNext();) {
				header = headerIterator.next();
				if (!this.hasHeaderName(header.getName())) {
					return false;
				}
			}
			
			return true;
		} else {
			return false;
		}
	}
	
	/* -------------------------------------------------------------------- */
	
	Headers.prototype.iterator = function () {
		return new ImmutableIterator(this.headers.iterator());
	}
	
	/* -------------------------------------------------------------------- */
	
	Headers.prototype.retrieve = function (i) {
		return this.headers.retrieve(i);
	}
	
	Headers.prototype.size = function () {
		return this.headers.size();
	}
	
	/* -------------------------------------------------------------------- */
	
	Headers.prototype.hasHeaderName = function (name) {
		for (var headerIterator = this.headers.iterator(), header = null; headerIterator.hasNext();) {
			header = headerIterator.next();
			if (header.matchesName(name)) {
				return true;
			}
		}
		
		return false;
	}
	
	/* -------------------------------------------------------------------- */
	
	Headers.prototype.getHeaderValueByName = function (name) {
		for (var headerIterator = this.headers.iterator(), header = null; headerIterator.hasNext();) {
			header = headerIterator.next();
			if (header.matchesName(name)) {
				return header.getValue();
			}
		}
		
		return null;
	}
	
	Headers.prototype.getHeaderValuesByName = function (name) {
		var headers = new ListContainer();
		
		for (var headerIterator = this.headers.iterator(), header = null; headerIterator.hasNext();) {
			header = headerIterator.next();
			if (header.matchesName(name)) {
				headers.add(header.getValue());
			}
		}
		
		return headers;
	}
	
	/* -------------------------------------------------------------------- */
	
	Headers.splitHeaders = function (headers) {
		var headersList = new ListContainer();
		var remaining = headers;
		
		var partEnd;
		
		while (true) {
			partEnd = remaining.indexOf("\r\n");
			
			if (partEnd < 0) {
				break;
			}
			
			var headersString = remaining.substring(0, partEnd);
			
			headersString = StringUtils.ltrim(headersString);
			remaining = remaining.substring(partEnd + 1, remaining.length);
			
			if (remaining.length > 0) {
				try {
					headersList.add(Header.parse(headersString));
				} catch (e) {
					LogUtils.recordException("cannot parse header", e);
				}
			}
		}
		
		remaining = StringUtils.ltrim(remaining);
		
		if (remaining.length > 0) {
			try {
				headersList.add(Header.parse(remaining));
			} catch (e) {
				LogUtils.recordException("cannot parse header", e);
			}
		}
		
		return headersList;
	}
	
	/* -------------------------------------------------------------------- */
	
	Headers.parse = function (headers) {
		var newHeaders = new Headers(Headers.splitHeaders(headers));
		
		try {
			newHeaders.normalize();
		} catch (e) {
			throw new Error("cannot parse headers due to headers normalize problems", e);
		}
		
		if (newHeaders.size() == 0) {
			return Headers.BLANK;
		} else {
			return newHeaders;
		}
	}
	
	Headers.create = function (headers) {
		var newHeaders = new Headers(headers);
		
		newHeaders.normalize();
		
		if (newHeaders.size() == 0) {
			return Headers.BLANK;
		}
		
		return newHeaders;
	}
	
	/* -------------------------------------------------------------------- */
	
	Headers.BLANK = new Headers(new ListContainer());
	
	/* -------------------------------------------------------------------- */
	
	function Header(name, value) {
		this.name = name;
		this.value = value;
	}
	
	/* -------------------------------------------------------------------- */
	
	Header.prototype.normalize = function () {
		if (StringUtils.isHollow(this.name)) {
			throw new Error("header name is not set");
		} else {
			this.name = this.name.trim();
		}
		
		if (StringUtils.isNone(this.value)) {
			this.value = "";
		}
	}
	
	Header.prototype.make = function () {
		return this.name + ": " + this.value;
	}
	
	/* -------------------------------------------------------------------- */
	
	Header.prototype.isSimilar = function (header) {
		return this.getName().toLowerCase().equals(header.getName().toLowerCase());
	}
	
	/* -------------------------------------------------------------------- */
	
	Header.prototype.getName = function () {
		return this.name;
	}
	
	Header.prototype.getValue = function () {
		return this.value;
	}
	
	/* -------------------------------------------------------------------- */
	
	Header.prototype.matchesName = function (name) {
		return this.name.toLowerCase().equals(name.toLowerCase());
	}
	
	/* -------------------------------------------------------------------- */
	
	Header.parse = function (header) {
		var nameEnd = header.indexOf(":");
		
		var name;
		var value;
		
		if (nameEnd < 0) {
			name = header;
			value = "";
		} else {
			name = header.substring(0, nameEnd);
			value = header.substring(nameEnd + 1, header.length);
		}
		
		if (value.startsWith(" ")) {
			value = value.substring(1, value.length);
		}
		
		var newHeader = new Header(name.trim(), value);
		
		try {
			newHeader.normalize();
		} catch (e) {
			throw new Error("cannot parse header due to header normalization problems", e);
		}
		
		return newHeader;
	}
	
	Header.create = function (name, value) {
		var newHeader = new Header(name, value);
		
		newHeader.normalize();
		
		return newHeader;
	}
	
	/* -------------------------------------------------------------------- */
	
	function Fragment(value) {
		this.value = value;
	}
	
	/* -------------------------------------------------------------------- */
	
	Fragment.prototype.normalize = function () {
		if (StringUtils.isNone(this.value)) {
			this.value = "";
		}
	}
	
	Fragment.prototype.make = function () {
		return this.value;
	}
	
	/* -------------------------------------------------------------------- */
	
	Fragment.prototype.isSimilar = function (fragment) {
		return this.getValue().equals(fragment.getValue());
	}
	
	/* -------------------------------------------------------------------- */
	
	Fragment.prototype.getValue = function () {
		return this.value;
	}
	
	/* -------------------------------------------------------------------- */
	
	Fragment.parse = function (fragment) {
		var newFragment = new Fragment(fragment);
		
		try {
			newFragment.normalize();
		} catch (e) {
			throw new Error("cannot parse fragment due to fragment normalization problems");
		}
		
		if (newFragment.getValue().length == 0) {
			return Fragment.BLANK;
		} else {
			return newFragment;
		}
	}
	
	Fragment.create = function (fragment) {
		var newFragment = new Fragment(fragment);
		
		newFragment.normalize();
		
		if (newFragment.getValue().length == 0) {
			return Fragment.BLANK;
		} else {
			return newFragment;
		}
	}
	
	/* -------------------------------------------------------------------- */
	
	Fragment.BLANK = new Fragment("");
	
	/* -------------------------------------------------------------------- */
	
	function FieldData(queries) {
		this.queries = queries;
	}
	
	/* -------------------------------------------------------------------- */
	
	FieldData.prototype.normalize = function () {
		if (this.queries == null) {
			throw new Error("queries is not set");
		}
	}
	
	FieldData.prototype.make = function () {
		var queries = "";
		
		for (var queryIterator = this.queries.iterator(), query = null; queryIterator.hasNext();) {
			query = queryIterator.next();
			queries += "&" + query.make();
		}
		
		if (queries.length > 0) {
			queries = queries.substring(1, queries.length);
		}
		
		return queries;
	}
	
	/* -------------------------------------------------------------------- */
	
	FieldData.prototype.isSimilar = function (data) {
		if (data instanceof FieldData) {
			var fieldData = data;
			
			if (this.length == fieldData.length) {
				for (var queryIterator = data.iterator(), query = null; queryIterator.hasNext();) {
					query = queryIterator.next();
					if (!this.hasQueryName(query.getName())) {
						return false;
					}
				}
				
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}
	
	/* -------------------------------------------------------------------- */
	
	FieldData.prototype.iterator = function () {
		return new ImmutableIterator(this.queries.iterator());
	}
	
	/* -------------------------------------------------------------------- */
	
	FieldData.prototype.getValue = function () {
		return this.make();
	}
	
	/* -------------------------------------------------------------------- */
	
	FieldData.prototype.retrieve = function (i) {
		return this.queries.retrieve(i);
	}
	
	FieldData.prototype.length = function () {
		return this.queries.size();
	}
	
	/* -------------------------------------------------------------------- */
	
	FieldData.prototype.hasQueryName = function (name) {
		for (var queryIterator = this.queries.iterator(), query = null; queryIterator.hasNext();) {
			query = queryIterator.next();
			if (query.matchesName(name)) {
				return true;
			}
		}
		
		return false;
	}
	
	/* -------------------------------------------------------------------- */
	
	FieldData.prototype.getQueryValueByName = function (name) {
		for (var queryIterator = this.queries.iterator(), query = null; queryIterator.hasNext();) {
			query = queryIterator.next();
			if (query.matchesName(name)) {
				return query.getValue();
			}
		}
		
		return null;
	}
	
	FieldData.prototype.getQueryValuesByName = function (name) {
		var headers = new ListContainer();
		
		for (var queryIterator = this.queries.iterator(), query = null; queryIterator.hasNext();) {
			query = queryIterator.next();
			if (query.matchesName(name)) {
				headers.add(query.getValue());
			}
		}
		
		return headers;
	}
	
	/* -------------------------------------------------------------------- */
	
	FieldData.splitQueries = function (queries) {
		return Queries.splitQueries(queries);
	}
	
	/* -------------------------------------------------------------------- */
	
	FieldData.parse = function (queries) {
		var newQueriesData = new FieldData(FieldData.splitQueries(queries));
		
		try {
			newQueriesData.normalize();
		} catch (e) {
			throw new Error("cannot parse form data due to form data normalize problems", e);
		}
		
		if (newQueriesData.length == 0) {
			return FieldData.BLANK;
		} else {
			return newQueriesData;
		}
	}
	
	FieldData.create = function (queries) {
		var newQueriesData = new FieldData(queries);
		
		newQueriesData.normalize();
		
		if (newQueriesData.length == 0) {
			return FieldData.BLANK;
		} else {
			return newQueriesData;
		}
	}
	
	/* -------------------------------------------------------------------- */
	
	FieldData.BLANK = new FieldData(new ListContainer());
	
	/* -------------------------------------------------------------------- */
	
	function Credentials(username, password) {
		this.username = username;
		this.password = password;
	}
	
	/* -------------------------------------------------------------------- */
	
	Credentials.prototype.normalize = function () {
		if (this.username == null) {
			throw new Error("username is not set");
		} else
		if (this.password == null) {
			throw new Error("password is not set");
		}
	}
	
	Credentials.prototype.make = function () {
		var username = this.username.make();
		var password = this.password.make();
		var credentials = username;
		
		if (password.length > 0) {
			credentials += ":" + password;
		}
		
		return credentials;
	}
	
	/* -------------------------------------------------------------------- */
	
	Credentials.prototype.isSimilar = function (credentials) {
		return this.username.isSimilar(credentials.getUsername()) && this.password.isSimilar(credentials.getPassword());
	}
	
	/* -------------------------------------------------------------------- */
	
	Credentials.prototype.getUsername = function () {
		return this.username;
	}
	
	Credentials.prototype.getPassword = function () {
		return this.password;
	}
	
	/* -------------------------------------------------------------------- */
	
	Credentials.parse = function (credentials) {
		var usernameEnd = credentials.indexOf(":");
		
		var usernameSource;
		var passwordSource;
		
		if (usernameEnd < 0) {
			usernameSource = credentials;
			passwordSource = "";
		} else {
			usernameSource = credentials.substring(0, usernameEnd);
			passwordSource = credentials.substring(usernameEnd + 1, credentials.length);
		}
		
		var username;
		
		try {
			username = Username.parse(usernameSource);
		} catch (e) {
			throw new Error("cannot parse credentials due to username parse problems", e);
		}
		
		var password;
		
		try {
			password = Password.parse(passwordSource);
		} catch (e) {
			throw new Error("cannot parse credentials due to password parse problems", e);
		}
		
		var newCredentials = new Credentials(username, password);
		
		try {
			newCredentials.normalize();
		} catch (e) {
			throw new Error("cannot parse credentials due to credentials normalize problems", e);
		}
		
		return newCredentials;
	}
	
	Credentials.create = function (username, password) {
		var newCredentials = new Credentials(username, password);
		
		newCredentials.normalize();
		
		return newCredentials;
	}
	
	/* -------------------------------------------------------------------- */
	
	Credentials.BLANK = new Credentials(Username.BLANK, Password.BLANK);
	
	/* -------------------------------------------------------------------- */
	
	function Code(value) {
		this.value = value;
	}
	
	/* -------------------------------------------------------------------- */
	
	Code.prototype.normalize = function () {
		if (StringUtils.isHollow(this.value)) {
			throw new Error("code is not set");
		} else {
			this.value = this.value.trim();
			
			if (this.value.indexOf(" ") > 0) {
				throw new Error("code contains illegal characters");
			}
		}
	}
	
	Code.prototype.make = function () {
		return this.value;
	}
	
	/* -------------------------------------------------------------------- */
	
	Code.prototype.isSimilar = function (code) {
		return this.getValue().equals(code.getValue());
	}
	
	/* -------------------------------------------------------------------- */
	
	Code.prototype.getValue = function () {
		return this.value;
	}
	
	/* -------------------------------------------------------------------- */
	
	Code.prototype.is2xx = function () {
		return this.value.startsWith("2");
	}
	
	Code.prototype.is200 = function () {
		return this.value.equals("200");
	}
	
	Code.prototype.is3xx = function () {
		return this.value.startsWith("3");
	}
	
	Code.prototype.is302 = function () {
		return this.value.equals("302");
	}
	
	Code.prototype.is4xx = function () {
		return this.value.startsWith("4");
	}
	
	Code.prototype.is403 = function () {
		return this.value.equals("403");
	}
	
	Code.prototype.is404 = function () {
		return this.value.equals("404");
	}
	
	Code.prototype.is5xx = function () {
		return this.value.startsWith("5");
	}
	
	Code.prototype.is500 = function () {
		return this.value.equals("500");
	}
	
	/* -------------------------------------------------------------------- */
	
	Code.parse = function (code) {
		var newCode = new Code(code);
		
		try {
			newCode.normalize();
		} catch (e) {
			throw new Error("cannot parse code due to normalization problems", e);
		}
		
		if (newCode.is200()) {
			return Code.CODE_200;
		} else
		if (newCode.is302()) {
			return Code.CODE_302;
		} else
		if (newCode.is403()) {
			return Code.CODE_403;
		} else
		if (newCode.is404()) {
			return Code.CODE_404;
		} else
		if (newCode.is500()) {
			return Code.CODE_500;
		} else {
			return newCode;
		}
	}
	
	Code.create = function (code) {
		var newCode = new Code(code);
		
		newCode.normalize();
		
		if (newCode.is200()) {
			return Code.CODE_200;
		} else
		if (newCode.is302()) {
			return Code.CODE_302;
		} else
		if (newCode.is403()) {
			return Code.CODE_403;
		} else
		if (newCode.is404()) {
			return Code.CODE_404;
		} else
		if (newCode.is500()) {
			return Code.CODE_500;
		} else {
			return newCode;
		}
	}
	
	/* -------------------------------------------------------------------- */
	
	Code.CODE_200 = new Code("200");
	Code.CODE_302 = new Code("302");
	Code.CODE_403 = new Code("403");
	Code.CODE_404 = new Code("404");
	Code.CODE_500 = new Code("500");
	
	/* -------------------------------------------------------------------- */
	
	function Base(value) {
		this.value = value;
	}
	
	/* -------------------------------------------------------------------- */
	
	Base.prototype.normalize = function () {
		if (StringUtils.isNone(this.value)) {
			this.value = "/";
		} else {
			this.value = this.value.trim();
			
			var skipPrevious = false;
			var newParts = new ListContainer();
			var oldParts = new ListContainer(this.value.split("/"));
			var oldPartsIterator = oldParts.iterator();
			
			while (true) {
				if (skipPrevious) {
					if (newParts.size() > 0) {
						newParts.erase(0);
					}
					
					skipPrevious = false;
				} else {
					if (oldPartsIterator.hasNext()) {
						var oldPart = oldPartsIterator.next().trim();
						
						if (!StringUtils.isEmpty(oldPart)) {
							if (oldPart.equals("..")) {
								skipPrevious = true;
							} else {
								if (!oldPart.equals(".")) {
									newParts.insert(0, oldPart);
								}
							}
						}
					} else {
						break;
					}
				}
			}
			
			var newBase = "";
			
			for (var newPartIterator = newParts.iterator(), newPart = null; newPartIterator.hasNext();) {
				newPart = newPartIterator.next();
				newBase = newPart + "/" + newBase;
			}
			
			this.value = "/" + newBase;
		}
	}
	
	Base.prototype.make = function () {
		return this.value;
	}
	
	/* -------------------------------------------------------------------- */
	
	Base.prototype.isSimilar = function (base) {
		return this.getValue().equals(base.getValue());
	}
	
	/* -------------------------------------------------------------------- */
	
	Base.prototype.getValue = function () {
		return this.value;
	}
	
	/* -------------------------------------------------------------------- */
	
	Base.parse = function (base) {
		var newBase = new Base(base);
		
		try {
			newBase.normalize();
		} catch (e) {
			throw new Error("cannot parse base due to base normalization problems", e);
		}
		
		return newBase;
	}
	
	Base.create = function (base) {
		var newBase = new Base(base);
		
		newBase.normalize();
		
		return newBase;
	}
	
	/* -------------------------------------------------------------------- */
	
	Base.ROOT = new Base("/");
	
	/* -------------------------------------------------------------------- */
	
	function Address(host, port) {
		this.host = host;
		this.port = port;
	}
	
	/* -------------------------------------------------------------------- */
	
	Address.prototype.normalize = function () {
		if (this.host == null) {
			throw new Error("host is not set");
		} else
		if (this.port == null) {
			throw new Error("port is not set");
		}
	}
	
	Address.prototype.make = function () {
		var host = this.host.make();
		var port = this.port.make();
		var address = host;
		
		if (port.length > 0) {
			address += ":" + port;
		}
		
		return address;
	}
	
	/* -------------------------------------------------------------------- */
	
	Address.prototype.isSimilar = function (address) {
		return this.host.isSimilar(address.getHost()) && this.port.isSimilar(address.getPort());
	}
	
	/* -------------------------------------------------------------------- */
	
	Address.prototype.getHost = function () {
		return this.host;
	}
	
	Address.prototype.getPort = function () {
		return this.port;
	}
	
	/* -------------------------------------------------------------------- */
	
	Address.parse = function (address) {
		var hostEnd = address.indexOf(":");
		
		var hostSource;
		var portSource;
		
		if (hostEnd < 0) {
			throw new Error("cannot parse address due to unable to find host");
		} else {
			hostSource = address.substring(0, hostEnd);
			portSource = address.substring(hostEnd + 1, address.length);
		}
		
		var host;
		
		try {
			host = Host.parse(hostSource);
		} catch (e) {
			throw new Error("cannot parse address due to host parsing problems", e);
		}
		
		var port;
		
		try {
			port = Port.parse(portSource);
		} catch (e) {
			throw new Error("cannot parse address due to port parsing problems", e);
		}
		
		var newAddress = new Address(host, port);
		
		try {
			newAddress.normalize();
		} catch (e) {
			throw new Error("cannot parse address due to address normalization problems", e);
		}
		
		return newAddress;
	}
	
	Address.create = function (host, port) {
		var newAddress = new Address(host, port);
		
		newAddress.normalize();
		
		return newAddress;
	}
	
	/* -------------------------------------------------------------------- */
	
	exports.Version = Version;
	exports.Username = Username;
	exports.Url = Url;
	exports.SourceData = SourceData;
	exports.Scheme = Scheme;
	exports.Response = Response;
	exports.Request = Request;
	exports.Query = Query;
	exports.Queries = Queries;
	exports.Port = Port;
	exports.Path = Path;
	exports.Password = Password;
	exports.Method = Method;
	exports.Message = Message;
	exports.Leaf = Leaf;
	exports.InitialResponseLine = InitialResponseLine;
	exports.InitialRequestLine = InitialRequestLine;
	exports.Info = Info;
	exports.Host = Host;
	exports.UrlFactory = UrlFactory;
	exports.ResponseFactory = ResponseFactory;
	exports.RequestFactory = RequestFactory;
	exports.QueriesFactory = QueriesFactory;
	exports.PathFactory = PathFactory;
	exports.InitialResponseLineFactory = InitialResponseLineFactory;
	exports.InitialRequestLineFactory = InitialRequestLineFactory;
	exports.InfoFactory = InfoFactory;
	exports.HeadersFactory = HeadersFactory;
	exports.FieldDataFactory = FieldDataFactory;
	exports.CredentialsFactory = CredentialsFactory;
	exports.BaseFactory = BaseFactory;
	exports.AddressFactory = AddressFactory;
	exports.Headers = Headers;
	exports.Header = Header;
	exports.Fragment = Fragment;
	exports.FieldData = FieldData;
	exports.Credentials = Credentials;
	exports.Code = Code;
	exports.Base = Base;
	exports.Address = Address;
	
})(exports);