#!/bin/bash

# Development script for Emplea+ with Docker

echo "🚀 Starting Emplea+ Development Environment with Docker..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Build and start development container
echo "📦 Building development container..."
docker-compose build emplea-plus-dev

echo "🔧 Starting development server..."
docker-compose up emplea-plus-dev

echo "✅ Development environment is ready!"
echo "🌐 Access the application at: http://localhost:3000"
echo ""
echo "📝 Available commands:"
echo "  - Stop: docker-compose down"
echo "  - Rebuild: docker-compose build emplea-plus-dev"
echo "  - Logs: docker-compose logs -f emplea-plus-dev" 