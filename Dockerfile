# Multi-stage build for React application
FROM node:18-alpine AS base

# Set working directory
WORKDIR /app

# Set Node.js options for OpenSSL compatibility
ENV NODE_OPTIONS=--openssl-legacy-provider

# Copy package files
COPY package*.json ./

# Install dependencies with legacy peer deps and force resolution
RUN npm install --legacy-peer-deps --force

# Development stage
FROM base AS development

# Install all dependencies including devDependencies
RUN npm install --legacy-peer-deps --force

# Copy source code
COPY . .

# Expose port
EXPOSE 3000

# Start development server
CMD ["npm", "start"]

# Build stage
FROM base AS build

# Install all dependencies
RUN npm install --legacy-peer-deps --force

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine AS production

# Copy built application from build stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"] 