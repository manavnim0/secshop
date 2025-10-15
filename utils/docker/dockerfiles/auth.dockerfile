# ============================================================
# Single-stage build and runtime for Auth service
# ============================================================
FROM secshop/base:latest

WORKDIR /app

# COPY pnpm-workspace.yaml ./
# COPY package.json ./
# COPY pnpm-lock.yaml ./

COPY services/auth/package.json services/auth/

RUN pnpm install --frozen-lockfile --filter @secshop/auth...

COPY tsconfig.json ./
COPY tsconfig.base.json ./
COPY services/auth/tsconfig.json services/auth/
COPY services/auth/src services/auth/src

RUN pnpm --filter @secshop/auth run build

EXPOSE 4000

WORKDIR /app/services/auth

USER appuser

CMD ["pnpm", "run", "start"]
