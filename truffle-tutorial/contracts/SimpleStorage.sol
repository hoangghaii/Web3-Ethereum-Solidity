// SPDX-License-Identifier: MIT
pragma solidity 0.8.21;

contract SimpleStorage {
	uint a;

	constructor() {}

	function setter(uint _a) public {
		a = _a;
	}

	function getter() public view returns (uint) {
		return a;
	}
}
