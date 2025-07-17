#!/bin/bash

cd ~/infinix-gonzalo || exit 1

echo "📁 Syncing with GitHub..."
git add .
git commit -m "Auto-backup: $(date)"
git pull origin main --rebase
git push origin main

echo "☁️  Syncing to Google Drive..."
rclone sync ~/infinix-gonzalo elp:infinix-gonzalo

echo "✅ Backup complete: $(date)"
