import web3 from '@/ethereum/web3';
import CampaignArtifact from '@/ethereum/build/Campaign.json';

function campaign(address) {
  return new web3.eth.Contract(CampaignArtifact.abi, address);
}

export default campaign;
