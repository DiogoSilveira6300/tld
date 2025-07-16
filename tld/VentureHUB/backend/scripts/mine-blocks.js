// npx hardhat run scripts/mine-blocks.js --network localhost

async function main() {
  const blocksToMine = 22;

  for (let i = 0; i < blocksToMine; i++) {
    await network.provider.send("evm_mine");
    if ((i + 1) % 5 === 0 || i === blocksToMine - 1) {
        console.log(`Block #${i + 1} mined`);
    }
  }
  console.log(`Finished mining ${blocksToMine} blocks.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});