# ===========================================
# Build Stage
# ===========================================
FROM node:20-alpine AS base

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Install dependencies only when needed
FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod

FROM base AS build-deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# ===========================================
# Development Stage
# ===========================================
FROM base AS development
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
EXPOSE 4000
CMD ["pnpm", "run", "dev"]

# ===========================================
# Build Stage
# ===========================================
FROM build-deps AS builder
COPY . .
RUN pnpm run build

# ===========================================
# Production Stage
# ===========================================
FROM base AS production

ENV NODE_ENV=production

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 fastify

# Copy production dependencies
COPY --from=deps /app/node_modules ./node_modules

# Copy built application
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./

USER fastify

EXPOSE 4000

CMD ["node", "dist/index.js"]
