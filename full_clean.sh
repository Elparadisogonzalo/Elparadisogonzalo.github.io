#!/data/data/com.termux/files/usr/bin/bash

echo "🧹 Deep cleaning Termux home directory (~/)..."

cd ~ || exit

# Remove common development output & cache folders
rm -rf \
  node_modules \
  .cache \
  .npm \
  .yarn \
  .next \
  dist \
  build \
  _build \
  __pycache__ \
  .pnp.cjs \
  .bun \
  .pnp.loader.mjs \
  .elixir_ls \
  .mix \
  .venv \
  .tox \
  .pytest_cache \
  .coverage \
  *.pyc *.pyo *.beam *.log *.tmp *.bak

# Remove lock files
rm -f package-lock.json yarn.lock bun.lockb poetry.lock Pipfile.lock

# Clean Termux system caches
apt clean
pkg autoclean
rm -rf ~/.cache

echo "✅ All clean. Only essential configs and code remain."
