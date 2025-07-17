const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const Web3 = require('web3');

const app = express();
app.use(bodyParser.json());

const web3 = new Web3(); // purely for utils
const nonces = {}; // store { address: nonce }

app.post('/nonce', (req, res) => {
  const { address } = req.body;
  const nonce = crypto.randomBytes(16).toString('hex');
  nonces[address.toLowerCase()] = nonce;
  res.json({ nonce });
});

app.post('/verify', (req, res) => {
  const { address, signature } = req.body;
  const nonce = nonces[address.toLowerCase()];
  if (!nonce) return res.status(400).send('Nonce not found');

  const message = `Login nonce: ${nonce}`;
  const recovered = web3.eth.accounts.recover(message, signature);

  if (recovered.toLowerCase() === address.toLowerCase()) {
    delete nonces[address.toLowerCase()];
    return res.json({ success: true, token: 'your-auth-token' });
  } else {
    return res.status(401).json({ success: false, error: 'Invalid signature' });
  }
});

app.listen(3000, () => console.log('🛡️ Auth server running on port 3000'));
