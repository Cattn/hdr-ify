<script lang="ts">
	import { hdrifyHex, hdrifyBackground, hdrifyBackgroundHex, hdrify } from '$lib/hdr.svelte.js';
    import { browser } from '$app/environment';

	let color = $state('#ff006f');
	let color2 = $state('#00ff6f');
    let color3 = $state('#00ff6f');

    let snow1 = $state('');
    let snow2 = $state('');
    let snow3 = $state('');
    let snow4 = $state('');

    let toggled = $state(false);

    $effect(() => {
        if (browser) {
            const hex = document.getElementById('hdrify-hex');
            const background = document.getElementById('hdrify-background');
            const hdrify = document.getElementById('hdrify');
            const backgroundHex = document.getElementById('hdrify-background-hex');

            if (background) {
                color3 = color;
            }
            if (hdrify) {
                color3 = color;
            }

            setTimeout(() => {
                const hexP3 = document.getElementById('hdrify-hex')?.style.getPropertyValue('--snow');
                const backgroundP3 = document.getElementById('hdrify-background')?.style.getPropertyValue('--snow');
                const hdrifyP3 = document.getElementById('hdrify')?.style.getPropertyValue('--snow');
                const backgroundHexP3 = document.getElementById('hdrify-background-hex')?.style.getPropertyValue('--snow');

                if (hexP3) {
                    snow1 = hexP3;
                }
                if (backgroundP3) {
                    snow2 = backgroundP3;
                }
                if (hdrifyP3) {
                    snow3 = hdrifyP3;
                }
                if (backgroundHexP3) {
                    snow4 = backgroundHexP3;
                }
            }, 0);
        }
    });
</script>

<h1 id="hdrify-hex" {@attach hdrifyHex(color)}>Hdrify Hex: {color} & Snow: {snow1}</h1>

<h1 id="hdrify-background" style="background-color: {color2}" {@attach hdrifyBackground()}>Hdrify Background: {color3} & Snow: {snow2}</h1>

<h2 id="hdrify" style="color: {color2}" {@attach hdrify()}>Hdrify: {color3} & Snow: {snow3}</h2>

<h3 id="hdrify-background-hex" {@attach hdrifyBackgroundHex(color)}>Hdrify Background Hex: {color} & Snow: {snow4}</h3>

<button onclick={() => {
    toggled = !toggled;
    if (toggled) {
        color = '#ffff6f';
        color2 = '#ff006f';
    } else {
        color = '#ff006f';
        color2 = '#00ff6f';
    }
}}>{toggled ? 'Reset colors' : 'Change colors'}</button>
