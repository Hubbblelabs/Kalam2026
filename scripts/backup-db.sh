#!/bin/bash
# ===========================================
# Kalam 2026 - MongoDB Backup Script
# ===========================================
# Usage: chmod +x backup-db.sh && ./backup-db.sh
# Add to crontab for daily backups:
# 0 2 * * * /opt/kalam2026/scripts/backup-db.sh

set -e

BACKUP_DIR="/opt/kalam2026/backups"
DATE=$(date +%Y-%m-%d_%H-%M-%S)
BACKUP_NAME="kalam2026_backup_$DATE"

# Create backup directory
mkdir -p $BACKUP_DIR

# Run mongodump inside container
echo "📦 Creating MongoDB backup..."
docker exec kalam-mongodb mongodump --db kalam2026 --archive=/tmp/$BACKUP_NAME.gz --gzip

# Copy backup from container
docker cp kalam-mongodb:/tmp/$BACKUP_NAME.gz $BACKUP_DIR/

# Clean up old backups (keep last 7 days)
echo "🧹 Cleaning up old backups..."
find $BACKUP_DIR -type f -name "*.gz" -mtime +7 -delete

echo "✅ Backup complete: $BACKUP_DIR/$BACKUP_NAME.gz"
