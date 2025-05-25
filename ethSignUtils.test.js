// Example usage of ethSignUtils.js
const { signEthMessage, signEthTransaction } = require('./ethSignUtils');
const ethUtil = require('ethereumjs-util');

// Example private key (DO NOT USE IN PRODUCTION)
const privateKey = Buffer.from('4c0883a69102937d6231471b5dbb6204fe5129617082796fe2b8b0e9ab898b85', 'hex');

// Example message
const message = Buffer.from('Hello, Ethereum!');
const messageSig = signEthMessage(message, privateKey);
console.log('Signed Message:', messageSig);

// Example transaction data
const txData = {
  nonce: '0x00',
  gasPrice: '0x09184e72a000',
  gasLimit: '0x2710',
  to: '0x3535353535353535353535353535353535353535',
  value: '0x00',
  data: '0x',
  chainId: 1
};
const txSig = signEthTransaction(txData, privateKey);
console.log('Signed Transaction:', txSig);
