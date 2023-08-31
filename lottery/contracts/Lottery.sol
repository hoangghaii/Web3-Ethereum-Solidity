// SPDX-License-Identifier: MIT

pragma solidity ^0.8.21;

contract Lottery {
    address public manager;

    address[] public players;

    //msg.sender: the address of the accout (like: 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2)
    constructor() {
        manager = msg.sender;
    }

    function enter() public payable {
        require(msg.value > .01 ether, "to low");

        players.push(msg.sender);
    }

    function random() private view returns (uint) {
        bytes32 hash = keccak256(
            abi.encodePacked(block.difficulty, block.timestamp, players)
        );

        return uint(hash);
    }

    function pickWinner() public restricted {
        uint index = random() % players.length;

        // get player win
        address payable player = payable(players[index]);

        // tranfer money to player win
        // address(this).balance: current balance of this contract
        player.transfer(address(this).balance);

        // reset players list to emplty array
        players = new address[](0);
    }

    function getPlayers() public view returns (address[] memory) {
        return players;
    }

    // function modifer
    modifier restricted() {
        // only manger can run this function
        require(msg.sender == manager);

        _;
    }
}
