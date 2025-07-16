# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Installation

```bash
pnpm install
```

## Local Development

```bash
pnpm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
pnpm build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

Using SSH:

```bash
USE_SSH=true pnpm deploy
```

Not using SSH:

```bash
GIT_USER=<Your GitHub username> pnpm deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

## Updating Dependencies
When updating the mermaid-merlin package or making changes to components, you may need to clear caches to ensure changes are reflected:

```bash
# Clear Docusaurus and node_modules caches
rm -rf .docusaurus && rm -rf node_modules/.cache

# Install 
pnpm install

# Rebuild the project
pnpm build

# Restart development server
pnpm start
```

If you're still seeing old behavior in the browser:
1. Hard refresh the browser (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows/Linux)
2. Check browser console for debugging messages
3. Clear browser cache if necessary

This is particularly important when:
- Updating the `@eth-peach-lab/mermaid-merlin` and `eth-peach-lab/mermaid` package using `pnpm up @eth-peach-lab/merlin @eth-peach-lab/mermaid-merlin --latest`.
- Making changes to the `MermaidLiteViewer` component
- Adding new diagram types or features
- When `mermaid-merlin` or `merlin` was updated (Note: GitHub Action automatically updates `pnpm-lock.yaml`)
