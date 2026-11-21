<script lang="ts">
	import whitePng from './assets/white.png';
	import magicJpg from './assets/magic.jpg';
	import whiteWebm from './assets/white1.webm';
	import whiteMp4 from './assets/white1.mp4';
	import whiteMp42 from './assets/white2.mp4';
	import { ensureStyles, setRouterVars } from './core/styles.js';

	type Props = {
		amplification?: number;
		delay?: number;
	};

	let { amplification = 1.8, delay = 0 }: Props = $props();

	$effect.pre(() => {
		ensureStyles();
		setRouterVars(amplification ?? 1.8, delay ?? 0);
	});
</script>

<video
	class="hdr-video"
	style="position: fixed; right: 0; bottom: 0; width: 1px; height: 1px; opacity: 0.01; pointer-events: none; z-index: -1;"
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

<figure
	class="media"
	style="display: grid; gap: 16px; align-items: center; justify-items: center; width: 100%;"
>
	<img
		src={magicJpg}
		alt="HDR sample"
		loading="lazy"
		style="max-width: 100%; height: auto; border-radius: 12px;"
	/>
</figure>
