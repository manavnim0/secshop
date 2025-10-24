# ============================================================
# Single-stage build and runtime for Gateway service
# ============================================================
FROM secshop/base:latest

WORKDIR /app

COPY services/gateway ./services/gateway

WORKDIR /app/services/gateway

RUN pnpm install --frozen-lockfile --filter @secshop/gateway...
RUN pnpm --filter @secshop/gateway run build

EXPOSE 4000
CMD ["node", "./dist/gateway.js"]
