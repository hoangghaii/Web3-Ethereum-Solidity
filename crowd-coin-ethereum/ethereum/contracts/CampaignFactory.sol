// SPDX-License-Identifier: MIT

pragma solidity 0.8.21;

import "./Campaign.sol";

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(uint _minimum) public {
        address newCampaign = address(new Campaign(msg.sender, _minimum));

        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (address[] memory) {
        return deployedCampaigns;
    }
}
