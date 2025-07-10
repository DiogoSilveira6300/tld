// src/App.jsx
import { useState } from 'react';
import WalletConnect from './components/WalletConnect';
import NFTMintForm from './components/NFTMintForm';
import FractionalizerForm from './components/FractionalizerForm';
import ProposalList from "./components/ProposalList";

const ART_NFT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const FRACTIONALIZER_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
// const DAO_ADDRESS = "0xYourDeployedDAOAddressHere"; // 👈 Replace this!

function App() {
  const [provider, setProvider] = useState(null);

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Fractional NFT DAO</h1>
      <WalletConnect setWallet={setProvider} />
      {provider && (
        <>
          <NFTMintForm provider={provider} artNFTAddress={ART_NFT_ADDRESS} />
          <FractionalizerForm
            provider={provider}
            fractionalizerAddress={FRACTIONALIZER_ADDRESS}
            artNFTAddress={ART_NFT_ADDRESS}
          />

          {/* <hr className="my-6" /> */}

          {/* 👇 Add the ProposalList here */}
          {/* <ProposalList daoAddress={DAO_ADDRESS} /> */}
        </>
      )}
    </div>
  );
}

export default App;
