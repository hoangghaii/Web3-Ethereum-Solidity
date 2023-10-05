'use client';

import CampaignFactoryArtifact from '@/ethereum/build/CampaignFactory.json';
import SimpleStorageArtifact from '@/ethereum/build/SimpleStorage.json';
import campaignFactory from '@/ethereum/campaign-factory';
import simpleStorage from '@/ethereum/simple-contract';
import web3 from '@/ethereum/web3';

import { useCallback, useEffect, useReducer } from 'react';

import EthContext from './EthContext';
import { actions, initialState, reducer } from './state';

function EthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const init = useCallback(async () => {
    try {
      const accounts = await web3.eth.getAccounts();

      const networkID = await web3.eth.net.getId();

      const campaignFactoryAddress =
        CampaignFactoryArtifact.networks[networkID].address;

      const campaignFactoryContract = await campaignFactory();

      const simpleStorageAddress =
        SimpleStorageArtifact.networks[networkID].address;

      const simpleStorageContract = await simpleStorage();

      dispatch({
        type: actions.init,
        data: {
          web3,
          accounts,
          campaignFactoryAddress,
          campaignFactoryContract,
          simpleStorageAddress,
          simpleStorageContract,
        },
      });
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    const events = ['chainChanged', 'accountsChanged'];

    const handleChange = () => {
      init();
    };

    events.forEach((e) => web3.provider.on(e, handleChange));

    return () => {
      events.forEach((e) => web3.provider.removeListener(e, handleChange));
    };
  }, []);

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
