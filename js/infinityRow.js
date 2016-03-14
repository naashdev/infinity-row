/*!
* Infinity Row;
* version: 1.0.0
* http://naashdev.net
* Copyright (c) 2016 N. Talbot; Dual licensed: MIT/GPL
*/

(function($) {

    $.fn.infinityRow = function( options ){

		var settings = {
			items: 'div',
			row_backward: '.backward',
			row_forward: '.forward',
            fixed: false,
            fallback: false,
            resize: true,
			overflow: true
		},

		options = $.extend(settings, options);

		this.each(function(){

			// Calculate the environment of the row
			calcENV = function(row, items){

				_ENV = {
					windowX: $(window).width(),
					rowX: row.width(),
					itemX: items.width(),
					itemOuterX: items.outerWidth()
				},

				row_threshold = ( ( _ENV.windowX - _ENV.rowX ) / 2 ) + _ENV.itemX;

			}

			// A fallback for browsers that don't support flexbox
			flexFallback = function(row, items){

	            if (typeof Modernizr == 'object') { // If modernizer has been loaded

	                if (!Modernizr.flexbox) { // If flexbox is not supported position items absolute

	                    var item_width = items.outerWidth(),
	                        left_val = 0,
	                        counter = 0;
							largest_item_height = 0;

	                    items.each(function(){

	                        counter++;

							if(largest_item_height < $(this).outerHeight()) largest_item_height =  $(this).outerHeight();

	                        left_val = (counter > 1) ? left_val + item_width : 0;
	                        $(this).css({position: 'absolute', left: left_val + 'px'});

	                    });

						row.css({height: largest_item_height});

	                }

	            }

	        }

			// Slide items animation
			slideItems = function(translate_val, row){

	            row.css({transform: 'translate3d(-' + translate_val + 'px, 0px, 0px)'});

	        }

			// Init the row instance
			init = function(t){

				var $row = $(t),
					$items = $row.children(settings.items);

	            calcENV($row, $items);
	            if(settings.fallback == true) flexFallback($row, $items);
				if(settings.overflow == true) $('body').css({overflowX: 'hidden'});

				// Add required data attributes
	            $row.attr('data-step', 1).css({transform: 'translate3d(0px, 0px, 0px)'});
				$(settings.row_backward).attr('data-trigger', 'row-backward');
				$(settings.row_forward).attr('data-trigger', 'row-forward');

				// Backward & forward button click event
				$(settings.row_backward + ', ' + settings.row_forward).on('click', function(e){

		            // Prevent Default action for link
		            e.preventDefault();

					// Trigger the slide event on the row
		            var trigger_val = $(this).data('trigger');
		            $row.trigger(trigger_val);

		        });

				// Backward & forward event
				$row.on('row-forward row-backward', function(e){

		            var active_step = $row.data('step'),
		                triggered_step = (e.type === 'row-forward') ? active_step + 1 : active_step - 1;

		            if(e.type === 'row-backward' && active_step > 1 || (e.type === 'row-forward') && triggered_step <= $items.length && $items.last().outsideViewport(row_threshold)) {

		                $row.data('step', triggered_step).attr('data-step', triggered_step);
		                slideItems(row_threshold * (triggered_step - 1), $row);

		            }

		        });

				// Optional resize event to fix layout
				if (settings.resize) {

		            var resize_timer;

		            $(window).resize(function(){
		                clearTimeout(resize_timer);
		                resize_timer = setTimeout(function() {

		                    calcENV($row, $items);
		                    if(settings.fallback == true) flexFallback($row, $items);

		                }, 200);

		            });

		        }

	        } // Init

			init(this);

		});

	}

	$.fn.outsideViewport = function(threshold){
		var offset_left = this.offset().left;
		return !!(offset_left + threshold > $(window).width());
	}

})(jQuery);

($(function() {
	$('.flex-slider').infinityRow({
        items: '.item',
		row_forward: '.container > .forward',
        fallback: true
    });
}));
