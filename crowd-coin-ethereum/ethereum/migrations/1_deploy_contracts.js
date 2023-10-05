const CampaignFactory = artifacts.require('CampaignFactory');
const Campaign = artifacts.require('Campaign');

module.exports = function (deployer) {
  deployer.deploy(CampaignFactory);
  // .then(function () {
  //   // Get the deployed CampaignFactory instance
  //   return CampaignFactory.deployed();
  // })
  // .then(function (campaignFactory) {
  //   // Deploy Campaign and pass the CampaignFactory contract address as an argument
  //   return deployer.deploy(Campaign, campaignFactory.address, 100);
  // });
};
