import { ethers } from "ethers";

const connectButton = document.getElementById("connect");
const status = document.getElementById("status");
const balanceDisplay = document.getElementById("balance");

connectButton.onclick = async () => {
  if (!window.ethereum) {
    alert("MetaMask not detected");
    return;
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = await provider.getSigner();
  const address = await signer.getAddress();

  status.textContent = `Connected: ${address}`;

  const balance = await provider.getBalance(address);
  const ethBalance = ethers.formatEther(balance);
  balanceDisplay.textContent = `ETH Balance: ${ethBalance}`;
};
