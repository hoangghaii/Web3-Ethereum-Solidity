const assert = require('assert');
const ganache = require('ganache');
const { Web3 } = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');
const compiledCampaign = require('./build/Campaign.json');

// The provider is a communication layer between web3 and the ethereum network
const provider = ganache.provider();

const web3 = new Web3(provider);

let accounts;

let factory;

let campaignAddress;

let campaign;

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();

  // Use one of those accounts to deploy the contract
  // Create a factory
  factory = await new web3.eth.Contract(compiledFactory.abi)
    .deploy({ data: compiledCampaign.evm.bytecode.object })
    .send({ from: accounts[0], gas: '1400000' });

  // Create a campaign
  await factory.methods.createCampaign('100').send({
    from: accounts[0],
    gas: '1000000',
  });

  // Get the address of the campaign
  const addresses = await factory.methods.getDeployedCampaigns().call();
  campaignAddress = addresses[0];

  // Create a campaign instance
  campaign = await new web3.eth.Contract(compiledCampaign.abi, campaignAddress);
});

describe('Campaign', () => {
  it('deploys a factory and a campaign', () => {
    assert.ok(factory.options.address);

    assert.ok(campaign.options.address);
  });

  it('marks caller as the campaign manager', async () => {
    const manager = await campaign.methods.manager().call();

    assert.equal(accounts[0], manager);
  });

  it('allows people to contribute money and marks them as approvers', async () => {
    await campaign.methods.contribute().send({
      from: accounts[1],
      value: '200',
    });

    const isContributor = await campaign.methods.approvers(accounts[1]).call();

    assert(isContributor);
  });

  it('requires a minimum contribution', async () => {
    try {
      await campaign.methods.contribute().send({
        from: accounts[1],
        value: '5',
      });
    } catch (err) {
      assert(err);
      return;
    }
    assert(false);
  });

  it('allows a manager to make a payment request', async () => {
    await campaign.methods
      .createRequest('Buy batteries', '100', accounts[1])
      .send({
        from: accounts[0],
        gas: '1000000',
      });

    const request = await campaign.methods.requests(0).call();

    assert.equal('Buy batteries', request.description);
    assert.equal('100', request.value);
    assert.equal(accounts[1], request.recipient);
    assert.equal(false, request.complete);
    assert.equal('1', request.approvalCount);
  });

  it('processes requests', async () => {
    await campaign.methods.contribute().send({
      from: accounts[0],
      value: web3.utils.toWei('10', 'ether'),
    });

    await campaign.methods
      .createRequest('A', web3.utils.toWei('5', 'ether'), accounts[1])
      .send({
        from: accounts[0],
        gas: '1000000',
      });

    await campaign.methods.approveRequest(0).send({
      from: accounts[0],
      gas: '1000000',
    });

    await campaign.methods.finalizeRequest(0).send({
      from: accounts[0],
      gas: '1000000',
    });

    let balance = await web3.eth.getBalance(accounts[1]);

    balance = web3.utils.fromWei(balance, 'ether');

    balance = parseFloat(balance);

    assert(balance > 104);
  });
});
