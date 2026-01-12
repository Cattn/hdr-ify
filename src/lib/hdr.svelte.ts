import type { Attachment } from 'svelte/attachments';
import { registerElement, unregisterElement } from './watchermodule.js';
import { convertColor, rgb2hex, colorToHex } from './p3h.js';
import { hdrEnabled } from './config.js';

function setupAttachment(
	element: Element,
	update: () => void,
	attr: string,
	onDisable?: () => void,
	onEnable?: () => void
) {
	const el = element as HTMLElement;
	let registered = false;
	let timeout = 0;
	const stopTimer = () => {
		if (timeout) {
			clearTimeout(timeout);
			timeout = 0;
		}
	};
	const apply = () => {
		update();
		if (!registered) {
			registerElement(element, update);
			registered = true;
		}
	};
	const clear = () => {
		stopTimer();
		if (registered) {
			unregisterElement(element);
			registered = false;
		}
		el.removeAttribute(attr);
		el.style.removeProperty('--hex');
		el.style.removeProperty('--snow');
		el.style.removeProperty('--r');
		el.style.removeProperty('--g');
		el.style.removeProperty('--b');
		el.style.removeProperty('--a');
	};
	const handle = (enabled: boolean) => {
		stopTimer();
		if (!enabled) {
			clear();
			if (onDisable) onDisable();
			return;
		}
		if (onEnable) onEnable();
		const root = document.documentElement;
		const delayVar = getComputedStyle(root).getPropertyValue('--hdrify-delay').trim();
		const delayMs = Number(delayVar || 0);
		const run = () => {
			apply();
		};
		if (delayMs > 0) timeout = window.setTimeout(run, delayMs);
		else run();
	};
	const unsubscribe = hdrEnabled.subscribe(handle);
	return () => {
		clear();
		unsubscribe();
	};
}

export function hdrifyHex(hex: string): Attachment {
	return (element) => {
		$effect(() => {
			const update = () => {
				const computedStyle = getComputedStyle(element);
				const chosen = computedStyle.color;
				console.log('Computed background-color:', chosen);
				console.log(hex);
				console.log(element);
				const p3 = convertColor(hex);
				const el = element as HTMLElement;
				el.style.setProperty('--hex', hex);
				el.setAttribute('data-hdrify', '');
				if (p3) {
					el.style.setProperty('--snow', p3.color);
					el.style.setProperty('--r', p3.r);
					el.style.setProperty('--g', p3.g);
					el.style.setProperty('--b', p3.b);
					el.style.setProperty('--a', p3.a);
				}
			};
			return setupAttachment(
				element,
				update,
				'data-hdrify',
				() => ((element as HTMLElement).style.color = hex),
				() => ((element as HTMLElement).style.color = '')
			);
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
				const hex = rgb2hex(chosen);
				const p3 = convertColor(chosen);
				const el = element as HTMLElement;
				el.style.setProperty('--hex', hex);
				el.setAttribute('data-hdrify', '');
				if (p3) {
					el.style.setProperty('--snow', p3.color);
					el.style.setProperty('--r', p3.r);
					el.style.setProperty('--g', p3.g);
					el.style.setProperty('--b', p3.b);
					el.style.setProperty('--a', p3.a);
				}
			};
			return setupAttachment(element, update, 'data-hdrify');
		});
	};
}

export function hdrifyBackground(): Attachment {
	return (element) => {
		$effect(() => {
			const update = () => {
				const el = element as HTMLElement;
				const inlineBg = el.style.backgroundColor;
				const chosen = inlineBg || getComputedStyle(element).backgroundColor;
				console.log('Computed background-color:', chosen);
				console.log(element);
				const hex = colorToHex(chosen) ?? '';
				const p3 = convertColor(chosen);
				el.style.setProperty('--hex', hex);
				console.log('The converted hex is:', hex);
				console.log('The converted p3 is:', p3);
				el.setAttribute('data-hdrifybg', '');
				if (p3) {
					el.style.setProperty('--snow', p3.color);
					el.style.setProperty('--r', p3.r);
					el.style.setProperty('--g', p3.g);
					el.style.setProperty('--b', p3.b);
					el.style.setProperty('--a', p3.a);
				}
			};
			return setupAttachment(element, update, 'data-hdrifybg');
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
				const p3 = convertColor(hex);
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
			return setupAttachment(
				element,
				update,
				'data-hdrifybg',
				() => ((element as HTMLElement).style.backgroundColor = hex),
				() => ((element as HTMLElement).style.backgroundColor = '')
			);
		});
	};
}
