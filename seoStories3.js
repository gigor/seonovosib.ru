$(document).ready(function(){

	setTimeout(scrollHash, 200);
    $( window ).scroll(function() {

    	var windowScroll = $(window).scrollTop();

    	if (windowScroll > $('.sliderWrapper').offset().top - 50){
    		$('.headSlider').addClass('fixed');
    	}
    	else{
    		$('.headSlider').removeClass('fixed');
    	}

    });
    var $this = $('.leftMenu ul li a.active');
    var slider = $this.data('sliderlink');
	var company = $this.data('namecompany');
    $(".sliderWrapper .slider .historyWrapper[data-slider=" + slider + "] .table").append(createTable(table[company]));

    $('.leftMenu ul li a').on('click', function(e){
		e.preventDefault();
		var $this = $(this);
		if ($('.headSlider').hasClass('fixed')) var offset = 40;
		else var offset = 60;
		
		$("body").animate({scrollTop:$('.sliderWrapper').offset().top - offset}, 300, function(){
			$('.headSlider h1 .company').text($this.text());
			$('.leftMenu ul li a.btn-primary.active').toggleClass('btn-primary active btn-link');
			$this.toggleClass('btn-primary active btn-link');

			var slider = $this.data('sliderlink');
			var company = $this.data('namecompany');
			if ($(".sliderWrapper .slider .historyWrapper[data-slider=" + slider + "] .table .rows").length == 0)
				$(".sliderWrapper .slider .historyWrapper[data-slider=" + slider + "] .table").append(createTable(table[company]));

			$(".sliderWrapper .slider .historyWrapper[data-slider=" + slider + "]").animate(
				{'left' :  '0'},
				500,
				function(){
					$('.slider .historyWrapper.active').css({'left':'100%'}).removeClass('active');
					$(this).css({'left' : '100%'}).addClass('active');

					if ($('.leftMenu ul li a.btn-primary.active').parent().prev().length != 0)	var prev = $('.leftMenu ul li a.btn-primary.active').parent().prev();
					else var prev = $('.leftMenu ul li:last-of-type');
					if ($('.leftMenu ul li a.btn-primary.active').parent().next().length != 0)	var next = $('.leftMenu ul li a.btn-primary.active').parent().next();
					else var next = $('.leftMenu ul li:first-of-type');
					
					$('.bottomSlider .next_slider p.name').text(next.text());
					$('.bottomSlider .previous_slider p.name').text(prev.text());
				}
			);
		});
    });
	
	var list = $('.leftMenu ul li');
	var length =  $('.leftMenu ul li').length;
    $('.controlsHistory div').on('click', function(e){

    	var current = $('.leftMenu ul li a.btn-primary.active').parent();
		var index = list.index(current);

		if ($(e.target).hasClass('previous_slider') || $(e.target).parent().hasClass('previous_slider')){
			if(index != 0) $('.leftMenu ul li:eq(' + (index-1) + ') a').trigger('click');
			else $('.leftMenu ul li:last-of-type a').trigger('click');
		}
		else if ($(e.target).hasClass('next_slider') || $(e.target).parent().hasClass('next_slider')){
			if(index != ( length - 1 ) ) $('.leftMenu ul li:eq(' + (index+1) + ') a').trigger('click');
			else $('.leftMenu ul li:first-of-type a').trigger('click');
		}


    });

});


function createTable(obj) {
	var rows = $('<div/>',{
		class : 'rows',
	});

	$.each(obj, function(){
		var row = $('<div/>', {
			class : 'row',
			html : '<div class="cell keyWord">«' + this[0] + '»</div> <div class="cell date dateBefore">' + this[1] + '</div> <div class="cell date">' + this[2] + '</div> <div class="cell date">' + this[3] + '</div> <div class="cell dateNow">' + this[4] + ' <a target="_blank" href="http://yandex.ru/yandsearch?lr=65&text=' + this[0] + '"><span style="color:red;">Я</span> <i class="fa fa-external-link"></i></a></div>'
		}).appendTo(rows);
	});
	return rows;
}

