// the original toP3 code was from https://github.com/pugson/hexp3. I've since modified it, but thank you to the original author!

export type P3Color = { color: string; r: string; g: string; b: string; a: string };
type Rgba = { red: number; green: number; blue: number; alpha: number };

const TRANSPARENT: P3Color = { color: 'rgba(0, 0, 0, 0)', r: '0', g: '0', b: '0', a: '0' };
const HEX_RE = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;
const P3_RE = /^color\(\s*display-p3\s/i;

const clamp255 = (v: number) => Math.min(255, Math.max(0, v));
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const byteToHex = (n: number) => ('0' + clamp255(Math.round(n)).toString(16)).slice(-2);

function rgbaToP3({ red, green, blue, alpha }: Rgba): P3Color {
	const r = (clamp255(red) / 255).toFixed(6);
	const g = (clamp255(green) / 255).toFixed(6);
	const b = (clamp255(blue) / 255).toFixed(6);
	const a = clamp01(alpha).toFixed(6);
	return { color: `color(display-p3 ${r} ${g} ${b})`, r, g, b, a };
}

function parseHex(color: string): Rgba | null {
	const match = color.trim().match(HEX_RE);
	if (!match) return null;
	let hex = match[1];
	if (hex.length <= 4) hex = [...hex].map((c) => c + c).join('');
	return {
		red: parseInt(hex.slice(0, 2), 16),
		green: parseInt(hex.slice(2, 4), 16),
		blue: parseInt(hex.slice(4, 6), 16),
		alpha: hex.length === 8 ? parseInt(hex.slice(6, 8), 16) / 255 : 1
	};
}

function parseP3(color: string): { r: number; g: number; b: number; a: number } | null {
	const m = color
		.trim()
		.match(
			/^color\(\s*display-p3\s+([\d.]+%?)\s+([\d.]+%?)\s+([\d.]+%?)\s*(?:\/\s*([\d.]+%?)\s*)?\)$/i
		);
	if (!m) return null;
	const num = (v: string) => (v.endsWith('%') ? parseFloat(v) / 100 : parseFloat(v));
	return { r: num(m[1]), g: num(m[2]), b: num(m[3]), a: m[4] == null ? 1 : num(m[4]) };
}

export const toP3 = (color: string | null | undefined): P3Color | undefined => {
	if (!color) return undefined;

	if (P3_RE.test(color.trim())) {
		const p3 = parseP3(color);
		if (!p3) return { color, r: '0', g: '0', b: '0', a: '1.000000' };
		return {
			color,
			r: clamp01(p3.r).toFixed(6),
			g: clamp01(p3.g).toFixed(6),
			b: clamp01(p3.b).toFixed(6),
			a: clamp01(p3.a).toFixed(6)
		};
	}

	const parsed = parseHex(color) ?? parseRgbLike(color);
	return parsed ? rgbaToP3(parsed) : TRANSPARENT;
};

export const rgbToP3 = (rgb: string): P3Color => {
	const parsed = parseRgbLike(rgb);
	return parsed ? rgbaToP3(parsed) : TRANSPARENT;
};

function parseRgbLike(input: string): Rgba | null {
	if (!input) return null;
	const s = input.trim().toLowerCase();
	const m = s.match(/^rgba?\((.*)\)$/i);
	if (!m) return null;
	const parts = m[1].split(/\s*[,/]\s*|\s+/).filter(Boolean);
	if (parts.length < 3 || parts.length > 4) return null;
	if (!parts.every((p) => /^-?[\d.]+%?$/.test(p))) return null;

	const toByte = (v: string) => {
		if (v.endsWith('%')) return Math.round(((parseFloat(v) || 0) * 255) / 100);
		return Math.round(parseFloat(v) || 0);
	};
	const toAlpha = (v: string | undefined) => {
		if (v == null) return 1;
		const n = v.endsWith('%') ? (parseFloat(v) || 0) / 100 : parseFloat(v);
		return Number.isNaN(n) ? 1 : clamp01(n);
	};

	return {
		red: toByte(parts[0]),
		green: toByte(parts[1]),
		blue: toByte(parts[2]),
		alpha: toAlpha(parts[3])
	};
}

let ctx: CanvasRenderingContext2D | null | undefined;
const resolved = new Map<string, Rgba | null>();
const MAX_CACHE = 256;

function resolveColor(input: string): Rgba | null {
	if (typeof document === 'undefined') return null;
	const key = input.trim();
	const cached = resolved.get(key);
	if (cached !== undefined) return cached;

	let result: Rgba | null = null;
	if (typeof CSS === 'undefined' || CSS.supports('color', key)) {
		if (ctx === undefined) {
			const canvas = document.createElement('canvas');
			canvas.width = canvas.height = 1;
			ctx = canvas.getContext('2d', { willReadFrequently: true });
		}
		if (ctx) {
			ctx.clearRect(0, 0, 1, 1);
			ctx.fillStyle = key;
			ctx.fillRect(0, 0, 1, 1);
			const [red, green, blue, a] = ctx.getImageData(0, 0, 1, 1).data;
			result = { red, green, blue, alpha: a / 255 };
		}
	}

	if (resolved.size >= MAX_CACHE) resolved.clear();
	resolved.set(key, result);
	return result;
}

export function rgb2hex(rgb: string): string | null {
	const match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
	if (!match) return null;
	return '#' + byteToHex(+match[1]) + byteToHex(+match[2]) + byteToHex(+match[3]);
}

export function hex2rgb(hex: string): string | null {
	const match = hex.match(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/);
	if (!match) return null;
	const parsed = parseHex(hex)!;
	return `rgb(${parsed.red}, ${parsed.green}, ${parsed.blue})`;
}

export function convertColor(color: string): P3Color | null | undefined {
	if (!color) return null;
	const s = color.trim();
	if (P3_RE.test(s)) return toP3(s);
	const parsed = parseHex(s) ?? parseRgbLike(s) ?? resolveColor(s);
	return parsed ? rgbaToP3(parsed) : null;
}

function reverseToP3(p3r: number, p3g: number, p3b: number): string {
	const toHex = (v: number) => {
		let rgb = v * 255;
		if (rgb > 0 && rgb < 1) rgb = 1;
		return byteToHex(rgb);
	};
	return `#${toHex(p3r)}${toHex(p3g)}${toHex(p3b)}`;
}

export function colorToHex(color: string): string | null {
	if (!color) return null;
	const s = color.trim();
	if (P3_RE.test(s)) {
		const p3 = parseP3(s);
		return p3 ? reverseToP3(p3.r, p3.g, p3.b) : null;
	}
	const parsed = parseHex(s) ?? parseRgbLike(s) ?? resolveColor(s);
	if (!parsed) return null;
	return `#${byteToHex(parsed.red)}${byteToHex(parsed.green)}${byteToHex(parsed.blue)}`;
}
