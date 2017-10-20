/**
 * viewport.js
 *
 * a glen raven plugin for viewport help
 *
 */
$(document).ready(function(){

    // init on page load
    resizeHandler();

    // on any viewport resize, do it again
    $(window).on('resize', function(e) {
        resizeHandler();
    }).resize();

    // handle all the resize
    function resizeHandler() {
        $navBlock = $('.nav-block');
        $rigBlock = $('.block-right');
        var vpHeigh = $(window).height();
        var vpWidth = $(window).width();
        var vpMargi = 0;
        var navHeig = $navBlock.height();
        var navWidt = Math.ceil(vpWidth * 0.777);
        $fixedCon = $('.container-fixed');
        $fixedCol = $fixedCon.find('.menu-main-wrapper');

        // heros
        if($('.page-hero img').length) {
            var marginTopSpacer = 64;
            // prototype the hero
            // var eighty = Math.ceil(vpWidth * 0.8);
            // $('.page-hero img').width(eighty);
            // OR this way
            if(vpWidth >= 768) {
                $('.page-hero img').height(vpHeigh + 1);
                // has the image hit it's width?
                if(vpWidth <= $('.page-hero img').width()) {
                    $('.page-hero img').height('auto');
                }
                // prototype the white panel
                $('.panel-white').height((vpHeigh) - (marginTopSpacer * 2));
            } else {
                $('.page-hero img').height('auto');
                $('.panel-white').height('auto');
            }

            // set min-height
            $('.min-height-page-hero').height($('.page-hero img').height());
        }

        // breakpoints
        if(vpWidth >= 768 && vpWidth < 992) {
            vpMargi = 35;
        } else if(vpWidth >= 992) {
            vpMargi = 70;
        }

        if(vpWidth >= 768) {
            navWidt = Math.ceil((vpWidth / 2) - vpMargi);
        }

        // if secondary menu
        if($navBlock.hasClass('menu-main-secondary')) {
            // round up number
            navWidt = Math.ceil(vpWidth * 0.333);
            if($('.scrolling-panel').length) {
                // do some scrolling-panel work
                var panelWi = Math.ceil($('.scrolling-panel').width());
                $('.menu-top-right, .greyed-out, .nav-directional').width(panelWi);
            }
        }

        // set nav-block height
        var nbHeigh = Math.ceil(vpHeigh - (vpMargi * 2));
        // menu main
        $navBlock.css({
            height: nbHeigh,
            left: vpMargi,
            position: 'fixed',
            top: vpMargi,
            width: navWidt
        });

        // only if
        if($navBlock.hasClass('menu-main-secondary') && vpWidth < 992) {
            // round up number
            var mainNavWidt = Math.ceil(vpWidth * 0.666);
            // menu main
            $navBlock.css({
                height: vpHeigh,
                left: 0,
                position: 'fixed',
                top: 0,
                width: mainNavWidt
            });
        }

        // block right visible?
        if($rigBlock.length) {
            var vpMargiRB = 0;
            // only if it's not mobile
            if(vpWidth >= 768) {
                vpMargiRB = 128;
                $rigBlock.css({
                    height: Math.ceil(vpHeigh - vpMargiRB)
                });
            }
        }

        // height -_-
        // go auto height
        if(nbHeigh < 500) {
            setTimeout(function(e){
                $('.nav-block > nav > .nav > li').addClass('autoHeight');
            }, 100);
        } else {
            $('.nav-block > nav > .nav > li').removeClass('autoHeight');
        }
    }

    /* init trigger resize */
    $(window).trigger('resize');
});