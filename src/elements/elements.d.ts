export * from '../lib/core/index.js';

export interface HdrRouterElement extends HTMLElement {
	amplification: number | null;
	delay: number | null;
}

export interface HdrIfyElement extends HTMLElement {
	color: string | null;
	background: boolean;
}

export declare const HdrRouterElement: { new (): HdrRouterElement; prototype: HdrRouterElement };
export declare const HdrIfyElement: { new (): HdrIfyElement; prototype: HdrIfyElement };

declare global {
	interface HTMLElementTagNameMap {
		'hdr-router': HdrRouterElement;
		'hdr-ify': HdrIfyElement;
	}
}
