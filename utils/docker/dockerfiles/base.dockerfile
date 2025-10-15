#base image for all docker images
FROM  node:24-alpine 

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

RUN npm install -g pnpm

ENV PNPM_HOME="/pnpm"

ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app
COPY tsconfig.*json  pnpm-*.yaml  ./
