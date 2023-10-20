import { useContractRead } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';

import { AppContext } from '@/providers/app-provider';
import { CategoriesType, ProperySolType, ProperyType } from '@/types';

export const useAllProperties = () => {
  const router = useRouter();

  const { contract } = useContext(AppContext);

  const { data, isLoading } = useContractRead(contract, 'getAllProperties');

  const [properties, setProperties] = useState<ProperyType[]>([]);

  const [filterApplied, setFilterApplied] = useState<CategoriesType>('all');

  function getProperiesData() {
    if (!data) return;

    const properties: ProperyType[] = [];

    for (let index = 0; index < data.length; index++) {
      const element = data[index] as ProperySolType;

      const propety: ProperyType = {
        price: ethers.utils.formatEther(element.price),
        propertyTitle: element.propertyTitle,
        category: element.category,
        images: element.images,
        propertyAddress: element.propertyAddress,
        description: element.description,
        productId: element.productId.toString(),
        owner: element.owner,
        reviewers: [],
        reviews: [],
      };

      properties.push(propety);
    }

    setProperties(properties);
  }

  function handleViewDetail(id: string) {
    router.push(`/property/${Number(id)}`);
  }

  function handleFilterProperties(filter: CategoriesType) {
    setFilterApplied(filter);
  }

  useEffect(() => {
    getProperiesData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return {
    properties,
    isLoading,
    filterApplied,
    handleViewDetail,
    handleFilterProperties,
  };
};
