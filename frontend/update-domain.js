const { default: Resolution } = require('@unstoppabledomains/resolution');

(async () => {
  const resolution = new Resolution();

  const domain = 'elparadisogonzalo.com';
  const ipfsHash = 'QmbePLo4QJ4GiFHP16ReCsRcqKLu8HdLhnXihXKeXxB2bQ';
  const privateKey = '0x175d7bc38d4164a5162d92938f15569fe6f49087b691a366aecd3fe40fd9b21b';

  try {
    await resolution.setRecord(domain, 'dweb.ipfs.hash', ipfsHash, { privateKey });
    console.log(`✅ IPFS hash updated for ${domain}`);
  } catch (err) {
    console.error(`❌ Failed to update:`, err.message || err);
  }
})();
