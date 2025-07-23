// src/App.jsx
import { useState } from "react";
import { connectWallet } from "./wallet";

function App() {
  const [address, setAddress] = useState("");

  const handleConnect = async () => {
    const result = await connectWallet();
    if (result) setAddress(result.address);
  };

  return (
    <div className="p-8">
      <h1 className="text-xl mb-4">🔗 Elparadisogonzalo dApp</h1>
      <button onClick={handleConnect} className="bg-blue-600 text-white p-2 rounded">
        Connect Wallet
      </button>
      {address && <p className="mt-4">✅ Connected: {address}</p>}
    </div>
  );
}

export default App;
