# verify.py
import sys
from eth_keys import keys
from eth_keys.exceptions import BadSignature
from eth_utils import to_checksum_address

def main():
    if len(sys.argv) != 3:
        print("Usage: python verify.py <message> <hex_signature>")
        sys.exit(1)

    message = sys.argv[1].encode()
    sig_hex = sys.argv[2]

    try:
        signature = keys.Signature(bytes.fromhex(sig_hex[2:] if sig_hex.startswith("0x") else sig_hex))
        recovered_pub = signature.recover_public_key_from_msg(message)
        recovered_addr = to_checksum_address(recovered_pub.to_address())

        print("Message:", message.decode())
        print("Recovered Address:", recovered_addr)
    except BadSignatureError:
        print("Invalid signature")
    except Exception as e:
        print("Error:", e)

if __name__ == "__main__":
    main()
