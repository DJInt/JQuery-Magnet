/**
 * Developed By Jerry Tannous
 * jerry.tannous@gmail.com
 * Version 1.0.3
 */
(function ( $ ) {
    $.fn.magnet = function( options ) {

        var settings = $.extend({
            after: null
        }, options );

        var ogState = {
            style: null,
            width: null,
        };

        var $anchor = null;
        var $after = null;
        var isInTop = false;
        var $elem = this;

        $(document).ready(function(){
            init();
            createAnchor();
            adjustMagnetPosition(true);
        });

        $(window).on('resize', function(){
            $elem.prop('style', ogState.style);
            saveOGState();
            adjustMagnetPosition(true);
        });

        $(window).on('scroll', function(){
            adjustMagnetPosition(false);
        });

        return this;

        function createAnchor()
        {
            // Insert Anchor
            $anchor = $("<div class='jquery-magnet-anchor'></div>");
            $anchor.insertBefore($elem);
        }

        function saveOGState()
        {
            ogState.width = $elem.outerWidth();
            ogState.style = $elem.prop('style');
        }

        function init()
        {
            saveOGState();

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
                    saveOGState();
                    $anchor.css({'height': $elem.outerHeight()});
                    $elem.css({'position': 'fixed', 'top': offset, 'width': ogState.width});
                }
            }
            else
            {
                if(isInTop === true || force === true) { // We should restore back to normal
                    isInTop = false;
                    $anchor.css({'height': '0'});
                    $elem.prop('style', ogState.style);
                }
            }
        }

    };

}( jQuery ));