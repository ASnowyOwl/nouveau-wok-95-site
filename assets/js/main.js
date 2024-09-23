/*
	Radiate by Pixelarity
	pixelarity.com | hello@pixelarity.com
	License: pixelarity.com/license
*/
(function ($) {
	var $window = $(window),
		$body = $('body'),
		$wrapper = $('#wrapper'),
		$banner = $('#banner'),
		$header = $('#header');

	breakpoints({
		default: ['1681px', null],
		xlarge: ['1281px', '1680px'],
		large: ['981px', '1280px'],
		medium: ['737px', '980px'],
		small: ['481px', '736px'],
		xsmall: ['361px', '480px'],
		xxsmall: [null, '360px']
	});

	$window.on('load', function () {
		window.setTimeout(function () {
			$body.removeClass('is-preload');
		}, 0);
	});

	$('.scrolly').scrolly({
		speed: 1000,
		offset: $header.outerHeight() + 20
	});

	if ($banner.length > 0 && $header.hasClass('alt')) {
		$window.on('resize', function () { $window.trigger('scroll'); });

		$banner.scrollex({
			bottom: $header.outerHeight(),
			terminate: function () { $header.removeClass('alt'); },
			enter: function () { $header.addClass('alt'); $header.removeClass('reveal'); },
			leave: function () { $header.removeClass('alt'); $header.addClass('reveal'); }
		});
	}

	$('#menu')
		.append('<a href="#menu" class="close fa-close"></a>')
		.appendTo($body)
		.panel({
			target: $body,
			visibleClass: 'is-menu-visible',
			delay: 0,
			hideOnClick: true,
			hideOnSwipe: true,
			resetScroll: false,
			resetForms: true,
			side: 'right'
		});
	$('.gallery')
		.on('click', 'a', function (event) {
			var $a = $(this),
				$gallery = $a.parents('.gallery'),
				$modal = $gallery.children('.modal'),
				$modalImg = $modal.find('img'),
				href = $a.attr('href');

			if (!href.match(/\.(jpg|gif|png|mp4)$/)) return;

			event.preventDefault();
			event.stopPropagation();

			if ($modal[0]._locked) return;

			$modal[0]._locked = true;
			$modalImg.attr('src', href);
			$modal.addClass('visible');
			$modal.focus();

			setTimeout(function () {
				$modal[0]._locked = false;
			}, 0);
		})
		.on('click', '.modal', function (event) {
			var $modal = $(this), $modalImg = $modal.find('img');

			if ($modal[0]._locked) return;
			if (!$modal.hasClass('visible')) return;

			event.stopPropagation();
			$modal[0]._locked = true;
			$modal.removeClass('loaded');

			setTimeout(function () {
				$modal.removeClass('visible');
				$wrapper.triggerHandler('---pauseScrollZone');

				setTimeout(function () {
					$modalImg.attr('src', '');
					$modal[0]._locked = false;
					$body.focus();
				}, 0);
			}, 0);
		}).on('keypress', '.modal', function (event) {
			var $modal = $(this);
			// Escape? Hide modal.
			if (event.keyCode == 27) $modal.trigger('click');
		}).on('mouseup mousedown mousemove', '.modal', function (event) {
			event.stopPropagation();
		}).prepend("<div class='modal' tabIndex='-1'><div class='inner'><img src='' loading='lazy' alt='Photo de la salle du restaurant' width='100%' height='100%' /></div></div>")
		.find('img')
		.on('load', function (event) {
			var $modalImg = $(this), $modal = $modalImg.parents('.modal');

			setTimeout(function () {
				if (!$modal.hasClass('visible')) return;
				$modal.addClass('loaded');
			}, 0);
		});
})(jQuery);
