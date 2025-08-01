#!/bin/bash

# Check Docker status and provide helpful instructions

echo "🔍 Checking Docker status..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed."
    echo "📥 Please install Docker Desktop from: https://www.docker.com/products/docker-desktop"
    exit 1
fi

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running."
    echo ""
    echo "🚀 To start Docker:"
    echo "  1. Open Docker Desktop application"
    echo "  2. Wait for Docker to start (you'll see the whale icon in your menu bar)"
    echo "  3. Run this script again"
    echo ""
    echo "💡 If Docker Desktop is not installed:"
    echo "  - macOS: https://docs.docker.com/desktop/install/mac-install/"
    echo "  - Windows: https://docs.docker.com/desktop/install/windows-install/"
    echo "  - Linux: https://docs.docker.com/desktop/install/linux-install/"
    exit 1
fi

# Check if docker-compose is available
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not available."
    echo "📥 Please install Docker Compose or update Docker Desktop"
    exit 1
fi

echo "✅ Docker is running and ready!"
echo ""
echo "🐳 Docker version: $(docker --version)"
echo "📦 Docker Compose version: $(docker-compose --version)"
echo ""
echo "🚀 You can now run:"
echo "  - ./scripts/docker-dev.sh    # Development"
echo "  - ./scripts/docker-prod.sh   # Production"
echo "  - ./scripts/docker-test.sh   # Testing" 