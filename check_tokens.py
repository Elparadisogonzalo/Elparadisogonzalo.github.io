from web3 import Web3

# Connect to Infura
w3 = Web3(Web3.HTTPProvider('https://mainnet.infura.io/v3/429c528a2c524a0ba1fa538343d025b2'))

# Your wallet address
address = '0x175D7Bc38d4164A5162d92938f15569fe6f49087B691A366AEcD3fe40fd9B21B'

# ERC-20 Token contract addresses (add more if needed)
tokens = {
    "USDT": "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    "DAI": "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    "USDC": "0xA0b86991C6218b36c1d19D4a2e9Eb0cE3606eB48"
}

# ERC-20 ABI (balanceOf and decimals)
erc20_abi = [
    {
        "constant": True,
        "inputs": [{"name": "_owner", "type": "address"}],
        "name": "balanceOf",
        "outputs": [{"name": "balance", "type": "uint256"}],
        "type": "function",
    },
    {
        "constant": True,
        "inputs": [],
        "name": "decimals",
        "outputs": [{"name": "", "type": "uint8"}],
        "type": "function",
    }
]

for name, token_addr in tokens.items():
    contract = w3.eth.contract(address=token_addr, abi=erc20_abi)
    decimals = contract.functions.decimals().call()
    raw_balance = contract.functions.balanceOf(address).call()
    balance = raw_balance / (10 ** decimals)
    print(f"{name} Balance: {balance}")
