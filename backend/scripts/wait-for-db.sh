#!/bin/bash
set -e

# Wait for PostgreSQL to be ready
until python -c "
import os, psycopg2
conn = psycopg2.connect(os.environ['DATABASE_URL'])
conn.close()
" 2>/dev/null; do
    echo "  PostgreSQL not ready — retrying in 2s..."
    sleep 2
done

echo "✅ PostgreSQL is ready!"
