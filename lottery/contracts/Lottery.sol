// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract Lottery {
    address public manager;

    address payable[] public players;

    //msg.sender: the address of the accout (like: 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2)
    constructor() {
        manager = msg.sender;
    }

    function enter() public payable {
        require(msg.value > .01 ether, "to low");

        players.push(payable(msg.sender));
    }

    function random() private view returns (uint) {
        return
            uint(
                keccak256(
                    abi.encodePacked(block.difficulty, block.timestamp, players)
                )
            );
    }

    function pickWinner() public restricted {
        uint index = random() % players.length;

        // get player win
        address payable player = (players[index]);

        // tranfer money to player win
        // address(this).balance: current balance of this contract
        player.transfer(address(this).balance);

        // reset players list to emplty array
        players = new address payable[](0);
    }

    function getPlayers() public view returns (address payable[] memory) {
        return players;
    }

    // function modifer
    modifier restricted() {
        // only manger can run this function
        require(msg.sender == manager);

        _;
    }
}
