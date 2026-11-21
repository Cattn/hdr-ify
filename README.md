# @cattn/hdr

A library for rendering element colors in HDR, for Svelte, web components, or plain JS.

| Import                                   | For                                               | Needs Svelte?        |
| ---------------------------------------- | ------------------------------------------------- | -------------------- |
| [`@cattn/hdr`](#svelte)                  | Svelte apps (`<HDRRouter>`, `{@attach hdrify()}`) | yes                  |
| [`@cattn/hdr/elements`](#web-components) | Any page/framework (`<hdr-router>`, `<hdr-ify>`)  | no (runtime bundled) |
| [`@cattn/hdr/core`](#plain-js)           | Plain JS / other frameworks (`applyHdr(el)`)      | no                   |

> Use one import per app

## Installation

```sh
npm i @cattn/hdr
```

# Svelte

Import everything from `@cattn/hdr`.

## Router

```typescript
import { HDRRouter } from '@cattn/hdr';
```

Place in `src/+layout.svelte`:

```svelte
<script lang="ts">
	import { HDRRouter } from '@cattn/hdr';
</script>

<!-- This should be at the top of your file! -->
<HDRRouter />
```

### Configuration

**Amplification**  
Adjust HDR intensity across platforms (default `1.8`).

```svelte
<HDRRouter amplification={1.5} />
```

**Delay**  
Apply an artificial delay before HDR styles (default `0` ms).

```svelte
<HDRRouter delay={100} />
```

## `hdrify`

Converts the element's `color` to HDR.

```svelte
<script lang="ts">
	import { hdrify } from '@cattn/hdr';
</script>

<h2 style="color: #00ff00" {@attach hdrify()}>The color is in HDR!!</h2>
```

## `hdrifyBackground`

Converts the element's `background-color` to HDR.

```svelte
<script lang="ts">
	import { hdrifyBackground } from '@cattn/hdr';
</script>

<h2 style="background-color: #00ff00" {@attach hdrifyBackground()}>The background is in HDR!!</h2>
```

## `hdrifyHex`

Pass a `$state` rune or a hex string to set HDR color dynamically.

```svelte
<script lang="ts">
	import { hdrifyHex } from '@cattn/hdr';

	let color = $state('#ff006f');
</script>

<h2 {@attach hdrifyHex(color)}>The color is in HDR!!</h2>
```

## `hdrifyBackgroundHex`

Pass a `$state` rune or a hex string to set HDR background dynamically.

```svelte
<script lang="ts">
	import { hdrifyBackgroundHex } from '@cattn/hdr';

	let color = $state('#ff006f');
</script>

<h2 {@attach hdrifyBackgroundHex(color)}>The background is in HDR!!</h2>
```

## `setHdrEnabled`

Set HDR on or off globally.

```svelte
<script lang="ts">
	import { setHdrEnabled } from '@cattn/hdr';
</script>

<button on:click={() => setHdrEnabled(false)}>Disable HDR</button>
<button on:click={() => setHdrEnabled(true)}>Enable HDR</button>
```

## `enableHDR`

Convenience helper to enable HDR globally.

```svelte
<script lang="ts">
	import { enableHDR } from '@cattn/hdr';
</script>

<button on:click={enableHDR}>Enable HDR</button>
```

## `disableHDR`

Convenience helper to disable HDR globally.

```svelte
<script lang="ts">
	import { disableHDR } from '@cattn/hdr';
</script>

<button on:click={disableHDR}>Disable HDR</button>
```

## `isHdrEnabled`

Read the current HDR state.

```svelte
<script lang="ts">
	import { isHdrEnabled } from '@cattn/hdr';

	const hdrOn = isHdrEnabled();
</script>

<p>HDR is {hdrOn ? 'enabled' : 'disabled'}.</p>
```

## `setLogEnabled`

Set logging on or off globally.

```svelte
<script lang="ts">
	import { setLogEnabled } from '@cattn/hdr';
</script>

<button on:click={() => setLogEnabled(false)}>Disable Logging</button>
<button on:click={() => setLogEnabled(true)}>Enable Logging</button>
```

## `enableLog`

Convenience helper to enable logging globally.

```svelte
<script lang="ts">
	import { enableLog } from '@cattn/hdr';
</script>

<button on:click={enableLog}>Enable Logging</button>
```

## `disableLog`

Convenience helper to disable logging globally.

```svelte
<script lang="ts">
	import { disableLog } from '@cattn/hdr';
</script>

<button on:click={disableLog}>Disable Logging</button>
```

## `isLogEnabled`

Read the current logging state.

```svelte
<script lang="ts">
	import { isLogEnabled } from '@cattn/hdr';

	const logOn = isLogEnabled();
</script>

<p>Logging is {logOn ? 'enabled' : 'disabled'}.</p>
```

# Web Components

Import from `@cattn/hdr/elements`. No Svelte needed.

## Setup

Import the package once, then place `<hdr-router>` at the top of `<body>`.

```html
<script type="module">
	import '@cattn/hdr/elements';
</script>

<hdr-router></hdr-router>
```

### Configuration

**Amplification** and **Delay** work the same as on `HDRRouter`.

```html
<hdr-router amplification="1.5" delay="100"></hdr-router>
```

## `<hdr-ify>`

Converts the text color to HDR.

```html
<h2 style="color: #00ff00"><hdr-ify>The color is in HDR!!</hdr-ify></h2>
```

Pass `color` to set it directly.

```html
<hdr-ify color="#ff006f">The color is in HDR!!</hdr-ify>
```

## `<hdr-ify background>`

Converts the background color to HDR. Displays as a block by default.

```html
<hdr-ify background style="background-color: #00ff00">The background is in HDR!!</hdr-ify>
<hdr-ify background color="#ff006f">The background is in HDR!!</hdr-ify>
```

## HDR & Logging

The same [HDR and logging helpers](#sethdrenabled) as in Svelte are exported here too.

```html
<script type="module">
	import { disableHDR } from '@cattn/hdr/elements';

	disableHDR();
</script>
```

# Plain JS

Import from `@cattn/hdr/core`. No Svelte needed.

## `applyHdr`

Converts an element's color to HDR. Returns a function that removes it.

```ts
import { applyHdr } from '@cattn/hdr/core';

const stop = applyHdr(element);
const stopBg = applyHdr(element, { mode: 'background', color: '#ff006f' });
```

## HDR & Logging

The same [HDR and logging helpers](#sethdrenabled) as in Svelte are exported here too.

```ts
import { disableHDR } from '@cattn/hdr/core';

disableHDR();
```

# Colors

Any CSS color works: hex, `rgb()`, `hsl()`, `oklch()`, named colors, and more.

Text colors update automatically, including `:hover` and inherited colors. Background colors from a class or stylesheet are only read once, so pass the color directly if it changes.

# Development

## Developing

After `npm install`, start a development server:

```sh
npm run dev
```

Library code lives in `src/lib`, web components in `src/elements`, and demos in `src/routes` (`/elements` for web components).

## Building

To build the library:

```sh
npm run build
```
