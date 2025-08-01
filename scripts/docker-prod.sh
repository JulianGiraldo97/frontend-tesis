#!/bin/bash

# Production script for Emplea+ with Docker

echo "🚀 Starting Emplea+ Production Environment with Docker..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Build and start production container
echo "📦 Building production container..."
docker-compose build emplea-plus-prod

echo "🔧 Starting production server..."
docker-compose up -d emplea-plus-prod

echo "✅ Production environment is ready!"
echo "🌐 Access the application at: http://localhost"
echo ""
echo "📝 Available commands:"
echo "  - Stop: docker-compose down"
echo "  - Rebuild: docker-compose build emplea-plus-prod"
echo "  - Logs: docker-compose logs -f emplea-plus-prod"
echo "  - Status: docker-compose ps" 