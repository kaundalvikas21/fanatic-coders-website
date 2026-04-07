# Agency Website (Astro + Svelte)

Marketing/agency website built with Astro, Svelte components, and Tailwind.

## Prerequisites

- Node.js 22 recommended (`.nvmrc` is included)
- npm 10+

## Local Development

1. Install dependencies:

```bash
npm ci
```

2. Validate local setup:

```bash
npm run check:setup
```

3. Start development server:

```bash
npm run dev
```

By default Astro serves at `http://localhost:4321`.

## Build and Preview

Build production output:

```bash
npm run build
```

Preview the built site locally:

```bash
npm run preview
```

## Useful Scripts

- `npm run check:setup` - Validates Node/npm range and Astro CLI availability
- `npm run dev` - Starts local dev server
- `npm run build` - Creates production build in `dist/`
- `npm run preview` - Serves production build locally

## Troubleshooting

### `astro: not found`

Dependencies are missing or incomplete. Reinstall:

```bash
rm -rf node_modules
npm ci
```

### `npm ci` fails with network errors (for example `EAI_AGAIN`)

This is a network/DNS issue on the machine, not an app code issue.

- Check internet connectivity
- Check DNS resolver settings
- Retry `npm ci`

### Port already in use

Run on a different port:

```bash
npm run dev -- --port 4322
```
