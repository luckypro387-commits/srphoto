# Hosting Guide

This project is a TanStack Start app. By default it deploys to **Cloudflare Workers**
(full SSR + server functions). For maximum portability, config files are also
included so you can deploy the **static client** to almost any host.

## Site manifest

A machine-readable manifest of all routes lives at [`public/index.json`](public/index.json).
After build, it's served at `/index.json` on the deployed site — useful for
sitemaps, link checkers, and external indexers.

## Option 1 — Cloudflare (recommended, full-stack)

```bash
bun run build
bunx wrangler deploy
```

Server functions, `/api/*` routes, and SSR all work.

## Option 2 — Netlify

The included `netlify.toml` publishes `dist/client` with an SPA fallback.

```bash
# In Netlify: connect the repo, no extra config needed.
```

## Option 3 — Vercel

The included `vercel.json` does the same with rewrites.

## Option 4 — Docker / any VM

```bash
docker build -t srphoto .
docker run -p 8080:80 srphoto
```

Uses nginx with SPA fallback (see `nginx.conf`).

## Option 5 — GitHub Pages / S3 / any static host

Upload the contents of `dist/client` after `bun run build`. Ensure the host
rewrites unknown routes to `/index.html` (the included `public/_redirects`
file handles this for Netlify-compatible hosts).

## Caveat: server features on static hosts

Static hosts (Options 2–5) serve only the client bundle. These features
require the Cloudflare Worker runtime (Option 1):

- Server functions (`createServerFn`)
- API routes under `src/routes/api/`
- Server-side rendering of authenticated pages

The browser still talks directly to the backend (Supabase) for data, auth,
and storage — so most app features keep working on static hosts.
