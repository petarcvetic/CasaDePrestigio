$(document).ready(function(){
    // js vars
    var goBtn = '<img src="//cdn.glenraven.net/sb2016/img/arrows/white-circle-right.svg" class="btn-go dis-none" />';
    var goBtnO, goBtnH, goBtnHW;

    // jquery vars
    $wrapper = $('#wrapper');

    /*
     * init
     */
    // this handles page load, if a specific slide is set, just go straight to that slide.. don't scroll to it.
    if(window.location.hash) {
        var hash = window.location.hash;
        var anchor = hash.replace('#', '');
        // no anchor set?
        if(!anchor) {
            defaultSlide();
        } else {
            // is it a slide item?
            if(
                $wrapper.find('[data-anchor="' + anchor + '"]').length
                && $wrapper.find('[data-anchor="' + anchor + '"]').hasClass('section')
            ) {
                $wrapper.find('[data-anchor="' + anchor + '"]').addClass('active');
                changeColorAndMenu(anchor, true);
            } else {
                // if hash doesn't exist.. remove hash text
                window.location.hash = '';
                defaultSlide();
            }
        }
    } else {
        defaultSlide();
    }

    // on load, handle background image size
    handleBackgroundImage('current');

    /* go up a slide */
    $('.arrow-up').on('click', function(e){
        e.preventDefault();
        $.fn.fullpage.moveSectionUp();
    });

    /* go down a slide */
    $('.arrow-down').on('click', function(e){
        e.preventDefault();
        $.fn.fullpage.moveSectionDown();
    });

    /* on slide item hover */
    $('.slide-item').hover(function(e){
        var vpWidth = $(window).width();
        if(vpWidth > 458) {
            $slideItemH = $(this);
            clearTimeout(goBtnHW);
            goBtnHW = setTimeout(function(){
                var currentLink = $slideItemH.attr('href');
                $slideItemH.append($(goBtn).attr('href', currentLink));
                clearTimeout(goBtnH);
                goBtnH = setTimeout(function(){
                    $slideItemH.find('.btn-go').removeClass('dis-none').addClass('animated fadeInLeft duration200');
                }, 10);
            }, 200);
        }
    }, function(e){
        var vpWidth = $(window).width();
        if(vpWidth > 458) {
            $slideItemO = $(this);
            $slideItemO.find('.btn-go').removeClass('animated').addClass('animated fadeOutLeft duration200');
            clearTimeout(goBtnO);
            goBtnO = setTimeout(function(){
                $slideItemO.find('.btn-go').remove();
            }, 200);
        }
    });

    // on section link click
    $('.section-link').on('click', function(e){
        e.preventDefault();
        $slideItem = $(this).closest('li').find('.slide-item:first');
        $('.slide-item').each(function(i, item){
            if($(item).attr('data-target') == $slideItem.attr('data-target')) {
                $.fn.fullpage.silentMoveTo(i + 1);
                changeColorAndMenu($slideItem.attr('data-target').replace('#', ''), false);

                return false;
            }
        });
    });

    $(window).on('resize', function(e) {
        handleBackgroundImage('current');
    }).resize();

    /**
     * functions
     */

     /* if something is jacked, go to default slide */
     function defaultSlide() {
        //  console.log('defaultSlide()');
        changeColorAndMenu('textiles-upholstery', true);
     }

     /* change template color and menu */
     function changeColorAndMenu(index, first) {
        //  console.log('changeColorAndMenu()');
         // is int or nah
         var changeClass = origClass = (index === parseInt(index, 10)) ? $('.section:nth-child(' + index + ')').attr('data-anchor') : index;

         // first page load?
         if(first) {
             changeClass += ' no-transition';
         }

        // reset and set the things
        $('.nav-block').removeClass().addClass('nav-block ' + changeClass);
        $('.nav.nav-pills').removeClass().addClass('nav nav-pills ' + changeClass);
        $('.nav-utility').removeClass().addClass('nav-utility duration400 animated fadeOutRight ' + changeClass);
        $('#hide-utility').removeClass().addClass(changeClass);

        // update the menu
        $nav = $('.nav-block nav');
        // reset active classes
        $nav.find('ul.nav li').removeClass('active animated fadeIn duration400');
        $nav.find('ul.nav ul li').removeClass();
        // set active classes
        $currentLink = $nav.find('a[data-target="#' + origClass + '"]');
        $currentLi = $currentLink.closest('li');
        $currentParentUl = $currentLink.closest('ul');
        $currentParentLi = $currentParentUl.closest('li');

        // ohh lala
        if(first) {
            // console.log('-current parent li - active add1 -');
            $currentParentLi.addClass('active');
        } else {
            // console.log('-current parent li - active add2 -');
            $currentParentLi.addClass('active duration400 animated fadeIn');
        }

        // now for the next prevs of li's in section
        // (this looks bad, make it better.. pop it into a function or something, come on)
        // blanket the li's first
        $currentLi.closest('ul').find('li').removeClass().addClass('off-4');
        // console.log('-current li - active add2 -');
        $currentLi.removeClass().addClass('active');
        $currentLi.prev('li').removeClass().addClass('off-1');
        $currentLi.next('li').removeClass().addClass('off-1');
        $currentLi.prev('li').prev('li').removeClass().addClass('off-2');
        $currentLi.next('li').next('li').removeClass().addClass('off-2');
        $currentLi.prev('li').prev('li').prev('li').removeClass().addClass('off-3');
        $currentLi.next('li').next('li').next('li').removeClass().addClass('off-3');
        // mobile only (usability)
        var vpWidth = $(window).width();
        if(vpWidth <= 768) {
            // unset
            $nav.find('ul.nav li > a').removeClass('active');
            $nav.find('ul.nav li > a img').remove();
            // add class active and button for mobile
            var currentLink = $currentLi.find('a').attr('href');
            $currentLi.find('a').addClass('active').append($(goBtn).attr('href', currentLink));
            $currentLi.find('.btn-go').removeClass('dis-none').addClass('animated fadeInLeft duration200');
        }
    }

    function handleBackgroundImage(slideIndex) {
        // do we need to size the image before it shows in the viewport?            
        if(slideIndex === parseInt(slideIndex, 10)) {
            $bg = $('#wrapper .section img[data-index="' + slideIndex + '"]');
        } else{
            $bg = $('#wrapper .section.active img');
        }

        var theWindow = $(window);
        var aspectRatio = $bg.width() / $bg.height();

        if((theWindow.width() / theWindow.height()) < aspectRatio) {
            $bg.removeClass('full-width').addClass('full-height');
        } else {
            $bg.removeClass('full-height').addClass('full-width');
        }
    }

    /* init fullpage plugin */
    var firstTimeLoad = true;
    $wrapper.fullpage({
        // autoScrolling: true,
        // css3: true,
        easingcss3: 'cubic-bezier(0.4, 0, 0.2, 1)',
        scrollingSpeed: 950,
        normalScrollElements: '.nav-utility',
        // touchSensitivity: 25,
        // normalScrollElementTouchThreshold: 1000,
        // recordHistory: false,
        // scrollDelay: 1000,
        onLeave: function(index, nextIndex, direction){
            // console.log('-------+++-+++-------');
            // console.log('-------++---++-------');
            // console.log('-------+++-+++-------');
            // console.log('-------onLeave-------');
            // now change the complementary colors..
            changeColorAndMenu(nextIndex, false);
            navUtility('hide');
            handleBackgroundImage(nextIndex);
        },
        onSlideLeave: function(anchorLink, index, slideIndex, direction, nextSlideIndex){
            // console.log('-------onSlideLeave-------');
        },
        afterRender: function(){
            // console.log('-------afterRender-------');
        },
        afterResize: function(){
            // console.log('-------afterResize-------');
            handleBackgroundImage('current');
            // console.log('------------------------------------');
        },
        afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex){
            // console.log('-------afterSlideLoad-------');
        },
        afterLoad: function(anchorLink, index){
            // console.log('-------afterLoad-------');
            handleBackgroundImage('current');
            // is this the first time?
            if(firstTimeLoad) {
                // loop through all slide sections
                $.each($('.section.fp-section'), function(i, section){
                    // get height of each section (all the same)
                    var sectionHeight = $(section).height();
                    // add 15px because something is happening on render
                    $(section).height(sectionHeight + 15);
                    $(section).find('.fp-tableCell').height(sectionHeight + 15);
                });
                // don't come back
                firstTimeLoad = false;
            }

            // if this is the top slide.. no need for a up arrow
            if(index === 1) {
                $('.arrow-up').css('opacity', 0);
                if($('.arrow-down img').is(':hidden')){
                    $('.arrow-down').css('opacity', 1);
                }
            } else {
                if($('.arrow-up img').is(':hidden')){
                    $('.arrow-up').css('opacity', 1);
                }
                // is this the last slide?
                if(index === $('.section').length) {
                    $('.arrow-down').css('opacity', 0);
                } else {
                    if($('.arrow-down img').is(':hidden')){
                        $('.arrow-down').css('opacity', 1);
                    }
                }
            }

            /* init trigger resize */
            $(window).trigger('resize');
            setTimeout(function(e){
                $(window).trigger('resize');
            }, 800);
        }
    });

    $("#main-nav").swipe({
        swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
            if(direction === 'up') {
                $.fn.fullpage.moveSectionDown();
            } else if(direction === 'down') {
                $.fn.fullpage.moveSectionUp();
            }
        },
        threshold: 2,
        fingers: 'all'
    });

    window.blockMenuHeaderScroll = false;
    $(window).on('touchstart', function(e) {
        if ($('.nav-utility').is(':hidden')) {
            blockMenuHeaderScroll = true;
        }
    });
    $(window).on('touchend', function(e) {
        blockMenuHeaderScroll = false;
    });
    $(window).on('touchmove', function(e) {
        if (blockMenuHeaderScroll) {
            e.preventDefault();
        }
    });
});



