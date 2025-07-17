from web3 import Web3

# Connect to Infura
w3 = 
Web3(Web3.HTTPProvider('https://mainnet.infura.io/v3/429c528a2c524a0ba1fa538343d025b2'))

# Your wallet address
address = '0x175D7Bc38d4164A5162d92938f15569fe6f49087B691A366AEcD3fe40fd9B21B'

# Get ETH balance
balance = w3.eth.get_balance(address) eth = w3.from_wei(balance, 'ether')

print(f'ETH Balance: {eth} ETH')