function scrollHash(){
	var hash = getHashUrl();
    if (hash){
        $('.leftMenu ul li a[data-namecompany=' + hash + ']').trigger('click');
    }
}

function getHashUrl(){
    if(window.location.hash !== ''){
        var data = window.location.hash.replace('#','');
        return data;
    }
    else{
        return false;
    }
}
var table = {
	daina : [
		['домашняя одежда оптом',74,24,7,1],
		['велюровый халат',57,22,1,1],
		['одежда для дома оптом',86,39,14,2],
		['домашний трикотаж оптом',49,20,9,1],
		['трикотажные халаты',68,28,18, 1],
		['ночные сорочки от производителя',64,30,15,3],
		['футболки женские',82,49,26,1],
		['туники женские',54,31,11,2],
		['футболки от производителя',60,29,12,1],
		['домашние брюки',53,25,8,2]
	],
	proopt : [
		['куртки мужские большой размер',87,46,11,1],
		['мужская верхняя одежда',86,50,15,2],
		['мужские пальто оптом',95,66,17,1],
		['мужские ветровки оптом',99,41,12,1],
		['куртки демисезонные женские',112,45,22,1],
		['зимние куртки больших размеров',87,36,5,2],
		['мужская одежда оптом',84,62,19,4],
		['демисезонное пальто оптом',83,44,9,2],
		['оптом демисезонные куртки',96,52,20,2],
		['куртки больших размеров',92,56,16,2]
	],
	markcollection : [
		['летние мужские кофты','-',51,26,1],
		['мужские кофты оптом','-',56,18,2],
		['мужские молодежные кофты','-',49,17,4],
		['мужская одежда лето','-',63,21,6],
		['мужская одежда лен','-',70,25,6],
		['шерстяной джемпер','-',52,19,1],
		['свитер оптом','-',58,19,3],
		['джемпер ангора','-',72,27,1],
		['мужская одежда осень','-',76,21,6],
		['шерстяные изделия оптом','-',80,24,5]
	],
	funilai : [
		['одежда от производителей из Китая',63,44,19,1],
		['домашняя одежда из Китая',82,53,23,1],
		['трикотаж оптом из Китая',67,27,9,2],
		['женские футболки оптом',80,39,25,3],
		['Женские лосины',98,48,17,2],
		['купить оптом женские кофты',87,54,32,6],
		['женское нижнее белье купить',79,34,15,4],
		['нижнее белье из китая',101,41,20,2],
		['шорты для дома',85,38,15,2],
		['мужская домашняя одежда оптом',92,32,11,3]
	],
	ulansk : [
		['купить детскую одежду оптом',97,59,27,2],
		['купить одежду оптом',85,49,30,1],
		['джинсы для детей',63,31,15,1],
		['футболки детские',68,39,26,3],
		['детская толстовка',80,51,23,2],
		['зимняя одежда для новорожденных',73,43,22,1],
		['детская демисезонная одежда',93,62,36,2],
		['одежда из турции в розницу',74,41,12,2],
		['детская одежда недорого',103,72,35,3],
		['футболки для девочек',95,57,24,1]
	],
	mrbelt : [
		['купить ремни оптом',53,28,12,4],
		['купить мужские ремни, оптом',42,15,1,1],
		['кожаный ремень купить',67,21,12,2],
		['купить ремень из кожи',45,17,2,1],
		['ремни оптом',41,10,4,3],
		['ремни оптом в новосибирске',35,15,9,2],
		['мужские ремни кожа',40,11,4,1],
		['ремни кожаные брендовые',59,23,3,1],
		['ремни belt',63,16,8,1],
		['купить кожаные ремни оптом',47,19,3,1]
	],
	nikol : [
		['женский трикотаж',90,47,18,1],
		['трикотаж оптом от производителя',97,52,12,2],
		['женская одежда от производителя',101,59,8,3],
		['блузки от производителя',85,50,11,1],
		['платья оптом новосибирск',89,63,9,1],
		['производство блузок',138,92,26,1],
		['оптом блузки',79,55,6,1],
		['водолазки купить',143,86,32,1],
		['платья оптом',63,27,10,3],
		['женские платья',74,36,12,2]
	],
}