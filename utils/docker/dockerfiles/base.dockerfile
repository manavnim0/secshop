#base image for all docker images
FROM node:24-alpine AS builder

RUN npm install -g pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY tsconfig.*json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY package.json ./

COPY common/package.json common/
COPY common/tsconfig.json common/
COPY common/src common/src

RUN pnpm install --frozen-lockfile --filter @secshop/common...

RUN pnpm --filter @secshop/common run build


FROM node:24-alpine AS final

RUN npm install -g pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate
ENV PNPM_HOME="/usr/local/bin" 
ENV PATH="$PNPM_HOME:$PATH"

WORKDIR /app
# ---- Copy workspace metadata ----
COPY --from=builder /app/package.json /app/
COPY --from=builder /app/pnpm-workspace.yaml /app/
COPY --from=builder /app/pnpm-lock.yaml /app/
COPY --from=builder /app/tsconfig.*json /app/

# ---- Copy built common package ----
COPY --from=builder /app/common/package.json /app/common/
COPY --from=builder /app/common/dist /app/common/dist
