<script lang="ts">
	import whitePng from './assets/white.png';
	import magicJpg from './assets/magic.jpg';
	import whiteWebm from './assets/white1.webm';
	import whiteMp4 from './assets/white1.mp4';
	import whiteMp42 from './assets/white2.mp4';
</script>

<video
	class="hdr-video"
	autoplay
	muted
	loop
	playsinline
	preload="auto"
	disablepictureinpicture
	poster={whitePng}
>
	<source src={whiteWebm} type="video/webm" />
	<source src={whiteMp4} type="video/mp4" />
	<source src={whiteMp42} type="video/mp4" />
</video>

<figure class="media">
	<img src={magicJpg} alt="HDR sample" loading="lazy" />
</figure>

<style>
	.hdr-video {
		position: fixed;
		right: 0;
		bottom: 0;
		width: 1px;
		height: 1px;
		opacity: 0.01;
		pointer-events: none;
		z-index: -1;
	}
	.media {
		display: grid;
		gap: 16px;
		align-items: center;
		justify-items: center;
		width: 100%;
	}
	.media img {
		max-width: 100%;
		height: auto;
		border-radius: 12px;
	}

	:global([data-hdrifyhex]) {
		@media all and (dynamic-range: high) and (color-gamut: p3) {
			-webkit-text-fill-color: transparent;
			-webkit-background-clip: text;
			background-clip: text;
			background-color: color(
				display-p3 calc(var(--r) * 3) calc(var(--g) * 3) calc(var(--b) * 3) / var(--a)
			);
		}

		@media not all and (dynamic-range: high) and (color-gamut: p3) {
			-webkit-text-fill-color: transparent;
			-webkit-background-clip: text;
			background-clip: text;
			background-color: var(--hex);
		}

		/* Safari/WebKit specific HDR brightness boost (excludes Chromium) */
		@supports (background: -webkit-named-image(i)) {
			@supports (dynamic-range: high) {
				filter: brightness(3);
				backdrop-filter: brightness(0) opacity(0);
				color: var(--snow);
			}

			@media all and (dynamic-range: high) and (color-gamut: p3) {
				filter: brightness(3);
				backdrop-filter: brightness(0) opacity(0);
				color: var(--snow);
			}

			@supports not (color: color(display-p3 100% 100% 100%)) {
				filter: brightness(10);
				backdrop-filter: brightness(10) opacity(0);
				color: var(--hex);
			}
		}
	}

	:global([data-hdrify]) {
		@media all and (dynamic-range: high) and (color-gamut: p3) {
			-webkit-text-fill-color: transparent;
			-webkit-background-clip: text;
			background-clip: text;
			background-color: color(
				display-p3 calc(var(--r) * 3) calc(var(--g) * 3) calc(var(--b) * 3) / var(--a)
			);
		}

		@media not all and (dynamic-range: high) and (color-gamut: p3) {
			-webkit-text-fill-color: transparent;
			-webkit-background-clip: text;
			background-clip: text;
			background-color: var(--hex);
		}

		/* Safari/WebKit specific HDR brightness boost (excludes Chromium) */
		@supports (background: -webkit-named-image(i)) {
			@supports (dynamic-range: high) {
				filter: brightness(3);
				backdrop-filter: brightness(0) opacity(0);
				background-color: var(--snow);
			}

			@media all and (dynamic-range: high) and (color-gamut: p3) {
				filter: brightness(3);
				backdrop-filter: brightness(0) opacity(0);
				background-color: var(--snow);
			}

			@supports not (color: color(display-p3 100% 100% 100%)) {
				filter: brightness(10);
				backdrop-filter: brightness(10) opacity(0);
				background-color: var(--hex);
			}
		}
	}

	:global([data-hdrifybg]) {
		@media all and (dynamic-range: high) and (color-gamut: p3) {
			background-color: color(
				display-p3 calc(var(--r) * 3) calc(var(--g) * 3) calc(var(--b) * 3) / var(--a)
			);
		}

		@media not all and (dynamic-range: high) and (color-gamut: p3) {
			background-color: var(--hex);
		}

		/* Safari/WebKit specific HDR brightness boost (excludes Chromium) */
		@supports (background: -webkit-named-image(i)) {
			@supports (dynamic-range: high) {
				filter: brightness(3);
				backdrop-filter: brightness(0) opacity(0);
				background-color: var(--snow);
			}

			@media all and (dynamic-range: high) and (color-gamut: p3) {
				filter: brightness(3);
				backdrop-filter: brightness(0) opacity(0);
				background-color: var(--snow);
			}

			@supports not (color: color(display-p3 100% 100% 100%)) {
				filter: brightness(10);
				backdrop-filter: brightness(10) opacity(0);
				background-color: var(--hex);
			}
		}
	}
</style>
