#------ Stage 1: The Builder -------#
FROM secshop/base:latest AS builder

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

COPY frontend/package*.json ./frontend/

COPY frontend ./frontend/

RUN chown -R appuser:appgroup /app


USER appuser

RUN --mount=type=cache,id=pnpm,target=/tmp/pnpm-store pnpm fetch \
    && pnpm install --filter frontend --prod=false


RUN pnpm --filter frontend run build
# ----- Stage 2: The production server ----#
from nginx:stable-alpine AS production

COPY --from=builder /app/frontend/dist  /usr/share/nginx/html


EXPOSE 80


CMD ["nginx","-g", "daemon off;"]