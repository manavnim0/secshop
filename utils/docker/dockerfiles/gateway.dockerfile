# ============================================================
# Single-stage build and runtime for Auth service
# ============================================================
FROM secshop/base:latest

WORKDIR /app

COPY services/gateway/package*.json ./
RUN pnpm install 

COPY services/gateway/tsconfig.json .
COPY services/gateway/src ./src

RUN pnpm run build

EXPOSE 8080

CMD ["node", "dist/gateway.js"]