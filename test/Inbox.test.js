const assert = require('assert');
const ganache = require('ganache');
const { Web3 } = require('web3');
const { interface, bytecode } = require('../compile');

const provider = ganache.provider();

const web3 = new Web3(provider);

let accounts;

let inbox

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();

  // Use one of those accounts to deploy the contract
  // The interface is the ABI (Application Binary Interface)
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ['Hi there!'] })
    .send({ from: accounts[0], gas: '1000000' })

  // The provider is a communication layer between web3 and the ethereum network
});

describe('Inbox', () => {
  it('deploys a contract', () => {
    console.log(inbox);
  });
});
