#!/data/data/com.termux/files/usr/bin/bash

echo "📦 Creating full backup of elparadisogonzalo..."

# Define archive path
ARCHIVE=~/elparadisogonzalo.full.tar.gz

# Create full backup,
  --exclude='**/node_modules/.bin' \
  --xattrs \
  --include-failed-read \
  -czvf "$ARCHIVE" ~/elparadisogonzalo

# Check result
if [ $? -eq 0 ]; then
  echo "✅ Archive created: $ARCHIVE"
  echo "📤 Moving to /sdcard/Download/ ..."
  mv "$ARCHIVE" /sdcard/Download/
  echo "✅ Done. You can now extract it from internal storage."
else
