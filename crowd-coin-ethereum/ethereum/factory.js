import web3 from '@/ethereum/web3';
import compiledFactory from '@/ethereum/build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  compiledFactory.abi,
  '0xe9b37DDC03b76d649E4c038756B436BD2057bE7e',
);

export default instance;
