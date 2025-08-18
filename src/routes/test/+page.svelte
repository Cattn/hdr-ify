<script lang="ts">
    import { toP3 } from '$lib/p3h.js';
    import { browser } from '$app/environment';
    import { onMount } from 'svelte';
    
    const hex = '#ff006f';
    const p3 = toP3(hex);
    const p3Color = p3?.color;
    const p3R = p3?.r;
    const p3G = p3?.g;
    const p3B = p3?.b;
    const p3A = p3?.a;
    if (browser) {
        console.log(p3);
    }
    
    let h1Element: HTMLElement;

    onMount(() => {
        if (h1Element) {
            const computedStyle = getComputedStyle(h1Element);
            const backgroundColorValue = computedStyle.backgroundColor;
            
            console.log('Computed background-color:', backgroundColorValue);
        }
    });
</script>

<main style="--snow: {p3Color}; --r: {p3R}; --g: {p3G}; --b: {p3B}; --a: {p3A}; --hex: {hex}">
	<h1 bind:this={h1Element}>hdr-ify</h1>
	<p>Render interface colors in HDR on capable displays</p>

	<a href="https://github.com/cattn/hdr-ify" rel="noreferrer" target="_blank">Source</a>
    <h1 bind:this={h1Element}>hdr-ify</h1>
	<p>Render interface colors in HDR on capable displays</p>

	<a href="https://github.com/cattn/hdr-ify" rel="noreferrer" target="_blank">Source</a>
    <h1 bind:this={h1Element}>hdr-ify</h1>
	<p>Render interface colors in HDR on capable displays</p>

	<a href="https://github.com/cattn/hdr-ify" rel="noreferrer" target="_blank">Source</a>
    <h1 bind:this={h1Element}>hdr-ify</h1>
	<p>Render interface colors in HDR on capable displays</p>

	<a href="https://github.com/cattn/hdr-ify" rel="noreferrer" target="_blank">Source</a>
    <h1 bind:this={h1Element}>hdr-ify</h1>
	<p>Render interface colors in HDR on capable displays</p>

	<a href="https://github.com/cattn/hdr-ify" rel="noreferrer" target="_blank">Source</a>
</main>

<style>
	:global(*), :global(*::after), :global(*::before) { padding: 0; margin: 0; box-sizing: border-box }
	:global(::selection) { background: color(display-p3 0% 300% 0%);  }
	:global(body) { --white: #fff; font-family: Georgia, serif; background: var(--white); overflow-x: hidden }

	main { display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 40px; text-align: center; padding: 56px 48px; max-width: 800px; margin: 0 auto }
	h1, p, a { -webkit-text-fill-color: transparent; -webkit-background-clip: text; background-clip: text; text-wrap: balance }
	h1 { font-size: 112px; font-weight: 700 }
	p, a { font-size: 40px; line-height: 140% }
 
	a { display: block; text-decoration: none; border: 4px solid color(display-p3 0% 300% 0%); border-radius: 16px; padding: 4px 16px }

    @media all and (dynamic-range: high) and (color-gamut: p3) {
        :global(h1, p, a) { background: color(display-p3 calc(var(--r) * 3) calc(var(--g) * 3) calc(var(--b) * 3) / var(--a)) }
    }

    @media not all and (dynamic-range: high) and (color-gamut: p3) {
        :global(h1, p, a) { background: var(--hex) }
    }


	/* Safari/WebKit specific HDR brightness boost (excludes Chromium) */
	@supports (background: -webkit-named-image(i)) {
		@supports (dynamic-range: high) {
			h1, p, a { 
                filter: brightness(3);
                backdrop-filter: brightness(0) opacity(0);
                background-color: var(--snow);
             }
		}

        @media all and (dynamic-range: high) and (color-gamut: p3) {
			h1, p, a { 
                filter: brightness(3);
                backdrop-filter: brightness(0) opacity(0);
                background-color: var(--snow);
             }
		}

        @supports not (color: color(display-p3 100% 100% 100%)) {
			h1, p, a { 
                filter: brightness(10);
                backdrop-filter: brightness(10) opacity(0);
                background-color: var(--hex);
             }
		}
	}
</style>

