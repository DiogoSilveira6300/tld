// src/components/WalletConnect.jsx
import { useState } from 'react';
import { ethers } from 'ethers';

export default function WalletConnect({ setWallet }) {
  const [account, setAccount] = useState(null);

  async function connectWallet() {
    if (window.ethereum) {
      try {
        // Request access to wallet
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        // Create provider
        const browserProvider = new ethers.BrowserProvider(window.ethereum);
        const signer = await browserProvider.getSigner();
        const address = await signer.getAddress();

        setAccount(address);
        setWallet(browserProvider);
      } catch (err) {
        console.error("Wallet connection failed:", err);
        alert("Wallet connection failed. Is MetaMask installed?");
      }
    } else {
      alert("MetaMask not detected. Please install it.");
    }
  }

  return (
    <div className="p-4">
      {account ? (
        <p>Connected: {account.slice(0, 6)}...{account.slice(-4)}</p>
      ) : (
        <button
          onClick={connectWallet}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
}
