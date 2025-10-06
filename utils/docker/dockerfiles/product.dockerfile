# ----------------------------------------------------------------------
# 1. BUILD STAGE: Installs dependencies and compiles TypeScript
# ----------------------------------------------------------------------
FROM secshop/base:latest AS builder

WORKDIR  /app

COPY services/product/package.json ./

COPY pnpm-lock.yaml ./

COPY pnpm-workspace.yaml ./

RUN --mount=type=cache,id=pnpm,target=/tmp/pnpm-store pnpm fetch \
    && pnpm install --frozen-lockfile

COPY services/product/src ./src

COPY services/product/tsconfig.json ./

RUN pnpm run build


# ----------------------------------------------------------------------
# 2. PRODUCTION STAGE: Creates a minimal image using your custom base
# ----------------------------------------------------------------------
FROM secshop/base:latest AS production

WORKDIR /app

USER appuser

COPY --from=builder  /app/package.json ./

COPY --from=builder /app/pnpm-lock.yaml ./


RUN pnpm install --prod --frozen-lockfile

COPY --from=builder /app/dist ./dist

EXPOSE 3000

ENV NODE_ENV=production

CMD ["pnpm","start"]