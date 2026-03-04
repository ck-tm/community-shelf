#!/bin/bash
set -e

echo "⏳ Waiting for database..."
./scripts/wait-for-db.sh

echo "🔄 Running shared migrations..."
python manage.py migrate_schemas --shared

echo "🔄 Running tenant migrations..."
python manage.py migrate_schemas --tenant

echo "📦 Collecting static files..."
python manage.py collectstatic --noinput

echo "🚀 Starting Gunicorn..."
exec gunicorn config.wsgi:application \
    --bind 0.0.0.0:8000 \
    --workers ${GUNICORN_WORKERS:-3} \
    --timeout 120 \
    --access-logfile - \
    --error-logfile -
