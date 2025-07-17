const { default: Resolution } = require('@unstoppabledomains/resolution');

(async () => {
  const resolution = new Resolution();

  try {
    const domain = 'elparadisogonzalo.com';
    const owner = await resolution.owner(domain);
    const ipfsHash = await resolution.record(domain, 'dweb.ipfs.hash');

    console.log(`✅ Domain: ${domain}`);
    console.log(`👤 Owner Address: ${owner}`);
    console.log(`📦 IPFS Hash: ${ipfsHash}`);
  } catch (err) {
    console.error(`❌ Error:`, err.message || err);
  }
})();
