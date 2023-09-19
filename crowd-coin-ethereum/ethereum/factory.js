import web3 from '@/ethereum/web3';
import compiledFactory from '@/ethereum/build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  compiledFactory.abi,
  '0x714d4399889f1d7985aA4DA1E08A53951731061D',
);

export default instance;
