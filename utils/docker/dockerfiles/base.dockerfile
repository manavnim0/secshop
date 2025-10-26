# =================================================================
# Base image for all SecShop services
# This image builds and contains all shared workspace packages.
# =================================================================

# --- 1. Builder Stage: Build all shared packages ---
FROM node:24-alpine AS builder

RUN npm install -g pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY tsconfig.*json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY package.json ./


# Copy the common package
COPY common ./common/

COPY services/mongo ./services/mongo/

RUN pnpm install --frozen-lockfile --filter @secshop/common... --filter @secshop/db...

# Build all the shared packages in the correct order
RUN pnpm --filter @secshop/common --filter @secshop/db run build


# --- 2. Final Stage: Create a clean base with built artifacts ---
FROM node:24-alpine AS final

RUN npm install -g pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate
ENV PNPM_HOME="/usr/local/bin" 
ENV PATH="$PNPM_HOME:$PATH"

WORKDIR /app

# ---- Copy workspace metadata from builder ----
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-workspace.yaml ./
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/tsconfig.*json ./

# ---- Copy BUILT common package from builder ----
COPY --from=builder /app/common/package.json ./common/
COPY --from=builder /app/common/dist ./common/dist/

# ---- Copy BUILT db package from builder ----
COPY --from=builder /app/services/mongo/package.json ./services/mongo/
COPY --from=builder /app/services/mongo/dist ./services/mongo/dist/