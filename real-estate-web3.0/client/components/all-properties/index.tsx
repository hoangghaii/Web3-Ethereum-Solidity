'use client';

import { Card, Dialog, Flex } from '@radix-ui/themes';
import { useContractRead } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { useRouter } from 'next/navigation';
import { FC, useContext, useEffect, useState } from 'react';

import PropertyCard from '@/components/propety-card';
import { AppContext } from '@/providers/app-provider';
import { ProperySolType, ProperyType } from '@/types';

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
        image: element.image,
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
    <>
      <Flex gap="3" asChild>
        <Card>
          {properties.map((property) => {
            const image = property.image.startsWith('ipfs')
              ? `https://ipfs.io/ipfs/${property.image
                  .split(':')[1]
                  .replaceAll('/', '')}`
              : property.image;

            return (
              <Dialog.Root key={property.productId}>
                <PropertyCard
                  property={{ ...property, image }}
                  handleViewDetail={() => handleViewDetail(property.productId)}
                />
              </Dialog.Root>
            );
          })}
        </Card>
      </Flex>
    </>
  );
};

export default AllProperties;
