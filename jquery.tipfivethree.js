/*!
 * jquery.tipFiveThree - CSS3 powered tooltips
 * https://github.com/gocom/jquery.tipfivethree
 *
 * Copyright (C) 2012 Jukka Svahn
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/**
 * @preserve jquery.tipFiveThree | Copyright (C) 2012 Jukka Svahn | http://uproar-n-rattle.biz
 * Released under the MIT License
 */

/**
 * jquery.tipFiveThree
 *
 * A tooltip plugin for jQuery. Uses CSS3
 * animations and is fully styleable.
 *
 * @param   {Object} options
 * @param   {String} options.template Callback or a template string, e.g. '{href}'
 * @param   {String} options.position Default position, either 'top', 'bottom', 'left', 'right'
 * @param   {String} options.class    Applies a custom class to the tooltip, e.g. 'my-custom-class'
 * @return  {Object} this
 * @author  Jukka Svahn
 * @package jQuery.tipFiveThree
 */

(function ($) {
	$.fn.tipFiveThree = function (method, options)
	{
		if ($.type(method) === 'object')
		{
			options = method;
			method = false;
		}

		options = $.extend({
			'template' : '{title}',
			'position' : 'top',
			'class'    : ''
		}, options);

		return this.each(function ()
		{
			var $this = $(this), methods = {}, tooltip;

			if ($.type(options.template) === 'string')
			{
				var template = options.template;

				$.each($this[0].attributes, function(index, attr)
				{
					template = template.replace(
						'{'+attr.name+'}',
						$('<div/>').text(attr.value).html().replace('{', '&#123;')
					);
				});
			}
			else
			{
				var template = options.template.call($this);
			}

			if (template === '' || template === false || $.type(template) === 'undefined')
			{
				return;
			}

			/**
			 * Displays the tooltip.
			 */

			methods.show = function()
			{
				$this.data('tipFiveThree-title', $this.attr('title')).removeAttr('title');

				tooltip = $('<div class="tipFiveThree" />')
					.css({
						'position'  : 'absolute',
						'z-index'   : '9999'
					})
					.addClass(options.class)
					.addClass('tipFiveThree-parent-' + $this.attr('id'))
					.hide();

				$('body').append(tooltip);

				tooltip
					.html(template)
					.css({
						'max-width' : Math.min($(window).width(), parseInt(tooltip.css('max-width'), 10))
					});

				var offset = $this.offset();
				var thisWidth = $this.width();
				var tipWidth = tooltip.width();
				var tipHeight = tooltip.height();

				if (thisWidth == tipWidth)
				{
					var xTip = 0;
				}
				else if(thisWidth > tipWidth)
				{
					var xTip = (offset.left+((thisWidth-tipWidth)/2));
				}
				else
				{
					var xTip = (offset.left-((tipWidth-thisWidth)/2));
				}

				var yTip = (offset.top-tipHeight-10);

				tooltip
					.css({
						'top'  : yTip+'px',
						'left' : xTip+'px'
					})
					.show()
					.addClass('tipFiveThree-top tipFiveThree-spawn');

				tooltip.delay = setInterval(function ()
				{
					clearInterval(tooltip.delay);
					tooltip.addClass('tipFiveThree-open');
				}, 100);
			};

			/**
			 * Hides the tooltip.
			 */

			methods.hide = function()
			{
				clearInterval(tooltip.delay);
				tooltip.remove();
				$this
					.attr('title', $this.data('tipFiveThree-title'))
					.removeAttr('data-tipFiveThree-title');
			};

			if (method && $.type(methods[method]) !== 'undefined')
			{
				methods[method].call($this);
				return;
			}

			$this.on('mouseenter.tipFiveThree', function ()
			{
				methods.show();
			})
			.on('mouseleave.tipFiveThree', function ()
			{
				methods.hide();
			});
		});
	};
})(jQuery);