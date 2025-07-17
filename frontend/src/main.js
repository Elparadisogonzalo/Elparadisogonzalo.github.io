import { ethers } from "ethers";

// Create button
const connectButton = document.createElement("button");
connectButton.innerText = "Connect MetaMask";
connectButton.style.padding = "10px 20px";
connectButton.style.fontSize = "16px";
connectButton.style.marginTop = "20px";
connectButton.style.backgroundColor = "#4CAF50";
connectButton.style.color = "white";
connectButton.style.border = "none";
connectButton.style.borderRadius = "8px";

// Define click action
connectButton.onclick = async () => {
  if (typeof window.ethereum !== "undefined") {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      // Show address
      const result = document.getElementById("result");
      result.innerText = `Connected: ${address}`;
    } catch (error) {
      alert("Error connecting: " + error.message);
    }
  } else {
    alert("MetaMask not detected.");
  }
};

// Add to DOM
document.getElementById("app").appendChild(connectButton);

// Add result display
const resultDiv = document.createElement("div");
resultDiv.id = "result";
resultDiv.style.marginTop = "15px";
resultDiv.style.fontSize = "14px";
document.getElementById("app").appendChild(resultDiv);
