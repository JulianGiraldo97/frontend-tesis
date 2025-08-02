# Multi-stage build for React application
FROM node:18-alpine AS base

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies with legacy peer deps and force
RUN npm install --legacy-peer-deps --force

# Development stage
FROM base AS development

# Set environment variables for development
ENV NODE_ENV=development
ENV DISABLE_ESLINT_PLUGIN=true
ENV NODE_OPTIONS=--openssl-legacy-provider

# Install dependencies again for development
RUN npm install --legacy-peer-deps --force

# Copy source code
COPY . .

# Expose port
EXPOSE 3000

# Start development server
CMD ["npm", "start"]

# Production build stage
FROM base AS production-build

# Set environment variables for production build
ENV NODE_ENV=production
ENV DISABLE_ESLINT_PLUGIN=true
ENV NODE_OPTIONS=--openssl-legacy-provider

# Install dependencies again for production
RUN npm install --legacy-peer-deps --force

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine AS production

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built application from production-build stage
COPY --from=production-build /app/build /usr/share/nginx/html

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

# Test stage
FROM base AS test

# Set environment variables for testing
ENV NODE_ENV=test
ENV DISABLE_ESLINT_PLUGIN=true
ENV NODE_OPTIONS=--openssl-legacy-provider

# Install dependencies again for testing
RUN npm install --legacy-peer-deps --force

# Copy source code
COPY . .

# Run tests
CMD ["npm", "test"] 