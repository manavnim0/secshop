# ============================================================
# Single-stage build and runtime for Gateway service
# ============================================================
FROM secshop/base:latest

WORKDIR /app/services/gateway

COPY services/gateway/package*.json .//
COPY services/gateway/tsconfig.json ./
COPY services/gateway/src ./src

RUN pnpm install --filter @secshop/gateway

RUN pnpm --filter @secshop/gateway run build

EXPOSE 8080

# CMD ["node", "./services/gateway/dist/gateway.js"]
CMD ["node", "./dist/gateway.js"]