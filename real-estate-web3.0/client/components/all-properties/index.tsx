'use client';

import { AppContext } from '@/providers/app-provider';
import { ProperySolType, ProperyType } from '@/types';
import { useContractRead } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { FC, useContext, useEffect, useState } from 'react';

const AllProperties: FC = () => {
  const { contract } = useContext(AppContext);

  const { data, isLoading } = useContractRead(contract, 'getAllProperties');

  const [properties, setProperties] = useState<ProperyType[]>([]);

  function getProperiesData() {
    if (!data) return;

    const properties: ProperyType[] = [];

    for (let index = 0; index < data.length; index++) {
      const element = data[index] as ProperySolType;

      const propety: ProperyType = {
        price: ethers.utils.formatEther(element.price),
        propertyTitle: element.propertyTitle,
        category: element.category,
        image: element.image,
        propertyAddress: element.propertyAddress,
        description: element.description,
        productId: ethers.utils.formatEther(element.productId),
        owner: element.owner,
        reviewers: [],
        reviews: [],
      };

      properties.push(propety);
    }

    setProperties(properties);
  }

  useEffect(() => {
    getProperiesData();
  }, [data]);

  console.log(properties);

  return <div>Enter</div>;
};

export default AllProperties;
