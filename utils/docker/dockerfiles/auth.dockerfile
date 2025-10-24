# ============================================================
# Single-stage build and runtime for Auth service
# ============================================================
FROM secshop/base:latest

WORKDIR /app

COPY services/auth ./services/auth

WORKDIR /app/services/auth

RUN pnpm install --frozen-lockfile --filter @secshop/auth...

RUN pnpm --filter @secshop/auth run build

EXPOSE 4000

WORKDIR /app/services/auth

CMD ["pnpm", "run", "start"]