cat package.json
nano package.json
npm publish --dry-run
nano package.json
npm run lint-package-json
cat package.json
cat > package.json <<'EOF'
{
  "name": "elparadisogonzalo-monorepo",
  "version": "1.0.0",
  "description": "Monorepo for elparadisogonzalo dApps",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "test": "echo \"No tests specified\" && exit 0"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/koagonzalo11/elparadisogonzalo-monorepo.git"
  },
  "keywords": [
    "elparadisogonzalo",
    "dapp",
    "web3",
    "blockchain"
  ],
  "author": "Gonzalo <azehagowa@gmail.com>",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/koagonzalo11/elparadisogonzalo-monorepo/issues"
  },
  "homepage": "https://github.com/koagonzalo11/elparadisogonzalo-monorepo#readme",
  "dependencies": {}
}
EOF

cat package.json
npm publish --dry-run
npm publish --access public
git add .
git commit -m "approve"
git push origin main
git config --global commit.gpgsign false
git config --local commit.gpgsign false
git config --get commit.gpgsign
git add .
git commit -m "approve"
git push origin main --force
# Remove all files over 100MB (adjust path if needed)
git filter-repo --strip-blobs-bigger-than 100M
echo ".npm/" >> .gitignore
echo "google-cloud-sdk/" >> .gitignore
git rm -r --cached .npm
git rm -r --cached google-cloud-sdk
git commit -m "Remove large files and cache"
git push --force
git status
git checkout -b temp-branch
echo ".yarn/" >> .gitignore
git rm -r --cached .yarn
git commit -m "Ignore .yarn metadata"
git add index.js
git add packages/contracts/package.json
git add .github/workflows/deploy.yml
git commit
ls -l packages | grep frontend
git rm -r packages/frontend~HEAD
git commit -m "Resolve merge conflict and clean up frontend~HEAD"
echo "venv/" >> .gitignore
git rm -r --cached venv/
git add .gitignore
git commit -m "Remove virtualenv from git tracking and ignore it"
git add .gitignore
git commit -m "Remove virtualenv from git tracking and ignore it"
echo "wallet.json" >> .gitignore
rm -rf packages/frontend~HEAD/
git commit -m "Resolve merge conflicts and clean working directory"
git reset --merge
ls
git status
cd packages/frontend
git status
git add .gitignore package.json yarn.lock .yarnrc.yml
git commit -m "Update yarn config and ignore wallet.json"
git push origin main
git pull --rebase origin main
git push origin main
git add .
git commit -m "WIP: before rebase"
git add ../../package.json
git commit -m "Update package.json"
git clean -fdx
git pull --rebase origin main
git add .
git commit -m "Finalize cleanup before rebase"
git stash
git pull --rebase origin main
git stash pop  # to restore the changes after pulling
git push origin main
git push --force origin main
git remote set-url origin https://github.com/Elparadisogonzalo/frontend.git
git push --force origin main
git remote set-url origin https://github.com/Elparadisogonzalo/frontend.git
git push --force origin main
# Example: Remove the huge .npm file
git filter-repo --path .npm/_cacache/tmp/eb3f9416 --invert-paths
git filter-repo --path google-cloud-sdk/bin/anthoscli --invert-paths
git filter-repo --path .n/bin/node --invert-paths
pkg install git
pip install git-filter-repo
pkg install git
pip install git-filter-repo
echo ".n/" >> .gitignore
echo "google-cloud-sdk/" >> .gitignore
echo ".npm/" >> .gitignore
git rm -r --cached .n google-cloud-sdk .npm
echo ".n/" >> .gitignore
echo "google-cloud-sdk/" >> .gitignore
echo ".npm/" >> .gitignore
git rm -r --cached .n google-cloud-sdk .npm
git add .gitignore
git commit -m "Remove large files & ignore them"
git push --force
git push --set-upstream origin temp-branch --force
git config --global http.postBuffer 524288000
git push --set-upstream origin temp-branch --force
git config --global http.postBuffer 524288000
git config --global http.lowSpeedLimit 0
git config --global http.lowSpeedTime 999999
git remote set-url origin git@github.com:Elparadisogonzalo/frontend.git
git push origin temp-branch --force
ping -c 3 github.com
git config --global --add url."https://".insteadOf git://
git config --global --add url."https://github.com/".insteadOf "git@github.com:"
GIT_SSL_NO_VERIFY=true git push --set-upstream origin temp-branch --force
# If this is a monorepo, cd into a subfolder
cd packages/frontend
# Add only this part first
git add .
git commit -m "Partial: frontend push"
git push origin main
echo ".gnupg/" >> .gitignore
echo ".bun/" >> .gitignore
echo ".cache/" >> .gitignore
echo ".node_repl_history" >> .gitignore
git add .gitignore
git commit -m "chore: update .gitignore for local dev"
git push
git push --set-upstream origin temp-branch
pkg install git-lfs
git lfs install
git lfs push --all origin main
pkg uninstall git -y
pkg install git -y
git --version
apt update --allow-insecure-repositories && apt install gnupg
apt modernize-sources
pkg install --allow-unauthenticated git
apt update --allow-insecure-repositories
apt install --allow-unauthenticated git
termux-change-repo
apt update && apt upgrade
pkg install git
curl -fsSL https://packages.termux.dev/apt/termux-keyring.gpg | gpg --dearmor > termux-keyring.gpg
mkdir -p $PREFIX/etc/apt/trusted.gpg.d
mv termux-keyring.gpg $PREFIX/etc/apt/trusted.gpg.d/
pkg update
nano $PREFIX/etc/apt/sources.list.d/termux-main-stable.sources
deb [signed-by=/data/data/com.termux/files/usr/etc/apt/trusted.gpg.d/termux-keyring.gpg] https://packages.termux.dev/apt/termux-main stable main
npm install
nano package.json
yarn install
yarn dev
git gc --aggressive --prune=now
git filter-repo --strip-blobs-bigger-than 10M
git status
git remote set-url origin git@github.com:Elparadisogonzalo/frontend.git
git push -u origin elparadisogonzalo-monorepo
# Move to your home
cd ~
# Download CodeQL CLI
curl -LO https://github.com/github/codeql-cli-binaries/releases/latest/download/codeql-linux64.zip
# Unzip it
apt install unzip -y
unzip codeql-linux64.zip
# Make it globally available
mv codeql /data/data/com.termux/files/usr/bin/codeql
chmod +x /data/data/com.termux/files/usr/bin/codeql
# Test
codeql --version
git lfs install
pkg install git -y
termux-setup-storage
pkg install nodejs yarn git -y
pkg install git-lfs -y
pkg install gnupg curl -y
curl -fsSL https://packages.termux.dev/apt/termux-key.gpg | gpg --dearmor > termux.gpg
mv termux.gpg $PREFIX/etc/apt/trusted.gpg.d/
pkg install gnupg curl -y
# Download and convert the new Termux GPG key
curl -fsSL https://packages.termux.dev/apt/termux-key.gpg | gpg --dearmor > termux.gpg
# Move it to the trusted keyring directory
mv termux.gpg $PREFIX/etc/apt/trusted.gpg.d/
# Optional: clean up old/invalid key (if it exists)
rm -f $PREFIX/etc/apt/trusted.gpg.d/termux-main.gpg
# Update packages
apt update && apt upgrade -y
pkg install gnupg curl -y
# Download and convert the new Termux GPG key
curl -fsSL https://packages.termux.dev/apt/termux-key.gpg | gpg --dearmor > termux.gpg
# Move it to the trusted keyring directory
mv termux.gpg $PREFIX/etc/apt/trusted.gpg.d/
# Optional: clean up old/invalid key (if it exists)
rm -f $PREFIX/etc/apt/trusted.gpg.d/termux-main.gpg
# Update packages
apt update && apt upgrade -y
rm -rf $PREFIX/etc/apt/trusted.gpg.d/*
rm -rf $PREFIX/var/lib/apt/lists/*
pkg install gnupg curl -y
curl -fsSL https://packages.termux.dev/apt/termux-key.gpg | gpg --dearmor > termux.gpg
mv termux.gpg $PREFIX/etc/apt/trusted.gpg.d/
nano $PREFIX/etc/apt/sources.list
echo "deb [trusted=yes] https://packages.termux.dev/apt/termux-main stable main" > $PREFIX/etc/apt/sources.list
apt update && apt upgrade -y
rm -rf $PREFIX/etc/apt/sources.list.d/*
rm -rf $PREFIX/var/lib/apt/lists/*
rm -rf $PREFIX/etc/apt/trusted.gpg.d/*
echo "deb [trusted=yes] https://packages.termux.dev/apt/termux-main stable main" > $PREFIX/etc/apt/sources.list
apt update && apt upgrade -y
pkg install git nodejs yarn git-lfs curl gnupg unzip -y
# 1. Switch to main branch
git checkout main
# 2. Rename branch to elparadisohonzalo-monorepo
git branch -m elparadisohonzalo-monorepo
# 3. Squash all history into one clean commit
git reset --soft $(git rev-list --max-parents=0 HEAD)
git commit -m "🎯 Initial clean commit for elparadisohonzalo-monorepo"
# 4. Force push to origin (⚠️ overwrites remote history)
git push origin -f elparadisohonzalo-monorepo
cd ~/packages
ls -la
cd ~/packages/web3-event-tracker
node ./bin/cli.js   --rpc https://mainnet.infura.io/v3/YOUR_KEY   --address 0xYourContract   --event Transfer   --output output.csv
mkdir -p bin
nano bin/cli.js
chmod +x bin/cli.js
~/packages/web3-event-tracker/abi/abi.json
cd
~/packages/web3-event-tracker/abi/abi.json
nano abi/abi.json
mkdir -p abi
nano abi/abi.json
mkdir -p ~/packages/web3-event-tracker/abi
nano ~/packages/web3-event-tracker/abi/abi.json
node ./bin/cli.js   --rpc https://mainnet.infura.io/v3/YOUR_INFURA_KEY   --address 0xYourContract   --event Transfer   --output output.csv
cd ~/packages/web3-event-tracker
ls ./bin/
node ./bin/cli.js   --rpc https://mainnet.infura.io/v3/YOUR_INFURA_KEY   --address 0x4e8c73e7f243d12b7a5571200609523a4890beff   --event Transfer   --output output.csv
cat cli.js
mkdir -p ./bin
nano ./bin/cli.js
node ./bin/cli.js   --rpc https://mainnet.infura.io/v3/YOUR_KEY   --address 0xYourContract   --event Transfer   --output output.csv   --format csv
nano bin/cli.js
node ./bin/cli.mjs   --rpc https://mainnet.infura.io/v3/YOUR_KEY   --address 0xYourContract   --event Transfer   --output output.csv   --format csv
nano .bin/cli.js
nano ./bin/cli.js
node ./bin/cli.js
npm install
node cli.js --rpc $RPC --address $CONTRACT --event Transfer --output output.csv
cd ~/packages
rm -rf web3-event-tracker
git clone https://github.com/Elparadisogonzalo/web3-event-tracker.git
cd web3-event-tracker
cd ~/packages
git clone https://github.com/Elparadisogonzalo/web3-event-tracker.git
cd web3-event-tracker
echo "# Web3-event-tracker" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:koagonzalo11/Web3-event-tracker.git
git push -u origin main
cd ~/packages/Web3-event-tracker
ls ~/packages
Web3-event-tracker
cd ~/packages/Web3-event-tracker
cd ~/packages
git clone https://github.com/koagonzalo11/Web3-event-tracker.git
cd ~/packages/Web3-event-tracker
# Initialize a new Node.js project (if package.json is not present)
npm init -y
# Install dependencies for tracking events
npm install dotenv web3 commander csv-writer
npm install ethers@^5.7.2
cd ~/packages/contracts
rm -rf node_modules package-lock.json
npm install ethers@^5.7.2
npm install --legacy-peer-deps
npm config delete HEAD
npm config delete "b52c5e01b (Push all project files to main)"
npm ls ethers
cd ~/packages
rm -rf node_modules
rm package-lock.json
npm install --save-dev hardhat
npm install --save-dev @nomiclabs/hardhat-ethers ethers@^5
nano hardhat.config.js
npx hardhat compile
npm uninstall ethers
npm install ethers@^5
npm uninstall lmdb
pkg install -y clang python make git
npm install -g node-gyp
rm -rf node_modules package-lock.json
npm install
npx hardhat compile
git remote add origin git@github.com:koagonzalo11/Web3-event-tracker.git
git branch -M main
git push -u origin main
cd ~/packages/
# Initialize git if not already
git init
# Add remote forcefully
git remote remove origin 2>/dev/null
git remote add origin https://github.com/Elparadisogonzalo/web3-event-tracker.git
# Add ALL files forcefully
git add -A
# Commit with clear message
git commit -m "🔥 Force push full project backup to GitHub"
# Force push to main branch
git branch -M main
git push -u origin main --force
cd ~/packages/
# Initialize git if not already
git init
# Set the correct remote (remove if exists, then add)
git remote remove origin 2>/dev/null
git remote add origin git@github.com:koagonzalo11/Web3-event-tracker.git
# Add all files
git add -A
# Commit with a strong message
git commit -m "🚀 Full local project upload - forced sync"
# Rename branch to main
git branch -M main
# Force push to main via SSH
git push -u origin main --force
cat ~/.ssh/id_rsa.pub
cd ~/packages
# Remove the sensitive file
rm backend/serviceAccountKey.json
echo "backend/serviceAccountKey.json" >> .gitignore
# Remove the file from git history
git rm --cached backend/serviceAccountKey.json
# Commit the clean change
git commit -m "🔥 Remove GCP serviceAccountKey.json to comply with GitHub rules"
git push origin main --force
rm -f packages/backend/serviceAccountKey.json
apt install openjdk-17  # or whichever is available
curl -LO https://repo1.maven.org/maven2/com/madgag/bfg/1.14.0/bfg-1.14.0.jar
java -jar bfg-1.14.0.jar --delete-files serviceAccountKey.json
git reflog expire --expire=now --all
git gc --prune=now --aggressive
git add .
git commit -m "Remove leaked serviceAccountKey.json"
git push origin --force
git push --set-upstream origin main
cd
gcloud iam service-accounts list --format="table(name, email)"
pkg update && pkg upgrade -y
pkg install curl tar unzip git -y
curl -O https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-cli-456.0.0-linux-arm.tar.gz
tar -xf google-cloud-cli-456.0.0-linux-arm.tar.gz
cd google-cloud-sdk
./install.sh
curl https://www.google.com
cd ~/google-cloud-sdk
./google-cloud-sdk/bin/gcloud components update --quiet
cd ~/google-cloud-sdk
./google-cloud-sdk/bin/gcloud components update --quiet
./google-cloud-sdk/bin/gcloud init
export CLOUDSDK_PYTHON_SITEPACKAGES=1
export CLOUDSDK_COMPONENT_MANAGER_DISABLE_UPDATE_CHECK=true
export CLOUDSDK_CORE_CUSTOM_CA_CERTS_FILE=""
export CLOUDSDK_PYTHON=python3
export CLOUDSDK_INSTALL_DIR="$HOME/google-cloud-sdk"
export CLOUDSDK_GSUTIL_PY_PATH="/data/data/com.termux/files/usr/bin/python3"
gcloud components update --quiet
rm -rf ~/google-cloud-sdk
pkg update && pkg upgrade -y
pkg install python curl unzip git -y
curl -O https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-sdk-457.0.0-linux-x86_64.tar.gz
cd ~
curl -O https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-sdk-457.0.0-linux-x86_64.tar.gz
tar -xf google-cloud-sdk-457.0.0-linux-arm.tar.gz
ls -lh ~
tar -xf google-cloud-cli-456.0.0-linux-arm.tar.gz
./google-cloud-sdk/install.sh
unzip codeql-linux64.zip
tar -xf google-cloud-cli-456.0.0-linux-arm.tar.gz
./google-cloud-sdk/install.sh
ls
unset CLOUDSDK_CORE_CUSTOM_CA_CERTS_FILE
gcloud components list
cd google-cloud-sdk
./install.sh
exec bash
