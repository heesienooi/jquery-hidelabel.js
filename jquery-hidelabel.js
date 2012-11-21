/* =============================================================
 * jquery-hidelabel.js v1.1
 * https://github.com/Heesien/jquery-hidelabel.js
 * =============================================================
 * 
 * Author: Heesien Ooi < heesien.ooi@butterfly.com.au / heesien.ooi@gmail.com >
 * Requirement: jQuery
 *
 * Hide label for input, ie. text, password, textarea...
 * Basic usage: $('input').hidelabel();
 */

(function ($) {

	"use strict";

	// Detech placeholder support
	var placeholderSupport = ('placeholder' in document.createElement('input'));

	// HIDDENLABEL CLASS DEFINITION
	// Construct when no placeholder support
	var Hiddenlabel = function(element, label) {
		this.$element = $(element);
		this.$label = label;
	
		this.initialize();
	};

	Hiddenlabel.prototype = {
		constructor: Hiddenlabel,

		initialize: function() {
			this.render();
			this.listen();
		},

		render: function() {
			var $element = this.$element,
				$label = this.$label;

			$label.addClass('hidden-label' + ($element.val() && ' el-populated')).insertBefore($element);
		},

		listen: function() {
			var $element = this.$element,
				$label = this.$label;

			$element.on({
				focus: function() {
					$label.addClass('el-focused');
				},

				blur: function() {
					$label.removeClass('el-focused');
				},

				'keydown keyup': function() {
					$label[($element.val() ? 'add' : 'remove') + 'Class']('el-populated');
				}
			});
		}
	};

	// HIDELABEL PLUGIN DEFINITION
	$.fn.hidelabel = function(fn) {
		return this.each(function() {
			var $this = $(this),
				data = $this.data('hidelabel'),
				label = (typeof fn === 'function') ? fn.call(this, this) :  undefined;

			// Check if it has hidelabel data
			if (data) return;

			// Create label object
			switch (typeof label) {
				case 'undefined':
					label = $('label[for="' + this.id +'"]');
					break;
				case 'object':
					label = $(label);
					break;
				default: // String, number, etc ..
					label = $('<label for="' + this.id +'">' + label +'</label>');
			}

			// Add placeholder attribute if it supported or else fallback with Hiddenlabel
			data = (placeholderSupport) ? $this.attr('placeholder', label.hide().text()) : new Hiddenlabel(this, label);
			$this.data('hiddenlabel', data);
		});
	};

})(jQuery);
