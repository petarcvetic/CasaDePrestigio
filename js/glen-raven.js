$(document).ready(function(){
    /**
     * init
     */

    /**
     * on click functions
     */

    /* smooth scroller (anchors) */
    $('a[href^="#"]:not([href="#"])').on('click', function(e) {
        var vpWidth = $(window).width();
        // some anchors are not links with page
        if($(this).hasClass('ignore-anchor')) {
            // keep going with event but not in this function
            return true;
        }
        if(location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var hashClicked = $(this.hash);
            hashClicked = hashClicked.length ? hashClicked : $('[name=' + this.hash.slice(1) +']');
            if(hashClicked.length) {
                var scrollTop = hashClicked.offset().top;
                if(vpWidth <= 767) {
                    scrollTop -= 69;
                }
                $('html,body').animate({
                    scrollTop: scrollTop
                }, 800);
                // set as clicked
                $('.menu-sticky [href^="#"]').closest('li').removeClass('active');
                $(this).closest('li').addClass('active');

                return false;
            }
        }
    });

    /* on scroll */
    $(window).scroll(function() {
        var sectionArray = [];
        var fromTopAbsolute = $(document).scrollTop();
        var fromTop = fromTopAbsolute;
        var vpWidth = $(window).width();
        var vpHeight = $(window).height();
        $toTop = $(this).scrollTop();
        if(vpWidth <= 767) {
            $toTop += 69;
        }
        // is there a sticky menu on the page?
        if($('.menu-sticky').length) {
            // go through each
            $.each($('.menu-sticky'), function(i, item){
                $topBar = $(item).closest('.menu-sticky-w');
                $breakPoint = parseInt($('.menu-sticky-break-point').offset().top);
                // are we past the break point for it?
                if($toTop >= $breakPoint) {
                    $('.menu-sticky-break-point').height(0);
                    $topBar.addClass('active').css({
                        'position' : 'fixed',
                        'top' : 0
                    }).slideDown();
                    // if menu top right, hide the burger
                    $('.menu-top-right li.burger').hide();
                } else {
                    $('.menu-sticky-break-point').height(0);
                    $topBar.removeClass('active').css({
                        'position' : 'static',
                        'top' : 'auto'
                    }).hide();
                    // if menu top right, show the burger
                    $('.menu-top-right li.burger').show();
                }

                // get sections and set range
                var counter = 0;
                // only grab the links that are anchors
                $anchors = $topBar.find('ul li a[href*="#"]');
                $.each($anchors, function(i, item){
                    var point = $(item).attr('href');
                    var anchor = point.replace('#', '');
                    // if point exists?
                    if($(point).length) {
                        var anchorTop = $(point).offset().top;
                        if(vpWidth <= 767) {
                            anchorTop -= 70;
                        }
                        var toNext = 0;
                        // where are we in this process?
                        if(counter > 0) {
                            sectionArray[(counter - 1)].toNext = parseInt(anchorTop - 1);
                        }
                        if(counter === ($anchors.length - 1)) {
                            toNext = $(document).height();
                        }
                        // set anchor and stuff
                        sectionArray.push({
                            anchor : anchor,
                            fromTop : anchorTop,
                            toNext : toNext
                        });
                        counter++;
                    }
                });
            });

            // they have stopped scrolling
            clearTimeout($.data(this, 'scrollTimer'));
            $.data(this, 'scrollTimer', setTimeout(function() {
                // remove all classes first
                $topBar.find('ul li').removeClass('active');
                // where are we?
                $.each(sectionArray, function(a, section){
                    // are we in this section?
                    if(fromTop >= section.fromTop && fromTop < section.toNext) {
                        $('[href="#' + section.anchor + '"]').closest('li').addClass('active');
                        var firstLiA = $('.menu-sticky ul li:nth-child(1)').offset().left;
                        var activeLiA = $('[href="#' + section.anchor + '"]').offset().left;
                        var scrollLeft = activeLiA - firstLiA;
                        // wat up!!!
                        $('.market .menu-sticky ul').animate({
                            scrollLeft: scrollLeft
                        }, 400);
                    }
                });
            }, 50));
        }

        // if menu-main-secondary
        if($('.menu-main-secondary').length && vpWidth < 992) {
            if(fromTopAbsolute >= 30) {
                $('.application .breadcrumb').hide();
            } else if(fromTopAbsolute >= 10) {
                $('.application .breadcrumb').fadeOut(400);
            } else {
                $('.application .breadcrumb').fadeIn();
            }
        }
    });

    /* region/language stuff */
    $('.selector-language').on('click', function(e){
        // is the side menu open?
        if($('.nav-utility').is(':hidden')) {
            navUtility('show');
        }

        $('.nav-utility nav').hide().removeClass('visible-xs');
        $('.social-icons').hide();
        $('#languages').fadeIn();
    });

    $('.selector-region').on('click', function(e){
        // is the side menu open?
        if($('.nav-utility').is(':hidden')) {
            navUtility('show');
        }

        $('.nav-utility nav').hide().removeClass('visible-xs');
        $('.social-icons').hide();
        $('#regions').fadeIn();
    });

    $('#regions').on('show.bs.collapse', function(e) {
        $('.region-content.in').collapse('hide');
    });

    /* PROTOTYPE */

    /**
    * on events
    */
    // on click, prevent default
    $('a[href="#"]').on('click', function(e) {
        e.preventDefault();
    });

    // on click of document, handle side nav
    $(document).on('click', function(e){
        /* check if nav utility menu needs to be closed */
        $checkTarget = $(e.target);
        if(
            (!$checkTarget.hasClass('nav-utility') && $checkTarget.parents('div.nav-utility').length === 0) &&
            $checkTarget.parent('a.show-utility').length === 0 &&
            $checkTarget.hasClass('show-utility') === false &&
            !$('.nav-utility').hasClass('fadeOutRight') &&
            $checkTarget.hasClass('selector-rl') === false
        ) {
            navUtility('hide');
        }
    });

    /* show nav utility */
    $('.show-utility').on('click', function(e){
        e.preventDefault();
        $(this).blur();
        navUtility('show');
    });

    /* hide nav utility */
    $('#hide-utility').on('click', function(e){
        e.preventDefault();
        navUtility('hide');
    });

    $(window).trigger('scroll');

});

/**
* functions (global)
*/

// nav-utility functionality
function navUtility(action) {
    var vpWidth = $(window).width();
    var fadeInClass = 'fadeInRight';
    var fadeOutClass = 'fadeOutRight';
    var fadeClasses = fadeInClass + ' ' + fadeOutClass;
    $regionLang = $('.desktop-region-language');
    $navUtility = $('.nav-utility');

    if(action == 'show') {
        // show nav utitlity
        $navUtility.removeClass(fadeClasses).addClass(fadeInClass).show();
        // hide top right nav
        $('html').addClass('no-scroll');
        if(vpWidth >= 992) {
            $regionLang.hide();
        }
    } else {
        // hide nav utitlity
        $navUtility.removeClass(fadeClasses).addClass(fadeOutClass);
        // show top right nav
        if($('.gallery-wrapper').length === 0 || $('.gallery-wrapper').is(':hidden')) {
            $('html').removeClass('no-scroll');
        }
        if(vpWidth >= 992) {
            $regionLang.show();
        }
        setTimeout(function(e){
            $navUtility.hide();
            // reset the region/language stuff
            $('.nav-utility nav.nav-region-language').addClass('visible-xs');
            $('.nav-utility nav').show();
            $('.social-icons').show();
            $('#languages, #regions').hide();
        }, 400);
    }
}