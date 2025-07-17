#!/bin/bash

# Elparadisogonzalo Auto Deploy Script to IPFS
# Saves CID, timestamps, and ensures all required files are present

PROJECT_DIR="$HOME/elparadisogonzalo-monorepo"
FRONTEND_DIR="$PROJECT_DIR/frontend"
LOG_DIR="$PROJECT_DIR/deploy_logs"
TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")
LOGFILE="$LOG_DIR/deploy_$TIMESTAMP.txt"

# Required files
REQUIRED_FILES=("index.html" "auth.js")

echo "📦 Starting deployment at $TIMESTAMP"

# Step 1: Check required files
cd "$FRONTEND_DIR" || { echo "❌ Error: frontend directory not found."; exit 1; }

for file in "${REQUIRED_FILES[@]}"; do
  if [ ! -f "$file" ]; then
    echo "❌ Missing required file: $file"
    exit 1
  fi
done

# Step 2: Deploy to IPFS
cd "$PROJECT_DIR"
CID=$(ipfs add -Qr frontend)

# Step 3: Handle result
if [ $? -eq 0 ]; then
  echo "✅ Deployment successful!"
  echo "🔗 IPFS CID: $CID"
  echo "🌐 Preview: https://ipfs.io/ipfs/$CID"

  # Ensure log dir exists
  mkdir -p "$LOG_DIR"

  echo "[$TIMESTAMP] Deployed CID: $CID" >> "$LOGFILE"
else
  echo "❌ Deployment failed."
  exit 1
fi
