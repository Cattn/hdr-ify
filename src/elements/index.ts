import HdrRouter from './HdrRouter.svelte';
import HdrIfy from './HdrIfy.svelte';
import { ensureStyles } from '../lib/core/styles.js';

ensureStyles();

export const HdrRouterElement = (HdrRouter as unknown as { element: CustomElementConstructor })
	.element;
export const HdrIfyElement = (HdrIfy as unknown as { element: CustomElementConstructor }).element;

export * from '../lib/core/index.js';
