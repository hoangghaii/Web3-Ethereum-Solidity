// SPDX-License-Identifier: MIT

pragma solidity 0.8.21;

import "@openzeppelin/contracts/access/Ownable.sol";

import "./Item.sol";

contract ItemManager is Ownable {
    enum SupplyChainState {
        Create,
        Paid,
        Delivered
    }

    uint256 itemIndex;

    struct S_Item {
        Item _item;
        string _identifier;
        uint256 _itemPrice;
        ItemManager.SupplyChainState _state; // equal SupplyChainState _state, if in the same contract
    }

    mapping(uint256 => S_Item) public items;

    event SupplyChainStep(
        uint256 _itemIndex,
        uint256 indexed _step,
        address indexed _itemAddress
    );

    constructor() {}

    /**
     * @dev Creates a new item in the supply chain.
     * @param _identifier The identifier of the item.
     * @param _itemPrice The price of the item in Wei.
     * @notice Only the contract owner can call this function.
     * @notice Emits a SupplyChainStep event with the created item index, state, and address.
     */
    function createItem(
        string memory _identifier,
        uint256 _itemPrice
    ) public onlyOwner {
        Item item = new Item({
            _parentContract: this,
            _priceInWei: _itemPrice,
            _index: itemIndex
        });

        S_Item memory createdItem = S_Item({
            _item: item,
            _identifier: _identifier,
            _itemPrice: _itemPrice,
            _state: SupplyChainState.Create
        });

        items[itemIndex] = createdItem;

        emit SupplyChainStep(
            itemIndex,
            uint256(items[itemIndex]._state),
            address(item)
        );

        itemIndex++;
    }

    /**
     * @dev Triggers the payment for an item.
     * @param _itemIndex The index of the item in the items mapping.
     * @notice The payment must be equal to the item price.
     * @notice The item must be in the Create state to accept the payment.
     * @notice Updates the state of the item to Paid.
     * @notice Emits a SupplyChainStep event with the updated item state and item address.
     * @notice Throws an error if the payment is not equal to the item price or if the item is not in the Create state.
     */
    function triggerPayment(uint256 _itemIndex) public payable {
        S_Item storage item = items[_itemIndex];

        require(item._itemPrice == msg.value, "Only full payments acepted");

        require(
            item._state == SupplyChainState.Create,
            "Item is further in the chain"
        );

        item._state = SupplyChainState.Paid;

        emit SupplyChainStep(
            _itemIndex,
            uint256(item._state),
            address(item._item)
        );
    }

    /**
     * @dev Triggers the delivery of an item.
     * @param _itemIndex The index of the item in the items mapping.
     * @notice Only the contract owner can call this function.
     * @notice The item must be in the paid state to be delivered.
     * @notice Updates the state of the item to Delivered.
     * @notice Emits a SupplyChainStep event with the updated item state and item address.
     */
    function triggerDelivery(uint256 _itemIndex) public onlyOwner {
        S_Item storage item = items[_itemIndex];

        require(
            item._state == SupplyChainState.Paid,
            "Item is further in the chain"
        );

        item._state = SupplyChainState.Delivered;

        emit SupplyChainStep(
            _itemIndex,
            uint256(item._state),
            address(item._item)
        );
    }

    function renounceOwnership() public pure override {
        revert("Can't renounce ownership here");
    }
}
