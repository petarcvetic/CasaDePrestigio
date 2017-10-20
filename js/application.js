$(document).ready(function(e){
    var goBtn = '<img src="//cdn.glenraven.net/sb2016/img/arrows/white-circle-right.svg" class="btn-go dis-none" />';
    var goBtnO, goBtnH, goBtnHW;

    /* application pages */
    if($('#scrollspy').length) {
        $('#scrollspy').scrollspy({
            offset: -150,
            onChange: function(e){
                keepPageUpdated();
            }
        });

        // arrow up click
        $('.arrow-up').on('click', function(e){
            if(parseInt($(this).css('opacity')) === 1) {
                goToPanel('prev');
            }
        });

        // arrow down click
        $('.arrow-down').on('click', function(e){
            if(parseInt($(this).css('opacity')) === 1) {
                goToPanel('next');
            }
        });

    }

    /* on slide item hover */
	$('.slide-item').hover(function(e){
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
	}, function(e){
		$slideItemO = $(this);
		$slideItemO.find('.btn-go').removeClass('animated').addClass('animated fadeOutLeft duration200');
		clearTimeout(goBtnO);
		goBtnO = setTimeout(function(){
			$slideItemO.find('.btn-go').remove();
		}, 200);
	});

    /* init trigger scroll */
    $(window).trigger('scroll');

    // on arrow click
    function goToPanel(action) {
        $activeLi = $('#scrollspy').find('li.active');
        var id = $activeLi[action]('li').find('a').attr('data-target');
        $('html,body').animate({
            scrollTop: $(id).offset().top - 40
        }, 800);
    }

    function keepPageUpdated() {
        setTimeout(function(e){
            var totalPanels = $('#scrollspy [data-target^="#"]').length;
            var indexOfActi = $('#scrollspy').find('.active').index() + 1;
            // are we at the bottom?
            if(totalPanels === indexOfActi) {
                $('.arrow-up').css('opacity', 1);
                $('.arrow-down').css('opacity', 0);
            } else if (indexOfActi === 1) {
                // we are at the top
                $('.arrow-up').css('opacity', 0);
                $('.arrow-down').css('opacity', 1);
            } else {
                // in the middle, jimmy eat world
                $('.arrow-up').css('opacity', 1);
                $('.arrow-down').css('opacity', 1);
            }
        }, 400);
    }
});