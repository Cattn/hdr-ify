<script lang="ts">
	import whitePng from './assets/white.png';
	import magicJpg from './assets/magic.jpg';
	import whiteWebm from './assets/white1.webm';
	import whiteMp4 from './assets/white1.mp4';
	import whiteMp42 from './assets/white2.mp4';
	import { BROWSER } from 'esm-env';

	let { amplification = 1.8, delay = 0 }: { amplification: number; delay?: number } = $props();

	if (BROWSER) {
		document.documentElement.style.setProperty('--amplification', amplification.toString());
		document.documentElement.style.setProperty('--hdrify-delay', (delay ?? 0).toString());
	}
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

	:global(:root) {
		--amplification: 1.8;
	}

	@media all and (dynamic-range: high) and (color-gamut: p3) {
		:global([data-hdrify]) {
			-webkit-text-fill-color: transparent;
			-webkit-background-clip: text;
			background-clip: text;
			background-color: color(
				display-p3 calc(var(--r) * var(--amplification)) calc(var(--g) * var(--amplification))
					calc(var(--b) * var(--amplification)) / var(--a)
			);
		}
	}

	@media not all and (dynamic-range: high) and (color-gamut: p3) {
		:global([data-hdrify]) {
			-webkit-text-fill-color: transparent;
			-webkit-background-clip: text;
			background-clip: text;
			background-color: var(--hex);
		}
	}

	/* Safari/WebKit specific HDR brightness boost (excludes Chromium) */
	@supports (background: -webkit-named-image(i)) {
		@supports (dynamic-range: high) {
			:global([data-hdrify]) {
				filter: brightness(var(--amplification));
				backdrop-filter: brightness(0) opacity(0);
				background-color: var(--snow) !important;
			}
		}

		@media all and (dynamic-range: high) and (color-gamut: p3) {
			:global([data-hdrify]) {
				filter: brightness(var(--amplification));
				backdrop-filter: brightness(0) opacity(0);
				background-color: var(--snow);
			}
		}

		@supports not (color: color(display-p3 100% 100% 100%)) {
			:global([data-hdrify]) {
				filter: brightness(10);
				backdrop-filter: brightness(10) opacity(0);
				background-color: var(--hex);
			}
		}
	}

	@media all and (dynamic-range: high) and (color-gamut: p3) {
		:global([data-hdrifybg]) {
			background-color: color(
				display-p3 calc(var(--r) * var(--amplification)) calc(var(--g) * var(--amplification))
					calc(var(--b) * var(--amplification)) / var(--a)
			) !important;
		}
	}

	@media not all and (dynamic-range: high) and (color-gamut: p3) {
		:global([data-hdrifybg]) {
			background-color: var(--hex);
		}
	}

	/* Safari/WebKit specific HDR brightness boost (excludes Chromium) */
	@supports (background: -webkit-named-image(i)) {
		@supports (dynamic-range: high) {
			:global([data-hdrifybg]) {
				filter: brightness(var(--amplification));
				backdrop-filter: brightness(0) opacity(0);
				background-color: var(--snow) !important;
			}
		}

		@media all and (dynamic-range: high) and (color-gamut: p3) {
			:global([data-hdrifybg]) {
				filter: brightness(var(--amplification));
				backdrop-filter: brightness(0) opacity(0);
				background-color: var(--snow) !important;
			}
		}

		@supports not (color: color(display-p3 100% 100% 100%)) {
			:global([data-hdrifybg]) {
				filter: brightness(10);
				backdrop-filter: brightness(10) opacity(0);
				background-color: var(--hex);
			}
		}
	}
</style>
