#!/bin/bash

set -e  # Exit on any error

# Load .env file if present
if [ -f .env ]; then
    echo "Loading environment from .env..."
    export $(grep -v '^#' .env | xargs)
fi

# Validate user (must not run as root unless explicitly allowed)
if [ "$(id -u)" -eq 0 ] && [ -z "$RUNNER_ALLOW_RUNASROOT" ]; then
    echo "Error: Do not run as root. Set RUNNER_ALLOW_RUNASROOT=1 to override."
    exit 1
fi

# Dependency check for Linux
if [[ "$(uname)" == "Linux" ]]; then
    for cmd in ldd ldconfig; do
        if ! command -v $cmd &>/dev/null; then
            echo "Missing dependency: '$cmd'. Please install it."
            exit 1
        fi
    done

    message="Run: sudo ./bin/installdependencies.sh to install missing .NET Core 6.0+ dependencies."

    REQUIRED_LIBS=(
        "libcoreclr.so"
        "libSystem.Security.Cryptography.Native.OpenSsl.so"
        "libSystem.IO.Compression.Native.so"
    )

    for lib in "${REQUIRED_LIBS[@]}"; do
        if ldd "./bin/$lib" 2>/dev/null | grep -q 'not found'; then
            echo "Missing dependency: $lib"
            echo "$message"
            exit 1
        fi
    done
fi

echo "Environment configured successfully."
