# Generic Docker image for hosting the static client build on any platform
# (Fly.io, Render, Railway, DigitalOcean App Platform, Kubernetes, etc.).
# Serves the SPA with nginx and falls back to index.html for client routes.
#
# NOTE: Server functions / API routes require the Cloudflare Worker runtime
# and won't run from this image. For full-stack hosting, deploy via wrangler.

FROM oven/bun:1 AS build
WORKDIR /app
COPY package.json bun.lockb* bunfig.toml* ./
RUN bun install --frozen-lockfile || bun install
COPY . .
RUN bun run build

FROM nginx:alpine
COPY --from=build /app/dist/client /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
