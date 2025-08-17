<script lang="ts">
	import { hdrifyHex, hdrifyBackground, hdrifyBackgroundHex, hdrify } from '$lib/hdr.svelte.js';

	let color = $state('#ff006f');
	let color2 = $state('#00ff6f');
</script>

<h1 {@attach hdrifyHex(color)}>Hdrify Hex: {color}</h1>

<h1 style="background-color: {color2}" {@attach hdrifyBackground()}>Hdrify Background: {color}</h1>

<h2 style="color: {color2}" {@attach hdrify()}>Hdrify: {color2}</h2>

<h3 {@attach hdrifyBackgroundHex(color)}>Hdrify Background Hex: {color}</h3>

<button onclick={() => (color = '#ffff6f')}>Change text</button>
