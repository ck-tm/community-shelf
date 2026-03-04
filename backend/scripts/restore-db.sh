#!/bin/bash
set -e

# Usage: ./scripts/restore-db.sh <backup_file.sql.gz>
# Restores a compressed PostgreSQL backup to the local dev database.

if [ -z "$1" ]; then
    echo "Usage: ./scripts/restore-db.sh <backup_file.sql.gz>"
    exit 1
fi

BACKUP_FILE="$1"

if [ ! -f "$BACKUP_FILE" ]; then
    echo "❌ File not found: $BACKUP_FILE"
    exit 1
fi

DB_NAME="${POSTGRES_DB:-communityshelf}"
DB_USER="${POSTGRES_USER:-communityshelf}"

echo "⚠️  This will DROP and recreate the database '${DB_NAME}'!"
read -p "Continue? (y/N) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Cancelled."
    exit 0
fi

echo "🗑  Dropping database..."
docker compose exec -T db psql -U "$DB_USER" -d postgres \
    -c "DROP DATABASE IF EXISTS ${DB_NAME};"

echo "🆕 Creating database..."
docker compose exec -T db psql -U "$DB_USER" -d postgres \
    -c "CREATE DATABASE ${DB_NAME} OWNER ${DB_USER};"

echo "📥 Restoring backup..."
gunzip -c "$BACKUP_FILE" | docker compose exec -T db psql -U "$DB_USER" -d "$DB_NAME"

echo "✅ Restore complete!"
