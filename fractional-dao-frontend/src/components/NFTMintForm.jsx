// src/components/NFTMintForm.jsx
import { useState } from "react";
import { getArtNFTContract } from "../utils/contractHelpers";

export default function NFTMintForm({ provider, artNFTAddress }) {
  const [minting, setMinting] = useState(false);

  async function mintNFT() {
    setMinting(true);
    try {
      const contract = await getArtNFTContract(provider, artNFTAddress);
      const signer = await provider.getSigner();
      const recipient = await signer.getAddress();

      console.log("Minting to:", recipient);
      console.log("Contract address:", artNFTAddress);

      const tx = await contract.mint(recipient);
      await tx.wait();
      alert("NFT minted!");
    } catch (err) {
      console.error("Mint failed:", err);
      alert("Minting failed");
    }

    setMinting(false);
  }

  return (
    <button onClick={mintNFT} disabled={minting} className="bg-green-600 text-white px-4 py-2 rounded">
      {minting ? "Minting..." : "Mint NFT"}
    </button>
  );
}
