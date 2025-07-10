// src/utils/contractHelpers.js
import { ethers } from "ethers";
import ArtNFT from "../contracts/ArtNFT.json";
import Fractionalizer from "../contracts/Fractionalizer.json";

export async function getArtNFTContract(provider, address) {
  return new ethers.Contract(address, ArtNFT.abi, await provider.getSigner());
}

export async function getFractionalizerContract(provider, address) {
  return new ethers.Contract(address, Fractionalizer.abi, await provider.getSigner());
}
