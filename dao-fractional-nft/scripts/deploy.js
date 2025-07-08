const hre = require("hardhat");

async function main() {
  // Deploy ArtNFT contract
  const ArtNFT = await hre.ethers.getContractFactory("ArtNFT");
  const artNFT = await ArtNFT.deploy();
  await artNFT.waitForDeployment();
  console.log("ArtNFT deployed to:", await artNFT.getAddress());

  // Deploy Fractionalizer contract
  const Fractionalizer = await hre.ethers.getContractFactory("Fractionalizer");
  const fractionalizer = await Fractionalizer.deploy();
  await fractionalizer.waitForDeployment();
  console.log("Fractionalizer deployed to:", await fractionalizer.getAddress());

//   // Deploy the DAO voting contract
//   // Replace this with the actual token address used for voting
//   const dummyTokenAddress = deployer.address; // or any deployed ERC20 token you want to use
//   const FractionalDAO = await hre.ethers.getContractFactory("FractionalDAO");
//   const dao = await FractionalDAO.deploy(dummyTokenAddress);
//   await dao.waitForDeployment();
//   console.log("FractionalDAO deployed to:", dao.target);
 }

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
