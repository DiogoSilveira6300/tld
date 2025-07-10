const fractionalizer = await ethers.getContractAt("Fractionalizer", "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512");

const logs = await ethers.provider.getLogs({
  fromBlock: 0,
  address: fractionalizer.target,
  topics: [
    ethers.id("Fractionalized(address,uint256,address,uint256)")
  ]
});

const iface = new ethers.Interface([
  "event Fractionalized(address nft, uint256 tokenId, address tokenAddress, uint256 totalShares)"
]);

const parsed = logs.map(log => iface.parseLog(log));

parsed.forEach(event => {
  console.log("📦 ERC-20 Token Address:", event.args.tokenAddress);
});

//-------------

// In Hardhat console:
const fractionalizer = await ethers.getContractAt("Fractionalizer", "0xCafac3dD18aC6c6e92c921884f9E4176737C052c");
const logs = await ethers.provider.getLogs({
  fromBlock: 0,
  address: fractionalizer.target,
  topics: [ethers.id("Fractionalized(address,uint256,address,uint256)")]
});
const iface = new ethers.Interface([
  "event Fractionalized(address nft, uint256 tokenId, address tokenAddress, uint256 totalShares)"
]);
const parsed = iface.parseLog(logs[logs.length - 1]);
const tokenAddress = parsed.args.tokenAddress;

// --------------

const token = await ethers.getContractAt("ERC20", "0xCafac3dD18aC6c6e92c921884f9E4176737C052c");
const [signer] = await ethers.getSigners();

const raw = await token.balanceOf(signer.address);
console.log("🧾 Raw balance:", raw.toString()); 

