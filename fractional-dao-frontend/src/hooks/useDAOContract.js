import { ethers } from "ethers";
import abi from "../contracts/FractionalDAO.json";

export function useDAOContract(address) {
  if (!window.ethereum || !address) return null;
  const provider = new ethers.BrowserProvider(window.ethereum);
  return new ethers.Contract(address, abi, provider.getSigner());
}
