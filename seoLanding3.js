$(document).ready(function(){

    $( "#response" ).submit(function() {
      $('#text').val($('#text').val() + $('#site').val());
    });

    $( window ).scroll(function() {
        var windowScroll = $(window).scrollTop();
        if (windowScroll > 40){
            $('.infoNovosib').addClass('scroll');
            $('.infoNovosib .contacts').slideDown();
        }
        else{
            $('.infoNovosib').removeClass('scroll');
            $('.infoNovosib .contacts').stop().slideUp();
        }
    });

    $('#response input[type="submit"]').on('click', function(e){
        e.preventDefault();
        $.ajax({
            type : 'post',
            url : '',
            data : {
                site : $('#site').val(),
                name : $('#name').val(),
                email : $('#email').val(),
                text : $('#text').val()
            }
        }).done(function(response){
            $('.questReady').css({'top' : $(window).scrollTop() + 1000}).show();
            $('#site').val('');
            $('#name').val('');
            $('#email').val('');
            $('#text').val('');
            setTimeout(hideQuestReady, 1500);
        });
    });

    $('.questReady .closeWindow').on('click', function(){
        hideQuestReady();
    });

});

function hideQuestReady() {
    $('.questReady').animate({
        opacity : "hide"
    }, 700);
}


(function($){
    $.fn.сarouselFotoModel = function(options) {
        var settings = {
            visible: 1,
            rotateBy: 1,
            speed: 500,
            btnNext: null,
            btnPrev: null,
            auto: null,
            backSlide: false,
            direction: "horizontally",
            menu : false
        };      
        return this.each(function() {
            if (options) {
                $.extend(settings, options);
            }
            var $this = $(this);
            var $carousel = $this.children(':first');
            
            if (settings.direction == 'horizontally'){
                var itemSize = $carousel.children().outerWidth();
                var typeSize = 'width';
                var typeBegin ='left';
            }
            else if(settings.direction == 'vertically'){
                var itemSize = $carousel.children().outerHeight();
                var typeSize = 'height';
                var typeBegin ='top';
            }

            var itemsTotal = $carousel.children().length;
            var running = false;
            var intID = null;

            $this.css({
                'position': 'relative',
                'overflow': 'hidden'
            });

            $this.css(typeSize, settings.visible * itemSize + 'px');
            
            $carousel.css({'position': 'relative'});
            $carousel.css(typeBegin, 0);
            $carousel.css(typeSize, 9999 + 'px');
            
            function slide(dir, i) {
                var direction = !dir ? -1 : 1;
                var leftIndent = 0;             
                for (var j = 0; j<i; j++){
                    if (!running) {
                        running = true;                 
                        if (intID) {
                            window.clearInterval(intID);
                        }

                        if (!dir) {
                            $carousel.children(':last').after($carousel.children().slice(0, settings.rotateBy).clone(true));
                        } else {
                            $carousel.children(':first').before($carousel.children().slice(itemsTotal - settings.rotateBy, itemsTotal).clone(true));
                            $carousel.css(typeBegin, -itemSize * settings.rotateBy + 'px');
                        }

                        leftIndent = parseInt($carousel.css(typeBegin)) + (itemSize * settings.rotateBy * direction);
                        if (settings.direction == 'horizontally'){
                            var obj = {"left": leftIndent};
                        }
                        else if (settings.direction == 'vertically'){
                            var obj = {"top": leftIndent};
                        }

                        $carousel.animate(obj, {queue: false, duration: settings.speed, complete: function() {
                            //$carousel.children().addClass('active');
                            //$carousel.children(':first').addClass('active');
                            if (!dir) {
                                $carousel.children().slice(0, settings.rotateBy).remove();
                                $carousel.css(typeBegin, 0);
                            } else {
                                $carousel.children().slice(itemsTotal, itemsTotal + settings.rotateBy).remove();
                            }

                            if (settings.menu){
                                $carousel.children().removeClass('active');
                                var classBlock = $carousel.children().slice(0, settings.rotateBy).addClass('active').attr('class');
                                classBlock = classBlock.match(/company-(\d)*/);
                                console.log(classBlock[0]);
                                $(settings.menu + ' a.active').removeClass('active');
                                $(settings.menu + ' a.' + classBlock).addClass('active');
                            }

                            if (settings.auto) {
                                intID = window.setInterval(function() { slide(settings.backslide); }, settings.auto);
                            }
                            running = false;
                        }});
                    }
                }
                return false;
            }

            $(settings.menu).find('a').click(function(){
                if (!$(this).hasClass('active')){
                    var oldActive = $(settings.menu + ' a.active').attr('class');
                    $(settings.menu + ' a.active').removeClass('active');
                    var newActive = $(this).attr('class');
                    oldActive = oldActive.replace('active', '');
                    oldActive = oldActive.replace('company-', '');
                    newActive = newActive.replace('company-', '');
                    var abc = newActive - oldActive;
                    if (abc < 0 ){
                        slide(true,Math.abs(abc));
                    }
                    else{
                        slide(false, Math.abs(abc));
                    }
                }
            });

            $(settings.btnNext).click(function() {
                return slide(false, 1);
            });
            $(settings.btnPrev).click(function() {
                return slide(true, 1);
            });

            if (settings.auto) {
                intID = window.setInterval(function() { slide(settings.backslide); }, settings.auto);
            }
        });
    };
})(jQuery);