import web3 from '@/ethereum/web3';
import CampaignFactoryArtifact from '@/ethereum/build/CampaignFactory.json';

async function campaignFactory() {
  const networkID = await web3.eth.net.getId();

  const address = CampaignFactoryArtifact.networks[networkID].address;

  return new web3.eth.Contract(CampaignFactoryArtifact.abi, address);
}

export default campaignFactory;
