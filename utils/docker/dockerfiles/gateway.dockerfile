# ============================================================
# Single-stage build and runtime for Gateway service
# ============================================================
FROM secshop/base:latest

WORKDIR /app

COPY services/gateway/package*.json ./services/gateway/
COPY services/gateway/tsconfig.json ./services/gateway/
COPY services/gateway/src ./services/gateway/src

RUN pnpm install --filter @secshop/gateway

RUN pnpm --filter @secshop/gateway run build

EXPOSE 8080

CMD ["node", "./services/gateway/dist/gateway.js"]