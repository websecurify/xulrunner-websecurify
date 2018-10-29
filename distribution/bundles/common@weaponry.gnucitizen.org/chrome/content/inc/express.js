function bindHandler(id, event, handler) {
	let $element = document.getElementById(id);
	
	if (!$element) {
		throw new Error('cannot find element with id ' + id);
	}
	
	if (typeof(handler) == 'string' || handler instanceof String) {
		let eventAttribute = 'on' + event.toLowerCase();
		
		$element.setAttribute(eventAttribute, handler);
	} else {
		$element.addEventListener(event, handler, false);
	}
}

function unbindHandler(id, event, handler) {
	let $element = document.getElementById(id);
	
	if (!$element) {
		throw new Error('cannot find element with id ' + id);
	}
	
	if (typeof(handler) == 'string' || handler instanceof String) {
		let eventAttribute = 'on' + event.toLowerCase();
		
		if ($element.hasAttribute(eventAttribute) && $element.getAttribute(eventAttribute) == handler) {
			$element.removeAttribute(eventAttribute);
		} else {
			throw new Error('cannot remove event ' + event);
		}
	} else {
		$element.removeEventListener(event, handler, false);
	}
}

/* ------------------------------------------------------------------------ */

function createNamespace(namespace, gadget) {
	let subject = window;
	let spaces = namespace.split('.');
	let spacesLength = spaces.length;
	
	for (let i = 0; i < spacesLength; i += 1) {
		let space = spaces[i];
		let collides = true;
		
		if (!(space in subject)) {
			subject[space] = {};
			
			collides = false;
		}
		
		if (i == spacesLength - 1 && gadget != undefined) {
			if (collides) {
				throw new Error('collision for namespace ' + namespace);
			}
			
			subject[space] = gadget;
		}
		
		subject = subject[space];
	}
	
	return subject;
}

/* ------------------------------------------------------------------------ */

function installHandler(namespace, handler) {
	let namespace = createNamespace(namespace, handler);
	
	if (namespace && namespace == handler) {
		let events = {
			'onDOMContentLoaded': 'DOMContentLoaded',
			'onLoad': 'load',
			'onUnload': 'unload',
			'onClose': 'close'
		};
		
		for (let eventHandler in events) {
			if (eventHandler in namespace) {
				addEventListener(events[eventHandler], namespace[eventHandler], false);
			}
		}
	}
	
	return namespace;
}
