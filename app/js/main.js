$(document).ready(function() {

	//scrollMenu

	var prev = 0;
	var $window = $(window);
	var header = $('.header');

	$window.on('scroll', function(){
	  var scrollTop = $window.scrollTop();
	  header.toggleClass('header_hidden', scrollTop > prev);
	  prev = scrollTop;
	});

	//carts
	var cart = (function() {
		var products = [];
		var amountArr, block, amountBtn, submitBtn, hiddenForm, innerVal;

		return {
			amountActionClick: function() {
				amountBtn.on('click', function(event) {
					event.preventDefault();
					var field  =  $(this).parent().parent().find('.price-box__amount');
					var fieldType = field.data('name');
					var fieldValue = parseInt(field.val());
					var  amountType =  $(this).data('amount');
					var price = $(this).parent().parent().parent().parent().parent().find('.price-box__price span');
					var priceVal = parseInt(price.text());
					var discount = $(this).parent().parent().parent().parent().parent().find('.price-box__discount');
					var discountAmount = $(this).parent().parent().parent().parent().parent().find('.price-box__discount i');
					var discountVal = parseInt(discountAmount.text());
					var btnPlus = $(this).parent().find('.amount-plus');
					var btnMinus = $(this).parent().find('.amount-minus');


					if(amountType === 'minus' && fieldType === 'choice') {
						fieldValue  -= 1;
						if(fieldValue < 3) {
							fieldValue = 3;
						}
						if(fieldValue === 3) {
							priceVal = 290;
							discount.removeClass('price-box__discount_active');
							btnMinus.removeClass('amount-btn_active');
						}
						if(fieldValue === 4) {
							priceVal -= 50;
							discountVal = 35;
						}
						if(fieldValue === 5) {
							priceVal -= 40;
							discountVal = 80;
							btnPlus.removeClass('amount-btn_nonactive');
						}
					}
					if(amountType === 'plus' && fieldType === 'choice') {
						fieldValue  += 1;
						if(fieldValue === 4) {
							priceVal += 60;
							discount.addClass('price-box__discount_active');
							btnMinus.addClass('amount-btn_active');
						}
						if(fieldValue === 5) {
							priceVal += 50;
							discountVal = 80;
						}
						if(fieldValue === 6) {
							priceVal += 40;
							discountVal = 135;
							btnPlus.addClass('amount-btn_nonactive');
						}
						if(fieldValue > 6) {
							fieldValue = 6;
						}
					}
					if(amountType === 'minus' && fieldType === 'branding') {
						fieldValue  -= 1;
						if(fieldValue < 6) {
							fieldValue = 6;
						}
						if(fieldValue === 6) {
							priceVal = 690;
							discountVal = 150;
							btnMinus.removeClass('amount-btn_active-blue');
						}
						if(fieldValue === 7) {
							priceVal -= 50;
							discountVal = 175;
						}
						if(fieldValue === 8) {
							priceVal -= 40;
							discountVal = 220;
							btnPlus.removeClass('amount-btn_nonactive');
						}
					}
					if(amountType === 'plus' && fieldType === 'branding') {
						fieldValue  += 1;
						if(fieldValue === 7) {
							priceVal += 60;
							discountVal = 175;
							btnMinus.addClass('amount-btn_active-blue');
						}
						if(fieldValue === 8) {
							priceVal += 50;
							discountVal = 220;
						}
						if(fieldValue === 9) {
							priceVal += 40;
							discountVal = 275;
							btnPlus.addClass('amount-btn_nonactive');
						}
						if(fieldValue > 9) {
							fieldValue = 9;
						}
					}

					price.text(priceVal);
					discountAmount.text(discountVal);
					field.val(fieldValue);

				})
			},
			init: function(setblock) {
				block = $(setblock);
				amountBtn = block.find('.amount-btn');
				this.amountActionClick();
			}
		}
	})();

	cart.init('.amount');

	////PageScrollToID
	var headerHeight = $('.header').height();
	$("a[href*='#']").mPageScroll2id({
		offset: headerHeight
	});

	$('.about-carousel').owlCarousel({
		loop:true,
		margin: 30,
		responsiveClass:true,
		autoplay: true,
		autoplayTimeout: 2000,
		autoplayHoverPause: true,
		autoWidth: true,
		nav:false,
		navText: '',
		responsive:{
			0:{
				items:1,
				center: false,
				margin: 10
			},
			600:{
				items:2,
				center: true
			},
			800:{
				items:3,
				center: false,
				autoWidth: true,
			},
			1170:{
				items:4,
				autoWidth: true,
				center: true,
				margin: 20,
				nav:true,
			},
			1366:{
				items:4,
				autoWidth: false,
				margin: 20,
				nav:true,
			},
			1600:{
				items:5,
				autoWidth: false,
				margin: 20,
				nav:true,
			},
			1905:{
				items:6,
				margin: 20,
				nav:true,
			}
		}
	})

	$('.projects-slider1').owlCarousel({
		margin:10,
		responsiveClass:true,
		dots: false,
		onDragged: findPag,
		next: findPag,
		URLhashListener:true,
		startPosition: 'URLHash',
		nav: true,
		navText: '',
		responsive:{
			0:{
				items:1,
				nav: false
			},
			600:{
				items:1,
			},
			1000:{
				items:1,
			}
		}
	})
	//ImgIntoPag

	var prSliderImg = $('.projects-slider1 .owl-item').find('img').clone();
	var prSliderPag = $('.projects-pag__item');

	prSliderPag.on('click', function() {
		prSliderPag.removeClass('projects-pag__item_active');
		$(this).addClass('projects-pag__item_active');
	})

	for(var i = 0; i < prSliderPag.length; i++) {
		prSliderPag[i].append(prSliderImg[i])
	}

	var prSliderOwlItem = $('.projects-slider1 .owl-item');
	function findPag(event) {
		var item      = event.item.index;     // Position of the current item
		prSliderPag.each(function(i, e) {
			if(item === i) {
				prSliderPag.removeClass('projects-pag__item_active')
				$(e).addClass('projects-pag__item_active')
			}
		})
	}


	$('.clients-slider').owlCarousel({
		center: true,
		loop:true,
		margin:35,
		responsiveClass:true,
		autoWidth: true,
		dots: true,
		nav: false,
		navText: '',
		responsive:{
			0:{
				items: 1,
				center: false,
				margin: 10
			},
			481:{
				items: 1,
				center: false,
				margin: 10
			},
			700:{
				items: 2,
				center: false,
				margin: 10
			},
			850: {
				items: 2,
				center: true,
				margin: 10
			},
			1500:{
				items: 3,
			},
			1905:{
				items: 3,
				nav: true,
				autoWidth: false
			}
		}
	})

	$('.team-carousel').owlCarousel({
		loop:true,
		margin:35,
		responsiveClass:true,
		dots: true,
		autoWidth: true,
		nav: true,
		navText: '',
		responsive:{
			0:{
				items:2,
				margin: 20,
			},
			480:{
				items:3,
				center: false
			},
			768:{
				items: 3,
				center: false,
			},
			968:{
				items:4,
				center: false,
			}
		}
	})

	//Tabs

	var tabs = $('.faq-list__item');
	var hiddenTab = $('.faq-hidden-block');

	tabs.each(function(i, e) {
		$(e).on('click', function() {
			$(e).toggleClass('faq-list__item_active')
			hiddenTab.each(function(ind, el) {
				if(i === ind) {
					$(el).toggleClass('faq-hidden-block_active')
				} else {
					$(el).removeClass('faq-hidden-block_active')
				}
			})
		})
	})

});

