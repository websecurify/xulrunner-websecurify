(function (exports) {
	
	var org_basic_core = require("./org_basic_core.js");
	
	var ListContainer = org_basic_core.ListContainer;
	var RegularExpression = org_basic_core.RegularExpression;
	var RegularMatch = org_basic_core.RegularMatch;
	var MathUtils = org_basic_core.MathUtils;
	
	/* -------------------------------------------------------------------- */
	
	function StringUtils() {
	}
	
	/* -------------------------------------------------------------------- */
	
	StringUtils.isNone = function (input) {
		return input == null;
	}
	
	StringUtils.isEmpty = function (input) {
		return StringUtils.isNone(input) || input.isEmpty();
	}
	
	StringUtils.isHollow = function (input) {
		return StringUtils.isEmpty(input) || input.trim().isEmpty();
	}
	
	/* -------------------------------------------------------------------- */
	
	StringUtils.ltrimRegularExpression = new RegularExpression("^\\s+", "");
	
	StringUtils.ltrim = function (input) {
		return StringUtils.ltrimRegularExpression.replace(input, "");
	}
	
	/* -------------------------------------------------------------------- */
	
	StringUtils.rtrimRegularExpression = new RegularExpression("\\s+$", "");
	
	StringUtils.rtrim = function (input) {
		return StringUtils.rtrimRegularExpression.replace(input, "");
	}
	
	/* -------------------------------------------------------------------- */
	
	StringUtils.rRegularExpression = new RegularExpression("\r", "g");
	StringUtils.nRegularExpression = new RegularExpression("\n", "g");
	
	StringUtils.makeLiteral = function (input) {
		return StringUtils.nRegularExpression.replace(StringUtils.rRegularExpression.replace(input, "\\\\r"), "\\\\n");
	}
	
	/* -------------------------------------------------------------------- */
	
	StringUtils.generateRandomString = function (characters, length) {
		var output = "";
		
		for (var i = 0; i < length; i++) {
			output += characters.charAt(MathUtils.random(0, characters.length - 1));
		}
		
		return output;
	}
	/* -------------------------------------------------------------------- */
	
	function MixTrippleIterator(iteratorA, iterableB, iterableC) {
		var iteratorAB = new MixDualIterator(iteratorA, iterableB);
		
		this.iteratorABC = new MixDualIterator(iteratorAB, iterableC);
	}
	
	/* -------------------------------------------------------------------- */
	
	MixTrippleIterator.prototype.hasNext = function () {
		return this.iteratorABC.hasNext();
	}
	
	MixTrippleIterator.prototype.next = function () {
		var nextValue = this.iteratorABC.next();
		
		return new MixTrippleContainer(nextValue.getValueA().getValueA(), nextValue.getValueA().getValueB(), nextValue.getValueB());
	}
	
	MixTrippleIterator.prototype.remove = function () {
		this.iteratorABC.remove();
	}
	
	/* -------------------------------------------------------------------- */
	
	function MixTrippleContainer(valueA, valueB, valueC) {
		this.valueA = valueA;
		this.valueB = valueB;
		this.valueC = valueC;
	}
	
	/* -------------------------------------------------------------------- */
	
	MixTrippleContainer.prototype.getValueA = function () {
		return this.valueA;
	}
	
	MixTrippleContainer.prototype.getValueB = function () {
		return this.valueB;
	}
	
	MixTrippleContainer.prototype.getValueC = function () {
		return this.valueC;
	}
	
	/* -------------------------------------------------------------------- */
	
	function MixSingularIterator(valueA, iteratorB) {
		this.valueA = valueA;
		this.iteratorB = iteratorB;
		this.empty = true;
		this.nextValue = null;
		this.nextException = null;
		
		this.prepareNext();
	}
	
	/* -------------------------------------------------------------------- */
	
	MixSingularIterator.prototype.hasNext = function () {
		return !this.empty;
	}
	
	MixSingularIterator.prototype.next = function () {
		if (this.nextException != null) {
			throw this.nextException;
		}
		
		var nextValue = this.nextValue;
		
		this.prepareNext();
		
		return nextValue;
	}
	
	MixSingularIterator.prototype.remove = function () {
		throw new Error("cannot remove element");
	}
	
	/* -------------------------------------------------------------------- */
	
	MixSingularIterator.prototype.prepareNext = function () {
		this.empty = !this.iteratorB.hasNext();
		
		if (this.empty) {
			this.nextValue = null;
			this.nextException = new Error("no such element");
		} else {
			this.nextValue = new MixDualContainer(this.valueA, this.iteratorB.next());
			this.nextException = null;
		}
	}
	
	/* -------------------------------------------------------------------- */
	
	function MixDualIterator(iteratorA, iteratorB) {
		this.iteratorA = iteratorA;
		this.iterableB = iteratorB;
		this.iteratorAB = null;
		this.empty = true;
		this.nextValue = null;
		this.nextException = null;
		
		this.prepareNext();
	}
	
	/* -------------------------------------------------------------------- */
	
	MixDualIterator.prototype.hasNext = function () {
		return !this.empty;
	}
	
	MixDualIterator.prototype.next = function () {
		if (this.nextException != null) {
			throw this.nextException;
		}
		
		var nextValue = this.nextValue;
		
		this.prepareNext();
		
		return nextValue;
	}
	
	MixDualIterator.prototype.remove = function () {
		throw new Error("cannot remove element");
	}
	
	/* -------------------------------------------------------------------- */
	
	MixDualIterator.prototype.prepareNext = function () {
		if (this.iteratorAB == null) {
			this.empty = !this.iteratorA.hasNext();
			
			if (this.empty) {
				this.nextValue = null;
				this.nextException = new Error("no such element");
				
				return;
			} else {
				var valueA = this.iteratorA.next();
				
				this.iteratorAB = new MixSingularIterator(valueA, this.iterableB.iterator());
			}
		}
		
		this.empty = !this.iteratorAB.hasNext();
		
		if (this.empty) {
			this.iteratorAB = null;
			
			this.prepareNext();
		} else {
			this.nextValue = this.iteratorAB.next();
			this.nextException = null;
		}
	}
	
	/* -------------------------------------------------------------------- */
	
	function MixDualContainer(valueA, valueB) {
		this.valueA = valueA;
		this.valueB = valueB;
	}
	
	/* -------------------------------------------------------------------- */
	
	MixDualContainer.prototype.getValueA = function () {
		return this.valueA;
	}
	
	MixDualContainer.prototype.getValueB = function () {
		return this.valueB;
	}
	
	/* -------------------------------------------------------------------- */
	
	function IntegerIterator(fromIndex, toIndex) {
		this.index = fromIndex;
		this.toIndex = toIndex;
	}
	
	/* -------------------------------------------------------------------- */
	
	IntegerIterator.prototype.hasNext = function () {
		return this.index <= this.toIndex;
	}
	
	IntegerIterator.prototype.next = function () {
		if (this.index <= this.toIndex) {
			var index = this.index;
			
			this.index += 1;
			
			return index;
		} else {
			throw new Error("no such element");
		}
	}
	
	IntegerIterator.prototype.remove = function () {
		throw new Error("cannot remove element");
	}
	
	/* -------------------------------------------------------------------- */
	
	function ImmutableIterator(iterator) {
		this.iterator = iterator;
	}
	
	/* -------------------------------------------------------------------- */
	
	ImmutableIterator.prototype.hasNext = function () {
		return this.iterator.hasNext();
	}
	
	ImmutableIterator.prototype.next = function () {
		return this.iterator.next();
	}
	
	ImmutableIterator.prototype.remove = function () {
		throw new Error("cannot remove element");
	}
	
	/* -------------------------------------------------------------------- */
	
	function EnclosedRegularExpressionContainer(regularExpression, value) {
		this.regularExpression = regularExpression;
		this.value = value;
	}
	
	/* -------------------------------------------------------------------- */
	
	EnclosedRegularExpressionContainer.prototype.getRegularExpression = function () {
		return this.regularExpression;
	}
	
	EnclosedRegularExpressionContainer.prototype.getValue = function () {
		return this.value;
	}
	
	/* -------------------------------------------------------------------- */
	
	function EnclosedRegularExpression() {
		this.containers = new ListContainer();
	}
	
	/* -------------------------------------------------------------------- */
	
	EnclosedRegularExpression.prototype.add = function (regularExpression, value) {
		this.containers.add(new EnclosedRegularExpressionContainer(regularExpression, value));
	}
	
	EnclosedRegularExpression.prototype.addContainer = function (container) {
		this.containers.add(container);
	}
	
	/* -------------------------------------------------------------------- */
	
	EnclosedRegularExpression.prototype.test = function (input) {
		for (var containerIterator = this.containers.iterator(), container = null; containerIterator.hasNext();) {
			container = containerIterator.next();
			if (container.getRegularExpression().test(input)) {
				return container.getValue();
			}
		}
		
		return null;
	}
	
	/* -------------------------------------------------------------------- */
	
	function ContinuesIterator() {
		this.iterators = new ListContainer();
		this.empty = true;
		this.nextValue = null;
		this.nextException = null;
		
		this.prepareNext();
	}
	
	/* -------------------------------------------------------------------- */
	
	ContinuesIterator.prototype.hasNext = function () {
		return !this.empty;
	}
	
	ContinuesIterator.prototype.next = function () {
		if (this.nextException != null) {
			throw this.nextException;
		}
		
		var nextValue = this.nextValue;
		
		this.prepareNext();
		
		return nextValue;
	}
	
	ContinuesIterator.prototype.remove = function () {
		throw new Error("cannot remove element");
	}
	
	/* -------------------------------------------------------------------- */
	
	ContinuesIterator.prototype.prepareNext = function () {
		if (this.iterators.size() == 0) {
			this.empty = true;
			this.nextValue = null;
			this.nextException = new Error("no such element");
		} else {
			var it = this.iterators.retrieve(0);
			
			if (it.hasNext()) {
				this.empty = false;
				this.nextValue = it.next();
				this.nextException = null;
			} else {
				this.iterators.erase(0);
				
				this.prepareNext();
			}
		}
	}
	
	ContinuesIterator.prototype.updateNext = function () {
		if (this.nextException != null) {
			this.prepareNext();
		}
	}
	
	/* -------------------------------------------------------------------- */
	
	ContinuesIterator.prototype.add = function (iterator) {
		this.iterators.add(iterator);
		
		this.updateNext();
	}
	
	/* -------------------------------------------------------------------- */
	
	function CompoundIterator(iterators) {
		this.iterators = iterators.reflect();
		this.empty = true;
		this.nextValue = null;
		this.nextException = null;
		
		this.prepareNext();
	}
	
	/* -------------------------------------------------------------------- */
	
	CompoundIterator.prototype.hasNext = function () {
		return !this.empty;
	}
	
	CompoundIterator.prototype.next = function () {
		if (this.nextException != null) {
			throw this.nextException;
		}
		
		var nextValue = this.nextValue;
		
		this.prepareNext();
		
		return nextValue;
	}
	
	CompoundIterator.prototype.remove = function () {
		throw new Error("cannot remove element");
	}
	
	/* -------------------------------------------------------------------- */
	
	CompoundIterator.prototype.prepareNext = function () {
		if (this.iterators.size() == 0) {
			this.empty = true;
			this.nextValue = null;
			this.nextException = new Error("no such element");
		} else {
			var it = this.iterators.retrieve(0);
			
			if (it.hasNext()) {
				this.empty = false;
				this.nextValue = it.next();
				this.nextException = null;
			} else {
				this.iterators.erase(0);
				
				this.prepareNext();
			}
		}
	}
	
	/* -------------------------------------------------------------------- */
	
	function CompositeStringSearch() {
		this.strings = new ListContainer();
		this.regularExpressions = new ListContainer();
	}
	
	/* -------------------------------------------------------------------- */
	
	CompositeStringSearch.prototype.addString = function (string) {
		this.strings.add(string);
	}
	
	CompositeStringSearch.prototype.addRegularExpression = function (regularExpression) {
		this.regularExpressions.add(regularExpression);
	}
	
	/* -------------------------------------------------------------------- */
	
	CompositeStringSearch.prototype.any = function (input) {
		for (var stringIterator = this.strings.iterator(), string = null; stringIterator.hasNext();) {
			string = stringIterator.next();
			if (input.indexOf(string) >= 0) {
				return true;
			}
		}
		
		for (var regularExpressionIterator = this.regularExpressions.iterator(), regularExpression = null; regularExpressionIterator.hasNext();) {
			regularExpression = regularExpressionIterator.next();
			if (regularExpression.test(input)) {
				return true;
			}
		}
		
		return false;
	}
	
	CompositeStringSearch.prototype.all = function (input) {
		for (var stringIterator = this.strings.iterator(), string = null; stringIterator.hasNext();) {
			string = stringIterator.next();
			if (input.indexOf(string) < 0) {
				return false;
			}
		}
		
		for (var regularExpressionIterator = this.regularExpressions.iterator(), regularExpression = null; regularExpressionIterator.hasNext();) {
			regularExpression = regularExpressionIterator.next();
			if (!regularExpression.test(input)) {
				return false;
			}
		}
		
		return true;
	}
	
	CompositeStringSearch.prototype.first = function (input) {
		for (var stringIterator = this.strings.iterator(), string = null; stringIterator.hasNext();) {
			string = stringIterator.next();
			var index = input.indexOf(string);
			
			if (index >= 0) {
				return input.substring(index - 3, index + string.length + 3);
			}
		}
		
		for (var regularExpressionIterator = this.regularExpressions.iterator(), regularExpression = null; regularExpressionIterator.hasNext();) {
			regularExpression = regularExpressionIterator.next();
			var regularMatch = regularExpression.match(input);
			
			if (regularMatch != null) {
				return regularMatch.match();
			}
		}
		
		return null;
	}
	
	/* -------------------------------------------------------------------- */
	
	function CartesianProduct(input) {
		this.input = input;
	}
	
	/* -------------------------------------------------------------------- */
	
	CartesianProduct.prototype.iterator = function () {
		return new CartesianIterator(this.input);
	}
	
	/* -------------------------------------------------------------------- */
	
	CartesianProduct.prototype.size = function () {
		var size = 0;
		
		for (var itemIterator = this.input.iterator(), item = null; itemIterator.hasNext();) {
			item = itemIterator.next();
			size = size + item.size();
		}
		
		return size;
	}
	
	/* -------------------------------------------------------------------- */
	
	function CartesianIterator(input) {
		this.iterators = new ListContainer();
		this.current = new ListContainer();
		this.input = new ListContainer();
		
		var hasOne = false;
		
		for (var iiIterator = input.iterator(), ii = null; iiIterator.hasNext();) {
			ii = iiIterator.next();
			var ji = ii.iterator();
			
			if (!ji.hasNext()) {
				continue;
			}
			
			hasOne = true;
			
			this.current.add(ji.next());
			this.iterators.add(ji);
			this.input.add(ii);
		}
		
		this.empty = !hasOne;
	}
	
	/* -------------------------------------------------------------------- */
	
	CartesianIterator.prototype.hasNext = function () {
		return !this.empty;
	}
	
	CartesianIterator.prototype.next = function () {
		var result = this.current.reflect();
		var i = this.iterators.size() - 1;
		
		for (; i >= 0; i--) {
			var ii = this.iterators.retrieve(i);
			
			if (ii.hasNext()) {
				break;
			}
		}
		
		if (i < 0) {
			this.empty = true;
			
			return result;
		}
		
		for (var j = i + 1; j < this.iterators.size(); j++) {
			var ii = this.input.retrieve(j).iterator();
			
			this.iterators.replace(j, ii);
		}
		
		for (var j = i; j < this.iterators.size(); j++) {
			var ii = this.iterators.retrieve(j);
			var ie = ii.next();
			
			this.current.replace(j, ie);
		}
		
		return result;
	}
	
	CartesianIterator.prototype.remove = function () {
		throw new Error("cannot remove element");
	}
	
	/* -------------------------------------------------------------------- */
	
	exports.StringUtils = StringUtils;
	exports.MixTrippleIterator = MixTrippleIterator;
	exports.MixTrippleContainer = MixTrippleContainer;
	exports.MixSingularIterator = MixSingularIterator;
	exports.MixDualIterator = MixDualIterator;
	exports.MixDualContainer = MixDualContainer;
	exports.IntegerIterator = IntegerIterator;
	exports.ImmutableIterator = ImmutableIterator;
	exports.EnclosedRegularExpressionContainer = EnclosedRegularExpressionContainer;
	exports.EnclosedRegularExpression = EnclosedRegularExpression;
	exports.ContinuesIterator = ContinuesIterator;
	exports.CompoundIterator = CompoundIterator;
	exports.CompositeStringSearch = CompositeStringSearch;
	exports.CartesianProduct = CartesianProduct;
	exports.CartesianIterator = CartesianIterator;
	
})(exports);