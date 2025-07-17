import os
import json
from web3 import Web3
import pandas as pd
import duckdb

# ⚙️ Setup
INFURA_URL = os.getenv("INFURA_URL", "https://429c528a2c524a0ba1fa538343d025b2")
CONTRACT_ADDRESS = "0x4e8c73e7f243d12b7a5571200609523a4890beff"
ABI_FILE = "contract_abi.json"  # Place ABI JSON here
OUTPUT_FILE = "all_events.parquet"
START_BLOCK = 0
END_BLOCK = "latest"
CHUNK_SIZE = 500000  # adjust based on provider limits

# 🧩 Load ABI
with open(ABI_FILE) as f:
    contract_abi = json.load(f)

# 🌐 Web3 connection
w3 = Web3(Web3.HTTPProvider(INFURA_URL))
contract = w3.eth.contract(address=CONTRACT_ADDRESS, abi=contract_abi)

# 🛰️ Fetch logs in chunks
all_events = []
latest = w3.eth.block_number if END_BLOCK == "latest" else int(END_BLOCK)
for start in range(START_BLOCK, latest + 1, CHUNK_SIZE):
    end = min(start + CHUNK_SIZE - 1, latest)
    print(f"Fetching blocks {start} to {end}...")
    try:
        logs = w3.eth.get_logs({
            "address": CONTRACT_ADDRESS,
            "fromBlock": start,
            "toBlock": end
        })
        for log in logs:
            evt = contract.events._find_matching_event_abi(log.topics[0])
            decoded = contract.events[evt['name']]().processLog(log)
            rec = {
                "blockNumber": decoded.blockNumber,
                "txHash": decoded.transactionHash.hex(),
                "eventName": decoded.event,
                **decoded.args
            }
            all_events.append(rec)
    except Exception as e:
        print(f"⚠️ Error fetching blocks {start}-{end}: {e}")

# 🗄 Convert to DataFrame
df = pd.DataFrame(all_events)
print(f"Total events fetched: {len(df)}")

# 🪄 Write Parquet via DuckDB (no pyarrow)
duckdb.query(f"COPY df TO '{OUTPUT_FILE}' (FORMAT PARQUET);")

print(f"\n✅ Done! Parquet file: {OUTPUT_FILE}")
