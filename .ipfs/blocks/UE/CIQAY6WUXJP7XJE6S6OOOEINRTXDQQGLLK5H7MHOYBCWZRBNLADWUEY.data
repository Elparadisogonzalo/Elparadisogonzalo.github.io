async function connectMetaMask() {
  if (typeof window.ethereum !== 'undefined') {
    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      alert("Connected account: " + accounts[0]);
    } catch (err) {
      alert("Connection failed: " + err.message);
    }
  } else {
    alert("MetaMask not found. Please install MetaMask.");
  }
}
