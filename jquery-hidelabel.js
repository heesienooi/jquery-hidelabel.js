/* =============================================================
 * jquery-hidelabel.js v1
 * https://github.com/Heesien/jquery-hidelabel.js
 * =============================================================
 * 
 * Author: Heesien Ooi < heesien.ooi@butterfly.com.au / heesien.ooi@gmail.com >
 * Requirement: jQuery 1.7+
 *
 * Use to hide label for input, ie. text, password, textarea...
 * Basic usage: $('input').hidelabel();
 */

!(function ($) {

	"use strict";

	// HIDDENLABEL CLASS DEFINITION
	var Hiddenlabel = function(element, label) {
		this.$element = $(element);

		switch (typeof label) {
			case 'undefined':
				this.$label = $('label[for="' + element.id +'"]');
				break;
			case 'object':
				this.$label = $(label);
				break;
			default: // String, number, etc..
				this.$label = $('<label for="' + element.id +'">' + label +'</label>');
		}

		this.initialize();
	}

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
				}
			})

			setInterval(function() {
				$label[($element.val() ? 'add' : 'remove') + 'Class']('el-populated');
			}, 100);
		}
	}

	// HIDELABEL PLUGIN DEFINITION
	$.fn.hidelabel = function(fn) {
		return this.each(function() {
			var $this = $(this),
				data = $this.data('hiddenlabel'),
				label = (typeof fn == 'function') ? fn.call(this, this) : undefined;

			!data && $this.data('hiddenlabel', (data = new Hiddenlabel(this, label)));
		})
	}

})(jQuery);