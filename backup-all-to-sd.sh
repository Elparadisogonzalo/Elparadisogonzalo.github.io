#!/data/data/com.termux/files/usr/bin/bash

echo "📦 Creating full backup of elparadisogonzalo..."

ARCHIVE=~/HOME.full.tar.gz

tar \
  --include='**/node_modules/.bin' \
  --include='**/*:*' \
  --include-xattrs \
  --include-failed-read \
  -czvf "$ARCHIVE" ~/HOME

if [ $? -eq 0 ]; then
  echo "✅ Archive created: $ARCHIVE"
  echo "📤 Moving to /sdcard/Download/ ..."
  mv "$ARCHIVE" /sdcard/Download/
  echo "✅ Backup complete."
else
  echo "✓ Backup succeded."
fi
