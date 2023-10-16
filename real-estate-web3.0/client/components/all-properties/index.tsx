'use client';

import { AppContext } from '@/providers/app-provider';
import { ProperySolType, ProperyType } from '@/types';
import {
  Button,
  Card,
  Flex,
  Heading,
  Inset,
  Strong,
  Text,
} from '@radix-ui/themes';
import { useContractRead } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { FC, useContext, useEffect, useState } from 'react';
import styles from './styles.module.css';
import { useRouter } from 'next/navigation';

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
        productId: ethers.utils.formatEther(element.productId),
        owner: element.owner,
        reviewers: [],
        reviews: [],
      };

      properties.push(propety);
    }

    setProperties(properties);
  }

  function handleViewDetail(id: string) {
    router.push(`/property/${id}`);
  }

  useEffect(() => {
    getProperiesData();
  }, [data]);

  console.log(properties);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <Flex gap="3" asChild>
        <Card>
          {properties.map((property) => {
            const image = property.image.startsWith('ipfs')
              ? `https://ipfs.io/ipfs/${property.image
                  .split(':')[1]
                  .replaceAll('/', '')}`
              : property.image;

            return (
              <Card size="2" className={styles.card} key={property.productId}>
                <Inset clip="padding-box" side="top" pb="current">
                  <img
                    src={image}
                    alt="Bold typography"
                    className={styles.property_image}
                  />
                </Inset>

                <Flex direction="column" gap="1">
                  <Heading as="h6" size="5">
                    {property.propertyTitle}
                  </Heading>

                  <Text as="p" size="3" weight="bold">
                    {property.description}
                  </Text>

                  <Text as="p" size="2">
                    Location: <Strong>{property.propertyAddress}</Strong>
                  </Text>

                  <Text as="p" size="2">
                    Price:{' '}
                    <Strong>
                      {Number(property.price).toLocaleString()} ETH
                    </Strong>
                  </Text>

                  <Button
                    onClick={() => {
                      handleViewDetail(property.productId);
                    }}
                    className={styles.btn}
                  >
                    View detail
                  </Button>
                </Flex>
              </Card>
            );
          })}
        </Card>
      </Flex>
    </div>
  );
};

export default AllProperties;
