// the original toP3 code was from https://github.com/pugson/hexp3. I've since modified it, but thank you to the original author!

export const toP3 = (
	color: string | null | undefined
): { color: string; r: string; g: string; b: string; a: string } | undefined => {
	if (!color) return undefined;

	const clamp255 = (v: number) => Math.min(255, Math.max(0, v));
	const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

	if (color?.toLowerCase().includes('color(display-p3')) {
		const m = color.match(/color\(display-p3\s+([0-9.]+)\s+([0-9.]+)\s+([0-9.]+)\)/i);
		if (m) {
			const r = clamp01(parseFloat(m[1])).toFixed(6);
			const g = clamp01(parseFloat(m[2])).toFixed(6);
			const b = clamp01(parseFloat(m[3])).toFixed(6);
			return { color, r, g, b, a: '1.000000' };
		}
		return { color, r: '0', g: '0', b: '0', a: '1.000000' };
	}

	const hexColorRegExp = /^#([0-9a-fA-F]{8}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/;

	let red = 0;
	let green = 0;
	let blue = 0;
	let alpha = 1;

	if (hexColorRegExp.test(color)) {
		const match = color.match(hexColorRegExp);
		if (match) {
			const hex = match[1];
			if (hex.length === 6 || hex.length === 8) {
				const step = hex.length === 8 ? 2 : hex.length / 3;
				red = parseInt(hex.slice(0, step), 16);
				green = parseInt(hex.slice(step, 2 * step), 16);
				blue = parseInt(hex.slice(2 * step, 3 * step), 16);
				alpha = hex.length === 8 ? parseInt(hex.slice(6, 8), 16) / 255 : 1;
			} else if (hex.length === 3 || hex.length === 4) {
				red = parseInt(hex[0] + hex[0], 16);
				green = parseInt(hex[1] + hex[1], 16);
				blue = parseInt(hex[2] + hex[2], 16);
				alpha = hex.length === 4 ? parseInt(hex[3] + hex[3], 16) / 255 : 1;
			}
		}
	} else {
		const parsed = parseRgbLike(color);
		if (!parsed) return { color: 'rgba(0, 0, 0, 0)', r: '0', g: '0', b: '0', a: '0' };
		red = parsed.red;
		green = parsed.green;
		blue = parsed.blue;
		alpha = parsed.alpha;
	}

	const r = (clamp255(red) / 255).toFixed(6);
	const g = (clamp255(green) / 255).toFixed(6);
	const b = (clamp255(blue) / 255).toFixed(6);
	const a = clamp01(alpha).toFixed(6);

	return { color: `color(display-p3 ${r} ${g} ${b})`, r, g, b, a };
};

export const rgbToP3 = (
	rgb: string
): { color: string; r: string; g: string; b: string; a: string } => {
	const clamp255 = (v: number) => Math.min(255, Math.max(0, v));
	const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

	const parsed = parseRgbLike(rgb);
	if (!parsed) return { color: 'rgba(0, 0, 0, 0)', r: '0', g: '0', b: '0', a: '0' };

	const r = (clamp255(parsed.red) / 255).toFixed(6);
	const g = (clamp255(parsed.green) / 255).toFixed(6);
	const b = (clamp255(parsed.blue) / 255).toFixed(6);
	const a = clamp01(parsed.alpha).toFixed(6);

	return { color: `color(display-p3 ${r} ${g} ${b})`, r, g, b, a };
};

function parseRgbLike(
	input: string
): { red: number; green: number; blue: number; alpha: number } | null {
	if (!input) return null;
	const s = input.trim().toLowerCase();
	const m = s.match(/^rgba?\((.*)\)$/i);
	if (!m) return null;
	const body = m[1].replace(/\s*\/\s*/g, ',');
	const parts = body.includes(',')
		? body
				.split(',')
				.map((p) => p.trim())
				.filter(Boolean)
		: body.trim().split(/\s+/);
	if (parts.length < 3) return null;

	const toByte = (v: string) => {
		if (v.endsWith('%')) return Math.round(((parseFloat(v) || 0) * 255) / 100);
		return Math.round(parseFloat(v) || 0);
	};
	const toAlpha = (v: string | undefined) => {
		if (v == null) return 1;
		const t = v.trim();
		if (t.endsWith('%')) return Math.max(0, Math.min(1, (parseFloat(t) || 0) / 100));
		const n = parseFloat(t);
		if (Number.isNaN(n)) return 1;
		return Math.max(0, Math.min(1, n));
	};

	const red = toByte(parts[0]);
	const green = toByte(parts[1]);
	const blue = toByte(parts[2]);
	const alpha = toAlpha(parts[3]);
	return { red, green, blue, alpha };
}

