// src/components/FractionalizerForm.jsx
import { useState } from "react";
import { ethers } from "ethers";
import Fractionalizer from "../contracts/Fractionalizer.json";

export default function FractionalizerForm({ provider, fractionalizerAddress, artNFTAddress }) {
  const [tokenId, setTokenId] = useState("");
  const [shares, setShares] = useState("");
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [status, setStatus] = useState("");

  async function handleFractionalize() {
    try {
      const signer = await provider.getSigner();

      const nft = new ethers.Contract(artNFTAddress, [
        "function approve(address,uint256)",
        "function ownerOf(uint256) view returns (address)"
      ], signer);

      await nft.approve(fractionalizerAddress, tokenId);

      const fractionalizer = new ethers.Contract(
        fractionalizerAddress,
        Fractionalizer.abi,
        signer
      );

      await fractionalizer.fractionalize(
        artNFTAddress,
        tokenId,
        ethers.parseUnits(shares, 0),
        name,
        symbol
      );

      setStatus("✅ Fractionalized!");
    } catch (err) {
      console.error("Fractionalize failed:", err);
      setStatus("❌ Failed to fractionalize");
    }
  };

  return (
    <div className="space-y-4 mt-8 p-4 border rounded">
      <h2 className="text-xl font-bold">Fractionalize NFT</h2>
      <input
        className="border p-2 w-full"
        type="text"
        placeholder="NFT Token ID"
        value={tokenId}
        onChange={(e) => setTokenId(e.target.value)}
      />
      <input
        className="border p-2 w-full"
        type="text"
        placeholder="Total Shares (e.g., 1000)"
        value={shares}
        onChange={(e) => setShares(e.target.value)}
      />
      <input
        className="border p-2 w-full"
        type="text"
        placeholder="Token Name (e.g., MonaDAO)"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="border p-2 w-full"
        type="text"
        placeholder="Token Symbol (e.g., MONA)"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
      />
      <button
        onClick={handleFractionalize}
        className="bg-purple-600 text-white px-4 py-2 rounded"
      >
        Fractionalize
      </button>
      {status && <p className="mt-2">{status}</p>}
    </div>
  );
}
