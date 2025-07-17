#!/data/data/com.termux/files/usr/bin/bash

cd ~/elparadisogonzalo-monorepo || exit 1

git add logs/
git commit -m "Auto: log update $(date '+%Y-%m-%d %H:%M')"
git push origin main
