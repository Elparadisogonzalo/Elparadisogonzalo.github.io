#!/bin/bash
cd ~/infinix-gonzalo || exit 1

echo "🔁 Pulling latest from GitHub..."
git pull origin main --rebase

echo "📁 Staging and committing changes..."
git add .
git commit -m "Auto backup: $(date)" || echo "Nothing to commit."

echo "🚀 Pushing to GitHub..."
git push origin main

echo "☁️  Syncing to Google Drive..."
rclone sync ~/infinix-gonzalo elp:infinix-gonzalo

echo "✅ Backup complete: $(date)"
