import { registerElement, unregisterElement } from './watchermodule.js';
import { convertColor, colorToHex } from './p3h.js';
import { hdrEnabled, isLogEnabled } from './config.js';
import { ensureStyles } from './styles.js';

export type HdrMode = 'text' | 'background';

export interface HdrOptions {
	mode?: HdrMode;
	color?: string;
}

export type Cleanup = () => void;

const CSS_VARS = ['--hex', '--snow', '--r', '--g', '--b', '--a'] as const;

const WATCH_ATTR = 'data-hdrify-watch';

function setVar(el: HTMLElement, name: string, value: string | null) {
	if (value == null || value === '') {
		if (el.style.getPropertyValue(name) !== '') el.style.removeProperty(name);
	} else if (el.style.getPropertyValue(name) !== value) {
		el.style.setProperty(name, value);
	}
}

function writeVars(el: HTMLElement, attr: string, hex: string | null, chosen: string) {
	const p3 = convertColor(chosen);
	if (isLogEnabled()) {
		console.log('Computed color:', chosen);
		console.log('The converted hex is:', hex);
		console.log('The converted p3 is:', p3);
		console.log(el);
	}
	setVar(el, '--hex', hex);
	if (!el.hasAttribute(attr)) el.setAttribute(attr, '');
	if (p3) {
		setVar(el, '--snow', p3.color);
		setVar(el, '--r', p3.r);
		setVar(el, '--g', p3.g);
		setVar(el, '--b', p3.b);
		setVar(el, '--a', p3.a);
	}
}

export function applyHdr(element: Element, options: HdrOptions = {}): Cleanup {
	const el = element as HTMLElement;
	const { mode = 'text', color } = options;
	const attr = mode === 'background' ? 'data-hdrifybg' : 'data-hdrify';
	const styleProp = mode === 'background' ? 'backgroundColor' : 'color';

	ensureStyles();

	let sourceBg: string | null = null;

	const update = () => {
		if (color) {
			writeVars(el, attr, color, color);
		} else if (mode === 'background') {
			const inline = el.style.backgroundColor;
			if (inline) sourceBg = inline;
			else if (sourceBg === null || !el.hasAttribute(attr)) {
				sourceBg = getComputedStyle(el).backgroundColor;
			}
			writeVars(el, attr, colorToHex(sourceBg) ?? '', sourceBg);
		} else {
			const chosen = getComputedStyle(el).color;
			if (!el.hasAttribute(WATCH_ATTR)) el.setAttribute(WATCH_ATTR, '');
			writeVars(el, attr, colorToHex(chosen), chosen);
		}
	};

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
			registerElement(el, update);
			registered = true;
		}
	};
	const clear = () => {
		stopTimer();
		if (registered) {
			unregisterElement(el);
			registered = false;
		}
		el.removeAttribute(attr);
		el.removeAttribute(WATCH_ATTR);
		for (const v of CSS_VARS) el.style.removeProperty(v);
	};
	const handle = (enabled: boolean) => {
		stopTimer();
		if (!enabled) {
			clear();
			if (color) el.style[styleProp] = color;
			return;
		}
		if (color) el.style[styleProp] = '';
		const delayVar = getComputedStyle(document.documentElement)
			.getPropertyValue('--hdrify-delay')
			.trim();
		const delayMs = Number(delayVar || 0);
		if (delayMs > 0) timeout = window.setTimeout(apply, delayMs);
		else apply();
	};

	const unsubscribe = hdrEnabled.subscribe(handle);
	return () => {
		clear();
		unsubscribe();
	};
}

export const hdrify = (el: Element) => applyHdr(el);
export const hdrifyBackground = (el: Element) => applyHdr(el, { mode: 'background' });
export const hdrifyHex = (el: Element, hex: string) => applyHdr(el, { color: hex });
export const hdrifyBackgroundHex = (el: Element, hex: string) =>
	applyHdr(el, { mode: 'background', color: hex });
