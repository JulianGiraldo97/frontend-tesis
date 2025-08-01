#!/bin/bash

# Testing script for Emplea+ with Docker

echo "🧪 Running Emplea+ Tests with Docker..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Build and run tests
echo "📦 Building test container..."
docker-compose build emplea-plus-test

echo "🧪 Running tests..."
docker-compose run --rm emplea-plus-test

echo "✅ Tests completed!"
echo ""
echo "📝 Test results are available in the container logs."
echo "  - View logs: docker-compose logs emplea-plus-test" 