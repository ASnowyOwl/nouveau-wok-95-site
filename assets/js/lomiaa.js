window.onload = function () {
	setImagesWidthHeight();
};

function setImagesWidthHeight() {
	var images = document.getElementsByTagName('img');

	for (var i = 0; i < images.length; i++) {
		var image = images[i];

		(function (image) {
			var img = new Image();
			img.onload = function () {
				image.width = this.width;
				image.height = this.height;
			};
			img.src = image.src;
		})(image);
	}
}

document.addEventListener('DOMContentLoaded', function () {
	if ((window.location.href.startsWith('file://') && !window.location.href.includes('http') && !window.location.href.includes('.fr'))) {
		var element = document.querySelector('#banner');
		element.style.backgroundImage = 'url("data:image/svg+xml;charset=utf8,%3Csvg%20viewBox%3D%220%200%20512%20512%22%20width%3D%22512%22%20height%3D%22512%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter%20id%3D%22noise%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.875%22%20result%3D%22noise%22%20%2F%3E%3CfeColorMatrix%20type%3D%22matrix%22%20values%3D%220.09765625%200%200%200%200%200%200.09765625%200%200%200%200%200%200.09765625%200%200%200%200%200%200.41015625%200%22%20%2F%3E%3C%2Ffilter%3E%3Crect%20filter%3D%22url%28%23noise%29%22%20x%3D%220%22%20y%3D%220%22%20width%3D%22512%22%20height%3D%22512%22%20fill%3D%22transparent%22%20opacity%3D%221%22%20%2F%3E%3C%2Fsvg%3E"), linear-gradient(to top, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("images/banner.webp")';
	}
});
