# @cattn/hdr

A Svelte library for rendering element colors in HDR.

## Installation

```sh
npm i @cattn/hdr
```

# Usage

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

## Developing

After `npm install`, start a development server:

```sh
npm run dev
```

Library code lives in `src/lib`; demo/tests in `src/routes`.

## Building

To build the library:

```sh
npm run build
```
