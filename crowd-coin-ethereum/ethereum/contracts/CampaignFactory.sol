// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.21;

import "./Campaign.sol";

contract CampaignFactory {
    address payable[] public deployedCampaigns;

    function createCampaign(uint _minimum) public {
        address newCampaign = address(new Campaign(_minimum, msg.sender));

        deployedCampaigns.push(payable(newCampaign));
    }

    function getDeployedCampaigns()
        public
        view
        returns (address payable[] memory)
    {
        return deployedCampaigns;
    }
}
