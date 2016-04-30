/*!
* InfinityRow;
* version: 2.0.0
* http://naashdev.net
* Copyright (c) 2016 N. Talbot; Dual licensed: MIT/GPL
*/

(function($){

  var infinityRow = {

    /* --------------------------------------------------------------------------
     * Init
     * ------------------------------------------------------------------------*/
    init: function(options, el) {

      var self = this;

      $body = $('body');
      self.$el = $(el);
      self.options = $.extend($.fn.infinityRow.options, options);

      if ( self.options.row_backward == null || self.options.row_forward == null ) console.log('========= InifityRow - you must set a backward and forward button when initiliazing =========');

      self.elems = {
        $items: self.$el.children(self.options.items),
        $backward: $( self.options.row_backward ),
        $forward: $( self.options.row_forward )
      };

      // Add data attr & init css to row
      self.$el.attr('data-step', 1).css({transform: 'translate3d(0px, 0px, 0px)'});

      // Add data attr to backward & forward buttons
      self.elems.$backward.attr('data-trigger', 'row-backward');
      self.elems.$forward.attr('data-trigger', 'row-forward');

      // Calculate the row environment and determine if flexbox fallback needs to be triggered
      self.calc_env();
      if ( self.options.fallback == true ) self.flexbox_fallback();

      // Row navigation click event
      $( self.options.row_backward + ', ' + self.options.row_forward ).on('click', function(e){

        e.preventDefault();

        var data_val = $(this).data('trigger');
        self.$el.trigger(data_val);

      });

      // Row backward & forward event
      self.$el.on('row-forward row-backward', function(e){

        var active_step = self.$el.data('step'),
            triggered_step = (e.type === 'row-forward') ? active_step + 1 : active_step - 1;

        if(e.type === 'row-backward' && active_step > 1 || (e.type === 'row-forward') && triggered_step <= self.elems.$items.length && outside_viewport(self.elems.$items.last(), self.threshold)) {

          self.$el.data('step', triggered_step).attr('data-step', triggered_step);
          self.slide_items(triggered_step);

        }

      });

      // Resize Event
      if (self.options.resize) {

        var resize_timer;

        $(window).resize(function(){

          clearTimeout(resize_timer);

          resize_timer = setTimeout(function() {

          self.calc_env();
          if(self.options.fallback == true) self.flexbox_fallback();

          }, 200);

        });

      }

      // Function to determine whether a row item is outside of the viewport
      function outside_viewport(el, threshold) {

      	var offset_left = el.offset().left;
      	return !!(offset_left + threshold > $(window).width());

      }

    },

    /* --------------------------------------------------------------------------
     * Slide Items
     * ------------------------------------------------------------------------*/
    slide_items: function(step) {

      var self = this;

      var translate_val = self.threshold * (step - 1);

      self.$el.css({transform: 'translate3d(-' + translate_val + 'px, 0px, 0px)'});

    },

    /* --------------------------------------------------------------------------
     * Calculate environment
     * ------------------------------------------------------------------------*/
    calc_env: function() {

      var self = this;

      self.env = {
        window_x: $(window).width(),
        row_x: self.$el.width(),
        item_x: self.elems.$items.width()
      }

      self.threshold = ( ( self.env.window_x - self.env.row_x ) / 2 ) + self.env.item_x;

    },

    /* --------------------------------------------------------------------------
     * Flexbox Fallback
     * ------------------------------------------------------------------------*/
    flexbox_fallback: function() {

      var self = this;

      if (typeof Modernizr == 'object') { // If modernizr has been loaded

        if (!Modernizr.flexbox) { // If flexbox is not supported position items absolute

          var item_width = self.elems.$items.outerWidth(),
              left_val = 0,
              counter = 0;
              largest_item_height = 0;

          $body.css({overflowX: 'hidden'});

          self.elems.$items.each(function(){

            counter++;

            if(largest_item_height < $(this).outerHeight()) largest_item_height =  $(this).outerHeight();

            left_val = (counter > 1) ? left_val + item_width : 0;
            $(this).css({position: 'absolute', left: left_val + 'px'});

          });

          // Set the row height because of absolute positioned children
          self.$el.css({height: largest_item_height});


        }

      }

    }


  };

  $.fn.infinityRow = function(options) {
    return this.each(function() {

      var infinity_row = Object.create(infinityRow);
      infinity_row.init(options, this);

    });
  };

  /* --------------------------------------------------------------------------
   * Defaults
   * ------------------------------------------------------------------------*/
  $.fn.infinityRow.options = {

    items: 'div',
    row_backward: null,
    row_forward: null,
    resize: true,
    fallback: false,

  };

} (jQuery, window, document) );
