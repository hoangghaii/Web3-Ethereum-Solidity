import { useContractRead } from '@thirdweb-dev/react';
import { useParams } from 'next/navigation';
import { useContext } from 'react';

import { AppContext } from '@/providers/app-provider';
import { ProperySolType } from '@/types';

export const usePropertyDetail = () => {
  const { id } = useParams<{ id: string }>();

  const { address, contract } = useContext(AppContext);

  const { data, isLoading } = useContractRead(contract, 'getProperty', [id]);

  const property: ProperySolType = data;

  return { isLoading, id, address, property };
};
