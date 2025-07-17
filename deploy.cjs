const { ethers } = require("ethers");
const fs = require("fs");

const abi = JSON.parse(fs.readFileSync("./MyContract.abi.json"));
const bytecode = fs.readFileSync("./MyContract.bin").toString();

const provider = new ethers.providers.JsonRpcProvider("http://localhost:8546");

const PRIVATE_KEY = "0xYOUR_PRIVATE_KEY_HERE";
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

async function deploy() {
  const factory = new ethers.ContractFactory(abi, bytecode, wallet);
  const contract = await factory.deploy();
  console.log("✅ Contract deployed at:", contract.address);
}

deploy();
