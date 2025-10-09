# ----------------------------------------------------------------------
# 1. BUILD STAGE: Creates a minimal image using your custom base
# ----------------------------------------------------------------------
FROM secshop/base:latest AS builder

WORKDIR /app

COPY services/auth/package*.json ./
COPY services/auth/tsconfig.json ./