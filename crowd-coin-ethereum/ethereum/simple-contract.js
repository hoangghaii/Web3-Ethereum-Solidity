import web3 from '@/ethereum/web3';
import SimpleStorageArtifact from '@/ethereum/build/SimpleStorage.json';

async function simpleStorage() {
  const networkID = await web3.eth.net.getId();

  const address = SimpleStorageArtifact.networks[networkID].address;

  return new web3.eth.Contract(SimpleStorageArtifact.abi, address);
}

export default simpleStorage;
