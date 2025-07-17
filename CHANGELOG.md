# Changelog

All notable changes to the Elparadisogonzalo system are documented here.

Format: Semantic Versioning | https://semver.org  
Changelog style: Keep a Changelog | https://keepachangelog.com

---

## [1.2.0] – 2025-07-01
### 🔐 Smart Contracts
- Deployed stable contract version `v1.2` on Ethereum & BSC
- Added event emitters for transfer tracking
- Contract ABI updated and integrated with Web3

### 💻 Frontend
- Fully integrated MetaMask using `web3.js`
- Added wallet connection UI with feedback for mobile/desktop
- Improved dApp responsiveness and mobile compatibility

### 🧠 Backend / Node.js APIs
- Multi-chain token balance tracker added
- Optimized Infura/JSON-RPC requests with async throttling
- Environment config now uses `.env` with fallback

### 🧱 Infrastructure
- Synced local Geth node (Termux, Android) via fast sync
- IPFS upload script with automatic CID binding
- Google Cloud CLI automates backend deployment

### ⚙️ CI/CD & Tooling
- GitHub Actions added for auto-build + push to IPFS
- Changelog generation added using `standard-version`
- Enabled GitHub container registry (ghcr.io)

### 🌐 Domain & Wallet
- `elparadisogonzalo.com` linked to IPFS hash via Unstoppable Domains
- Wallet resolution verified with OpenAI and Unstoppable
- Domain wallet: `0x802ba6...6245` (resolves smart contract)

### 🔐 Security
- Added private key rotation checklist
- CORS protections and JSON-RPC filtering on backend
- Frontend now validates ABI integrity before use

---

## [1.1.0] – 2025-06-15
### Added
- Initial MetaMask wallet injection
- Backend API `/balance`, `/transfer`, `/contract/status` routes
- Drafted first smart contract with ERC20 transfer functions

---

## [1.0.0] – 2025-05-20
### Bootstrap Release
- Ethereum + BSC smart contracts deployed (testnet)
- Geth node initialized on Android (Termux)
- elparadisogonzalo.com registered on Unstoppable Domains
- API server started using Node.js & Web3
