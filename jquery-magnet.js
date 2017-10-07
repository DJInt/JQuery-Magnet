/**
 * Developed By Jerry Tannous
 * jerry.tannous@gmail.com
 * Version 1.0.1
 */
(function ( $ ) {
    $.fn.magnet = function( options ) {

        var settings = $.extend({
            after: null
        }, options );

        var $anchor;
        var $after = null;
        var isInTop = false;
        var $elem = this;
        var oldCssPosition;
        var oldTop;
        var fixedWidth;
        var oldWidth;

        $(document).ready(function(){
            init();
            adjustMagnetPosition(true);
        });

        $(window).on('scroll', function(){
            adjustMagnetPosition(false);
        });

        return this;

        function init()
        {
            // Insert Anchor
            $anchor = $("<div class='jquery-magnet-anchor'></div>");
            $anchor.insertBefore($elem);

            fixedWidth = $elem.outerWidth();

            if(settings.after !== null)
                $after = $(settings.after);
        }

        function adjustMagnetPosition(force)
        {
            var offset = 0;
            if($after !== null && $after !== 'undefined')
                offset = $after.outerHeight();

            var scrollTop     = $(window).scrollTop(),
                elementOffset = $anchor.offset().top,
                distance      = (elementOffset - scrollTop) - offset;


            if(distance <= 0)
            {
                if(isInTop === false || force === true) { // We should stick to top
                    isInTop = true;
                    oldWidth = $elem.outerWidth();
                    $anchor.css({'height': $elem.outerHeight()});
                    oldCssPosition = $elem.css('position');
                    oldTop = $elem.css('top');
                    oldWidth = $elem.css('width');
                    fixedWidth = $elem.outerWidth();
                    $elem.css({'position': 'fixed', 'top': offset, 'width': fixedWidth});
                }
            }
            else
            {
                if(isInTop === true || force === true) { // We should restore back to normal
                    isInTop = false;
                    $anchor.css({'height': '0'});
                    $elem.css({'position': oldCssPosition, 'top': oldTop, 'width': oldWidth});
                }
            }
        }

    };

}( jQuery ));