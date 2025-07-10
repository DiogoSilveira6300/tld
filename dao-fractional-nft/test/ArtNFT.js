const { expect } = require("chai");

describe("ArtNFT", function () {
  it("Should mint and transfer an NFT", async function () {
    const [owner, addr1] = await ethers.getSigners();
    const ArtNFT = await ethers.getContractFactory("ArtNFT");
    const nft = await ArtNFT.deploy();
    //await nft.deployed();

    await nft.mint(addr1.address);
    expect(await nft.ownerOf(0)).to.equal(addr1.address);
  });
});