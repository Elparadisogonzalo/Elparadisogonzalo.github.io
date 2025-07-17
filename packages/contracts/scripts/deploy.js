const fs = require("fs");
const path = require("path");

async function main() {
  const Contract = await ethers.getContractFactory("YourContract");
  const contract = await Contract.deploy();
  await contract.deployed();

  console.log("✅ Contract deployed to:", contract.address);

  // Save deployment info
  const frontendPath = path.resolve(__dirname, "../../frontend/src/contracts");

  if (!fs.existsSync(frontendPath)) {
    fs.mkdirSync(frontendPath, { recursive: true });
  }

  fs.writeFileSync(
    path.join(frontendPath, "contract-address.json"),
    JSON.stringify({ address: contract.address }, null, 2)
  );

  fs.writeFileSync(
    path.join(frontendPath, "contract-abi.json"),
    JSON.stringify(contract.interface.format("json"), null, 2)
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
})
