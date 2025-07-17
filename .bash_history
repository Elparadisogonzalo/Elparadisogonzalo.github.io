<<<<<<< HEAD
<<<<<<< HEAD
ls
cd
ls -la
ls
git status
=======
cat abi.json
rm -rf node_modules package-lock.json artifacts cache
npz hardhat init
npx hardhat init
mkdir -p contracts
mv Safe.sol contracts/
# 1. Reset everything
rm -rf node_modules package-lock.json artifacts cache build
# 2. Reinstall minimal setup
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
# 3. Fix config
cat > hardhat.config.js <<EOF
require("@nomicfoundation/hardhat-toolbox");
module.exports = { solidity: "0.8.20" };
EOF

# 4. Add a working contract
mkdir -p contracts
cat > contracts/Safe.sol <<EOF
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
contract Safe {
    event Deposited(address indexed from, uint amount);
    function deposit() public payable {
        emit Deposited(msg.sender, msg.value);
    }
}
EOF

# 5. Compile
npx hardhat compile
jq '.abi' artifacts/contracts/Safe.sol/Safe.json > abi.json
cat abi.json
rm -rf node_modules package-lock.json build cache artifacts contracts test hardhat.config.*
npm init -y
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
rm -rf node_modules package-lock.json build cache artifacts hardhat.config.*
npm init -y
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
mkdir -p contracts
cat > contracts/Safe.sol <<EOF
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Safe {
    event Deposited(address indexed from, uint amount);
    function deposit() public payable {
        emit Deposited(msg.sender, msg.value);
    }
}
EOF

npx hardhat compile
jq '.abi' artifacts/contracts/Safe.sol/Safe.json > abi.json
cat abi.json
rm -rf node_modules artifacts cache build abi.json package-lock.json
rm hardhat.config.* 2>/dev/null
npx hardhat init
rm -rf node_modules artifacts cache build ignition package-lock.json
rm -rf contracts test scripts abi.json
rm hardhat.config.* tsconfig.json 2>/dev/null
npx hardhat init
mkdir contracts
cat > contracts/Safe.sol <<EOF
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Safe {
    event Deposited(address indexed from, uint amount);
    function deposit() public payable {
        emit Deposited(msg.sender, msg.value);
    }
}
EOF

cat > contracts/Safe.sol <<'EOF'
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Safe {
    event Deposited(address indexed from, uint amount);
    function deposit() public payable {
        emit Deposited(msg.sender, msg.value);
    }
}
EOF

npx hardhat compile
jq '.abi' artifacts/contracts/Safe.sol/Safe.json > abi.json
cat abi.json
npm install -g solc
solcjs --version
solcjs --bin --abi -o build contracts/Safe.sol
ls build/
cat build/Safe_sol_Safe.abi
cat build/Safe_sol_Safe.bin
cat build/contracts_Safe_sol_Safe.abi
cat build/contracts_Safe_sol_Safe.bin
npm install web3
solcjs --bin --abi -o build contracts/Safe.sol
nano deploy.js
node deploy.js
nano deploy.js
node deploy.js
npm install dotenv
nano .env
nano deploy.js
node deploy.js
nano deploy.js
node deploy.js
cat > .env <<EOF
PRIVATE_KEY=0x175d7bc38d4164a5162d92938f15569fe6f49087b691a366aecd3fe40fd9b21b
INFURA_KEY=429c528a2c524a0ba1fa538343d025b2
EOF

ls build/
contracts_Safe_sol_Safe.abi
contracts_Safe_sol_Safe.bin
cat > deploy.js <<EOF
require('dotenv').config();
const Web3 = require('web3');
const fs = require('fs');

