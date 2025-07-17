#!/data/data/com.termux/files/usr/bin/bash

echo "🧹 Cleaning project directory..."

# Change to your project directory (edit if needed)
cd ~/your-folder || exit

# Delete common dev cache/temp files
rm -rf node_modules .cache .next dist build \
       *.log *.tmp *.bak

echo "✅ Project cache cleaned."

echo "🧼 Cleaning Termux system cache..."

# Clean apt and package cache
apt clean
pkg autoclean
rm -rf ~/.cache

# Optional: clear npm/yarn/pip cache if installed
rm -rf ~/.npm ~/.yarn ~/.config/yarn ~/.pip

echo "✅ Termux cache cleaned."
