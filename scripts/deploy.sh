#!/bin/bash
# ===========================================
# Kalam 2026 - Deployment Script
# ===========================================
# Usage: chmod +x deploy.sh && ./deploy.sh

set -e

echo "==========================================="
echo "Kalam 2026 - Deploying..."
echo "==========================================="

# Navigate to project directory
cd /opt/kalam2026

# Pull latest changes
echo "📥 Pulling latest changes..."
git pull origin main

# Build and restart containers
echo "🐳 Building and starting containers..."
docker compose down
docker compose up -d --build

# Clean up old images
echo "🧹 Cleaning up old Docker images..."
docker image prune -f

# Health check
echo "🏥 Running health check..."
sleep 10
curl -f http://localhost/health || echo "⚠️ Health check failed"

echo "==========================================="
echo "✅ Deployment complete!"
echo "==========================================="
