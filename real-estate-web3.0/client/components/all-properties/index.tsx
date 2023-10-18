'use client';

import { Flex } from '@radix-ui/themes';
import { useContractRead } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { useRouter } from 'next/navigation';
import { FC, useContext, useEffect, useState } from 'react';

import PropertyCard from '@/components/propety-card';
import { AppContext } from '@/providers/app-provider';
import { ProperySolType, ProperyType } from '@/types';

import styles from './styles.module.css';

const AllProperties: FC = () => {
  const router = useRouter();

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

  useEffect(() => {
    getProperiesData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Flex gap="5" className={styles.container}>
      {properties.map((property) => {
        return (
          <PropertyCard
            key={property.productId}
            property={property}
            handleViewDetail={() => handleViewDetail(property.productId)}
          />
        );
      })}
    </Flex>
  );
};

export default AllProperties;
