const contentHash = require('content-hash');

const encoded = '0x93f028255035b61df476b13b9dba3c4f06f60e51b9b4caee31680b389aef327f';
const decoded = contentHash.decode(encoded);
console.log('Decoded:', decoded);
