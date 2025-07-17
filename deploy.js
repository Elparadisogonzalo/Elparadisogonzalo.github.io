const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contract with:", deployer.address);

  const Contract = await hre.ethers.getContractFactory("YourContract"); // Change to your contract
  const contract = await Contract.deploy(); // Add constructor args if needed
  await contract.deployed();

  console.log("Deployed to:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
