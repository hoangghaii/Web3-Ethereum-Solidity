const StarDucksCappucinoToken = artifacts.require('StarDucksCappucinoToken');
const truffleAssert = require('truffle-assertions');
const chai = require('chai');

const BN = web3.utils.BN;
const chaiBN = require('chai-bn')(BN);
chai.use(chaiBN);

const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const expect = chai.expect;

contract('StarDucksCappucinoToken', (accounts) => {
  const [initialHolder, recipient, anotherAccount] = accounts;

  let instance;

  beforeEach(async () => {
    instance = await StarDucksCappucinoToken.deployed();
  });

  it('All tokens should be in my account', async () => {
    const totalSupply = await instance.totalSupply();

    await expect(
      instance.balanceOf(initialHolder),
    ).to.eventually.be.a.bignumber.equal(totalSupply);
  });

  it('I can send tokens from Account 1 to Account 2', async () => {
    const sendTokens = 1;

    const totalSupply = await instance.totalSupply();

    await expect(
      instance.balanceOf(initialHolder),
    ).to.eventually.be.a.bignumber.equal(totalSupply);

    await expect(instance.transfer(recipient, sendTokens)).to.eventually.be
      .fulfilled;

    await expect(
      instance.balanceOf(initialHolder),
    ).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(sendTokens)));

    await expect(
      instance.balanceOf(recipient),
    ).to.eventually.be.a.bignumber.equal(new BN(sendTokens));
  });

  it("It's not possible to send more tokens than account 1 has", async () => {
    let balanceOfInitialHolder = await instance.balanceOf(initialHolder);

    await expect(
      instance.transfer(recipient, new BN(balanceOfInitialHolder + 1)),
    ).to.eventually.be.rejected;

    // Check if the balance is still the same
    await expect(
      instance.balanceOf(initialHolder),
    ).to.eventually.be.a.bignumber.equal(balanceOfInitialHolder);
  });

  it("It's can mint to another account with specific amount", async () => {
    await expect(instance.mint(recipient, 150)).to.eventually.be.fulfilled;

    await expect(
      instance.balanceOf(recipient),
    ).to.eventually.be.a.bignumber.equal(new BN(151));
  });
});
