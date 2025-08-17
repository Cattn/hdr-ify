<script lang="ts">
	import '../app.css';
	import HDRRouter from '$lib/HDRRouter.svelte';

	let { children } = $props();
</script>

<HDRRouter />

{@render children()}
