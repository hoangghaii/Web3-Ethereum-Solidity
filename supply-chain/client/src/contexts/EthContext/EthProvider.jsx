import React, { useCallback, useEffect, useReducer } from 'react';
import Web3 from 'web3';
import ItemManagerArtifact from '../../contracts/ItemManager.json';
import EthContext from './EthContext';
import { actions, initialState, reducer } from './state';

function EthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const init = useCallback(async () => {
    try {
      let web3;

      if (
        typeof window !== 'undefined' &&
        typeof window.ethereum !== 'undefined'
      ) {
        // We are in the browser and metamask is running.
        window.ethereum.request({ method: 'eth_requestAccounts' });

        web3 = new Web3(window.ethereum);
      } else {
        // We are on the server *OR* the user is not running metamask
        const provider = new Web3.providers.HttpProvider(
          'https://sepolia.infura.io/v3/a4ef57360d90469db1d36450b4cf3589',
        );
        web3 = new Web3(provider);
      }

      const accounts = await web3.eth.getAccounts();

      const networkID = await web3.eth.net.getId();

      const itemManagerContract = new web3.eth.Contract(
        ItemManagerArtifact.abi,
        ItemManagerArtifact.networks[networkID] &&
          ItemManagerArtifact.networks[networkID].address,
      );

      dispatch({
        type: actions.init,
        data: {
          web3,
          accounts,
          networkID,
          itemManagerArtifact: ItemManagerArtifact,
          itemManagerContract,
        },
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    const tryInit = async () => {
      try {
        init();
      } catch (err) {
        console.error(err);
      }
    };

    tryInit();
  }, [init]);

  useEffect(() => {
    const events = ['chainChanged', 'accountsChanged'];

    const handleChange = () => {
      init();

      window.location.reload();
    };

    events.forEach((e) => window.ethereum.on(e, handleChange));

    return () => {
      events.forEach((e) => window.ethereum.removeListener(e, handleChange));
    };
  }, [init, state.itemManagerArtifact]);

  return (
    <EthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </EthContext.Provider>
  );
}

export default EthProvider;
