#!/bin/bash
set -e

# Usage: ./scripts/deploy.sh
# Zero-downtime deploy on the Hetzner server.
# Cloudflared tunnel auto-reconnects, so we only need to restart web.

COMPOSE_FILES="-f docker-compose.yml -f docker-compose.prod.yml"

echo "📥 Pulling latest code..."
git pull origin main

echo "🔨 Building new image..."
docker compose ${COMPOSE_FILES} build web

echo "🔄 Running migrations..."
docker compose ${COMPOSE_FILES} run --rm web python manage.py migrate_schemas --shared
docker compose ${COMPOSE_FILES} run --rm web python manage.py migrate_schemas --tenant

echo "📦 Collecting static files..."
docker compose ${COMPOSE_FILES} run --rm web python manage.py collectstatic --noinput

echo "🚀 Restarting web service..."
docker compose ${COMPOSE_FILES} up -d --no-deps web

echo "🧹 Cleaning up old images..."
docker image prune -f

echo ""
echo "✅ Deploy complete!"
echo "   cloudflared tunnel reconnects automatically."
echo "   Check logs: docker compose ${COMPOSE_FILES} logs -f web"
