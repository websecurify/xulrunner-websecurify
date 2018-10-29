(function (exports) {
	
	var org_basic_common = require("./org_basic_common.js");
	var org_basic_core = require("./org_basic_core.js");
	var org_basic_http = require("./org_basic_http.js");
	
	var StringUtils = org_basic_common.StringUtils;
	var RegularExpression = org_basic_core.RegularExpression;
	var RegularMatch = org_basic_core.RegularMatch;
	var HtmlUtils = org_basic_core.HtmlUtils;
	var Method = org_basic_http.Method;
	var Url = org_basic_http.Url;
	var ImmutableIterator = org_basic_common.ImmutableIterator;
	var ListContainer = org_basic_core.ListContainer;
	var LogUtils = org_basic_core.LogUtils;
	var MapContainer = org_basic_core.MapContainer;
	var Info = org_basic_http.Info;
	var UrlFactory = org_basic_http.UrlFactory;
	
	/* -------------------------------------------------------------------- */
	
	function Textareas(textareas) {
		this.textareas = textareas;
	}
	
	/* -------------------------------------------------------------------- */
	
	Textareas.prototype.normalize = function () {
	}
	
	Textareas.prototype.make = function () {
		var result = "";
		
		for (var textareaIterator = this.textareas.iterator(), textarea = null; textareaIterator.hasNext();) {
			textarea = textareaIterator.next();
			result += textarea.make() + "\n";
		}
		
		return result;
	}
	
	/* -------------------------------------------------------------------- */
	
	Textareas.prototype.retrieve = function (i) {
		return this.textareas.retrieve(i);
	}
	
	Textareas.prototype.size = function () {
		return this.textareas.size();
	}
	
	Textareas.prototype.iterator = function () {
		return new ImmutableIterator(this.textareas.iterator());
	}
	
	/* -------------------------------------------------------------------- */
	
	Textareas.parse = function (source) {
		var textareas = new ListContainer();
		
		for (var matchIterator = Textarea.textareaRegularExpression.find(source).iterator(), match = null; matchIterator.hasNext();) {
			match = matchIterator.next();
			try {
				textareas.add(Textarea.createFromMatchParts(match.group(1), match.group(2)));
			} catch (e) {
				LogUtils.recordException("cannot parse textarea: " + match.match(), e);
				
				continue;
			}
		}
		
		return new Textareas(textareas);
	}
	
	/* -------------------------------------------------------------------- */
	
	Textareas.create = function (textareas) {
		var newTextareas = new Textareas(textareas);
		
		newTextareas.normalize();
		
		return newTextareas;
	}
	
	/* -------------------------------------------------------------------- */
	
	Textareas.BLANK = new Textareas(new ListContainer());
	
	/* -------------------------------------------------------------------- */
	
	function Textarea(name, value) {
		this.name = name;
		this.value = value;
	}
	
	/* -------------------------------------------------------------------- */
	
	Textarea.prototype.normalize = function () {
		if (StringUtils.isHollow(this.name)) {
			throw new Error("name is not set");
		} else {
			this.name = this.name.trim();
		}
		
		if (StringUtils.isNone(this.value)) {
			this.value = "";
		}
	}
	
	Textarea.prototype.make = function () {
		return "<textarea name=\"" + HtmlUtils.escapeHtmlComponent(this.name) + "\">" + HtmlUtils.escapeHtmlComponent(this.value) + "</textarea>"; 
	}
	
	/* -------------------------------------------------------------------- */
	
	Textarea.prototype.getName = function () {
		return this.name;
	}
	
	Textarea.prototype.getValue = function () {
		return this.value;
	}
	
	/* -------------------------------------------------------------------- */
	
	Textarea.nameRegularExpression = new RegularExpression("name\\s*=\\s*(?:'(.*?)'|\"(.*?)\"|([^\\s]*))", "gi");
	
	Textarea.createFromMatchParts = function (attributesSource, textareaSource) {
		var nameMatch = Textarea.nameRegularExpression.match(attributesSource);
		
		var nameSource;
		
		if (nameMatch == null) {
			throw new Error("cannot parse textarea due to missing name attribute");
		} else {
			nameSource = nameMatch.any();
		}
		
		return new Textarea(HtmlUtils.unescapeHtmlComponent(nameSource), HtmlUtils.unescapeHtmlComponent(textareaSource));
	}
	
	/* -------------------------------------------------------------------- */
	
	Textarea.textareaRegularExpression = new RegularExpression("<textarea([\\s\\S]*?)>([\\s\\S]*?)<\\/textarea>", "gi");
	
	Textarea.parse = function (source) {
		var textareaMatch = Textarea.textareaRegularExpression.match(source);
		
		var attributesSource;
		var textareaSource;
		
		if (textareaMatch == null) {
			throw new Error("cannot parse textarea");
		} else {
			attributesSource = textareaMatch.group(1);
			textareaSource = textareaMatch.group(2);
		}
		
		var newTextarea = Textarea.createFromMatchParts(attributesSource, textareaSource);
		
		try {
			newTextarea.normalize();
		} catch (e) {
			throw new Error("cannot parse textarea due to textarea normalization problems", e);
		}
		
		return newTextarea;
	}
	
	/* -------------------------------------------------------------------- */
	
	Textarea.create = function (name, value) {
		var newTextarea = new Textarea(name, value);
		
		newTextarea.normalize();
		
		return newTextarea;
	}
	
	/* -------------------------------------------------------------------- */
	
	function Selects(selects) {
		this.selects = selects;
	}
	
	/* -------------------------------------------------------------------- */
	
	Selects.prototype.normalize = function () {
	}
	
	Selects.prototype.make = function () {
		var result = "";
		
		for (var selectIterator = this.selects.iterator(), select = null; selectIterator.hasNext();) {
			select = selectIterator.next();
			result += select.make() + "\n";
		}
		
		return result;
	}
	
	/* -------------------------------------------------------------------- */
	
	Selects.prototype.retrieve = function (i) {
		return this.selects.retrieve(i);
	}
	
	Selects.prototype.size = function () {
		return this.selects.size();
	}
	
	Selects.prototype.iterator = function () {
		return new ImmutableIterator(this.selects.iterator());
	}
	
	/* -------------------------------------------------------------------- */
	
	Selects.parse = function (source) {
		var selects = new ListContainer();
		
		for (var matchIterator = Select.selectRegularExpression.find(source).iterator(), match = null; matchIterator.hasNext();) {
			match = matchIterator.next();
			try {
				selects.add(Select.createFromMatchParts(match.group(1), match.group(2)));
			} catch (e) {
				LogUtils.recordException("cannot parse select: " + match.match(), e);
				
				continue;
			}
		}
		
		return new Selects(selects);
	}
	
	/* -------------------------------------------------------------------- */
	
	Selects.create = function (selects) {
		var newSelects = new Selects(selects);
		
		newSelects.normalize();
		
		return newSelects;
	}
	
	/* -------------------------------------------------------------------- */
	
	Selects.BLANK = new Selects(new ListContainer());
	
	/* -------------------------------------------------------------------- */
	
	function Select(name, options) {
		this.name = name;
		this.options = options;
	}
	
	/* -------------------------------------------------------------------- */
	
	Select.prototype.normalize = function () {
		if (this.options == null) {
			throw new Error("options is not set");
		}
		
		if (StringUtils.isHollow(this.name)) {
			throw new Error("name is not set");
		} else {
			this.name = this.name.trim();
		}
	}
	
	Select.prototype.make = function () {
		return "<select name=\"" + HtmlUtils.escapeHtmlComponent(this.name) + "\">\n" + this.options.make() + "</select>";
	}
	
	/* -------------------------------------------------------------------- */
	
	Select.prototype.iterator = function () {
		return new ImmutableIterator(this.options.iterator());
	}
	
	/* -------------------------------------------------------------------- */
	
	Select.prototype.getName = function () {
		return this.name;
	}
	
	Select.prototype.getOptions = function () {
		return this.options;
	}
	
	/* -------------------------------------------------------------------- */
	
	Select.nameRegularExpression = new RegularExpression("name\\s*=\\s*(?:'(.*?)'|\"(.*?)\"|([^\\s]*))", "gi");
	
	Select.createFromMatchParts = function (attributesSource, optionsSource) {
		var nameMatch = Select.nameRegularExpression.match(attributesSource);
		
		var nameSource;
		
		if (nameMatch == null) {
			throw new Error("cannot parse select due to missing name attribute");
		} else {
			nameSource = nameMatch.any();
		}
		
		var newSelect = new Select(HtmlUtils.unescapeHtmlComponent(nameSource), Options.parse(optionsSource));
		
		try {
			newSelect.normalize();
		} catch (e) {
			throw new Error("cannot parse select due to select normalization problems", e);
		}
		
		return newSelect;
	}
	
	/* -------------------------------------------------------------------- */
	
	Select.selectRegularExpression = new RegularExpression("<select([\\s\\S]*?)>([\\s\\S]*?)<\\/select>", "gi");
	
	Select.parse = function (source) {
		var selectMatch = Select.selectRegularExpression.match(source);
		
		var attributesSource;
		var optionsSource;
		
		if (selectMatch == null) {
			throw new Error("cannot parse select");
		} else {
			attributesSource = selectMatch.group(1);
			optionsSource = selectMatch.group(2);
		}
		
		return Select.createFromMatchParts(attributesSource, optionsSource);
	}
	
	/* -------------------------------------------------------------------- */
	
	Select.create = function (name, options) {
		var newSelect = new Select(name, options);
		
		newSelect.normalize();
		
		return newSelect;
	}
	
	/* -------------------------------------------------------------------- */
	
	function Page(links, forms) {
		this.links = links;
		this.forms = forms;
	}
	
	/* -------------------------------------------------------------------- */
	
	Page.prototype.normalize = function () {
		if (this.links == null) {
			throw new Error("links is not set");
		}
		
		if (this.forms == null) {
			throw new Error("forms is not set");
		}
	}
	
	Page.prototype.make = function () {
		return this.links.make() + this.forms.make();
	}
	
	/* -------------------------------------------------------------------- */
	
	Page.prototype.getLinks = function () {
		return this.links;
	}
	
	Page.prototype.getForms = function () {
		return this.forms;
	}
	
	/* -------------------------------------------------------------------- */
	
	Page.parse = function (location, source) {
		var newPage = new Page(Links.parse(location, source), Forms.parse(location, source));
		
		try {
			newPage.normalize();
		} catch (e) {
			throw new Error("cannot parse page due to page normalization problems", e);
		}
		
		return newPage;
	}
	
	/* -------------------------------------------------------------------- */
	
	Page.create = function (links, forms) {
		var newPage = new Page(links, forms);
		
		newPage.normalize();
		
		return newPage;
	}
	
	/* -------------------------------------------------------------------- */
	
	function Options(options) {
		this.options = options;
	}
	
	/* -------------------------------------------------------------------- */
	
	Options.prototype.normalize = function () {
	}
	
	Options.prototype.make = function () {
		var result = "";
		
		for (var optionIterator = this.options.iterator(), option = null; optionIterator.hasNext();) {
			option = optionIterator.next();
			result += option.make() + "\n";
		}
		
		return result;
	}
	
	/* -------------------------------------------------------------------- */
	
	Options.prototype.retrieve = function (i) {
		return this.options.retrieve(i);
	}
	
	Options.prototype.size = function () {
		return this.options.size();
	}
	
	Options.prototype.iterator = function () {
		return this.options.iterator();
	}
	
	/* -------------------------------------------------------------------- */
	
	Options.parse = function (source) {
		var options = new ListContainer();
		
		for (var matchIterator = Option.optionRegularExpression.find(source).iterator(), match = null; matchIterator.hasNext();) {
			match = matchIterator.next();
			
			try {
				options.add(Option.createFromMatchParts(match.group(1)));
			} catch (e) {
				LogUtils.recordException("cannot parse option: " + match.match(), e);
				
				continue;
			}
		}
		
		return new Options(options);
	}
	
	/* -------------------------------------------------------------------- */
	
	Options.create = function (options) {
		var newOptions = new Options(options);
		
		newOptions.normalize();
		
		return newOptions;
	}
	
	/* -------------------------------------------------------------------- */
	
	Options.BLANK = new Options(new ListContainer());
	
	/* -------------------------------------------------------------------- */
	
	function Option(value) {
		this.value = value;
	}
	
	/* -------------------------------------------------------------------- */
	
	Option.prototype.normalize = function () {
		if (StringUtils.isNone(this.value)) {
			this.value = "";
		}
	}
	
	Option.prototype.make = function () {
		return "<option value=\"" + HtmlUtils.escapeHtmlComponent(this.value) + "\">" + HtmlUtils.escapeHtmlComponent(this.value) + "</option>";
	}
	
	/* -------------------------------------------------------------------- */
	
	Option.prototype.getValue = function () {
		return this.value;
	}
	
	/* -------------------------------------------------------------------- */
	
	Option.valueRegularExpression = new RegularExpression("value\\s*=\\s*(?:'(.*?)'|\"(.*?)\"|([^\\s]*))", "gi");
	
	Option.createFromMatchParts = function (attributesSource) {
		var valueMatch = Option.valueRegularExpression.match(attributesSource);
		
		var valueSource;
		
		if (valueMatch == null) {
			throw new Error("cannot parse option due to missing value attribute");
		} else {
			valueSource = valueMatch.any();
		}
		
		var newOption = new Option(HtmlUtils.unescapeHtmlComponent(valueSource));
		
		try {
			newOption.normalize();
		} catch (e) {
			throw new Error("cannot parse option due to option normalization problems", e);
		}
		
		return newOption;
	}
	
	/* -------------------------------------------------------------------- */
	
	Option.optionRegularExpression = new RegularExpression("<option([\\s\\S]*?)/?>", "gi");
	
	Option.parse = function (source) {
		var optionMatch = Option.optionRegularExpression.match(source);
		
		var attributesSource;
		
		if (optionMatch == null) {
			throw new Error("cannot parse option");
		} else {
			attributesSource = optionMatch.group(1);
		}
		
		return Option.createFromMatchParts(attributesSource);
	}
	
	/* -------------------------------------------------------------------- */
	
	Option.create = function (value) {
		var newOption = new Option(value);
		
		newOption.normalize();
		
		return newOption;
	}
	
	/* -------------------------------------------------------------------- */
	
	function Links(Links) {
		this.links = Links;
	}
	
	/* -------------------------------------------------------------------- */
	
	Links.prototype.normalize = function () {
	}
	
	Links.prototype.make = function () {
		var result = "";
		
		for (var linkIterator = this.links.iterator(), link = null; linkIterator.hasNext();) {
			link = linkIterator.next();
			result += link.make() + "\n";
		}
		
		return result;
	}
	
	/* -------------------------------------------------------------------- */
	
	Links.prototype.retrieve = function (i) {
		return this.links.retrieve(i);
	}
	
	Links.prototype.size = function () {
		return this.links.size();
	}
	
	Links.prototype.iterator = function () {
		return new ImmutableIterator(this.links.iterator());
	}
	
	/* -------------------------------------------------------------------- */
	
	Links.urlRegularExpression = new RegularExpression("https?:\\/\\/+[\\w\\d+\\?\\.\\-:;#@%\\/&=~_\\[\\]\\{\\}]+", "gi");
	Links.refRegularExpression = new RegularExpression("(?:src|href|url)\\s*=\\s*(?:\"(.+?)\"|'(.+?)'|([^\\s><\"']+))", "gi");
	Links.cleanRegularExpression = new RegularExpression("<[\\s\\S]*?>", "gi");
	
	Links.parse = function (location, source) {
		var links = new ListContainer();
		
		for (var matchIterator = Links.urlRegularExpression.find(source).iterator(), match = null; matchIterator.hasNext();) {
			match = matchIterator.next();
			var urlSource = match.match();
			
			urlSource = HtmlUtils.unescapeHtmlComponent(urlSource);
			
			try {
				links.add(new Link(Url.parse(urlSource)));
			} catch (e) {
				LogUtils.recordException("cannot parse url: " + urlSource, e);
				
				continue;
			}
		}
		
		for (var matchIterator = Links.refRegularExpression.find(source).iterator(), match = null; matchIterator.hasNext();) {
			match = matchIterator.next();
			var refSource = match.any();
			
			if (refSource.startsWith("'") || refSource.startsWith("\\'") || refSource.startsWith("\"") || refSource.startsWith("\\\"")) {
				continue;
			}
			
			refSource = HtmlUtils.unescapeHtmlComponent(refSource);
			
			try {
				links.add(Link.parse(location, refSource));
			} catch (e) {
				LogUtils.recordException("cannot parse ref: " + refSource, e);
				
				continue;
			}
		}
		
		var newSource = Links.cleanRegularExpression.replace(source, "");
		
		for (var matchIterator = Links.urlRegularExpression.find(newSource).iterator(), match = null; matchIterator.hasNext();) {
			match = matchIterator.next();
			var urlSource = match.match();
			
			urlSource = HtmlUtils.unescapeHtmlComponent(urlSource);
			
			try {
				links.add(new Link(Url.parse(urlSource)));
			} catch (e) {
				LogUtils.recordException("cannot parse url: " + urlSource, e);
				
				continue;
			}
		}
		
		return new Links(links);
	}
	
	/* -------------------------------------------------------------------- */
	
	Links.create = function (links) {
		var newLinks = new Links(links);
		
		newLinks.normalize();
		
		return newLinks;
	}
	
	/* -------------------------------------------------------------------- */
	
	Links.BLANK = new Links(new ListContainer());
	
	/* -------------------------------------------------------------------- */
	
	function Link(url) {
		this.url = url;
	}
	
	/* -------------------------------------------------------------------- */
	
	Link.prototype.normalize = function () {
		if (this.url == null) {
			throw new Error("url is not set");
		}
	}
	
	Link.prototype.make = function () {
		return "<a href=\"" + HtmlUtils.escapeHtmlComponent(this.url.make()) + "\">" + HtmlUtils.escapeHtmlComponent(this.url.make()) + "</a>";
	}
	
	/* -------------------------------------------------------------------- */
	
	Link.prototype.getUrl = function () {
		return this.url;
	}
	
	/* -------------------------------------------------------------------- */
	
	Link.httpProtocolRegularExpression = new RegularExpression("^https?://.*", "i");
	Link.genericProtocolRegularExpression = new RegularExpression("^\\w+:.*", "i");
	
	Link.parse = function (location, source) {
		var newSource = source.trim();
		
		var url;
		
		if (Link.httpProtocolRegularExpression.test(newSource)) {
			try {
				url = Url.parse(newSource);
			} catch (e) {
				throw new Error("cannot parse url " + newSource, e);
			}
		} else
		if (Link.genericProtocolRegularExpression.test(newSource)) {
			throw new Error("cannot parse protocol " + newSource);
		} else {
			try {
				var info;
				
				if (newSource.startsWith("/")) {
					info = newSource;
				} else {
					info = location.getPath().getBase().make() + newSource;
				}
				
				var newInfo = Info.parse(info);
				
				url = UrlFactory.create(location).setInfo(newInfo).build();
			} catch (e) {
				throw new Error("cannot parse ref " + newSource, e);
			}
		}
		
		var link = new Link(url);
		
		try {
			link.normalize();
		} catch (e) {
			throw new Error("cannot parse link due to link normalization problems", e);
		}
		
		return link;
	}
	
	/* -------------------------------------------------------------------- */
	
	Link.create = function (url) {
		var newLink = new Link(url);
		
		newLink.normalize();
		
		return newLink;
	}
	
	/* -------------------------------------------------------------------- */
	
	function Inputs(inputs) {
		this.inputs = inputs;
	}
	
	/* -------------------------------------------------------------------- */
	
	Inputs.prototype.normalize = function () {
	}
	
	Inputs.prototype.make = function () {
		var result = "";
		
		for (var inputIterator = this.inputs.iterator(), input = null; inputIterator.hasNext();) {
			input = inputIterator.next();
			result += input.make() + "\n";
		}
		
		return result;
	}
	
	/* -------------------------------------------------------------------- */
	
	Inputs.prototype.retrieve = function (i) {
		return this.inputs.retrieve(i);
	}
	
	Inputs.prototype.size = function () {
		return this.inputs.size();
	}
	
	Inputs.prototype.iterator = function () {
		return new ImmutableIterator(this.inputs.iterator());
	}
	
	/* -------------------------------------------------------------------- */
	
	Inputs.parse = function (source) {
		var inputs = new ListContainer();
		
		for (var matchIterator = Input.inputRegularExpression.find(source).iterator(), match = null; matchIterator.hasNext();) {
			match = matchIterator.next();
			try {
				inputs.add(Input.createFromMatchParts(match.group(1)));
			} catch (e) {
				LogUtils.recordException("cannot parse input: " + match.match(), e);
				
				continue;
			}
		}
		
		return new Inputs(inputs);
	}
	
	/* -------------------------------------------------------------------- */
	
	Inputs.create = function (inputs) {
		var newInputs = new Inputs(inputs);
		
		newInputs.normalize();
		
		return newInputs;
	}
	
	/* -------------------------------------------------------------------- */
	
	Inputs.BLANK = new Inputs(new ListContainer());
	
	/* -------------------------------------------------------------------- */
	
	function Input(type, name, value, autocomplete) {
		this.type = type;
		this.name = name;
		this.value = value;
		this.autocomplete = autocomplete;
	}
	
	/* -------------------------------------------------------------------- */
	
	Input.prototype.normalize = function () {
		if (StringUtils.isHollow(this.type)) {
			throw new Error("type is not set");
		} else {
			this.type = this.type.trim().toLowerCase();
		}
		
		if (StringUtils.isHollow(this.name)) {
			throw new Error("name is not set");
		} else {
			this.name = this.name.trim();
		}
		
		if (StringUtils.isNone(this.value)) {
			this.value = "";
		}
	}
	
	Input.prototype.make = function () {
		var autocomplete;
		
		if (this.autocomplete) {
			autocomplete = "on";
		} else {
			autocomplete = "off";
		}
		
		return "<input type=\"" + HtmlUtils.escapeHtmlComponent(this.type) + "\" name=\"" + HtmlUtils.escapeHtmlComponent(this.name) + "\" value=\"" + HtmlUtils.escapeHtmlComponent(this.value) + "\" autocomplete=\"" + autocomplete + "\"/>";
	}
	
	/* -------------------------------------------------------------------- */
	
	Input.prototype.getType = function () {
		return this.type;
	}
	
	Input.prototype.getName = function () {
		return this.name;
	}
	
	Input.prototype.getValue = function () {
		return this.value;
	}
	
	Input.prototype.isAutocomplete = function () {
		return this.autocomplete;
	}
	
	/* -------------------------------------------------------------------- */
	
	Input.prototype.isPassword = function () {
		return this.type.equals("password");
	}
	
	Input.prototype.isUrl = function () {
		return this.type.equals("url");
	}
	/* -------------------------------------------------------------------- */
	
	Input.nameRegularExpression = new RegularExpression("name\\s*=\\s*(?:'(.*?)'|\"(.*?)\"|([^\\s]*))", "gi");
	Input.typeRegularExpression = new RegularExpression("type\\s*=\\s*(?:'(.*?)'|\"(.*?)\"|([^\\s]*))", "gi");
	Input.valueRegularExpression = new RegularExpression("value\\s*=\\s*(?:'(.*?)'|\"(.*?)\"|([^\\s]*))", "gi");
	Input.autocompleteRegularExpression = new RegularExpression("autocomplete\\s*=\\s*(?:'(.*?)'|\"(.*?)\"|([^\\s]*))", "gi");
	
	Input.createFromMatchParts = function (attributesSource) {
		var nameMatch = Input.nameRegularExpression.match(attributesSource);
		
		var nameSource;
		
		if (nameMatch == null) {
			throw new Error("cannot parse input due to missing name attribute");
		} else {
			nameSource = nameMatch.any();
		}
		
		var typeMatch = Input.typeRegularExpression.match(attributesSource);
		
		var typeSource;
		
		if (typeMatch == null) {
			typeSource = "text";
		} else {
			typeSource = typeMatch.any();
		}
		
		var valueMatch = Input.valueRegularExpression.match(attributesSource);
		
		var valueSource;
		
		if (valueMatch == null) {
			valueSource = "";
		} else {
			valueSource = valueMatch.any();
		}
		
		var autocomleteMatch = Input.autocompleteRegularExpression.match(attributesSource);
		
		var autocompleteSource;
		
		if (autocomleteMatch == null) {
			autocompleteSource = "on";
		} else {
			autocompleteSource = autocomleteMatch.any().trim().toLowerCase();
		}
		
		var autocomplete;
		
		if (autocompleteSource.equals("off")) {
			autocomplete = false;
		} else {
			autocomplete = true;
		}
		
		var newInput = new Input(HtmlUtils.unescapeHtmlComponent(typeSource), HtmlUtils.unescapeHtmlComponent(nameSource), HtmlUtils.unescapeHtmlComponent(valueSource), autocomplete);
		
		try {
			newInput.normalize();
		} catch (e) {
			throw new Error("cannot parse input due to input normalization problems", e);
		}
		
		return newInput;
	}
	
	/* -------------------------------------------------------------------- */
	
	Input.inputRegularExpression = new RegularExpression("<input([\\s\\S]*?)/?>", "gi");
	
	Input.parse = function (source) {
		var inputMatch = Input.inputRegularExpression.match(source);
		
		var attributesSource;
		
		if (inputMatch == null) {
			throw new Error("cannot parse input");
		} else {
			attributesSource = inputMatch.group(1);
		}
		
		return Input.createFromMatchParts(attributesSource);
	}
	
	/* -------------------------------------------------------------------- */
	
	Input.create = function (type, name, value, autocomplete) {
		var newInput = new Input(type, name, value, autocomplete);
		
		newInput.normalize();
		
		return newInput;
	}
	
	/* -------------------------------------------------------------------- */
	
	function SimplePair(name, value) {
		this.name = name;
		this.value = value;
	}
	
	/* -------------------------------------------------------------------- */
	
	SimplePair.prototype.getName = function () {
		return this.name;
	}
	
	SimplePair.prototype.getValue = function () {
		return this.value;
	}
	
	/* -------------------------------------------------------------------- */
	
	function SimpleForm(form) {
		this.form = form;
		this.method = form.getMethod();
		this.url = form.getAction();
		this.enctype = form.getEnctype();
		this.autocomlete = form.isAutocomplete();
		this.files = new ListContainer();
		this.fields = new ListContainer();
		this.submits = new ListContainer();
		this.optionals = new ListContainer();
		this.selectables = new ListContainer();
		
		this.selectables.add(new ListContainer());
		
		var radiosMap = new MapContainer();
		
		for (var inputIterator = form.getInputs().iterator(), input = null; inputIterator.hasNext();) {
			input = inputIterator.next();
			var inputType = input.getType();
			
			if (inputType.equals("reset")) {
				continue;
			} else
			if (inputType.equals("submit")) {
				this.submits.add(new SimplePair(input.getName(), input.getValue()));
			} else
			if (inputType.equals("file")) {
				this.files.add(new SimpleFile(input.getName(), "", ""));
			} else
			if (inputType.equals("radio")) {
				var name = input.getName();
				var groupList = radiosMap.get(name);
				
				if (groupList == null) {
					groupList = new ListContainer();
					
					radiosMap.set(name, groupList);
				}
				
				groupList.add(new SimplePair(name, input.getValue()));
			} else
			if (inputType.equals("checkbox")) {
				this.optionals.add(new SimplePair(input.getName(), input.getValue()));
			} else
			if (inputType.equals("hidden")) {
				this.fields.add(new SimpleField(input.getName(), input.getValue(), true, input.isAutocomplete()));
			} else {
				this.fields.add(new SimpleField(input.getName(), input.getValue(), false, input.isAutocomplete()));
			}
		}
		
		for (var textareaIterator = form.getTextareas().iterator(), textarea = null; textareaIterator.hasNext();) {
			textarea = textareaIterator.next();
			this.fields.add(new SimpleField(textarea.getName(), textarea.getValue(), false, false));
		}
		
		for (var selectIterator = form.getSelects().iterator(), select = null; selectIterator.hasNext();) {
			select = selectIterator.next();
			var selectName = select.getName();
			var selectableList = new ListContainer();
			
			for (var optionIterator = select.getOptions().iterator(), option = null; optionIterator.hasNext();) {
				option = optionIterator.next();
				selectableList.add(new SimplePair(selectName, option.getValue()));
			}
			
			this.selectables.add(selectableList);
		}
		
		for (var radioNameIterator = radiosMap.iterator(), radioName = null; radioNameIterator.hasNext();) {
			radioName = radioNameIterator.next();
			var groupList = radiosMap.get(radioName);
			
			this.selectables.add(groupList);
		}
	}
	
	/* -------------------------------------------------------------------- */
	
	SimpleForm.prototype.getForm = function () {
		return this.form;
	}
	
	SimpleForm.prototype.getMethod = function () {
		return this.method;
	}
	
	SimpleForm.prototype.getUrl = function () {
		return this.url;
	}
	
	SimpleForm.prototype.getEnctype = function () {
		return this.enctype;
	}
	
	SimpleForm.prototype.isAutocomplete = function () {
		return this.autocomlete;
	}
	
	SimpleForm.prototype.getFields = function () {
		return this.fields;
	}
	
	SimpleForm.prototype.getFiles = function () {
		return this.files;
	}
	
	SimpleForm.prototype.getSubmits = function () {
		return this.submits;
	}
	
	SimpleForm.prototype.getOptionals = function () {
		return this.optionals;
	}
	
	SimpleForm.prototype.getSelectables = function () {
		return this.selectables;
	}
	
	/* -------------------------------------------------------------------- */
	
	function SimpleFile(field, name, contents) {
		this.field = field;
		this.name = name;
		this.contents = contents;
	}
	
	/* -------------------------------------------------------------------- */
	
	SimpleFile.prototype.getField = function () {
		return this.field;
	}
	
	SimpleFile.prototype.getName = function () {
		return this.name;
	}
	
	SimpleFile.prototype.getContents = function () {
		return this.contents;
	}
	
	/* -------------------------------------------------------------------- */
	
	function SimpleField(name, value, hidden, autocomplete) {
		this.name = name;
		this.value = value;
		this.hidden = hidden;
		this.autocomplete = autocomplete;
	}
	
	/* -------------------------------------------------------------------- */
	
	SimpleField.prototype.getName = function () {
		return this.name;
	}
	
	SimpleField.prototype.getValue = function () {
		return this.value;
	}
	
	SimpleField.prototype.isHidden = function () {
		return this.hidden;
	}
	
	SimpleField.prototype.isAutocomplete = function () {
		return this.autocomplete;
	}
	
	/* -------------------------------------------------------------------- */
	
	function SimpleContent(page) {
		this.page = page;
		this.links = new ListContainer();
		this.forms = new ListContainer();
		
		for (var linkIterator = page.getLinks().iterator(), link = null; linkIterator.hasNext();) {
			link = linkIterator.next();
			this.links.add(link);
		}
		
		for (var formIterator = page.getForms().iterator(), form = null; formIterator.hasNext();) {
			form = formIterator.next();
			this.forms.add(new SimpleForm(form));
		}
	}
	
	/* -------------------------------------------------------------------- */
	
	SimpleContent.prototype.getPage = function () {
		return this.page;
	}
	
	SimpleContent.prototype.getLinks = function () {
		return this.links;
	}
	
	SimpleContent.prototype.getForms = function () {
		return this.forms;
	}
	
	/* -------------------------------------------------------------------- */
	
	function Forms(forms) {
		this.forms = forms;
	}
	
	/* -------------------------------------------------------------------- */
	
	Forms.prototype.normalize = function () {
	}
	
	Forms.prototype.make = function () {
		var result = "";
		
		for (var formIterator = this.forms.iterator(), form = null; formIterator.hasNext();) {
			form = formIterator.next();
			result += form.make() + "\n";
		}
		
		return result;
	}
	
	/* -------------------------------------------------------------------- */
	
	Forms.prototype.retrieve = function (i) {
		return this.forms.retrieve(i);
	}
	
	Forms.prototype.size = function () {
		return this.forms.size();
	}
	
	Forms.prototype.iterator = function () {
		return new ImmutableIterator(this.forms.iterator());
	}
	
	/* -------------------------------------------------------------------- */
	
	Forms.parse = function (location, source) {
		var forms = new ListContainer();
		
		for (var matchIterator = Form.formRegularExpression.find(source).iterator(), match = null; matchIterator.hasNext();) {
			match = matchIterator.next();
			try {
				forms.add(Form.createFromMatchParts(location, match.group(1), match.group(2)));
			} catch (e) {
				LogUtils.recordException("cannot parse form: " + match.match(), e);
				
				continue;
			}
		}
		
		return new Forms(forms);
	}
	
	/* -------------------------------------------------------------------- */
	
	Forms.create = function (forms) {
		var newForms = new Forms(forms);
		
		newForms.normalize();
		
		return newForms;
	}
	
	/* -------------------------------------------------------------------- */
	
	Forms.BLANK = new Forms(new ListContainer());
	
	/* -------------------------------------------------------------------- */
	
	function Form(method, action, enctype, autocomplete, inputs, textareas, selects) {
		this.method = method;
		this.action = action;
		this.enctype = enctype;
		this.autocomplete = autocomplete;
		this.inputs = inputs;
		this.textareas = textareas;
		this.selects = selects;
	}
	
	/* -------------------------------------------------------------------- */
	
	Form.prototype.normalize = function () {
		if (this.method == null) {
			throw new Error("method is not set");
		} else
		if (this.action == null) {
			throw new Error("action is not set");
		} else
		if (this.enctype == null) {
			throw new Error("enctype is not set");
		} else 
		if (this.inputs == null) {
			throw new Error("inputs is not set");
		} else
		if (this.textareas == null) {
			throw new Error("textareas is not set");
		} else
		if (this.selects == null) {
			throw new Error("selects is not set");
		}
	}
	
	Form.prototype.make = function () {
		var autocomplete;
		
		if (this.autocomplete) {
			autocomplete = "on";
		} else {
			autocomplete = "off";
		}
		
		return "<form method=\"" + HtmlUtils.escapeHtmlComponent(this.method.make()) + "\" action=\"" + HtmlUtils.escapeHtmlComponent(this.action.make()) + "\" enctype=\"" + HtmlUtils.escapeHtmlComponent(this.enctype.make()) + "\" autocomplete=\"" + autocomplete + "\">\n" + this.inputs.make() + this.textareas.make() + this.selects.make() + "</form>";
	}
	
	/* -------------------------------------------------------------------- */
	
	Form.prototype.getMethod = function () {
		return this.method;
	}
	
	Form.prototype.getAction = function () {
		return this.action;
	}
	
	Form.prototype.getEnctype = function () {
		return this.enctype;
	}
	
	Form.prototype.isAutocomplete = function () {
		return this.autocomplete;
	}
	
	Form.prototype.getInputs = function () {
		return this.inputs;
	}
	
	Form.prototype.getTextareas = function () {
		return this.textareas;
	}
	
	Form.prototype.getSelects = function () {
		return this.selects;
	}
	
	/* -------------------------------------------------------------------- */
	
	Form.methodRegularExpression = new RegularExpression("method\\s*=\\s*(?:'(.*?)'|\"(.*?)\"|([^\\s]*))", "gi");
	Form.actionRegularExpression = new RegularExpression("action\\s*=\\s*(?:'(.*?)'|\"(.*?)\"|([^\\s]*))", "gi");
	Form.enctypeRegularExpression = new RegularExpression("enctype\\s*=\\s*(?:'(.*?)'|\"(.*?)\"|([^\\s]*))", "gi");
	Form.autocompleteRegularExpression = new RegularExpression("autocomplete\\s*=\\s*(?:'(.*?)'|\"(.*?)\"|([^\\s]*))", "gi");
	
	Form.createFromMatchParts = function (location, attributesSource, formSource) {
		var methodMatch = Form.methodRegularExpression.match(attributesSource);
		
		var formMethod;
		
		if (methodMatch == null) {
			formMethod = Method.GET;
		} else {
			try {
				formMethod = Method.parse(HtmlUtils.unescapeHtmlComponent(methodMatch.any()));
			} catch (e) {
				throw new Error("cannot parse form method", e);
			}
		}
		
		var actionMatch = Form.actionRegularExpression.match(attributesSource);
		
		var actionUrl;
		
		if (actionMatch == null) {
			actionUrl = location;
		} else {
			try {
				actionUrl = Link.parse(location, HtmlUtils.unescapeHtmlComponent(actionMatch.any().trim())).getUrl();
			} catch (e) {
				throw new Error("cannot parse form action", e);
			}
		}
		
		var enctypeMatch = Form.enctypeRegularExpression.match(attributesSource);
		
		var formEnctype;
		
		if (enctypeMatch == null) {
			formEnctype = Enctype.URLENCODED;
		} else {
			try {
				formEnctype = Enctype.parse(HtmlUtils.unescapeHtmlComponent(enctypeMatch.any()));
			} catch (e) {
				throw new Error("cannot parse form enctype", e);
			}
		}
		
		var autocomleteMatch = Input.autocompleteRegularExpression.match(attributesSource);
		
		var autocompleteSource;
		
		if (autocomleteMatch == null) {
			autocompleteSource = "on";
		} else {
			autocompleteSource = HtmlUtils.unescapeHtmlComponent(autocomleteMatch.any().trim().toLowerCase());
		}
		
		var autocomplete;
		
		if (autocompleteSource.equals("off")) {
			autocomplete = false;
		} else {
			autocomplete = true;
		}
		
		var newForm = new Form(formMethod, actionUrl, formEnctype, autocomplete, Inputs.parse(formSource), Textareas.parse(formSource), Selects.parse(formSource));
		
		try {			
			newForm.normalize();
		} catch (e) {
			throw new Error("cannot parse form due to form normalization problems", e);
		}
		
		return newForm;
	}
	
	/* -------------------------------------------------------------------- */
	
	Form.formRegularExpression = new RegularExpression("<form([\\s\\S]*?)>([\\s\\S]*?)<\\/form>", "gi");
	
	Form.parse = function (location, source) {
		var formMatch = Form.formRegularExpression.match(source);
		
		var attributesSource;
		var formSource;
		
		if (formMatch == null) {
			throw new Error("cannot parse form");
		} else {
			attributesSource = formMatch.group(1);
			formSource = formMatch.group(2);
		}
		
		return Form.createFromMatchParts(location, attributesSource, formSource);
	}
	
	/* -------------------------------------------------------------------- */
	
	Form.create = function (method, action, enctype, autocomplete, inputs, textareas, selects) {
		var newForm = new Form(method, action, enctype, autocomplete, inputs, textareas, selects);
		
		newForm.normalize();
		
		return newForm;
	}
	
	/* -------------------------------------------------------------------- */
	
	function Enctype(value) {
		this.value = value;
	}
	
	/* -------------------------------------------------------------------- */
	
	Enctype.prototype.normalize = function () {
		if (StringUtils.isHollow(this.value)) {
			this.value = "application/x-www-form-urlencoded";
		} else {
			this.value = this.value.trim().toLowerCase();
		}
	}
	
	Enctype.prototype.make = function () {
		return this.value;
	}
	
	/* -------------------------------------------------------------------- */
	
	Enctype.prototype.getValue = function () {
		return this.value;
	}
	
	/* -------------------------------------------------------------------- */
	
	Enctype.prototype.isUrlencoded = function () {
		return this.value.equals("application/x-www-form-urlencoded");
	}
	
	Enctype.prototype.isMultipart = function () {
		return this.value.equals("multipart/form-data");
	}
	
	/* -------------------------------------------------------------------- */
	
	Enctype.parse = function (enctype) {
		var newEnctype = new Enctype(enctype);
		
		try {
			newEnctype.normalize();
		} catch (e) {
			throw new Error("cannot parse enctype due to enctype normalize problems", e);
		}
		
		if (newEnctype.isUrlencoded()) {
			return Enctype.URLENCODED;
		} else
		if (newEnctype.isMultipart()) {
			return Enctype.MULTIPART;
		} else {
			return newEnctype;
		}
	}
	
	/* -------------------------------------------------------------------- */
	
	Enctype.create = function (enctype) {
		var newEnctype = new Enctype(enctype);
		
		newEnctype.normalize();
		
		if (newEnctype.isUrlencoded()) {
			return Enctype.URLENCODED;
		} else
		if (newEnctype.isMultipart()) {
			return Enctype.MULTIPART;
		} else {
			return newEnctype;
		}
	}
	
	/* -------------------------------------------------------------------- */
	
	Enctype.URLENCODED = new Enctype("application/x-www-form-urlencoded");
	Enctype.MULTIPART = new Enctype("multipart/form-data");
	
	/* -------------------------------------------------------------------- */
	
	exports.Textareas = Textareas;
	exports.Textarea = Textarea;
	exports.Selects = Selects;
	exports.Select = Select;
	exports.Page = Page;
	exports.Options = Options;
	exports.Option = Option;
	exports.Links = Links;
	exports.Link = Link;
	exports.Inputs = Inputs;
	exports.Input = Input;
	exports.SimplePair = SimplePair;
	exports.SimpleForm = SimpleForm;
	exports.SimpleFile = SimpleFile;
	exports.SimpleField = SimpleField;
	exports.SimpleContent = SimpleContent;
	exports.Forms = Forms;
	exports.Form = Form;
	exports.Enctype = Enctype;
	
})(exports);