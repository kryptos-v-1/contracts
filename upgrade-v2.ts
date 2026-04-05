import { ethers, upgrades } from "hardhat";

async function main() {
  console.log("🚀 Starting V2 Upgrade on Base...");

  // Set the PROXY address from your previous deployment here
  const PROXY_ADDRESS = process.env.PROXY_ADDRESS || "0x0000000000000000000000000000000000000000";

  if (PROXY_ADDRESS === "0x0000000000000000000000000000000000000000") {
    throw new Error("❌ Please set PROXY_ADDRESS in your .env or inline script.");
  }

  const [deployer] = await ethers.getSigners();
  console.log(`📍 Deployer: ${deployer.address}`);

  // Fetch the new contract version you want to upgrade to (e.g., RiskRegistryV3)
  // For this script, we'll pretend we are re-deploying the V2 to demonstrate.
  const RiskRegistryV2_New = await ethers.getContractFactory("RiskRegistryV2");

  console.log(`🏗️ Upgrading Proxy at ${PROXY_ADDRESS}...`);

  // upgrades.upgradeProxy will deploy the new implementation and call _authorizeUpgrade
  const upgradedProxy = await upgrades.upgradeProxy(PROXY_ADDRESS, RiskRegistryV2_New);
  await upgradedProxy.waitForDeployment();

  console.log(`\n✅ UPGRADE SUCCESSFUL!`);
  console.log(`📜 The proxy at ${PROXY_ADDRESS} is now running the new implementation.`);
}

main().catch((error) => {
  console.error("❌ Failed:", error);
  process.exitCode = 1;
});
