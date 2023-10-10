import StarDucksCappucinoArtifact from '@/contracts/StarDucksCappucinoToken.json';
import { useEffect, useState } from 'react';
import Contract from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';
import { useWeb3 } from '.';

export function useContract() {
  const { netWorkId, web3Instance } = useWeb3();

  const [contract, setContract] = useState<Contract | null>(null);

  const [contractAddress, setContractAddress] = useState<string | null>(null);

  useEffect(() => {
    if (!netWorkId || !web3Instance || !StarDucksCappucinoArtifact) return;

    const abi: AbiItem[] =
      StarDucksCappucinoArtifact.abi as unknown as AbiItem[];

    const networks = StarDucksCappucinoArtifact.networks as any;

    if (!networks[netWorkId]) return;

    const address = networks[netWorkId].address as string;

    const contractInstance = new web3Instance.eth.Contract(abi, address);

    setContract(contractInstance);

    setContractAddress(address);
  }, [netWorkId, web3Instance]);

  return { contract, contractAddress };
}
