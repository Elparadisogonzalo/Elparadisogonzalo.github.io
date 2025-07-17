const contractAddress = "0x4E8C73E7f243D12B7A5571200609523A4890beff";
const abi = [/* your full ABI pasted here — too long to fit in one snippet */];

let signer, contract;

async function connect() {
  if (!window.ethereum) {
    alert("Please install MetaMask");
    return;
  }
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  signer = provider.getSigner();
  const address = await signer.getAddress();
  document.getElementById("wallet").innerText = "Connected: " + address;

  contract = new ethers.Contract(contractAddress, abi, signer);
  const balance = await contract.balanceOf(address);
  document.getElementById("balance").innerText = "Balance: " + balance.toString();
}

async function mint() {
  const to = document.getElementById("mintTo").value;
  const amount = document.getElementById("mintAmount").value;
  if (!to || !amount) return alert("Missing address or amount");
  await contract.mint(to, ethers.BigNumber.from(amount));
  alert("Mint successful!");
}

async function transfer() {
  const to = document.getElementById("transferTo").value;
  const amount = document.getElementById("transferAmount").value;
  if (!to || !amount) return alert("Missing address or amount");
  await contract.transfer(to, ethers.BigNumber.from(amount));
  alert("Transfer successful!");
}
