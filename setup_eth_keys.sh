#!/usr/bin/env bash
set -e

echo "Updating Termux packages..."
pkg update -y && pkg upgrade -y

echo "Installing Python and dependencies..."
pkg install -y python git

echo "Upgrading pip, setuptools, wheel..."
python3 -m pip install --upgrade pip setuptools wheel

echo "Creating virtual environment 'venv'..."
python3 -m venv venv

echo "Activating virtual environment..."
source venv/bin/activate

echo "Installing cryptography and Ethereum key libraries..."
pip install --upgrade eth-keys eth-hash[pycryptodome] pycryptodome

echo "Verifying installation..."
python3 -c "
from eth_keys import keys
hex_key = '36f11568eff3d86a86fb863a0c5ab81b7bef921e7dc5d5283b7c27dc4ed2e759'
priv = keys.PrivateKey(bytes.fromhex(hex_key))
signature = priv.sign_msg(b'hello')
print('Address:', priv.public_key.to_checksum_address())
print('Signature:', signature)
"

echo "Setup complete. To activate your venv, run: source venv/bin/activate"
