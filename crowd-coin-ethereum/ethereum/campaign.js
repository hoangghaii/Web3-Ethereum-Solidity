import web3 from '@/ethereum/web3';
import Campaign from '@/ethereum/build/Campaign.json';

function campaign(address) {
  return new web3.eth.Contract(Campaign.abi, address);
}

export default campaign;
