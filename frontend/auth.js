async function signInWithWallet() {
  try {
    const statusEl = document.getElementById('status');
    
    if (!window.ethereum) {
      statusEl.textContent = "🦊 MetaMask not found. Please install MetaMask.";
      return;
    }

    // Request wallet access
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const address = accounts[0];

    // Step 1: Request nonce from backend
    const nonceResp = await fetch('http://192.168.0.194:3000/nonce', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address })
    });

    const { nonce } = await nonceResp.json();
    const message = `Login nonce: ${nonce}`;

    // Step 2: Sign the message using wallet
    const signature = await window.ethereum.request({
      method: 'personal_sign',
      params: [message, address],
    });

    // Step 3: Send signature back to backend for verification
    const verifyResp = await fetch('http://192.168.0.194:3000/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address, signature })
    });

    const result = await verifyResp.json();

    if (result.success) {
      statusEl.textContent = '✅ Authenticated successfully!';
      // Optionally: store result.token or trigger next steps
    } else {
      statusEl.textContent = '❌ Authentication failed.';
    }
  } catch (error) {
    console.error(error);
    document.getElementById('status').textContent = '❌ Error occurred during login.';
  }
}
