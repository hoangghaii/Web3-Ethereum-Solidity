import { useEffect, useState } from 'react';
import Web3 from 'web3';

export function useWeb3() {
  const [accounts, setAccounts] = useState<string[]>([]);

  const [netWorkId, setNetWorkId] = useState<number | null>(null);

  const [web3Instance, setWeb3Instance] = useState<Web3 | null>(null);

  async function checkWalletIsConnected() {
    const { ethereum } = window;

    if (!ethereum) {
      console.log('Make sure you have Metamask installed!');
      return;
    } else {
      console.log("Wallet exists! We're ready to go!");
    }

    try {
      let web3 = null;

      if (
        typeof window !== 'undefined' &&
        typeof window.ethereum !== 'undefined'
      ) {
        // Modern dapp browsers...
        web3 = new Web3(window.ethereum);
      }
      // Fallback...
      else {
        const provider = new Web3.providers.HttpProvider(
          'https://sepolia.infura.io/v3/a4ef57360d90469db1d36450b4cf3589',
        );

        web3 = new Web3(provider);
      }

      const accounts = await web3.eth.getAccounts();

      const networkID = await web3.eth.net.getId();

      setNetWorkId(networkID);

      setAccounts(accounts);

      setWeb3Instance(web3);
    } catch (error) {
      console.log(error);
    }
  }

  async function connectWalletHandler() {
    const { ethereum } = window;

    if (!ethereum) {
      alert('Please install Metamask!');
    }

    try {
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });

      setAccounts(accounts);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    checkWalletIsConnected();
  }, []);

  useEffect(() => {
    const events = ['chainChanged', 'accountsChanged'];

    const handleChange = () => {
      checkWalletIsConnected();

      window.location.reload();
    };

    events.forEach((e) => window.ethereum.on(e, handleChange));

    return () => {
      events.forEach((e) => window.ethereum.removeListener(e, handleChange));
    };
  }, []);

  return { accounts, netWorkId, web3Instance, connectWalletHandler };
}
