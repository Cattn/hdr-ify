// Reexport your entry components here
export { default as HDRRouter } from './HDRRouter.svelte';
export { hdrify, hdrifyBackground, hdrifyBackgroundHex, hdrifyHex } from './hdr.svelte.js';
export { applyHdr, type HdrMode, type HdrOptions } from './core/hdr.js';
export { toP3, rgbToP3, rgb2hex, hex2rgb, convertColor, colorToHex } from './core/p3h.js';
export {
	hdrEnabled,
	setHdrEnabled,
	enableHDR,
	disableHDR,
	isHdrEnabled,
	logEnabled,
	setLogEnabled,
	enableLog,
	disableLog,
	isLogEnabled
} from './core/config.js';
