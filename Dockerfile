# ===========================================
# Alzheimer Prediction Frontend Dockerfile
# Multi-stage build: Node.js + Nginx
# ===========================================

# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files first
COPY package.json package-lock.json* ./

# Install dependencies fresh (ignore any existing node_modules)
RUN npm install --legacy-peer-deps

# Copy source code (exclude node_modules via .dockerignore)
COPY . .

# Delete any transferred node_modules and reinstall if needed
RUN rm -rf node_modules/.bin 2>/dev/null || true && \
    chmod -R +x node_modules/.bin 2>/dev/null || true

# Build argument for API URL
ARG VITE_API_URL=http://localhost:8000
ENV VITE_API_URL=$VITE_API_URL

# Build using node directly
RUN node ./node_modules/vite/bin/vite.js build

# Stage 2: Production with Nginx
FROM nginx:alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:80/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
