# @cattn/hdr

A Svelte library for rendering element colors in HDR!

## Installation

```sh
npm i @cattn/hdr
```

# Usage

## Router

```typescript
import { HDRRouter } from '@cattn/hdr';
```

src/+layout.svelte

```svelte
<script lang="ts">
	import { HDRRouter } from '@cattn/hdr';
</script>

<!-- This should be at the top of your file! -->
<HDRRouter />
```

### Configuration

`Amplification`

Amplification is an optional prop you can pass in to increase or decrease the intensity in which HDR appears across various platforms. The default value is `1.8`.

```svelte
<HDRRouter amplification={1.5} />
```

## `hdrify`

Whatever `color:` is on the element will automatically be converted to HDR. It's added here via `style=` as an example.

```svelte
<script lang="ts">
	import { hdrify } from '@cattn/hdr';
</script>

<h2 style="color: #00ff00" {@attach hdrify()}>The color is in HDR!!</h2>
```

## `hdrifyBackground`

Whatever `background-color:` is on the element will automatically be converted to HDR. It's added here via `style=` as an example.

```svelte
<script lang="ts">
	import { hdrifyBackground } from '@cattn/hdr';
</script>

<h2 style="background-color: #00ff00" {@attach hdrifyBackground()}>The background is in HDR!!</h2>
```

## `hdrifyHex`

If you'd like to dynamically change the color, please pass it in with a `$state` rune. Otherwise, you can pass in a hex string.

```svelte
<script lang="ts">
	import { hdrifyHex } from '@cattn/hdr';

	let color = $state('#ff006f');
</script>

<h2 {@attach hdrifyHex(color)}>The color is in HDR!!</h2>
```

## `hdrifyBackgroundHex`

If you'd like to dynamically change the background color, please pass it in with a `$state` rune. Otherwise, you can pass in a hex string.

```svelte
<script lang="ts">
	import { hdrifyBackgroundHex } from '@cattn/hdr';

	let color = $state('#ff006f');
</script>

<h2 {@attach hdrifyBackgroundHex(color)}>The background is in HDR!!</h2>
```

## Developing

Once you've created a project and installed dependencies with `npm install`, start a development server:

```sh
npm run dev
```

Everything inside `src/lib` is the library code, everything in `src/routes` is for the demo/tests.

## Building

To build the library:

```sh
npm run build
```
