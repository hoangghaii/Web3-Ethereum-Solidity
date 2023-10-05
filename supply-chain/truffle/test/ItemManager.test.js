const ItemManager = artifacts.require('ItemManager');
const truffleAssert = require('truffle-assertions');

contract('ItemManager', (accounts) => {
  it('should let you create new Items', async () => {
    const itemManagerInstance = await ItemManager.deployed();

    const txResult = await itemManagerInstance.createItem('Item 01', 100, {
      from: accounts[0],
    });

    truffleAssert.eventEmitted(txResult, 'SupplyChainStep', (ev) => {
      return !ev._step.eq(0);
    });

    const item = await itemManagerInstance.items(0);

    assert.equal(
      item._identifier,
      'Item 01',
      'Item has a different identifier',
    );
  });
});
