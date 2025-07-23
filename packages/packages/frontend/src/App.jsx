import { useState } from 'react';
import { connectWallet } from './wallet';
import { useWeb3React } from '@web3-react/core';
import { injected } from './web3';
import { ethers } from 'ethers';

function App() {
  const { activate, deactivate, active, account, library } = useWeb3React();

  const connect = async () => {
    try {
      await activate(injected);
    } catch (ex) {
      console.log(ex);
    }
  };

  const disconnect = () => {
    deactivate();
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Elparadisogonzalo dApp</h1>
      {active ? (
        <>
          <p>Connected: {account}</p>
          <button onClick={disconnect}>Disconnect</button>
        </>
      ) : (
        <button onClick={connect}>Connect Wallet</button>
      )}
    </div>
  );
}

export default App;
