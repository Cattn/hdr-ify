<script lang="ts">
	import whitePng from './assets/white.png';
	import magicJpg from './assets/magic.jpg';
	import whiteWebm from './assets/white1.webm';
	import whiteMp4 from './assets/white1.mp4';
    import whiteMp42 from './assets/white2.mp4';
    

	const colorNames = ['red', 'yellow', 'green', 'cyan', 'blue', 'pink'] as const;
</script>

<video class="hdr-video" autoplay muted loop playsinline preload="auto" disablepictureinpicture poster={whitePng}>
	<source src={whiteWebm} type="video/webm" />
	<source src={whiteMp4} type="video/mp4" />
	<source src={whiteMp42} type="video/mp4" />
</video>

<main>
	<h1>hdr-ify</h1>
	<p>Render interface colors in HDR on capable displays</p>

	<div class="colors" aria-hidden="true">
		{#each colorNames as name}
			<div class={`color ${name}`}></div>
		{/each}
	</div>

	<hr />

	<figure class="media">
		<img src={magicJpg} alt="HDR sample" loading="lazy" />
	</figure>

	<a href="https://github.com/cattn/hdr-ify" rel="noreferrer" target="_blank">Source</a>
</main>

<style>
	:global(*), :global(*::after), :global(*::before) { padding: 0; margin: 0; box-sizing: border-box }
	:global(::selection) { background: color(display-p3 0% 400% 0%) }
	:global(body) { --white: #fff; --snow: color(display-p3 0% 400% 0%); font-family: Georgia, serif; background: var(--white) }

	.hdr-video { position: fixed; right: 0; bottom: 0; width: 1px; height: 1px; opacity: 0.01; pointer-events: none; z-index: -1 }

	main { display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 40px; text-align: center; padding: 56px 48px; max-width: 800px; margin: 0 auto }
	h1, p, a { background: var(--snow); -webkit-text-fill-color: transparent; -webkit-background-clip: text; background-clip: text; text-wrap: balance }
	h1 { font-size: 112px; font-weight: 700 }
	p, a { font-size: 40px; line-height: 140% }
	hr { position: relative; width: 100%; max-width: 400px; height: 2px; background: linear-gradient(to right, transparent 0%, var(--snow) 50%, transparent 100%); border: none }

	.colors { --red: #ff0000; --yellow: #ffff00; --green: #00ff00; --cyan: #00ffff; --blue: #0000ff; --pink: #ff00ff; display: flex; justify-content: center; margin-bottom: 24px; margin-top: 24px }
	
	@supports (color: color(display-p3 100% 100% 100%)) {
		.colors { --red: color(display-p3 400% 0% 0%); --yellow: color(display-p3 400% 400% 0%); --green: color(display-p3 0% 400% 0%); --cyan: color(display-p3 0% 400% 400%); --blue: color(display-p3 0% 0% 400%); --pink: color(display-p3 400% 0% 400%) }
	}
	
	.colors * + * { margin-left: -12px }
	.color { width: 56px; height: 56px; background: var(--snow); border-radius: 50%; }
	.red { background-color: var(--red) }
	.yellow { background-color: var(--yellow) }
	.green { background-color: var(--green) }
	.cyan { background-color: var(--cyan) }
	.blue { background-color: var(--blue) }
	.pink { background-color: var(--pink) }

	a { display: block; text-decoration: none; border: 4px solid var(--snow); border-radius: 16px; padding: 4px 16px }

	.media { display: grid; gap: 16px; align-items: center; justify-items: center; width: 100% }
	.media img { max-width: 100%; height: auto; border-radius: 12px }

	@media (dynamic-range: high) and (color-gamut: p3) {
		:global(body) { --snow: color(display-p3 calc(0.070588 * 200%) calc(0.317647 * 200%) calc(0.066667 * 200%)) }
		.colors { --red: color(display-p3 220% 0% 0%); --yellow: color(display-p3 220% 220% 0%); --green: color(display-p3 0% 220% 0%); --cyan: color(display-p3 0% 220% 220%); --blue: color(display-p3 0% 0% 220%); --pink: color(display-p3 220% 0% 220%) }
	}

	/* Safari/WebKit specific HDR brightness boost (excludes Chromium) */
	@supports (background: -webkit-named-image(i)) {
		@supports (color: color(display-p3 100% 100% 100%)) {
			h1, p, a { 
                filter: brightness(10);
                backdrop-filter: brightness(0) opacity(0);
                background-color: #0000ff;
             }
			hr { 
                filter: brightness(10);
                backdrop-filter: brightness(0) opacity(0);
                background-color: #0000ff;
             }
			.color { 
                filter: brightness(10);
                backdrop-filter: brightness(10) opacity(0);
                border: 0;
             }
		}
	}
</style>

