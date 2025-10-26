# ----------------------------------------------------------------------
# 1. BUILD STAGE: Installs dependencies and compiles 
# ----------------------------------------------------------------------
FROM secshop/base:latest AS builder

WORKDIR /app

COPY services/product/package.json ./

RUN pnpm install 

COPY services/product ./services/product

WORKDIR /app/services/product

RUN pnpm run build 

EXPOSE 4002

CMD ["pnpm", "run", "start"]