$(document).ready(function() {

	////PageScrollToID
	var headerHeight = $('.header').height();
	$("a[href*='#']").mPageScroll2id({
		offset: headerHeight
	});


	$('.btn-brief').on('click', function(e) {
		var el = $( e.target.getAttribute('href') );
		var elOffset = el.offset().top;
		var elHeight = el.outerHeight();
		var windowHeight = $(window).height();
		var offset;
		console.log(elHeight)
		if (elHeight < windowHeight) {
			offset = elOffset - ((windowHeight / 2) - (elHeight / 2));
		}
		else {
			offset = elOffset;
		}
		$.smoothScroll({ speed: 700 }, offset);
		return false;
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

	prSliderPag.on('click', function(e) {
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

	var startPosGal = 0;

	$('.projects-slider1 .owl-nav').find('.owl-next').on('click', function() {
		startPosGal++
		if(startPosGal > 3) {
			startPosGal = 3;
		}
		prSliderPag.each(function(i, el) {
			if(i === startPosGal) {
				prSliderPag.removeClass('projects-pag__item_active')
				$(el).addClass('projects-pag__item_active')
			}
		})
	})

	$('.projects-slider1 .owl-nav').find('.owl-prev').on('click', function() {
		startPosGal--
		if(startPosGal < 0) {
			startPosGal = 0;
		}
		prSliderPag.each(function(i, el) {
			if(i === startPosGal) {
				prSliderPag.removeClass('projects-pag__item_active')
				$(el).addClass('projects-pag__item_active')
			}
		})
	})


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
		loop:false,
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
					var price = $(this).parent().parent().parent().parent().parent().find('.price-box__price span').first();
					var priceThrought = $(this).parent().parent().parent().parent().parent().find('.price-box__price span').last();
					var priceVal = parseInt(price.text());
					var priceThroughtVal =parseInt(priceThrought.text());
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
							priceThrought.removeClass('price-box__through_active');
							discount.removeClass('price-box__discount_active');
							btnMinus.removeClass('amount-btn_active');
						}
						if(fieldValue === 4) {
							priceVal -= 50;
							priceThroughtVal -= 95;
							discountVal = 35;
						}
						if(fieldValue === 5) {
							priceVal -= 40;
							priceThroughtVal -= 95;
							discountVal = 80;
							btnPlus.removeClass('amount-btn_nonactive');
						}
					}
					if(amountType === 'plus' && fieldType === 'choice') {
						fieldValue  += 1;
						if(fieldValue === 4) {
							priceVal += 60;
							priceThrought.addClass('price-box__through_active');
							priceThroughtVal = 385;
							discount.addClass('price-box__discount_active');
							btnMinus.addClass('amount-btn_active');
						}
						if(fieldValue === 5) {
							priceVal += 50;
							priceThroughtVal += 95;
							discountVal = 80;
						}
						if(fieldValue === 6) {
							priceVal += 40;
							priceThroughtVal += 95;
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
							priceThroughtVal = 830;
							discountVal = 150;
							btnMinus.removeClass('amount-btn_active-blue');
						}
						if(fieldValue === 7) {
							priceVal -= 50;
							priceThroughtVal -= 95;
							discountVal = 175;
						}
						if(fieldValue === 8) {
							priceVal -= 40;
							priceThroughtVal -= 95;
							discountVal = 220;
							btnPlus.removeClass('amount-btn_nonactive');
						}
					}
					if(amountType === 'plus' && fieldType === 'branding') {
						fieldValue  += 1;
						if(fieldValue === 7) {
							priceVal += 60;
							priceThroughtVal += 95;
							discountVal = 175;
							btnMinus.addClass('amount-btn_active-blue');
						}
						if(fieldValue === 8) {
							priceVal += 50;
							priceThroughtVal += 95;
							discountVal = 220;
						}
						if(fieldValue === 9) {
							priceVal += 40;
							priceThroughtVal += 95;
							discountVal = 275;
							btnPlus.addClass('amount-btn_nonactive');
						}
						if(fieldValue > 9) {
							fieldValue = 9;
						}
					}

					price.text(priceVal);
					priceThrought.text(priceThroughtVal);
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


	//CardsHoverTooltips

	var tooltips = $('.price__question');

	tooltips.hover(function() {
		$(this).find('.price__question-hidden').addClass('price__question-hidden_active')
	})

	tooltips.mouseleave(function() {
		$(this).find('.price__question-hidden').removeClass('price__question-hidden_active')
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
					$(el).parent().removeClass('faq-list__item_active')
					$(el).removeClass('faq-hidden-block_active')
				}
			})
		})
	})

	//BriefProgressBar

	var progressBar = $('.brief-progress__item');
	if(progressBar.length === 1) {
		$(window).scroll(function() {
			var progress = $(window).scrollTop();
			var docHeight = $(document).height();
			var windowHeight = $(window).height();

			var scrollPercent = (progress / (docHeight-windowHeight)) * 100;
			progressBar.css('width',  scrollPercent + '%')
		})
	}

	//BriefScroll

	$('.brief-form .brief-form__item').scroolly([
		{
			from: 'el-top = vp-bottom - 50px',
			to: 'el-bottom = vp-bottom - 50px',
			cssFrom:{opacity:'.0'},
			cssTo:{opacity:'1'}
		},
		{
			from: 'el-center = vp-center + 60vp',
			to: 'el-center = vp-center - 60vp',
			cssFrom:{'opacity': '1'},
			cssTo:{'opacity': '1'}
		},
		{
			from: 'el-top = vp-top + 50px',
			to:   'el-bottom = vp-top + 50px',
			cssFrom:{opacity:'1'},
			cssTo:{opacity:'.0'},
		}
	]);

	//BriefCheckbox

	var briefsLabels = $('.brief-label');
	var briefsInputs = $('.brief-checkbox');

	briefsInputs.each(function(i,e) {
		$(e).on('click', function() {
			briefsLabels.each(function(ind, el) {
				if(i === ind) {
					$(el).toggleClass('brief-label_checked')
					$(el).find('.brief-label__hidden-bg').toggleClass('brief-label__hidden-bg_active')
				}
			})
		})
	})


	//BriefSWITCH

	var bSwitch = $('.brief-switch__item');
	var bSwitchedElements = $('.price-box_brief');

	bSwitch.each(function(i, e) {
		$(e).on('click', function() {
			bSwitchedElements.removeClass('price-box_brief-active')
			bSwitchedElements.each(function(ind, el) {
				if(i === ind) {
					$(el).addClass('price-box_brief-active')
				}
			})
		})
	})

});


	//BriefFilesSelect

	var labelInp = $('.brief-file__label');
	var briefInp = $('.brief-file__input');
	var briefWrap = $('.brief-file__wrap');
	var briefInner = $('.brief-file__par');
	var briefBtn = $('.brief-file__btn');


	briefInp.on('change', function() {
		var briefInpValue = briefInp.val().split("\\").pop();
		briefWrap.addClass('brief-file__wrap_active');
		briefInner.html(briefInpValue)
	})

	briefBtn.on('click', function() {
		$(this).parent().removeClass('brief-file__wrap_active');
		briefInp.val('')
		console.log(briefInp)
	})

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