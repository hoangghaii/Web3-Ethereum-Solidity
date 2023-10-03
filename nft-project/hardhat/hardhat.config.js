require('@nomicfoundation/hardhat-toolbox');
require('@nomicfoundation/hardhat-verify');

const fs = require('fs');

const mnemonicPhrase = fs.readFileSync('.secret').toString().trim();

const infuraProjectId = fs.readFileSync('.infura').toString().trim();

const etherscanKey = fs.readFileSync('.etherscan').toString().trim();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: '0.8.21',
  networks: {
    hardhat: {},
    sepolia: {
      url: 'https://sepolia.infura.io/v3/' + infuraProjectId,
      accounts: {
        mnemonic: mnemonicPhrase,
        path: "m/44'/60'/0'/0",
        initialIndex: 0,
        count: 20,
        passphrase: '',
      },
    },
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: etherscanKey,
  },
};
