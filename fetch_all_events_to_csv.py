# fetch_all_events_to_csv.py

import csv
from datetime import datetime

# Simulated blockchain event data
events = [
    {"tx_hash": "0xabc123", "block": 123456, "from": "0x111", "to": "0x222", "value": 10},
    {"tx_hash": "0xdef456", "block": 123457, "from": "0x333", "to": "0x444", "value": 20},
]

filename = f"events-{datetime.now().strftime('%Y%m%d-%H%M')}.csv"

with open(f"logs/{filename}", mode="w", newline="") as file:
    writer = csv.DictWriter(file, fieldnames=events[0].keys())
    writer.writeheader()
    writer.writerows(events)

print(f"[+] Exported {len(events)} events to logs/{filename}")
# fetch_all_events_to_csv.py

import os
import csv
from web3 import Web3
from datetime import datetime

# === Config ===
INFURA_URL = "https://mainnet.infura.io/v3/429c528a2c524a0ba1fa538343d025b2" # or your local node URL
CONTRACT_ADDRESS = "0x4e8c73e7f243d12b7a5571200609523a4890beff"  # replace with your contract
ABI_PATH = "contract_abi.json"  # must be in same directory
EVENT_NAME = "Transfer"  # or your event name
START_BLOCK = 0
END_BLOCK = 'latest'

# === Connect ===
web3 = Web3(Web3.HTTPProvider(INFURA_URL))
if not web3.is_connected():
    raise Exception("❌ Web3 connection failed")

# === Load ABI ===
import json
with open(ABI_PATH) as abi_file:
    abi = json.load(abi_file)

contract = web3.eth.contract(address=Web3.to_checksum_address(CONTRACT_ADDRESS), abi=abi)
event = getattr(contract.events, EVENT_NAME)

# === Fetch Events ===
logs = event().get_logs(fromBlock=START_BLOCK, toBlock=# fetch_all_events_to_csv.py

import os
import csv
import os
import csv
import json
from web3 import Web3
from datetime import datetime

# === Config ===
INFURA_URL = "https://mainnet.infura.io/v3/429c528a2c524a0ba1fa538343d025b2"
CONTRACT_ADDRESS = "0x4e8c73e7f243d12b7a5571200609523a4890beff"
ABI = [[{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"},{"internalType":"string","name":"_tokenURI","type":"string"},{"internalType":"bytes32","name":"_merkleRoot","type":"bytes32"},{"internalType":"uint256","name":"_maxTotalMintedSupply","type":"uint256"},{"internalType":"uint256","name":"_originalChainId","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"AlreadyClaimed","type":"error"},{"inputs":[],"name":"CannotClaimZero","type":"error"},{"inputs":[],"name":"InvalidProof","type":"error"},{"inputs":[],"name":"Unauthorized","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Claim","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"CrosschainBurn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"CrosschainMint","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32[]","name":"proof","type":"bytes32[]"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"claimed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"crosschainBurn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"crosschainMint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxTotalMintedSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"merkleRoot","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"originalChainId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"_interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalMintedSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}] ]  # 👈 Replace with the full ABI list you provided above
EVENTS_TO_FETCH = ["Transfer", "Claim", "CrosschainMint"]
FROM_BLOCK = 0
TO_BLOCK = 'latest'

# === Init ===
w3 = Web3(Web3.HTTPProvider(INFURA_URL))
if not w3.is_connected():
    raise Exception("❌ Web3 connection failed")

contract = w3.eth.contract(address=Web3.to_checksum_address(CONTRACT_ADDRESS), abi=ABI)
os.makedirs("logs", exist_ok=True)

for event_name in EVENTS_TO_FETCH:
    event_obj = getattr(contract.events, event_name)
    logs = event_obj().get_logs(fromBlock=FROM_BLOCK, toBlock=TO_BLOCK)

    if logs:
        filename = f"logs/{event_name}-{datetime.utcnow().strftime('%Y%m%d-%H%M')}.csv"
        with open(filename, mode="w", newline="") as f:
            writer = csv.DictWriter(f, fieldnames=logs[0]['args'].keys())
            writer.writeheader()
            for log in logs:
                writer.writerow(dict(log['args']))

        print(f"[✅] Saved {len(logs)} {event_name} events to {filename}")
    else:
        print(f"[ℹ️] No {event_name} events found.")from web3 import Web3
from datetime import datetime

# === Config ===
INFURA_URL = "https://mainnet.infura.io/v3/429c528a2c524a0ba1fa538343d025b2" # or your local node URL
CONTRACT_ADDRESS = "0x4e8c73e7f243d12b7a5571200609523a4890beff"  # replace with your contract
ABI_PATH = "contract_abi.json"  # must be in same directory
EVENT_NAME = "Transfer"  # or your event name
START_BLOCK = 0
END_BLOCK = 'latest'

# === Connect ===
web3 = Web3(Web3.HTTPProvider(INFURA_URL))
if not web3.is_connected():
    raise Exception("❌ Web3 connection failed")

# === Load ABI ===
import json
with open(ABI_PATH) as abi_file:
    abi = json.load(abi_file)

contract = web3.eth.contract(address=Web3.to_checksum_address(CONTRACT_ADDRESS), abi=abi)
event = getattr(contract.events, EVENT_NAME)

# === Fetch Events ===
logs = event().get_logs(fromBlock=START_BLOCK, toBlock=END_BLOCK)

# === Write CSV ===
os.makedirs("logs", exist_ok=True)
timestamp = datetime.utcnow().strftime("%Y%m%d-%H%M")
filename = f"logs/events-{timestamp}.csv"

with open(filename, mode="w", newline="") as file:
    writer = csv.DictWriter(file, fieldnames=logs[0]['args'].keys())
    writer.writeheader()
    for log in logs:
        writer.writerow(dict(log['args']))

print(f"[✅] {len(logs)} events saved to {filename}")END_BLOCK)

# === Write CSV ===
os.makedirs("logs", exist_ok=True)
timestamp = datetime.utcnow().strftime("%Y%m%d-%H%M")
filename = f"logs/events-{timestamp}.csv"

with open(filename, mode="w", newline="") as file:
    writer = csv.DictWriter(file, fieldnames=logs[0]['args'].keys())
    writer.writeheader()
    for log in logs:
        writer.writerow(dict(log['args']))

print(f"[✅] {len(logs)} events saved to {filename}")
