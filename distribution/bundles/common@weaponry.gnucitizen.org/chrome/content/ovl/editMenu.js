function updateEditMenuCommandState(commandId, commandName) {
	let controller = document.commandDispatcher.getControllerForCommand(commandName);
	
	if (!controller) {
		return;
	}
	
	let command = document.getElementById(commandId);
	
	command.setAttribute('disabled', !controller.isCommandEnabled(commandName));
}

/* ------------------------------------------------------------------------ */

function handleEditMenuUpdateFocusSelectCommandEvent(event) {
	updateEditMenuCommandState('edit-menu-undo-command', 'cmd_undo');
	updateEditMenuCommandState('edit-menu-redo-command', 'cmd_redo');
	updateEditMenuCommandState('edit-menu-cut-command', 'cmd_cut');
	updateEditMenuCommandState('edit-menu-copy-command', 'cmd_copy');
	updateEditMenuCommandState('edit-menu-paste-command', 'cmd_paste');
	updateEditMenuCommandState('edit-menu-delete-command', 'cmd_delete');
	updateEditMenuCommandState('edit-menu-select-all-command', 'cmd_selectAll');
}

function handleEditMenuUpdateUndoCommandEvent(event) {
	updateEditMenuCommandState('edit-menu-undo-command', 'cmd_undo');
	updateEditMenuCommandState('edit-menu-redo-command', 'cmd_redo');
}

function handleEditMenuUpdateClipboardCommandEvent(event) {
	updateEditMenuCommandState('edit-menu-paste-command', 'cmd_paste');
}

/* ------------------------------------------------------------------------ */

function doEditMenuCommand(commandName) {
	let controller = document.commandDispatcher.getControllerForCommand(commandName);
	
	if (!controller) {
		return;
	}
	
	controller.doCommand(commandName);
}

/* ------------------------------------------------------------------------ */

function handleEditMenuUndoCommandEvent(event) {
	doEditMenuCommand('cmd_undo');
}

function handleEditMenuRedoCommandEvent(event) {
	doEditMenuCommand('cmd_redo');
}

function handleEditMenuCutCommandEvent(event) {
	doEditMenuCommand('cmd_cut');
}

function handleEditMenuCopyCommandEvent(event) {
	doEditMenuCommand('cmd_copy');
}

function handleEditMenuPasteCommandEvent(event) {
	doEditMenuCommand('cmd_paste');
}

function handleEditMenuDeleteCommandEvent(event) {
	doEditMenuCommand('cmd_delete');
}

function handleEditMenuSelectAllCommandEvent(event) {
	doEditMenuCommand('cmd_selectAll');
}

/* ------------------------------------------------------------------------ */

function handleEditMenupopupshowingEvent(event) {
	updateEditMenuCommandState('edit-menu-undo-command', 'cmd_undo');
	updateEditMenuCommandState('edit-menu-redo-command', 'cmd_redo');
	updateEditMenuCommandState('edit-menu-cut-command', 'cmd_cut');
	updateEditMenuCommandState('edit-menu-copy-command', 'cmd_copy');
	updateEditMenuCommandState('edit-menu-paste-command', 'cmd_paste');
	updateEditMenuCommandState('edit-menu-delete-command', 'cmd_delete');
	updateEditMenuCommandState('edit-menu-select-all-command', 'cmd_selectAll');
}

function handleEditContextMenupopupshowingEvent(event) {
	updateEditMenuCommandState('edit-menu-undo-command', 'cmd_undo');
	updateEditMenuCommandState('edit-menu-redo-command', 'cmd_redo');
	updateEditMenuCommandState('edit-menu-cut-command', 'cmd_cut');
	updateEditMenuCommandState('edit-menu-copy-command', 'cmd_copy');
	updateEditMenuCommandState('edit-menu-paste-command', 'cmd_paste');
	updateEditMenuCommandState('edit-menu-delete-command', 'cmd_delete');
	updateEditMenuCommandState('edit-menu-select-all-command', 'cmd_selectAll');
}

/* ------------------------------------------------------------------------ */

function handleGenericEditMenupopupshowingEvent(event) {
	updateEditMenuCommandState('edit-menu-undo-command', 'cmd_undo');
	updateEditMenuCommandState('edit-menu-redo-command', 'cmd_redo');
	updateEditMenuCommandState('edit-menu-cut-command', 'cmd_cut');
	updateEditMenuCommandState('edit-menu-copy-command', 'cmd_copy');
	updateEditMenuCommandState('edit-menu-paste-command', 'cmd_paste');
	updateEditMenuCommandState('edit-menu-delete-command', 'cmd_delete');
	updateEditMenuCommandState('edit-menu-select-all-command', 'cmd_selectAll');
}

/* ------------------------------------------------------------------------ */

function handleEditMenuDOMContentLoadedEvent(event) {
	if (event.target != document) {
		return;
	}
	
	let nodes = document.querySelectorAll('textbox:not([context])');
	let nodesLength = nodes.length;
	
	let i;
	
	for (i = 0; i < nodesLength; i += 1) {
		nodes[i].setAttribute('context', 'edit-context-menupopup');
	}
	
	nodes = document.querySelectorAll('textbox:not([contextmenu])');
	nodesLength = nodes.length;
	
	for (i = 0; i < nodesLength; i += 1) {
		nodes[i].setAttribute('contextmenu', 'edit-context-menupopup');
	}
	
	let selector = ['undo', 'redo', 'cut', 'copy', 'paste', 'delete', 'select-all'].map(function (operation) {
		return '[command="edit-menu-' + operation + '-command"]';
	}).join(',');
	
	let $lastParent = null;
	
	nodes = document.querySelectorAll(selector);
	nodesLength = nodes.length;
	
	let $node;
	
	for (i = 0; i < nodesLength; i += 1) {
		$node = nodes[i];
		
		if ($node.parentNode != $lastParent && !($node.parentNode.id in {'edit-menupopup':1, 'edit-context-menupopup':1})) {
			$node.parentNode.addEventListener('popupshowing', handleGenericEditMenupopupshowingEvent, false);
			
			$lastParent = $node.parentNode;
		}
	}
}

addEventListener('DOMContentLoaded', handleEditMenuDOMContentLoadedEvent, false);
