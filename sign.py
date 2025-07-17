# sign.py
import sys
from eth_keys import keys
from eth_utils import to_checksum_address

# Replace this with your private key
PRIVATE_KEY_HEX = "36f11568eff3d86a86fb863a0c5ab81b7bef921e7dc5d5283b7c27dc4ed2e759"

def main():
    if len(sys.argv) != 2:
        print("Usage: python sign.py <message>")
        sys.exit(1)

    message = sys.argv[1].encode()
    priv = keys.PrivateKey(bytes.fromhex(PRIVATE_KEY_HEX))
    signature = priv.sign_msg(message)

    print("Message:", message.decode())
    print("Address:", to_checksum_address(priv.public_key.to_address()))
    print("Signature:", signature)
    print("V:", signature.v)
    print("R:", hex(signature.r))
    print("S:", hex(signature.s))

if __name__ == "__main__":
    main()
