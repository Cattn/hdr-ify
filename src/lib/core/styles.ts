export const STYLE_ID = 'hdrify-styles';

export const hdrCss: string = `
:root {
	--amplification: 1.8;
}

:where([data-hdrify-watch]) {
	transition: color 1ms;
}

:where(hdr-ify[background]) {
	display: block;
}

@media all and (dynamic-range: high) and (color-gamut: p3) {
	[data-hdrify] {
		-webkit-text-fill-color: transparent;
		-webkit-background-clip: text;
		background-clip: text;
		background-color: color(
			display-p3 calc(var(--r) * var(--amplification)) calc(var(--g) * var(--amplification))
				calc(var(--b) * var(--amplification)) / var(--a)
		);
	}
}

@media not all and (dynamic-range: high) and (color-gamut: p3) {
	[data-hdrify] {
		-webkit-text-fill-color: transparent;
		-webkit-background-clip: text;
		background-clip: text;
		background-color: var(--hex);
	}
}

/* Safari/WebKit specific HDR brightness boost (excludes Chromium) */
@supports (background: -webkit-named-image(i)) {
	@supports (dynamic-range: high) {
		[data-hdrify] {
			filter: brightness(var(--amplification));
			backdrop-filter: brightness(0) opacity(0);
			background-color: var(--snow) !important;
		}
	}

	@media all and (dynamic-range: high) and (color-gamut: p3) {
		[data-hdrify] {
			filter: brightness(var(--amplification));
			backdrop-filter: brightness(0) opacity(0);
			background-color: var(--snow);
		}
	}

	@supports not (color: color(display-p3 100% 100% 100%)) {
		[data-hdrify] {
			filter: brightness(10);
			backdrop-filter: brightness(10) opacity(0);
			background-color: var(--hex);
		}
	}
}

@media all and (dynamic-range: high) and (color-gamut: p3) {
	[data-hdrifybg] {
		background-color: color(
			display-p3 calc(var(--r) * var(--amplification)) calc(var(--g) * var(--amplification))
				calc(var(--b) * var(--amplification)) / var(--a)
		) !important;
	}
}

@media not all and (dynamic-range: high) and (color-gamut: p3) {
	[data-hdrifybg] {
		background-color: var(--hex);
	}
}

/* Safari/WebKit specific HDR brightness boost (excludes Chromium) */
@supports (background: -webkit-named-image(i)) {
	@supports (dynamic-range: high) {
		[data-hdrifybg] {
			position: relative;
			isolation: isolate;
			z-index: 0;
			background-color: transparent !important;
		}
		[data-hdrifybg]::before {
			content: '';
			position: absolute;
			inset: 0;
			background-color: var(--snow) !important;
			backdrop-filter: brightness(0) opacity(0);
			filter: brightness(var(--amplification));
			pointer-events: none;
			z-index: -1;
			border-radius: inherit;
		}
	}

	@media all and (dynamic-range: high) and (color-gamut: p3) {
		[data-hdrifybg] {
			position: relative;
			isolation: isolate;
			z-index: 0;
			background-color: transparent !important;
		}
		[data-hdrifybg]::before {
			content: '';
			position: absolute;
			inset: 0;
			background-color: var(--snow) !important;
			backdrop-filter: brightness(0) opacity(0);
			filter: brightness(var(--amplification));
			pointer-events: none;
			z-index: -1;
			border-radius: inherit;
		}
	}

	@supports not (color: color(display-p3 100% 100% 100%)) {
		[data-hdrifybg] {
			filter: brightness(10);
			backdrop-filter: brightness(10) opacity(0);
			background-color: var(--hex);
		}
	}
}
`;

export function ensureStyles() {
	if (typeof document === 'undefined') return;
	if (document.getElementById(STYLE_ID)) return;
	const style = document.createElement('style');
	style.id = STYLE_ID;
	style.textContent = hdrCss;
	document.head.appendChild(style);
}

export function setRouterVars(amplification: number, delay: number) {
	if (typeof document === 'undefined') return;
	const root = document.documentElement.style;
	root.setProperty('--amplification', String(amplification));
	root.setProperty('--hdrify-delay', String(delay));
}
