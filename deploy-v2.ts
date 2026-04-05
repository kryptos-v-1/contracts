import { ethers, upgrades } from "hardhat";

async function main() {
  console.log("🚀 Starting V2 Deployment (UUPS Proxy) to Base...");

  const [deployer] = await ethers.getSigners();
  console.log(`📍 Deployer: ${deployer.address}`);

  const balance = await ethers.provider.getBalance(deployer.address);
  console.log(`💰 Balance: ${ethers.formatEther(balance)} ETH`);

  const RiskRegistryV2 = await ethers.getContractFactory("RiskRegistryV2");
  console.log("🏗️ Deploying RiskRegistryV2 as Proxy...");

  // deployProxy automatically calls initialize() and sets up the proxy
  const registryProxy = await upgrades.deployProxy(RiskRegistryV2, [], {
    kind: "uups",
  });

  await registryProxy.waitForDeployment();
  const proxyAddress = await registryProxy.getAddress();

  console.log(`\n✅ DEPLOYED SUCCESSFULLY!`);
  console.log(`📜 Proxy Address: ${proxyAddress}`);
  console.log(`🔗 Block Explorer: https://sepolia.basescan.org/address/${proxyAddress}`);
  console.log(`\nTo verify on BaseScan:\n  npx hardhat verify --network baseSepolia ${proxyAddress}`);

  // Note: For proxies, you usually verify the implementation address. You can get it via:
  // const implAddress = await upgrades.erc1967.getImplementationAddress(proxyAddress);
}

main().catch((error) => {
  console.error("❌ Failed:", error);
  process.exitCode = 1;
});
