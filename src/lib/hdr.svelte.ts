import type { Attachment } from 'svelte/attachments';
import { applyHdr } from './core/hdr.js';

export const hdrify = (): Attachment => (el) => applyHdr(el);

export const hdrifyBackground = (): Attachment => (el) => applyHdr(el, { mode: 'background' });

export const hdrifyHex =
	(hex: string): Attachment =>
	(el) =>
		applyHdr(el, { color: hex });

export const hdrifyBackgroundHex =
	(hex: string): Attachment =>
	(el) =>
		applyHdr(el, { mode: 'background', color: hex });
