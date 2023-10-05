import { useEffect, useState } from 'react';
import useEth from '../../contexts/EthContext/useEth';
import NoticeNoArtifact from './NoticeNoArtifact';
import NoticeWrongNetwork from './NoticeWrongNetwork';
import Title from './Title';

function Demo() {
  const {
    state: { accounts, itemManagerArtifact, itemManagerContract },
  } = useEth();

  const [cost, setCost] = useState('');

  const [itemName, setItemName] = useState('');

  const [itemId, setItemId] = useState('');

  const [itemCost, setItemCost] = useState('');

  console.log({ cost, itemName, itemId, itemCost });

  function handleCostChange(e) {
    setCost(e.target.value);
  }

  function hanleItemNameChange(e) {
    setItemName(e.target.value);
  }

  function hanleItemIdChange(e) {
    setItemId(e.target.value);
  }

  function hanleItemCostChange(e) {
    setItemCost(e.target.value);
  }

  async function handleCreate() {
    // Create a new item using the item manager contract
    await itemManagerContract.methods.createItem(itemName, cost).send({
      from: accounts[0],
    });
  }

  async function handlePayment() {
    // Create a new item using the item manager contract
    await itemManagerContract.methods.triggerPayment(itemId).send({
      from: accounts[0],
      value: itemCost,
    });
  }

  async function handleDelivery() {
    // Create a new item using the item manager contract
    await itemManagerContract.methods.triggerDelivery(itemId).send({
      from: accounts[0],
    });
  }

  function listenToPaymentEvent() {
    itemManagerContract.events.SupplyChainStep().on('data', async function (e) {
      getItemDetail(e.returnValues._itemIndex);
    });
  }

  async function getItemDetail(itemId) {
    const detail = await itemManagerContract.methods.items(itemId).call();

    console.log(detail);
  }

  useEffect(() => {
    if (itemManagerContract) {
      listenToPaymentEvent();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemManagerContract]);

  const demo = (
    <div className="items-container">
      <div className="contract-container">
        <h2>Add Items</h2>

        <div className="input-field">
          <label>Cost in Wei:</label>
          <input
            type="text"
            name="cost"
            value={cost}
            onChange={handleCostChange}
          />
        </div>

        <div className="input-field">
          <label>Item Identifier:</label>
          <input
            type="text"
            name="itemName"
            value={itemName}
            onChange={hanleItemNameChange}
          />
        </div>

        <button type="button" onClick={handleCreate}>
          Create new item
        </button>
      </div>

      <div className="contract-container">
        <h2>Payment item</h2>

        <div className="input-field">
          <label>Payment item id:</label>
          <input
            type="text"
            name="itemId"
            value={itemId}
            onChange={hanleItemIdChange}
          />
        </div>

        <div className="input-field">
          <label>Payment item cost:</label>
          <input
            type="text"
            name="itemCost"
            value={itemCost}
            onChange={hanleItemCostChange}
          />
        </div>

        <button type="button" onClick={handlePayment}>
          Payment now
        </button>
      </div>

      <div className="contract-container">
        <h2>Delivery item</h2>

        <div className="input-field">
          <label>Delivery item id:</label>
          <input
            type="text"
            name="itemId"
            value={itemId}
            onChange={hanleItemIdChange}
          />
        </div>

        <button type="button" onClick={handleDelivery}>
          Delivery now
        </button>
      </div>
    </div>
  );

  return (
    <div className="demo">
      <Title />
      {!itemManagerArtifact ? (
        <NoticeNoArtifact />
      ) : !itemManagerContract ? (
        <NoticeWrongNetwork />
      ) : (
        demo
      )}
    </div>
  );
}

export default Demo;
