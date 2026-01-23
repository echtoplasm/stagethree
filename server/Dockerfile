FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Install pnpm and dependencies
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile
RUN pnpm add -D ts-node typescript @types/node

# Copy source
COPY . .

# accept build arg and set as env var
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Build TypeScript
RUN pnpm run build

# Production stage
FROM node:20-alpine
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Install pnpm and production dependencies only
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

# Copy .env from builder
COPY --from=builder /app/.env* ./

# Copy built files from builder
COPY --from=builder /app/dist ./dist

# Copy migration files and knexfile
COPY --from=builder /app/src/db ./src/db
COPY --from=builder /app/src/knexfile.ts ./src/knexfile.ts

EXPOSE 3000
CMD ["node", "dist/index.js"]
