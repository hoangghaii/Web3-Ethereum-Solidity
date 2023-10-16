'use client';

import { SmartContract, useAddress, useContract } from '@thirdweb-dev/react';
import { createContext, useEffect, useState } from 'react';

type AppContextType = {
  contract: SmartContract | undefined;
  isContractLoading: boolean;
  address: string | undefined;
};

export const AppContext = createContext<AppContextType>({
  contract: undefined,
  isContractLoading: true,
  address: undefined,
});

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const [state, setState] = useState<AppContextType>({
    contract: undefined,
    isContractLoading: true,
    address: undefined,
  });

  const { contract, isLoading } = useContract(
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
  );

  const address = useAddress();

  useEffect(() => {
    if (!isLoading) {
      setState((prev) => ({ ...prev, address }));
    }
  }, [address]);

  useEffect(() => {
    if (!isLoading) {
      setState((prev) => ({ ...prev, contract, isContractLoading: false }));
    }
  }, [contract, isLoading]);

  return (
    <AppContext.Provider value={{ ...state }}>{children}</AppContext.Provider>
  );
};
