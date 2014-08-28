$(document).ready(function(){
  $('.sliderWrapper').сarouselFotoModel({
        btnNext: '.next_slider',
        btnPrev: '.previous_slider',
        visible: 2,
        rotateBy: 2,
  });
  var topArray = [];
  $.each($('.js-scroll'), function(){
    var top = $(this).offset().top;
    topArray.push(top);
  });

  $( window ).scroll(function() {
    var windowScroll = $(window).scrollTop();

    for ( var i = topArray.length - 1; i != -1; i-- ){
      if (windowScroll > topArray[i] - 100 && windowScroll + $(window).height() != $(document).height()){
        var scrolledBlock = $($('.js-scroll')[i]);
        var fullClass = scrolledBlock.attr('class');
        var regExp = /js-scroll-(\w)+/ig; 
        var positionClass = (fullClass.match(regExp))[0];
        positionClass = positionClass.replace('js-scroll-', '');
        $('.leftSiteBar .leftMenu a.btn-primary.active').toggleClass('btn-link btn-primary active');
        $('.leftSiteBar .leftMenu a.js-scroll-to-' + positionClass).toggleClass('btn-link btn-primary active');
        return false;
      }
      else{

      }
    }

    if(windowScroll + $(window).height() == $(document).height()) {
      $('.leftSiteBar .leftMenu a.btn-primary.active').toggleClass('btn-link btn-primary active');
      $('.leftSiteBar .leftMenu a:eq(-1)').toggleClass('btn-link btn-primary active');
    }
    
  });
});
  $(document).on('click','.leftSiteBar .leftMenu a', function(e) {
    e.preventDefault();
    var $this = $(this);
    if (!$this.hasClass('btn-primary')){      
      var fullClass = $(this).attr('class');
      var regExp = /js-scroll-to-(\w)+/ig; 
      var positionClass = (fullClass.match(regExp))[0];
      positionClass = positionClass.replace('js-scroll-to-', '');
      $(document.body).stop().animate({
          'scrollTop':   $('.js-scroll-'+positionClass).offset().top - 75,
      }, 400, function(){
        //$(this).toggleClass('btn-link btn-primary active');
      });
    }
    
  });
