from web3 import Web3

infura_url = 'https://mainnet.infura.io/v3/429c528a2c524a0ba1fa538343d025b2'
w3 = Web3(Web3.HTTPProvider(infura_url))

print("Connected?" , w3.is_connected())
