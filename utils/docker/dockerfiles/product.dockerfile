# ----------------------------------------------------------------------
# 1. BUILD STAGE: Installs dependencies and compiles 
# ----------------------------------------------------------------------
FROM secshop/base:latest AS builder

WORKDIR /app

# COPY pnpm-workspace.yaml pnpm-lock.yaml ./
COPY services/product/package.json ./

# RUN pnpm install --frozen-lockfile
RUN pnpm install 

COPY services/product ./services/product

WORKDIR /app/services/product

RUN pnpm run build 

EXPOSE 3000

CMD ["pnpm", "run", "start"]
