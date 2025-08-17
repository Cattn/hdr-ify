<script lang="ts">
    import Router from '$lib/HDRRouter.svelte';
    import { hdrifyHex, hdrifyBackgroundHex, hdrify } from '$lib/hdr.svelte.js';

    let color = $state('#ff006f');
    let color2 = $state('#00ff6f');
</script>

<h1 {@attach hdrifyHex('#ffff6f')}>Hdrify Hex: {color}</h1>

<h2 style="color: {color2}" {@attach hdrify()}>Hdrify: {color2}</h2>

<h3 {@attach hdrifyBackgroundHex('#00ff6f')}>Hdrify Background Hex: {color2}</h3>

<button onclick={() => color = '#ffff6f'}>Change text</button>