# @cattn/hdr

A Svelte library for HDR image processing and manipulation.

## Installation

```sh
npm install @cattn/hdr
```

## Usage

```typescript
import { SomeComponent } from '@cattn/hdr';
```

```svelte
<script>
  import { SomeComponent } from '@cattn/hdr';
</script>

<SomeComponent />
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

Everything inside `src/lib` is part of your library, everything inside `src/routes` can be used as a showcase or preview app.

## Building

To build your library:

```sh
npm pack
```

To create a production version of your showcase app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

## Publishing

To publish your library to [npm](https://www.npmjs.com):

```sh
npm run build
npm publish
```
