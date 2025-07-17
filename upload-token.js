// scripts/upload-tokens.js

import fs from 'fs';
import path from 'path';
import FormData from 'form-data';
import fetch from 'node-fetch';

const TOKEN_DIR = 'frontend/public/tokens'; // Directory where your PNGs live
const PINATA_JWT = process.env.PINATA_JWT;

if (!PINATA_JWT) {
  console.error("❌ Missing PINATA_JWT");
  process.exit(1);
}

async function uploadFileToPinata(filePath) {
  const form = new FormData();
  form.append('file', fs.createReadStream(filePath));

  const res = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${PINATA_JWT}`,
    },
    body: form,
  });

  const data = await res.json();
  return data.IpfsHash;
}

async function main() {
  const results = [];

  const files = fs.readdirSync(TOKEN_DIR).filter(f => f.endsWith('.png'));
  for (const file of files) {
    const fullPath = path.join(TOKEN_DIR, file);
    const cid = await uploadFileToPinata(fullPath);
    console.log(`✅ ${file} → ${cid}`);
    results.push({ file, cid });
  }

  fs.writeFileSync('tokens.json', JSON.stringify(results, null, 2));
  console.log('📝 Saved tokens.json');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
