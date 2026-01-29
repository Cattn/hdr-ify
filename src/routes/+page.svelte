<script lang="ts">
	import { hdrifyHex, hdrifyBackground, hdrifyBackgroundHex, hdrify } from '$lib/hdr.svelte.js';
	import { hdrEnabled, enableHDR, disableHDR, logEnabled, enableLog, disableLog } from '$lib/config.js';
	import { browser } from '$app/environment';

	let color = $state('#ff006f');
	let color2 = $state('#00ff6f');
	let color3 = $state('#00ff6f');

	let snow1 = $state('');
	let snow2 = $state('');
	let snow3 = $state('');
	let snow4 = $state('');

	let toggled = $state(false);
	let hdrOn = $state(true);

	let logOn = $state(false);

	$effect(() => {
		if (!browser) return;
		const unsubscribe = hdrEnabled.subscribe((value) => {
			hdrOn = value;
		});
		return () => {
			unsubscribe();
		};
	});

	$effect(() => {
	if (!browser) return;
	const unsubscribe = logEnabled.subscribe((value) => {
		logOn = value;
	});
	return () => {
		unsubscribe();
	};
});

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
				const backgroundP3 = document
					.getElementById('hdrify-background')
					?.style.getPropertyValue('--snow');
				const hdrifyP3 = document.getElementById('hdrify')?.style.getPropertyValue('--snow');
				const backgroundHexP3 = document
					.getElementById('hdrify-background-hex')
					?.style.getPropertyValue('--snow');

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

	function triggerArtificialScroll() {
		if (!browser) return;
		const originalX = window.scrollX;
		const originalY = window.scrollY;
		const root = document.documentElement;
		const previousBehavior = root.style.scrollBehavior;
		root.style.scrollBehavior = 'smooth';
		const maxY = Math.max(0, root.scrollHeight - window.innerHeight);
		requestAnimationFrame(() => {
			window.scrollTo({ left: originalX, top: maxY, behavior: 'smooth' });
			setTimeout(() => {
				requestAnimationFrame(() => {
					window.scrollTo({ left: originalX, top: originalY, behavior: 'smooth' });
					root.style.scrollBehavior = previousBehavior;
				});
			}, 600);
		});
	}
</script>

<div class="min-h-screen bg-gray-50 p-4 sm:p-8">
	<div class="max-w-4xl mx-auto space-y-8">
		<div class="bg-white rounded-lg shadow-sm p-6">
			<h1 class="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">HDR Color Test</h1>

			<div class="space-y-6">
				<div class="bg-gray-50 rounded-lg p-4 sm:p-6">
					<h2 class="text-lg font-semibold mb-3 text-gray-700">Color Controls</h2>
					<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<div>
							<label for="color-picker" class="block text-sm font-medium text-gray-600 mb-2"
								>Hdrify Color</label
							>
							<input
								id="color-picker"
								type="color"
								bind:value={color}
								class="w-full h-10 rounded border border-gray-300 cursor-pointer"
							/>
							<input
								type="text"
								bind:value={color}
								class="mt-2 w-full px-3 py-2 border border-gray-300 rounded text-sm font-mono"
								placeholder="#ff006f"
							/>
						</div>
						<div>
							<label for="color2-picker" class="block text-sm font-medium text-gray-600 mb-2"
								>Hdrify Background Color</label
							>
							<input
								id="color2-picker"
								type="color"
								bind:value={color2}
								class="w-full h-10 rounded border border-gray-300 cursor-pointer"
							/>
							<input
								type="text"
								bind:value={color2}
								class="mt-2 w-full px-3 py-2 border border-gray-300 rounded text-sm font-mono"
								placeholder="#00ff6f"
							/>
						</div>
					</div>
				</div>

				<div class="space-y-4">
					<div class="border border-gray-200 rounded-lg p-4">
						<h1 id="hdrify-hex" class="text-xl font-bold mb-2" {@attach hdrifyHex(color)}>
							Hdrify Hex
						</h1>
						<p class="text-sm text-gray-600 font-mono break-all">
							Color: {color} | Snow: {snow1}
						</p>
					</div>

					<div class="border border-gray-200 rounded-lg p-4">
						<h1
							id="hdrify-background"
							class="text-xl font-bold mb-2 p-3 rounded"
							style="background-color: {color2}"
							{@attach hdrifyBackground()}
						>
							Hdrify Background
						</h1>
						<p class="text-sm text-gray-600 font-mono break-all">
							Color: {color3} | Snow: {snow2}
						</p>
					</div>

					<div class="border border-gray-200 rounded-lg p-4">
						<h2
							id="hdrify"
							class="text-xl font-bold mb-2"
							style="color: {color2}"
							{@attach hdrify()}
						>
							Hdrify
						</h2>
						<p class="text-sm text-gray-600 font-mono break-all">
							Color: {color3} | Snow: {snow3}
						</p>
					</div>

					<div class="border border-gray-200 rounded-lg p-4">
						<h3
							id="hdrify-background-hex"
							class="text-xl font-bold mb-2 p-3 rounded"
							{@attach hdrifyBackgroundHex(color)}
						>
							Hdrify Background Hex
						</h3>
						<p class="text-sm text-gray-600 font-mono break-all">
							Color: {color} | Snow: {snow4}
						</p>
					</div>
				</div>
			</div>
		</div>

		<div class="bg-white rounded-lg shadow-sm p-6">
			<h2 class="text-lg font-semibold mb-4 text-gray-700">HDR Controls</h2>
			<div class="flex flex-wrap gap-3">
				<div
					class="px-4 py-2 rounded-lg font-medium {hdrOn
						? 'bg-green-100 text-green-800'
						: 'bg-red-100 text-red-800'}"
				>
					HDR: {hdrOn ? 'On' : 'Off'}
				</div>
				<button
					onclick={() => enableHDR()}
					class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
				>
					Enable HDR
				</button>
				<button
					onclick={() => disableHDR()}
					class="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
				>
					Disable HDR
				</button>
				<button
					onclick={() => {
						toggled = !toggled;
						if (toggled) {
							color = '#ffff6f';
							color2 = '#ff006f';
						} else {
							color = '#ff006f';
							color2 = '#00ff6f';
						}
					}}
					class="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium transition-colors"
				>
					{toggled ? 'Reset Colors' : 'Toggle Colors'}
				</button>
			</div>
		</div>
		<div class="bg-white rounded-lg shadow-sm p-6">
			<h2 class="text-lg font-semibold mb-4 text-gray-700">Logging Controls</h2>
			<div class="flex flex-wrap gap-3">
				<div
					class="px-4 py-2 rounded-lg font-medium {logOn
						? 'bg-green-100 text-green-800'
						: 'bg-red-100 text-red-800'}"
				>
					Logging: {logOn ? 'On' : 'Off'}
				</div>
				<button
					onclick={() => enableLog()}
					class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
				>
					Enable Logging
				</button>
				<button
					onclick={() => disableLog()}
					class="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
				>
					Disable Logging
				</button>
			</div>
		</div>
	</div>
</div>