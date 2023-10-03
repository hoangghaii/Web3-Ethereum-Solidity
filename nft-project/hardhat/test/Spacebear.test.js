const { expect } = require('chai');
const hre = require('hardhat');
const {
  loadFixture,
  time,
} = require('@nomicfoundation/hardhat-toolbox/network-helpers');

describe('Spacebear', function () {
  async function deploySpacebearAndMintTokenFixture() {
    const Spacebear = await hre.ethers.getContractFactory('Spacebear');

    const spacebearInstance = await Spacebear.deploy();

    const [owner, otherAccount, notTheNFTOwner] = await ethers.getSigners();

    await spacebearInstance.safeMint(otherAccount.address);

    return { owner, otherAccount, notTheNFTOwner, spacebearInstance };
  }

  it('Is posible to mint a token', async function () {
    const { otherAccount, spacebearInstance } = await loadFixture(
      deploySpacebearAndMintTokenFixture,
    );

    expect(await spacebearInstance.ownerOf(0)).to.equal(otherAccount.address);
  });

  it('Fails to transfer tokens from the wrong address', async function () {
    const { otherAccount, notTheNFTOwner, spacebearInstance } =
      await loadFixture(deploySpacebearAndMintTokenFixture);

    expect(await spacebearInstance.ownerOf(0)).to.equal(otherAccount.address);

    await expect(
      spacebearInstance
        .connect(notTheNFTOwner)
        .transferFrom(otherAccount.address, notTheNFTOwner.address, 0),
    ).to.be.revertedWith('ERC721: caller is not token owner or approved');
  });
});
