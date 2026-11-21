<script lang="ts">
	import { onMount } from 'svelte';
	import { resolve } from '$app/paths';

	type ElementsModule = typeof import('../../elements/index.js');

	let api = $state<ElementsModule | null>(null);
	let hdrOn = $state(true);
	let color = $state('#ff006f');
	let bgColor = $state('#00ff6f');
	let amplification = $state(1.8);
	let attrTarget: HTMLElement;

	onMount(() => {
		let unsubscribe = () => {};
		import('../../elements/index.js').then((mod) => {
			api = mod;
			unsubscribe = mod.hdrEnabled.subscribe((v) => (hdrOn = v));
		});
		return () => unsubscribe();
	});

	function swapViaAttribute() {
		const next = attrTarget.getAttribute('color') === '#ffff6f' ? '#6f00ff' : '#ffff6f';
		attrTarget.setAttribute('color', next);
	}
</script>

<hdr-router {amplification}></hdr-router>

<div class="min-h-screen bg-gray-50 p-4 sm:p-8">
	<div class="mx-auto max-w-4xl space-y-8">
		<div class="rounded-lg bg-white p-6 shadow-sm">
			<h1 class="mb-2 text-2xl font-bold text-gray-800 sm:text-3xl">Web Components Test</h1>
			<p class="mb-6 text-sm text-gray-600">
				Status: {api ? 'elements registered' : 'loading…'} ·
				<a class="underline" href={resolve('/')}>Svelte demo</a>
			</p>

			<div class="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
				<label class="text-sm text-gray-600">
					Text color
					<input type="color" bind:value={color} class="h-10 w-full cursor-pointer rounded" />
				</label>
				<label class="text-sm text-gray-600">
					Background color
					<input type="color" bind:value={bgColor} class="h-10 w-full cursor-pointer rounded" />
				</label>
				<label class="text-sm text-gray-600">
					Amplification: {amplification}
					<input
						type="range"
						min="1"
						max="4"
						step="0.1"
						bind:value={amplification}
						class="w-full"
					/>
				</label>
			</div>

			<div class="space-y-4">
				<div class="rounded-lg border border-gray-200 p-4">
					<h2 class="text-xl font-bold">
						<hdr-ify {color}>&lt;hdr-ify color="{color}"&gt;</hdr-ify>
					</h2>
				</div>

				<div class="rounded-lg border border-gray-200 p-4">
					<h2 class="text-xl font-bold" style="color: {bgColor}">
						<hdr-ify>&lt;hdr-ify&gt; (inherits color {bgColor})</hdr-ify>
					</h2>
				</div>

				<div class="rounded-lg border border-gray-200 p-4">
					<hdr-ify background color={bgColor} class="rounded p-3 text-xl font-bold">
						&lt;hdr-ify background color="{bgColor}"&gt;
					</hdr-ify>
				</div>

				<div class="rounded-lg border border-gray-200 p-4">
					<hdr-ify
						background
						class="rounded p-3 text-xl font-bold"
						style="background-color: {color}"
					>
						&lt;hdr-ify background&gt; (inherits background {color})
					</hdr-ify>
				</div>

				<div class="rounded-lg border border-gray-200 p-4">
					<h2 class="text-xl font-bold">
						<hdr-ify bind:this={attrTarget} color="#ffff6f">setAttribute('color', …)</hdr-ify>
					</h2>
					<button
						onclick={swapViaAttribute}
						class="mt-2 rounded-lg bg-purple-500 px-4 py-2 font-medium text-white hover:bg-purple-600"
					>
						Swap color via setAttribute
					</button>
				</div>
			</div>
		</div>

		<div class="rounded-lg bg-white p-6 shadow-sm">
			<h2 class="mb-4 text-lg font-semibold text-gray-700">HDR Controls (from elements bundle)</h2>
			<div class="flex flex-wrap gap-3">
				<div
					class="rounded-lg px-4 py-2 font-medium {hdrOn
						? 'bg-green-100 text-green-800'
						: 'bg-red-100 text-red-800'}"
				>
					HDR: {hdrOn ? 'On' : 'Off'}
				</div>
				<button
					onclick={() => api?.enableHDR()}
					class="rounded-lg bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600"
				>
					Enable HDR
				</button>
				<button
					onclick={() => api?.disableHDR()}
					class="rounded-lg bg-gray-500 px-4 py-2 font-medium text-white hover:bg-gray-600"
				>
					Disable HDR
				</button>
			</div>
		</div>
	</div>
</div>
