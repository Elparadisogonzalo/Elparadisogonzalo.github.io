import { ethers } from 'ethers';

export async function connectWallet() {
  if (typeof window.ethereum !== 'undefined') {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      return { provider, signer, address };
    } catch (err) {
      console.error('Wallet connection failed:', err);
      return null;
    }
  } else {
    alert('Please install MetaMask!');
    return null;
  }
}
