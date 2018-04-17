windowHeight = $(window).width();
activeL = false;

function mobileCheckOS() {
	if( navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)){
		return true;
	} else {
		return false;
	}
}

function mobileVersion() {
	if (mobileCheckOS() === true) {
		$('body').css('max-height', 'none');
		$('#quiniela').css('max-height', 'none');
		containerQuiniela = $('#quiniela');
		tusDatos = containerQuiniela.find('.tus-datos');

		containerQuiniela.click(function() {
			tusDatos.each(function() {
				heightDatos = $(this).height();
				input = $(this).find('.input');
				heightInput = input.height();
				topDatos = (heightDatos / 2) - (heightInput / 2) - 5;
				centerTop = $(this).find('.center-top');
				centerTop.css({
					'margin-top': topDatos
				});
			});
		});

		containerMenu = $('#menu .movil');
		containerMenu.click(function(event) {
			$('#menu .principal').slideToggle(600, 'easeInOutCirc');
		});
	}
	if (!mobileCheckOS()) {
		subMenu();
	}
}

function subMenu() {
	$('.principal').superfish({
		delay: 600,
		animation: {
			opacity:'show',
			height:'show'
		},
		speed: 'slow',
		hoverClass: 'hover-submenu',
		autoArrows: false
	});
}

$.fn.acordionSiman = function() {
	var container = $(this);
	container.find('header').click(function() {
		if (mobileCheckOS() === false) {
			setTimeout(function() {
				$(".nano").nanoScroller();
			}, 400);
		}
		if($(this).siblings('section').css('display') == 'block'){
			container.find('section').slideUp(400);
			container.find('header').removeClass('active');
		} else {
			container.find('section').slideUp(400);
			container.find('header').removeClass('active');
			$(this).siblings('section').slideDown(400);
			$(this).addClass('active');
		}
	});
};

function quinielaOptions(containerQuiniela) {
	containerQuiniela = $('#quiniela');
	tusDatos = containerQuiniela.find('.tus-datos');
	banderaBG = containerQuiniela.find('.bandera');

	containerQuiniela.click(function() {
		tusDatos.each(function() {
			heightDatos = $(this).height();
			input = $(this).find('.input');
			heightInput = input.height();
			topDatos = (heightDatos / 2) - (heightInput / 2);
			centerTop = $(this).find('.center-top');
			centerTop.css({
				'margin-top': topDatos
			});
		});
	});

	banderaBG.each(function() {
		fondoBandera = $(this).data('bg');
		$(this).css('background-image', 'url('+fondoBandera+')');
	});
}

function menuCenter(containerMenu) {
	widthMenuBig = $(containerMenu).width() / 2 + 23;
	if (windowHeight >= 710) {
		$(containerMenu).css({
			marginLeft: '-'+widthMenuBig+'px',
			left: '50%'
		});
	}
}

function showLightBox() {
	instrucciones = $('#instrucciones');
	botonInstrucciones = $('#instrucciones-button');
	ranking = $('#ranking');
	botonRanking = $('#ranking-button');
	datos = $('#mis-datos');
	botonDatos = $('#mis-datos-button');
	premios = $('#premios');
	botonPremios = $('#premios-button');
	terminos = $('#terminos');
	botonTerminos = $('#terminos-button');
	error = $('.error');
	errorClose = $('.close-error');

	errorClose.click(function() {
		error.fadeOut();
	});

	botonInstrucciones.click(function(e) {
		e.preventDefault();
		$('body').css('overflow', 'hidden');
		$('.bg-black').fadeIn(600);
		setTimeout(function() {
			instrucciones.show().animate({
				'top': '0',
				'opacity': '1'
			}, 800, 'easeOutExpo', function() {
				$(".nano").nanoScroller();
			});
		}, 800);
		activeL = true;
	});

	botonTerminos.click(function(e) {
		e.preventDefault();
		$('body').css('overflow', 'hidden');
		$('.bg-black').fadeIn(600);
		setTimeout(function() {
			terminos.show().animate({
				'top': '0',
				'opacity': '1'
			}, 800, 'easeOutExpo', function() {
				$(".nano").nanoScroller();
			});
		}, 800);
		activeL = true;
	});

	botonDatos.click(function(e) {
		e.preventDefault();
		$('body').css('overflow', 'hidden');
		$('.bg-black').fadeIn(600);
		setTimeout(function() {
			datos.show().animate({
				'top': '0',
				'opacity': '1'
			}, 800, 'easeOutExpo', function() {
				$(".nano").nanoScroller();
			});
		}, 800);
		activeL = true;
	});

	botonPremios.click(function(e) {
		e.preventDefault();
		$('body').css('overflow', 'hidden');
		$('.bg-black').fadeIn(600);
		setTimeout(function() {
			premios.show().animate({
				'top': '0',
				'opacity': '1'
			}, 800, 'easeOutExpo', function() {
				$(".nano").nanoScroller();
			});
		}, 800);
		activeL = true;
	});

	botonRanking.click(function(e) {
		e.preventDefault();
		$('body').css('overflow', 'hidden');
		$('.bg-black').fadeIn(600);
		setTimeout(function() {
			ranking.show().animate({
				'top': '0',
				'opacity': '1'
			}, 800, 'easeOutExpo', function() {
				$(".nano").nanoScroller();
			});
		}, 800);
		activeL = true;
	});

	$('.close').click(function() {
		ranking.animate({
			'top': '-100%',
			'opacity': '0'
		}, 800, 'easeInExpo', function() {
			ranking.hide();
		});
		datos.animate({
			'top': '-300px',
			'opacity': '0'
		}, 800, 'easeInExpo', function(){
			datos.hide();
		});
		terminos.animate({
			'top': '-300px',
			'opacity': '0'
		}, 800, 'easeInExpo', function(){
			terminos.hide();
		});
		premios.animate({
			'top': '-300px',
			'opacity': '0'
		}, 800, 'easeInExpo', function(){
			premios.hide();
		});
		instrucciones.animate({
			'top': '-300px',
			'opacity': '0'
		}, 800, 'easeInExpo', function(){
			instrucciones.hide();
		});
		setTimeout(function() {
			$('.bg-black').fadeOut(600);
			$('body').css('overflow', 'auto');
		}, 800);
		activeL = false;
	});
}

$(function() {
	menuCenter('#menu');
	showLightBox();
	quinielaOptions('#quiniela');
	mobileVersion();
	$(".nano").nanoScroller();
	$('.acordion-siman').acordionSiman();
});

$(window).resize(function() {
	menuCenter();
});

$(document).bind('keydown',function(e){
	ranking = $('#ranking');
	instrucciones = $('#instrucciones');
	datos = $('#mis-datos');
	terminos = $('#terminos');
	premios = $('#premios');
	if ( e.which === 27 && activeL === true ) {
		ranking.animate({
			'top': '-100%',
			'opacity': '0'
		}, 800, 'easeInExpo', function() {
			ranking.hide();
		});
		datos.animate({
			'top': '-300px',
			'opacity': '0'
		}, 800, 'easeInExpo', function(){
			datos.hide();
		});
		terminos.animate({
			'top': '-300px',
			'opacity': '0'
		}, 800, 'easeInExpo', function(){
			terminos.hide();
		});
		premios.animate({
			'top': '-300px',
			'opacity': '0'
		}, 800, 'easeInExpo', function(){
			premios.hide();
		});
		instrucciones.animate({
			'top': '-300px',
			'opacity': '0'
		}, 800, 'easeInExpo', function(){
			instrucciones.hide();
		});
		setTimeout(function() {
			$('.bg-black').fadeOut(600);
		}, 800);
		activeL = false;
	}
});