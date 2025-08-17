import type { Attachment } from 'svelte/attachments';
import { registerElement, unregisterElement } from './watchermodule.js';
import { rgb2hex, toP3 } from './p3h.js';

export function hdrifyHex(hex: string): Attachment {
	return (element) => {
		$effect(() => {
			const update = () => {
				const computedStyle = getComputedStyle(element);
				const chosen = computedStyle.color;
				console.log('Computed background-color:', chosen);
				console.log(hex);
				console.log(element);
				const p3 = toP3(hex);
				const el = element as HTMLElement;
				el.style.setProperty('--hex', hex);
				el.setAttribute('data-hdrifyhex', '');
				if (p3) {
					el.style.setProperty('--snow', p3.color);
					el.style.setProperty('--r', p3.r);
					el.style.setProperty('--g', p3.g);
					el.style.setProperty('--b', p3.b);
					el.style.setProperty('--a', p3.a);
				}
			};

			update();
			registerElement(element, update);
			return () => unregisterElement(element);
		});
	};
}

export function hdrify(): Attachment {
	return (element) => {
		$effect(() => {
			const update = () => {
				const computedStyle = getComputedStyle(element);
				const chosen = computedStyle.color;
				console.log('Computed background-color:', chosen);
				console.log(element);
				const p3 = toP3(chosen);
				const el = element as HTMLElement;
				el.style.setProperty('--hex', chosen);
				el.setAttribute('data-hdrify', '');
				if (p3) {
					el.style.setProperty('--snow', p3.color);
					el.style.setProperty('--r', p3.r);
					el.style.setProperty('--g', p3.g);
					el.style.setProperty('--b', p3.b);
					el.style.setProperty('--a', p3.a);
				}
			};

			update();
			registerElement(element, update);
			return () => unregisterElement(element);
		});
	};
}

export function hdrifyBackground(): Attachment {
	return (element) => {
		$effect(() => {
			const update = () => {
				const computedStyle = getComputedStyle(element);
				const chosen = computedStyle.backgroundColor;
				console.log('Computed background-color:', chosen);
				console.log(element);
				const hex = rgb2hex(chosen);
				const p3 = toP3(hex);
				const el = element as HTMLElement;
				el.style.removeProperty('background-color');
				if (hex) {
					el.style.setProperty('--hex', hex);
				}
				el.setAttribute('data-hdrifybg', '');
				if (p3) {
					el.style.setProperty('--snow', p3.color);
					el.style.setProperty('--r', p3.r);
					el.style.setProperty('--g', p3.g);
					el.style.setProperty('--b', p3.b);
					el.style.setProperty('--a', p3.a);
				}
			};

			update();
			registerElement(element, update);
			return () => unregisterElement(element);
		});
	};
}

export function hdrifyBackgroundHex(hex: string): Attachment {
	return (element) => {
		$effect(() => {
			const update = () => {
				const computedStyle = getComputedStyle(element);
				const chosen = computedStyle.backgroundColor;
				console.log('Computed background-color:', chosen);
				console.log(element);
				const p3 = toP3(hex);
				const el = element as HTMLElement;
				el.style.setProperty('--hex', hex);
				el.setAttribute('data-hdrifybg', '');
				if (p3) {
					el.style.setProperty('--snow', p3.color);
					el.style.setProperty('--r', p3.r);
					el.style.setProperty('--g', p3.g);
					el.style.setProperty('--b', p3.b);
					el.style.setProperty('--a', p3.a);
				}
			};

			update();
			registerElement(element, update);
			return () => unregisterElement(element);
		});
	};
}