//ACtiveLink
var navLinks = document.getElementsByClassName('nav__item');

for(var i = 0; i < navLinks.length; i++) {
	navLinks[i].addEventListener('click', function(event) {
		event.preventDefault()
		for(var i = 0; i < navLinks.length; i++) {
			navLinks[i].classList.remove('nav__item_active')
			this.classList.add('nav__item_active')
		}
	});
}

//MobileMenu

var mobMenu = document.getElementById('mob');
var mobHiddenShape = document.getElementById('h-m');
var linksHiddenShape = mobHiddenShape.getElementsByClassName('nav__item');
var navigation = document.getElementById('nav-menu');
var copyNavigation = navigation.cloneNode(true);
var hamburgerSign = document.getElementById('hamburger');
var closeSign = document.getElementById('close');

mobHiddenShape.appendChild(copyNavigation)

mobMenu.addEventListener('click', function() {
	hamburgerSign.classList.toggle('mobile__item_hidden');
	closeSign.classList.toggle('mobile__item_hidden');
	mobHiddenShape.classList.toggle('hidden-menu_active');
})

function closeMenu() {
	mobHiddenShape.classList.toggle('hidden-menu_active');
	closeSign.classList.add('mobile__item_hidden');
	hamburgerSign.classList.remove('mobile__item_hidden');
	for(var i = 0; i < linksHiddenShape.length; i++) {
		linksHiddenShape[i].classList.remove('nav__item_active')
	}
	this.classList.add('nav__item_active')
}

for(var j = 0; j < linksHiddenShape.length; j++) {
	linksHiddenShape[j].addEventListener('click', closeMenu)
}