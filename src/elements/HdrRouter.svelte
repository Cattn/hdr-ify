<svelte:options
	customElement={{
		tag: 'hdr-router',
		shadow: 'none',
		props: {
			amplification: { type: 'Number' },
			delay: { type: 'Number' }
		}
	}}
/>

<script lang="ts">
	import HDRRouter from '../lib/HDRRouter.svelte';

	let { amplification, delay }: { amplification?: number | null; delay?: number | null } = $props();
</script>

<HDRRouter amplification={amplification ?? 1.8} delay={delay ?? 0} />
