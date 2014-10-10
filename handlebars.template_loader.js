/**
 * A simple component that loads and compiles Handlebars templates.
 */
 function HandlebarsTemplateLoader(templateNames, templateDirectory, fileExtension) {
	'use strict';
	var _templateDirectory = 'js/template',
		_templates = [],
		_fileExtension = 'handlebars',
		_this = this;

	/**
	 * Setup all configuration options.
	 */
	function init(templateDirectory, templateNames) {
		if (fileExtension !== undefined) _fileExtension = fileExtension;
		if (templateDirectory !== undefined) _templateDirectory = templateDirectory;
		if (templateNames !== undefined) _this.loadTemplates(templateNames);
	}

	/**
	 * Load one or more templates with AJAX.
	 */
	this.loadTemplates = function(templateNames) {
		if(!(templateNames instanceof Array)) {
			_this.loadTemplate(templateNames);
		} else {
			templateNames.forEach(function(templateName) {
				_this.loadTemplate(templateName);
			});
		}
	};

	/**
	 * Load a single template with AJAX.
	 *
	 * Todo: improve error handling
	 */
	this.loadTemplate = function(templateName, callback) {
		$.ajax(this.createUrl(templateName))
			.done(function(data) {
				_templates[templateName] = Handlebars.compile(data);
				if (callback !== undefined) callback(_templates[templateName]);
			})
			.fail(function() {
				_templates[templateName] = null;
			});
	};

	/**
	 * Create a url for a template based on the configurations that have been given to this object.
	 */
	this.createUrl = function(templateName) {
		return _templateDirectory + '/' + templateName + '.' + _fileExtension;
	};

	/**
	 * Get a template or load if we don't have it yet.
	 */
	this.getTemplate = function(templateName, callback) {
		if (_templates[templateName] !== undefined) {
			callback(_templates[templateName]);
		} else {
			this.loadTemplate(templateName, callback);
		}
	};

	init(templateDirectory, templateNames);
}
