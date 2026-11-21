<svelte:options
	customElement={{
		tag: 'hdr-ify',
		shadow: 'none',
		props: {
			color: { type: 'String' },
			background: { type: 'Boolean' }
		}
	}}
/>

<script lang="ts">
	import { applyHdr } from '../lib/core/hdr.js';

	let { color, background = false }: { color?: string | null; background?: boolean } = $props();

	const hostEl = $host();

	$effect(() =>
		applyHdr(hostEl, { mode: background ? 'background' : 'text', color: color || undefined })
	);
</script>
