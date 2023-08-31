const assert = require('assert');
const ganache = require('ganache');
const { Web3 } = require('web3');
const { abi, evm } = require('../compile');

// The provider is a communication layer between web3 and the ethereum network
const provider = ganache.provider();

const web3 = new Web3(provider);

let accounts;

let inbox;

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();

  // Use one of those accounts to deploy the contract
  // The interface is the ABI (Application Binary Interface)
  inbox = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object, arguments: ['Hi there!'] })
    .send({ from: accounts[0], gas: '1000000' });
});

describe('Inbox', () => {
  it('deploys a contract', () => {
    assert.ok(inbox.options.address);
  });

  it('has a default message', async () => {
    // The call method is used to call a function
    const message = await inbox.methods.message().call();
    assert.equal(message, 'Hi there!');
  });

  it('can change the message', async () => {
    const newMessage = 'Bye';

    // The send method is used to send a transaction
    await inbox.methods.setMessage(newMessage).send({ from: accounts[0] });

    const message = await inbox.methods.message().call();

    assert.equal(message, newMessage);
  });
});