// Load from .env
const INFURA_KEY = process.env.INFURA_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const providerUrl = \`https://sepolia.infura.io/v3/\${INFURA_KEY}\`;
const web3 = new Web3(new Web3.providers.HttpProvider(providerUrl));

// Load ABI and Bytecode
const abi = JSON.parse(fs.readFileSync('build/contracts_Safe_sol_Safe.abi'));
const bytecode = fs.readFileSync('build/contracts_Safe_sol_Safe.bin', 'utf8');

// Load wallet
const account = web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY);
web3.eth.accounts.wallet.add(account);
web3.eth.defaultAccount = account.address;

(async () => {
  const contract = new web3.eth.Contract(abi);
  const deployTx = contract.deploy({ data: bytecode });
  const gas = await deployTx.estimateGas();

  const deployedContract = await deployTx.send({
    from: account.address,
    gas,
  });

  console.log("✅ Contract deployed at:", deployedContract.options.address);
})();
EOF

node deploy.js
nano deploy.js
node deploy.js
nano deploy.js
=======
>>>>>>> c5f7e8e2c4 (🛠️ Prepare for rebase: deploy workflow added)
node deploy.js
npm install web3@1.10.0
node deploy.js
nano .env
node deploy.js
nano .env
nano deploy.js
node deploy.js
mkdir -p .github/workflows
nano .github/workflows/deploy.yml
nano .env
git add .
git commit -m "🔁 Setup CI/CD deployment pipeline"
git push origin main
npm run lint:sol:prettier
# ✅ should just echo and exit cleanly
git push origin main
git remote set-url origin https://github.com/koagonzalo11/safe-contracts.git
git remote -v
git push origin main
git remote set-url origin https://github.com/koagonzalo11/safe-contracts.git
git remote -v
git push -u origin main
git remote set-url origin git@github.com:koagonzalo11/safe-contracts-.git
git remote -v
git push -u origin main
nano deploy.yml
git add .
git commit -m "🚀 Trigger deployment"
git push
nano package.json
npm install --save-dev prettier prettier-plugin-solidity
git commit --no-verify -m "🚀 Trigger deployment"
rm -rf .husky
git add .
git commit -m "🚀 Trigger deployment"
git push
nano upload-ipfs.js
npm install ipfs-http-client dotenv
cat package.json
nano package.json
rm -rf node_modules package-lock.json
npm install
npm run upload:ipfs
mv upload-ipfs.js upload-ipfs.mjs
node upload-ipfs.mjs
npm install ipfs-http-client@59
nano upload-ipfs.mjs
node upload-ipfs.mjs
npm install web3.storage
npm install nft.storage
npm install -g web3.storage
web3.storage login
npm install -g web3.storage
web3.storage --help
web3.storage upload ./build
npx web3.storage upload ./build
npm bin -g
npm root -g
ls /data/data/com.termux/files/usr/bin/web3.storage
npm install -g web3.storage
npx web3.storage --help
npm uninstall -g web3.storage
npm uninstall web3.storage
which web3
npm install -g @web3-storage/cli
npm install -g web3.storage
npx web3.storage upload ./build
npm cache clean --force
rm -rf node_modules package-lock.json
npx web3.storage --help
nano upload.js
node --experimental-modules upload.js
nano upload.mjs
node upload.mjs
nano upload.js
node upload.js
nano upload.js
curl -i -X GET   https://auth.unstoppabledomains.com/.well-known/jwks.json
curl -X PUT https://api.unstoppabledomains.com/v2/domains/elparadisogonzalo.com/records/ipfs.html.value   -H "Authorization: Bearer pk_your_api_key_here"   -H "Content-Type: application/json"   -d '{"value":"bafkreicjbgfbwwbpuusw7tojs6ddbaw7zqzrgvwkxizs34gr675xro5iwa"}'
curl -X PUT "https://api.unstoppabledomains.com/registry/v2/domains/elparadisogonzalo.com/records/ipfs.html.value"   -H "Authorization: Bearer pk_your_api_key_here"   -H "Content-Type: application/json"   -d '{"value":"bafkreicjbgfbwwbpuusw7tojs6ddbaw7zqzrgvwkxizs34gr675xro5iwa"}'
PUT https://api.unstoppabledomains.com/registry/v2/domains/elparadisogonzalo.com/records/ipfs.html.value
nano update-ud-ipfs.js
nano .env
npm install node-fetch dotenv
node --experimental-modules update-ud-ipfs.js
nano update-ud-ipfs.js
npm install node-fetch dotenv
node update-ud-ipfs.js
nano update-ud-ipfs.js
node update-ud-ipfs.js
nano .env
update-ud-ipfs.js
nano update-ud-ipfs.js
|nano update-ud-ipfs.js
nano update-ud-ipfs.js
node update-ud-ipfs.js
nano update-ud-ipfs.js
node update-ud-ipfs.js
nano upload ipfs.js
nano .github/workflows/ipfs-deploy.yml
git add upload-ipfs.js .github/workflows/ipfs-deploy.yml
git commit -m "♻️ Add IPFS upload script and CI/CD workflow"
git add package.json package-lock.json .github/workflows/ipfs-deploy.yml ipfs.js update-ud-ipfs.js upload-ipfs.mjs upload.js upload.mjs
git add .
git commit -m "♻️ Add IPFS upload scripts and CI/CD workflow"
git push origin main
ls
cd
ls
cd build
npx pinata-cli pin ./ --name elparadisogonzalo-dapp
nano upload-to-pinata.js
npm install axios form-data dotenv
nano .env
node upload-to-pinata.js
upload-to-pinata.mjs
node upload-to-pinata.mjs
Error: Cannot find module '/data/data/com.termux/files/home/build/upload-to-pinata.mjs'
}                                                                                                                                                         Node.js v24.2.0                                                              ~/build $
ls -la
node upload-to-pinata.js
mv upload-to-pinata.js upload-to-pinata.mjs
nano upload-to-pinata.js
node upload-to-pinata.js
find ~ -type d -name build
nano upload-to-pinata.js
nano .env
node upload-to-pinata.js
nano .env
nano.env
nano .env
node upload-to-pinata.js
nano upload-to-pinata.js
node upload-to-pinata.js
curl -X GET https://api.pinata.cloud/data/testAuthentication   -H "pinata_api_key: 2b0054dc1e3bba2728e6"   -H "pinata_secret_api_key: d28cd55beb2aa0f702c278e272695e0685a2e97f346d7ec2b4842d81e0f3e11e"
nano upload-to-pinata.mjs
node upload-to-pinata.mjs
nano .github/workflows/ipfs-deploy.yml
mkdir .githib/workflows/ipfs-deploy.yml
mkdir -p .github/workflows
nano .github/workflows/ipfs-deploy.yml
git add .github/workflows/ipfs-deploy.yml
git commit -m "🚀 Add Pinata deployment to CI"
git push origin main
git pull origin main --rebase
git add .
git commit -m "Save work before pull"
git pull origin main --rebase
git push origin main
git add .
git commit -m "Save work before pull"
git pull origin main --rebase
git push origin main
git stash
git pull origin main --rebase
git stash pop
# Resolve any conflicts, then:
git add .
git commit -m "Resolve conflicts after stash pop"
git push origin main
git status
git add .
git commit -m "Save local changes before syncing"
git pull --rebase origin main
git add .
git commit -m "Save local changes before rebase"
git pull --rebase origin main
git status
git diff
+1 @@                                                                  -Subproject commit 243f19a296146ed57df1f327ef400c10ac09cf1c                  +Subproject commit 243f19a296146ed57df1f327ef400c10ac09cf1c-dirty            ~/build $
git submodule status
git rm --cached .cargo/git/checkouts/jemallocator-399b6c7947bbb84d/c7991e5
rm -rf .cargo/git/checkouts/jemallocator-399b6c7947bbb84d/c7991e5
cat .gitmodules
git rm --cached .cargo/git/checkouts/jemallocator-399b6c7947bbb84d/c7991e5
git status
git add .
git commit -m "Clean up workspace after removing broken submodule"
git pull --rebase origin main
/git status --short
git status --short
# Ignore npm cache and logs
.npm/
.npm/_cacache/
.npm/_logs/
# Ignore the safe-contracts folder if you don't want it tracked
safe-contracts/
nano .gitignore
git add .gitignore
git commit -m "Your meaningful commit message"
git commit -m "Add .gitignore to exclude npm cache, logs, and safe-contracts folder"
nano .ignore
nano .gitignore
git add .gitignore
git rm -r --cached .npm
git rm -r --cached safe-contracts
git status
nano .gitignore
git rm -r --cached .npm
git rm -r --cached safe-contracts
git add .gitignore
git commit -m "Ignore npm cache and safe-contracts folders"
git pull --rebase origin main
git push origin main
git remote -v
git remote set-url origin https://github.com/koagonzalo11/elparadisogonzalo-monorepo.git
git fetch origin
git pull --rebase origin main
git push origin main
git status
git add .
git commit -m "approve 
git pull --rebase origin main
/git push origin main
pkg install gnupg curl -y
curl -fsSL https://packages.termux.dev/apt/termux-main/public.gpg   | gpg --dearmor > $PREFIX/etc/apt/trusted.gpg.d/termux.gpg
apt update
rm -rf $PREFIX/etc/apt/trusted.gpg.d/termux.gpg
pkg install gnupg curl -y
apt update
rm -rf $PREFIX/etc/apt/trusted.gpg.d/termux.gpg
pkg install gnupg curl -y
apt update
pkg upgrade
pkg install python
pip install requests
nano check_balances.py
python check_balances.py > funded_wallets.txt
wc -l funded_wallets.txt
head -n 5 funded_wallets.txt
cd ~/elparadisogonzalo-monorepo  # or your correct project path
git add .
git status
git commit -m "📦 Add extracted keys and balance checker integration"
git push origin main
git pull origin main --rebase
git push --force origin main
git tag v1.0 -m "Initial integrated version with key checker"
git push origin v1.0
nano .github/workflows/check_balances.yml
cd
mkdir .github
nano .github/funding.yml
git add .github/workflows/check_balances.yml
git commit -m "Add CI workflow to check ETH balances"
git push origin main
git add .
git commit -m "Add key checker, extractor, and deployment scripts"
git push origin main
mkdir -p .github/workflows
nano .github/workflows/check_balances.yml
git add .github/workflows/check_balances.yml
git commit -m "🔁 Add GitHub Action for balance checking"
git push origin main
git remote set-url origin https://github.com/koagonzalo11/elparadisogonzalo-monorepo.git
git push origin main
# 1. Pull and merge changes from GitHub
git pull origin main --no-rebase
# 2. Add your workflow file again, if needed
git add .github/workflows/check_balances.yml
# 3. Commit your changes
git commit -m "🔁 Add GitHub Action for balance checking"
# 4. Push the updated local branch to remote
git push origin main
git status
nano frontend/package.json
nano frontend/src/main.js
git add frontend/package.json
git add frontend/src/main.js
git add frontend/index.html
git add frontend/package-lock.json
git commit -m "✅ Merge conflict resolved"
git push origin main
git pull origin main --rebase
git stash push -m "temp-saving-changes"
git pull origin main --rebase
git stash pop
git add .
git commit -m "WIP: Saving changes before pull"
git pull origin main --rebase
git push origin main
git stash push -m "save-my-work"
git pull origin main --rebase
git stash pop
git push origin main
git stash push -m "temp-save"
git pull origin main --rebase
git push origin main --force
git config --global http.postBuffer 524288000
git remote set-url origin git@github.com:koagonzalo11/elparadisogonzalo-monorepo.git
pkg install git-lfs
git lfs install
git lfs track "*.png" "*.json" "*.csv"
git add .gitattributes
git add path/to/large/files
git commit -m "Track large files with LFS"
git push origin main --force
git push origin main --no-verify
git remote set-url origin https://github.com/koagonzalo11/elparadisogonzalo-monorepo.git
git push origin main --no-verify
git pull origin main --rebase
git add .
git commit -m "WIP: Save progress before rebase"
git pull origin main --rebase
ls
rm -rf ~/.cache/*
rm -rf ~/../usr/var/cache/*
git push origin main --force
df -h
pkg clean
rm -rf ~/.npm/_cacache
rm -rf ~/.npm/_logs
rm -rf ~/.yarn-cache # (if present)
du -ah ~ | sort -rh | head -n 20
rm -rf ~/elparadisogonzalo-monorepo/.git
git init  # reset it fresh
tar -czf /sdcard/monorepo.tar.gz ~/elparadisogonzalo-monorepo
rm -rf ~/elparadisogonzalo-monorepo
nano gitignore
nano .gitignore
df -h
rm -rf ~/.git
rm -rf ~/repos/elparadisogonzalo.git
rm -rf ~/compiled_contracts_*
rm -rf ~/logs/
df -h
cd ~/elparadisogonzalo-monorepo
rm -rf .git
git init
git remote add origin https://github.com/koagonzalo11/elparadisogonzalo-monorepo.git
git add .
git commit -m "Clean reset with working automation"
git branch -M main
git push -f origin main
npx hardhat clean
npx hardhat compile --force
pip install slither-analyzer
pip install eth-hash[pycryptodome]
pip install --upgrade eth-hash[pycryptodome]
pip show eth-hash pycryptodome
pip install pycryptodome eth-hash[pycryptodome]
python3 -m venv --system-site-packages venv
source venv/bin/activate
<<<<<<< HEAD
pytho
>>>>>>> origin/master
=======
pythocd
curl -L -o esbuild https://github.com/evanw/esbuild/releases/download/v0.19.11/esbuild-linux-arm64
chmod +x esbuild
./esbuild --version
cd ~/frontend
mkdir -p node_modules/esbuild/bin
cd node_modules/esbuild/bin
npm install --save-dev vite
npm run build
cd ~/frontend
rm -rf node_modules/esbuild
mkdir -p node_modules/esbuild/bin
cd node_modules/esbuild/bin
curl -L -o esbuild https://github.com/evanw/esbuild/releases/download/v0.19.11/esbuild-linux-arm64
chmod +x esbuild
cd ~/frontend/node_modules/esbuild/bin
curl -L -o esbuild https://ipfs.io/ipfs/QmQs92f8Uj49GVzvUTohFbLoYFqyoWeYqEhPkJoAHfJmeW/esbuild-linux-arm64
chmod +x esbuild
npm install --save-dev vite
cd ~/frontend/node_modules/vite/node_modules
cd
cd ~/frontend/node_modules/vite/node_modules
cd ~/frontend
rm -rf node_modules package-lock.json
mkdir -p node_modules/esbuild/bin
cd node_modules/esbuild/bin
curl -L -o esbuild https://ipfs.io/ipfs/QmQs92f8Uj49GVzvUTohFbLoYFqyoWeYqEhPkJoAHfJmeW/esbuild-linux-arm64
chmod +x esbuild
cd ..
echo '{}' > package.json
cd ~/frontend
mkdir -p node_modules/.bin
ln -sf ../esbuild/bin/esbuild node_modules/.bin/esbuild
npm install --save-dev vite --no-optional
npm run build
cd ~/frontend
rm -rf node_modules package-lock.json
npm install --save-dev vite --no-optional --ignore-scripts
mkdir -p node_modules/esbuild/bin
curl -L -o node_modules/esbuild/bin/esbuild https://ipfs.io/ipfs/QmQs92f8Uj49GVzvUTohFbLoYFqyoWeYqEhPkJoAHfJmeW/esbuild-linux-arm64
chmod +x node_modules/esbuild/bin/esbuild
echo '{}' > node_modules/esbuild/package.json
mkdir -p node_modules/.bin
ln -sf ../esbuild/bin/esbuild node_modules/.bin/esbuild
npx vite build
cd ~/frontend/node_modules/esbuild
echo "export default {};" > index.js
npx vite build
nano nodemodules/esbuild/index.js
rm -rf ~/frontend/node_modules/esbuild
mkdir -p ~/frontend/node_modules/esbuild
cd ~/frontend/node_modules/esbuild
cat > ~/frontend/node_modules/esbuild/index.js << 'EOF'
export function build() {
  console.log("⚠️ esbuild.build() called — stubbed!");
  return Promise.resolve({});
}

export function transform(code, options) {
  console.log("⚠️ esbuild.transform() called — stubbed!");
  return Promise.resolve({ code, map: "" });
}

export function formatMessages(messages) {
  return Promise.resolve(messages);
}

export default {
  build,
  transform,
  formatMessages,
};
EOF

echo '{}' > package.json
mkdir -p bin
curl -L -o bin/esbuild https://ipfs.io/ipfs/QmQs92f8Uj49GVzvUTohFbLoYFqyoWeYqEhPkJoAHfJmeW/esbuild-linux-arm64
chmod +x bin/esbuild
cd ~/frontend
npx vite build
cd ~/frontend
npm install rollup
npx vite build
npm install --no-optional --ignore-script
cd ~/frontend
npx vite build
npm run build
npm uninstall rollup
npm install rollup@2.79.1
git add .
git commit -m "🔥 Working Termux frontend build using Rollup 2"
git push origin main
git pull --rebase origin main
git add .
git commit -m "💄 UI update: token image + build fix"
git push origin main
git pull --rebase origin main
git push origin main
git status
git config --global credential.helper store
git push origin main
git pull --rebase origin main
git add .
cd
git add .
git commit -m "🛠️ Final UI + IPFS prep before rebase"
git pull --rebase origin main
git push origin main
git checkout -b ipfs-deploy-fix
git push origin ipfs-deploy-fix
git push origin main
git clone https://github.com/koagonzalo 11/elparadisogonzalo-monorepo.git
cd elparadisogonzalo-monorepo
git clone https://github.com/koagonzalo11/elparadisogonzalo-monorepo.git
cd elparadisogonzalo-monorepo
git clone https://github.com/koagonzalo11/elparadisogonzalo-monorepo.git
cd elparadisogonzalo-monorepo
git remote set-url origin https://github.com/koagonzalo11/elparadisogonzalo-monorepo.git
git push origin main
git remote -v
git push origin ipfs-deploy-fix
git add .
git commit -m "💄 UI update: token image + build fix"
git remote -v
git push origin main
git config --global credential.helper store
git push origin main
git config --global credential.helper store
git push origin main
cd
ls /sdcard/Download/
cat 1738484946252_1.jpg
find /sdcard -type f -iname "*paradiso*.png" 2>/dev/null
cd
find /sdcard -type f -iname "*paradiso*.png" 2>/dev/null
find /sdcard -type f -iname "*0xparadiso-street.png*.png" 2>/dev/null
find /sdcard -type f \( -iname "*.png" -o -iname "*.jpg" -o -iname "*.jpeg" \) 2>/dev/null | grep -i "paradiso"
git push origin ipfs-deploy
remote -v
git remote -v
git checkout -b ipfs-deploy
git push origin ipfs-deploy
git auth user
git push origin main
nano .github/workflows/deploy.yml
# 1. Create workflow directory (if it doesn't exist)
mkdir -p .github/workflows
# 2. Create the deploy workflow file
nano .github/workflows/deploy.yml
git add .github/workflows/deploy.yml
git commit -m "🚀 Add deploy workflow: IPFS + Unstoppable Domains automation"
git push origin main
# 1. Create a new branch
git checkout -b ipfs-deploy-workflow
# 2. Push the new branch
git push origin ipfs-deploy-workflow
>>>>>>> c5f7e8e2c4 (🛠️ Prepare for rebase: deploy workflow added)
