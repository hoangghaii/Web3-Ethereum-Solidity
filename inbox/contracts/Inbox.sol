// SPDX-License-Identifier: MIT

pragma solidity ^0.8.21;

// This is the contract that will be deployed to the blockchain

contract Inbox {
    string public message;

    constructor(string memory initialMessage) {
        message = initialMessage;
    }

    function setMessage(string memory newMessage) public {
        message = newMessage;
    }
}
