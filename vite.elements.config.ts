import { readFileSync } from 'node:fs';
import { defineConfig } from 'vite';
import { svelte, vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
	plugins: [
		svelte({
			configFile: false,
			preprocess: vitePreprocess(),
			compilerOptions: { customElement: true }
		}),
		{
			name: 'hdr-elements-types',
			generateBundle() {
				const source = readFileSync('src/elements/elements.d.ts', 'utf8').replaceAll(
					'../lib/core/',
					'../core/'
				);
				this.emitFile({ type: 'asset', fileName: 'index.d.ts', source });
			}
		}
	],
	build: {
		outDir: 'dist/elements',
		emptyOutDir: true,
		lib: {
			entry: 'src/elements/index.ts',
			formats: ['es'],
			fileName: () => 'hdr-elements.js'
		}
	}
});
