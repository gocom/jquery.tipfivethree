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

				var c =
				{
					tip    : { width : tooltip.outerWidth(), height : tooltip.outerHeight() },
					offset : $this.offset(),
					target : { width : $this.outerWidth(), height : $this.outerHeight() }
				};

				var positioning =
				{
					top : {
						x : c.offset.left + (c.target.width/2) - (c.tip.width/2),
						y : c.offset.top - c.tip.height - 10
					},
					bottom : {
						x : c.offset.left + (c.target.width/2) - (c.tip.width/2),
						y : c.offset.top + c.target.height + 10
					},
					left : {
						x : c.offset.left - c.tip.width - 10,
						y : c.offset.top + (c.target.height/2) - (c.tip.height/2)
					},
					right : {
						x : c.offset.left + c.target.width + c.tip.width + 10,
						y : c.offset.top + (c.target.height/2) - (c.tip.height/2)
					}
				};

				var requires = 
				{
					top    : c.tip.height + 10,
					bottom : c.tip.height + 10,
					left   : c.tip.width + 10,
					right  : c.tip.width + 10
				};

				var space =
				{
					top    : c.offset.top,
					bottom : $(document).outerHeight() - (c.target.height + c.offset.top),
					left   : c.offset.left,
					right  : $(document).outerWidth() - (c.target.width + c.offset.left)
				};

				var position = options.position;

				if ($.type(space[position]) === 'undefined' || space[position] < requires[position])
				{
					$.each(space, function (name, value)
					{
						if (value >= space[position])
						{
							position = name;
						}

						if (value >= requires[name])
						{
							return;
						}
					});
				}

				tooltip
					.css({
						'top'  : positioning[position].y + 'px',
						'left' : positioning[position].x + 'px'
					})
					.show()
					.addClass('tipFiveThree-'+position);

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