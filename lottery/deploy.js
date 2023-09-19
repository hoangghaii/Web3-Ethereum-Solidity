const HDWalletProvider = require('@truffle/hdwallet-provider');
const { Web3 } = require('web3');
const { abi, evm } = require('./compile');

const provider = new HDWalletProvider(
  'arrange index chase spin faculty meadow museum brief combine plunge match say',
  'https://sepolia.infura.io/v3/fa79d1012d6c4976ac5db26737484320',
);

const web3 = new Web3(provider);

async function deplop() {
  // Get a list of all accounts

  const accounts = await web3.eth.getAccounts();

  const mainAccount = accounts[0];

  console.log('Attempting to deploy from account', mainAccount);

  const result = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object })
    .send({ from: mainAccount, gas: '1000000' });

  console.log(JSON.stringify(abi));

  console.log('Contract deployed to', result.options.address);

  // Prevents a hanging deployment
  provider.engine.stop();
}

deplop();
