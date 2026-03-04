#!/bin/bash
set -e

# Usage: ./scripts/backup-db.sh [output_dir]
# Creates a compressed PostgreSQL backup with timestamp.

BACKUP_DIR="${1:-./backups}"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
FILENAME="communityshelf_${TIMESTAMP}.sql.gz"

mkdir -p "$BACKUP_DIR"

echo "📦 Creating database backup..."

docker compose exec -T db pg_dump \
    -U "${POSTGRES_USER:-communityshelf}" \
    "${POSTGRES_DB:-communityshelf}" \
    | gzip > "${BACKUP_DIR}/${FILENAME}"

FILESIZE=$(du -h "${BACKUP_DIR}/${FILENAME}" | cut -f1)
echo "✅ Backup complete: ${BACKUP_DIR}/${FILENAME} (${FILESIZE})"
echo ""
echo "To download from server:"
echo "  scp server:$(realpath "${BACKUP_DIR}/${FILENAME}") ."
echo ""
echo "To restore locally:"
echo "  ./scripts/restore-db.sh ${BACKUP_DIR}/${FILENAME}"
