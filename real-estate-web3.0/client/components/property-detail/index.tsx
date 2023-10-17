'use client';

import {
  CurrencyDollarIcon,
  HomeModernIcon,
  IdentificationIcon,
  MapIcon,
} from '@heroicons/react/24/outline';
import { AspectRatio, Card, Flex, Heading, Text } from '@radix-ui/themes';
import { useContractRead, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { useParams } from 'next/navigation';
import { FC, useContext } from 'react';
import { toast } from 'react-hot-toast';

import Button from '@/components/common/button';
import AddReviewForm from '@/components/forms/add-review-form';
import { AppContext } from '@/providers/app-provider';
import { ProperySolType } from '@/types';

import styles from './styles.module.css';

const PropertyDetail: FC = () => {
  const { id } = useParams<{ id: string }>();

  const { address, contract } = useContext(AppContext);

  const { data, isLoading } = useContractRead(contract, 'getProperty', [id]);

  const { mutateAsync: buyProperty, isLoading: isLoadingBuyProperty } =
    useContractWrite(contract, 'buyProperty');

  if (isLoading) {
    return;
  }

  const property: ProperySolType = data;

  async function handleBuyProperty() {
    try {
      const txResult = await buyProperty({
        args: [id, address],
        overrides: {
          value: property.price,
        },
      });

      console.info('contract call successs', txResult);

      toast.success('Create property successfully!');
    } catch (error) {
      console.error('contract call failure', error);

      toast.error('Something went wrong, please try later.');
    }
  }

  const image = property.image.startsWith('ipfs')
    ? `https://ipfs.io/ipfs/${property.image.split(':')[1].replaceAll('/', '')}`
    : property.image;

  return (
    <Card className={styles.dialog} variant="ghost">
      <AspectRatio ratio={16 / 9}>
        <img src={image} alt="Property image" className={styles.image} />
      </AspectRatio>

      <Flex direction="column" gap="5">
        <Heading as="h4" className={styles.title}>
          {property.propertyTitle}
        </Heading>

        <Text as="div" size="3" className={styles.desc}>
          {property.description}
        </Text>

        <Flex gap="3" align="center">
          <Text as="div" size="2" weight="medium">
            Price:
          </Text>

          <Flex align="center" gap="2">
            <CurrencyDollarIcon height="16" width="16" color="teal" />

            <Text as="div" size="2">
              {Number(
                ethers.utils.formatEther(property.price)
              ).toLocaleString()}{' '}
              ETH
            </Text>
          </Flex>
        </Flex>

        <Flex gap="3" align="center">
          <Text as="span" size="2" weight="medium">
            Location:
          </Text>

          <Flex align="center" gap="2">
            <MapIcon height="16" width="16" color="teal" />

            <Text as="span" size="2">
              {property.propertyAddress}
            </Text>
          </Flex>
        </Flex>

        <Flex gap="3" align="center">
          <Text as="span" size="2" weight="medium">
            Owner:
          </Text>

          <Flex align="center" gap="2">
            <IdentificationIcon height="16" width="16" color="teal" />

            <Text as="span" size="2">
              {property.owner}
            </Text>
          </Flex>
        </Flex>

        <Flex gap="3" align="center">
          <Text as="span" size="2" weight="medium">
            Reviews:
          </Text>

          <Text as="span" size="2">
            {property.reviews.map((review, index) => (
              <p key={index}>{review}</p>
            ))}
          </Text>
        </Flex>

        <Button
          type="submit"
          className={styles.btn}
          isLoading={isLoadingBuyProperty}
          onClick={handleBuyProperty}
        >
          <Text>Buy property</Text>
          <HomeModernIcon height="20" width="20" />
        </Button>

        <AddReviewForm productId={id} />
      </Flex>
    </Card>
  );
};

export default PropertyDetail;
