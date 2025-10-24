# ----------------------------------------------------------------------
# 1. BUILD STAGE: Installs dependencies and compiles 
# ----------------------------------------------------------------------
FROM secshop/base:latest AS builder

WORKDIR /app

# COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

COPY frontend/package*.json ./frontend/

COPY frontend ./frontend/

USER root

RUN --mount=type=cache,id=pnpm,target=/tmp/pnpm-store pnpm fetch \
    && pnpm install --filter frontend --prod=false


RUN pnpm --filter frontend run build 

# ----------------------------------------------------------------------
# 2. PRODUCTION STAGE: Creates a minimal image using your custom base
# ----------------------------------------------------------------------
FROM nginx:stable-alpine AS production

COPY --from=builder /app/frontend/dist  /usr/share/nginx/html

EXPOSE 80


CMD ["nginx","-g", "daemon off;"]