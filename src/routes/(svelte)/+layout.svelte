<script lang="ts">
	import HDRRouter from '$lib/HDRRouter.svelte';

	let { children } = $props();
</script>

<HDRRouter />

{@render children()}
