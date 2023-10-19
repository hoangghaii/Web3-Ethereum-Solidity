'use client';

import { Flex, Heading } from '@radix-ui/themes';
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
    <Flex direction="column" gap="4">
      <Heading as="h4" size="7" ml="2">
        Explore Products
      </Heading>

      <Flex
        gap="9"
        wrap="wrap"
        justify="center"
        align="center"
        className={styles.container}
      >
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
    </Flex>
  );
};

export default AllProperties;
