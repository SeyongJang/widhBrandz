/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here.
	// For complete reference see:
	// http://docs.ckeditor.com/#!/api/CKEDITOR.config

	// The toolbar groups arrangement, optimized for two toolbar rows.
	config.toolbarGroups = [
		{ name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
		{ name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
		{ name: 'links' },
		{ name: 'insert' },
		{ name: 'forms' },
		{ name: 'tools' },
		{ name: 'document',	   groups: [ 'mode', 'document', 'doctools' ] },
		{ name: 'others' },
		'/',
		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
		{ name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
		{ name: 'styles' },
		{ name: 'colors' },
		{ name: 'about' }
	];

	// Remove some buttons provided by the standard plugins, which are
	// not needed in the Standard(s) toolbar.
	config.removeButtons = 'Underline,Subscript,Superscript';

	// Set the most common block elements.
	config.format_tags = 'p;h1;h2;h3;pre';

	// Simplify the dialog windows.
	config.removeDialogTabs = 'image:advanced;link:advanced;image:info;image:Link';

    config.removePlugins = 'resize';
	config.extraPlugins = 'uploadimage,imagepaste,image2,autogrow';

	config.uploadUrl = '/upload/image?command=quickUpload';
	config.filebrowserBrowseUrl = false;
	config.filebrowserImageBrowseUrl= false;
	config.filebrowserUploadUrl = false;
	config.filebrowserImageUploadUrl= '/upload/image?command=normalUpload';

	//config.resize_enabled = false;
	//config.image2_disableResizer = true;

    config.autoGrow_minHeight = 300;
    config.autoGrow_maxHeight = 600;
    config.autoGrow_bottomSpace = 50;
    config.autoGrow_onStartup = true;


	config.height = 500;


};
