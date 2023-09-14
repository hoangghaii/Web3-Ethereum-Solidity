import web3 from '@/ethereum/web3';
import compiledFactory from '@/ethereum/build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(compiledFactory.interface),
  '0xEb5100743899EEcAC7Be098a99Ca3Bb11A180657',
);

export default instance;