export function rgb2hex(rgb: string): string | null {
	const match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
	if (!match) return null;

	function hex(x: string) {
		return ('0' + parseInt(x).toString(16)).slice(-2);
	}
	return '#' + hex(match[1]) + hex(match[2]) + hex(match[3]);
}

export function hex2rgb(hex: string): string | null {
	const match = hex.match(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/);
	if (!match) return null;

	const hexValue = match[1];
	let r, g, b;

	if (hexValue.length === 3) {
		r = parseInt(hexValue[0] + hexValue[0], 16);
		g = parseInt(hexValue[1] + hexValue[1], 16);
		b = parseInt(hexValue[2] + hexValue[2], 16);
	} else {
		r = parseInt(hexValue.slice(0, 2), 16);
		g = parseInt(hexValue.slice(2, 4), 16);
		b = parseInt(hexValue.slice(4, 6), 16);
	}

	return `rgb(${r}, ${g}, ${b})`;
}

export function convertColor(
	color: string
): { color: string; r: string; g: string; b: string; a: string } | null | undefined {
	if (!color) return null;

	const trimmedColor = color.trim();

	if (trimmedColor.match(/^rgb\(/i)) {
		const hexColor = rgb2hex(trimmedColor);
		if (!hexColor) return null;
		return toP3(hexColor);
	}

	if (trimmedColor.match(/^#[0-9a-fA-F]{3,6}$/)) {
		return toP3(trimmedColor);
	}

	return null;
}

function reverseToP3(p3r: number, p3g: number, p3b: number): string {
	const toHex = (v: number) => {
		let rgb = v * 255;
		if (rgb > 0 && rgb < 1) rgb = 1;
		const clamped = Math.max(0, Math.min(255, Math.round(rgb)));
		return ('0' + clamped.toString(16)).slice(-2);
	};
	
	const r = toHex(p3r);
	const g = toHex(p3g);
	const b = toHex(p3b);
	return `#${r}${g}${b}`;
}

export function colorToHex(color: string): string | null {
	if (!color) return null;
	const s = color.trim();
	const hexFull = /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;
	const hexShort = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{4})$/;
	if (hexFull.test(s)) {
		const h = s.slice(1);
		if (h.length === 8) return `#${h.slice(0, 6)}`;
		return `#${h}`;
	}
	if (hexShort.test(s)) {
		const h = s.slice(1);
		const r = h[0] + h[0];
		const g = h[1] + h[1];
		const b = h[2] + h[2];
		return `#${r}${g}${b}`;
	}
	if (/^rgba?\(/i.test(s)) {
		const parsed = parseRgbLike(s);
		if (!parsed) return null;
		const toHex = (n: number) => ('0' + Math.max(0, Math.min(255, Math.round(n))).toString(16)).slice(-2);
		return `#${toHex(parsed.red)}${toHex(parsed.green)}${toHex(parsed.blue)}`;
	}
	if (/^color\(display-p3\s+/i.test(s)) {
		const m = s.match(/color\(display-p3\s+([0-9.]+)\s+([0-9.]+)\s+([0-9.]+)\)/i);
		if (m) {
			const r = parseFloat(m[1]);
			const g = parseFloat(m[2]);
			const b = parseFloat(m[3]);
			return reverseToP3(r, g, b);
		}
	}
	try {
		if (typeof document !== 'undefined') {
			const el = document.createElement('span');
			el.style.position = 'absolute';
			el.style.opacity = '0';
			el.style.pointerEvents = 'none';
			el.style.backgroundColor = s;
			document.body.appendChild(el);
			const resolved = getComputedStyle(el).backgroundColor;
			document.body.removeChild(el);
			if (resolved) {
				const parsed = parseRgbLike(resolved);
				if (parsed) {
					const toHex = (n: number) => ('0' + Math.max(0, Math.min(255, Math.round(n))).toString(16)).slice(-2);
					return `#${toHex(parsed.red)}${toHex(parsed.green)}${toHex(parsed.blue)}`;
				}
			}
		}
	} catch (e) {
		console.error(e);
		return null;
	}
	return null;
}
