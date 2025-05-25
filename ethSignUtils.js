/**
 * Utility functions for Ethereum message and transaction signing.
 * 
 * @module ethSignUtils
 */

 /**
  * Sign a message using the Ethereum-specific format (eth_sign).
  *
  * @function
  * @param {Buffer} message - The message to sign.
  * @param {Buffer} privateKey - The private key to sign with.
  * @returns {Object} The signature object.
  * @returns {Buffer} return.r - The R value of the signature.
  * @returns {Buffer} return.s - The S value of the signature.
  * @returns {number} return.v - The recovery identifier.
  * @returns {string} return.signature - The full signature as a hex string.
  */

 /**
  * Sign a raw transaction using Ethereum's transaction format.
  *
  * @function
  * @param {Object} txData - The transaction data object.
  * @param {number|string|BN} txData.nonce - The transaction nonce.
  * @param {number|string|BN} txData.gasPrice - The gas price.
  * @param {number|string|BN} txData.gasLimit - The gas limit.
  * @param {string} txData.to - The recipient address.
  * @param {number|string|BN} txData.value - The value to send.
  * @param {string} [txData.data] - The data payload.
  * @param {number} [txData.chainId] - The Ethereum chain ID.
  * @param {Buffer} privateKey - The private key to sign with.
  * @returns {string} The serialized signed transaction as a hex string.
  */
// Utility functions for Ethereum message and transaction signing
const ethUtil = require('ethereumjs-util');

/**
 * Sign a message using the Ethereum-specific format (eth_sign).
 * @param {Buffer} message - The message to sign.
 * @param {Buffer} privateKey - The private key to sign with.
 * @returns {Object} The signature object { r, s, v, signature }.
 */
function signEthMessage(message, privateKey) {
  const msgHash = ethUtil.hashPersonalMessage(message);
  const sig = ethUtil.ecsign(msgHash, privateKey);
  return {
    r: sig.r,
    s: sig.s,
    v: sig.v,
    signature: ethUtil.toRpcSig(sig.v, sig.r, sig.s)
  };
}

/**
 * Sign a raw transaction using Ethereum's transaction format.
 * @param {Object} txData - The transaction data object (nonce, gasPrice, gasLimit, to, value, data, chainId).
 * @param {Buffer} privateKey - The private key to sign with.
 * @returns {string} The serialized signed transaction (hex string).
 */
function signEthTransaction(txData, privateKey) {
  const { createTx } = require('@ethereumjs/tx');
  const tx = createTx(txData);
  const signedTx = tx.sign(privateKey);
  return '0x' + signedTx.serialize().toString('hex');
}

module.exports = {
  signEthMessage,
  signEthTransaction
};
