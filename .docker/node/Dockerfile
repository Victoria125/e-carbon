# .docker/node/Dockerfile
# syntax=docker/dockerfile:1.7

# --- deps: resolve e instala com cache + offline ---
FROM node:20-alpine AS deps
WORKDIR /app
ENV PNPM_HOME=/root/.local/share/pnpm \
    PNPM_FETCH_RETRIES=5 \
    PNPM_NETWORK_TIMEOUT=120000 \
    PNPM_REPORTER=append-only \
    CI=true
RUN corepack enable
COPY ["package.json", "pnpm-lock.yaml", "./"]
RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm \
    pnpm fetch --frozen-lockfile && \
    pnpm install --frozen-lockfile --offline

# --- build: compila Vite (dist) ---
FROM deps AS build
WORKDIR /app
COPY . .
RUN pnpm build

# --- runner: só runtime ---
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production \
    CI=true
RUN corepack enable

# Copiar node_modules e package.json
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json ./package.json
COPY --from=deps /app/pnpm-lock.yaml ./pnpm-lock.yaml

# Copiar código fonte (não compilado - tsx roda TypeScript diretamente)
COPY --from=build /app/dist ./dist
COPY --from=build /app/server ./server
COPY --from=build /app/src ./src
COPY --from=build /app/tsconfig.server.json ./tsconfig.server.json

EXPOSE 5174
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:5174/api/health').then(r=>{if(!r.ok)process.exit(1)}).catch(()=>process.exit(1))"

CMD ["pnpm", "start:prod"]